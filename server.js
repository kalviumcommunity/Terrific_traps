const express = require('express');
const { MongoClient, ObjectID } = require('mongodb'); // Add ObjectID
const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const Joi = require('joi');

const userSchema = Joi.object({
  ProductName: Joi.string().required(),
  Reviews: Joi.string().required(),
  WorstRatings: Joi.number().required(),
  BestRatings: Joi.number().required(),
});

app.use(cors());
app.use(bodyParser.json());

const uri =
  'mongodb+srv://bhumir:bhumi@cluster0.u0lqlrf.mongodb.net/WeirdThings';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsAllowInvalidCertificates: true,
});

client
  .connect()
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    const database = client.db('WeirdThings');
    const collection = database.collection('List');

    app.get('/', async (req, res) => {
      const result = await collection.find({}).toArray();
      res.json(result);
    });

    app.put('/:id', async (req, res) => {
      const { id } = req.params;
      const { ProductName, Reviews, WorstRatings, BestRatings } = req.body;
      const show = await collection.updateOne(
        { _id: ObjectID(id) }, // Specify the filter using _id
        { $set: { ProductName, Reviews, WorstRatings, BestRatings } }
      );
      res.json(show);
    });

    app.post('/user', async (req, res) => {
      try {
        const { error, value } = userSchema.validate(req.body);
        if (error) {
          console.log(error.details);
          return res.status(400).json({ error: error.details[0].message });
        }
        const { ProductName, Reviews, WorstRatings, BestRatings } = req.body;
        const result = await collection.insertOne({
          ProductName,
          Reviews,
          WorstRatings,
          BestRatings,
        });
        res.json(result);
      } catch (error) {
        console.error('Error processing request', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas', err);
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
