import axios from "axios";
import { API_TOKEN, API_URL, TRACKER_BOARD_ID } from "./mondayConfig";

export default async function registrationService(email, apprenticeId){
    //fire to monday api
    try {
        const response = await axios.post(API_URL, {
            query: `
                query {
                    boards(ids: [${TRACKER_BOARD_ID}]){
                        items_page(query_params: {ids: [${apprenticeId}]}){
                            items {
                                column_values {
                                    ... on TextValue {
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
            `
        }, {
            headers: {
                Authorization: API_TOKEN,
                'Content-Type': 'application/json',
            }
        })

        if(!response.data.data.boards[0].items_page.items[0] || response.data.data.boards[0].items_page.items[0].length === 0) {
            throw new Error('Your email and ID number do not match our system - please get in touch with your system administrator');
        }
        
        const data = response.data.data.boards[0].items_page.items[0].column_values;

        const retrievedEmail = data.filter(item => item.column && item.column.title === 'Email')[0].text;

        return retrievedEmail === email
    

    } catch(err) {
       throw new Error(err);
    }

   

}