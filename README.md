# Backend Setup
### Install Node.js
1. Link: https://nodejs.org/en/
1. Download version 8.11.4 LTS 

### Install MongoDB
1. For Mac user, use **homebrew** to download 
    1. Run '**brew install mongodb**'
    1. Run '**brew services start mongodb**' to start mongodb background service
        
1. For Windows users, download at 
    * https://www.mongodb.com/
    
1. Recommended mongodb visualizer: Robo 3T
    * https://robomongo.org/

### Test your setup
1. In your IDE, enable Javascript: ECMAScript 6 (ES6)
1. Navigate to the project folder in terminal
1. Run '**npm install**'
1. Run '**npm run testSetup**', you should get a console response
1. To start the server, run '**npm start**'
1. Top stop the server, press **ctrl+c** to stop the server

### Run tests
1. Integration test: '**npm run test:integration**'

### Swagger API
1. Run '**npm install**'
1. Run '**npm start**'
1. The API documentation is at http://localhost:3000/api-docs

### Database
1. Insert dummy user: '**npm run db:insert**'