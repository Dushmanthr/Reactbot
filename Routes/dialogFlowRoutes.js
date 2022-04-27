const dialogflow = require('@google-cloud/dialogflow');
const { query } = require('express');
const config = require('../config/keys');

const sessionClient =new dialogflow.SessionsClient();

const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);

module.exports = app =>{

    app.get('/', (req, res) => {
        res.send({'hello':'Johnny Bash'});
    });
    
    app.get('/api/df_text_query', async (req, res) => {

        const request = {
            session: sessionPath,
            queryInput: {
              text: {
                // The query to send to the dialogflow agent
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: config.dialogFlowSessionLanguageCode,
              },
            },
          };
          let responses =await sessionClient
              .detectIntent(request)
             
         
              
        res.send(responses[0].queryResult);
    });
    
    app.get('/api/df_event_query', (req, res) => {
        res.send({'do':'event query'});
    });
}