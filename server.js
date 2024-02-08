const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors')
const app = express();
const port = 3000;
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
const uri = 'mongodb+srv://bhumir:bhumi@cluster0.u0lqlrf.mongodb.net/WeirdThings';

const client = new MongoClient(uri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls : true,
  tlsAllowInvalidCertificates: true,
   });
client.connect()
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    const database = client.db('WeirdThings');
    const collection = database.collection('List');

    app.get('/', async (req,res)=>{
    const result = await collection.find({}).toArray();
      res.json(result);
    })

    app.post('/', async (req,res) => {
      const {ProductName, Reviews,WorstRatings, BestRatings} = req.body;
      const result = await collection.insertOne({ProductName, Reviews,WorstRatings, BestRatings});
      res.json(result);
    })
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas', err);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});