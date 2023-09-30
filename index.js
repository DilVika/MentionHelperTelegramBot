// import serverlessExpress from '@vendia/serverless-express'
// import app from './app.js'
const serverlessExpress = require('@vendia/serverless-express');
const app = require('./app.js');

// export const handler = serverlessExpress({ app });
module.exports.handler = serverlessExpress({ app });
