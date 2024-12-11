// src/services/mondayService.js
import axios from 'axios';
import { API_TOKEN, API_URL, TRACKER_BOARD_ID } from './mondayConfig';

export default {

  async getBoardColumns() {
    const query = `
      query {
        boards(ids: [${TRACKER_BOARD_ID}]) {
          columns {
            id
            title
          }
        }
      }
    `;
  
    try {
      const response = await axios.post(API_URL, {
        query: query,
      }, {
        headers: {
          Authorization: API_TOKEN,
          'Content-Type': 'application/json',
        }
      });
      
      return response.data.data.boards[0].columns;
    } catch (error) {
      console.error('Error fetching board columns:', error);
      throw error;
    }
  },


  // Function to get the apprentice ID from Monday.com based on email
  async getApprenticeIdByEmail(email) {
    const allItems = []; // Array to hold all items
    let cursor = null; // Initialize cursor for pagination
    let hasMoreItems = true; // Flag to control loop execution

    // Fetch column data
  const columns = await this.getBoardColumns();
  const emailColumnId = columns.find(col => col.title.toLowerCase() === 'email')?.id; // Retrieve email column ID

  do {
    const query = `
    query {
      boards(ids: [${TRACKER_BOARD_ID}]) {
        items_page(limit: 25, cursor: ${cursor ? `"${cursor}"` : "null"}) {
          cursor
          items {
            id
            name
            column_values {
              id
              text
              value
              ... on EmailValue {
                email
              }
            }
          }
        }
      }
    }
    `;
  
      try {
        const response = await axios.post(API_URL, {
          query: query,
        }, {
          headers: {
            Authorization: API_TOKEN,
            'Content-Type': 'application/json',
          }
        });
  
        // Log the entire response to diagnose the structure
        // console.log('API Response:', response.data);
  
        // Check if the boards data is available
        const boards = response.data.data?.boards;
        if (!boards || boards.length === 0) {
          console.error("No boards found in the response.");
          return null;
        }
  
        const items = boards[0].items_page.items;
        allItems.push(...items); // Add the current items to the allItems array
  
        // If there are no more items, break the loop
        if (items.length < 25) {
          hasMoreItems = false; // No more items to fetch
        } else {
          // Set cursor for the next request
          cursor = response.data.data.boards[0].items_page.cursor;
        }
  
      } catch (error) {
        console.error('Error fetching apprentice ID:', error.response ? error.response.data : error);
        throw error;
      }
    } while (hasMoreItems);
  
    // // Log all items collected for debugging
    // console.log('All retrieved items:', allItems);
  
    // Search through all collected items for the matching email
  const matchedItem = allItems.find(item => 
    item.column_values.some(column => column.id === emailColumnId && column.text === email) // Use emailColumnId here
  );
  
    if (matchedItem) {
      console.log(`Found matching apprentice: ${matchedItem.name} with ID: ${matchedItem.id} in monday board`);
      return matchedItem.id;
    } else {
      console.error(`No matching apprentice found with email: ${email}`);
      return null;
    }
  },

  
// Function to get data from monday.com
  async getBoardData(apprenticeId) {
    const query = `
    query {
      boards (ids: [${TRACKER_BOARD_ID}]) {
        id
        name
        items_page (query_params: { ids: [${apprenticeId}] }){
           items {
            id
            name
            column_values {
                ... on EmailValue {
                    email
                    updated_at
                }
                ... on DropdownValue {
                    column {
                        title
                      }
                    values {
                      label
                    }
                }
                ... on BoardRelationValue {
                    linked_items {
                      id
                    }
                }               
                ... on DateValue {
                    column {
                      title
                    }
                    date
                }
                ... on StatusValue {
                  column {
                    title
                  }
                	text
                }
                ... on TextValue {
                  column {
                    title
                  }
                  text
                }
                ... on FormulaValue {
                  column {
                    title
                  }
                  text
                }
                ... on NumbersValue {
                  number
                	column {
                    title
                  }
                  symbol
                }
                ... on LinkValue {
                  column {
                    id
                    title
                  }
                  url
      					}
                ... on BoardRelationValue {
                  column {
                    title
                    type
                  }
                  id
                  linked_items {
                    name
                    column_values {
                      text
                      id
                    }
                  }
              } 
            }
           } 
        }
      }
    }
    `;

    try {
      const response = await axios.post(API_URL, {
        query: query,
      }, {
        headers: {
          Authorization: API_TOKEN,
          'Content-Type': 'application/json',
        }
      });

      console.log(response.data.data.boards[0].items_page.items);
      return response.data.data.boards[0].items_page.items;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
};
