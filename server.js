// // server.js
// const app = require('./app');

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


//  const app = require('./app');
// const dotenv = require('dotenv');
// const connectDatabase = require("./config/db");

// // dotenv.config({ path: 'backend/config/config.env' });
// dotenv.config({ path: '/.env' });

// const PORT =  4000; // Use the environment variable PORT or fallback to 4000

// // Handling Uncaught Exception
// process.on("uncaughtException", (err) => {
//   console.error(`Error: ${err.message}`);
//   console.error(`Shutting down the server due to Handling Uncaught Exception`);
//   process.exit(1);
// });

// // Connecting to database
// connectDatabase();

// // Starting the server
// const server = app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// // Unhandled Promise Rejection
// process.on("unhandledRejection", (err) => {
//   console.error(`Error: ${err.message}`);
//   console.error(`Shutting down the server due to Unhandled Promise Rejection`);
//   server.close(() => {
//     process.exit(1);
//   });
// });


// const app = require('./app');
// const express = require('express');
// const cors = require('cors');
// const https = require('https');
// const fs = require('fs');
// const dotenv = require('dotenv');
// const connectDatabase = require("./config/database")

// // Handling Uncaught Exception
// process.on("uncaughtException", (err)=>{
//   console.log(`Error: ${err.message}`);
//   console.log(`Shutting down the server due to Handling Uncaught Exception`);

//     process.exit(1);
// });

// app.use(express.json());
// app.use(cors({ origin: 'https://labs.drpalvehospital.com' }));
// // app.use(cookieParser());

// // const options = {
// //   key: fs.readFileSync('./backend/ssl/privkey.key'),
// //   cert: fs.readFileSync('./backend/ssl/fullchain.crt')
// // };


// // config
// dotenv.config({ path: 'backend/config/config.env' });

// // connecting to database
// connectDatabase();
// const httpsServer = https.createServer({
//   key: fs.readFileSync('./backend/ssl/privkey.key'),
//   cert: fs.readFileSync('./backend/ssl/fullchain.crt'),
// }, app);
// // const server = https.createServer(options, app);
// const server = httpsServer.listen(process.env.PORT, () => {
//   console.log(`Server is working on https://labs.drpalvehospital.com:${process.env.PORT}`);
// });


// // Unhandled Promise Rejection
// process.on("unhandledRejection", err=>{
//   console.log(`Error: ${err.message}`);
//   console.log(`Shutting down the server due to Unhandled Promise Rejection`);

//   server.close(()=>{
//     process.exit(1);
//   })
// });



const app = require('./app');
const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const dotenv = require('dotenv');
const connectDatabase = require("./config/db")

// Handling Uncaught Exception
process.on("uncaughtException", (err)=>{
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Handling Uncaught Exception`);

    process.exit(1);
});

app.use(express.json());
app.use(cors({ origin: 'https://report.dgtlinnovations.in' }));
// app.use(cookieParser());

// const options = {
//   key: fs.readFileSync('./backend/ssl/privkey.key'),
//   cert: fs.readFileSync('./backend/ssl/fullchain.crt')
// };


// config
dotenv.config({ path: './config/config.env' });

// connecting to database
connectDatabase();
// console.log(origin)
const httpsServer = https.createServer({
  key: fs.readFileSync('./ssl/privkey.key'),
  cert: fs.readFileSync('./ssl/fullchain.crt'),
}, app);
// const server = https.createServer(options, app);
const server = httpsServer.listen(process.env.PORT, () => {
  console.log(`Server is working on https://report.dgtlinnovations.in:6060:${process.env.PORT}`);
});


// Unhandled Promise Rejection
process.on("unhandledRejection", err=>{
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(()=>{
    process.exit(1);
  })
});

