// src/services/mondayService.js
import axios from 'axios';
import { API_TOKEN, API_URL, TRACKER_BOARD_ID } from './mondayConfig';

export default {
  // Function to get data from monday.com
  getBoardData(apprenticeId) {
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
