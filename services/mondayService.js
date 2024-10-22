// src/services/mondayService.js
import axios from 'axios';

const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE2ODEyNjUxMiwiYWFpIjoxMSwidWlkIjoyOTY3ODUwMiwiaWFkIjoiMjAyMi0wNi0zMFQwODo0MDozOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTE4NDM0ODEsInJnbiI6InVzZTEifQ.MqL8cL1E5ek1cdrJrDB7biLuNoDnGQOf82SJ-61BEuw';  // Replace with your API token
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
