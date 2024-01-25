const express = require('express');

const { startDatabase, stopDatabase, isConnected } = require('./db');
const app = express();


app.get('/', (req, res) => {
  res.json({
    message: 'o_O',
    database: isConnected() ? 'connected' : 'disconnected'
  })
});


process.on('SIGINT', async () => {
  await stopDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await stopDatabase();
  process.exit(0);
});

if (require.main === module) {
  app.listen(8000, async () => {
    await startDatabase();

    console.log(`🚀 server running on PORT: $`);
  });
}





module.exports = app;
