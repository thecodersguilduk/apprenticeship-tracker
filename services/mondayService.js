// src/services/mondayService.js
import axios from 'axios';

const API_TOKEN = process.env.VUE_APP_MONDAY_API_TOKEN;  // Replace with your API token
const API_URL = 'https://api.monday.com/v2';

export default {
  // Function to get data from monday.com
  getBoardData(boardId, itemId) {
    const query = `
    query {
      boards (ids: [${boardId}]) {
        id
        name
        items_page (query_params: { ids: [${itemId}] }){
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
            }
           } 
        }
      }
    }
    `;

    return axios.post(API_URL, {
      query: query,
    }, {
      headers: {
        Authorization: API_TOKEN,
        'Content-Type': 'application/json',
      }
    }).then(response => {
      return response.data.data.boards[0].items_page.items; // Adjust this based on your data structure
    }).catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  }
};
