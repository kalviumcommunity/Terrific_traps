const express = require('express');
const { MongoClient, ObjectID } = require('mongodb'); // Add ObjectID
const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = Joi.object({
  ProductName: Joi.string().required(),
  Reviews: Joi.string().required(),
  WorstRatings: Joi.number().required(),
  BestRatings: Joi.number().required(),
});

app.use(cors());
app.use(bodyParser.json());
const JWT_SECRET_KEY = 'Bhumi';

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

    app.post('/login', (req, res) => {
      const { email, password } = req.body;

      const token = jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true });
      res.json({ success: "JWT connected successful" });
  });

  function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid token' });
        }
        req.user = decoded;
        next();
    });
  }
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas', err);
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
