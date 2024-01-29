const express = require('express')
const apply = express()
const port = 7700

const weird_things =[
  {
    "S.No": 1,
    "Product Name": "Canned Unicorn Meat",
    "Reviews": "Disgusting",
    "Worst-Ratings": -2,
    "Best-Ratings": 6
  },
  {
    "S.No": 2,
    "Product Name": "Cat Butt Tissue Holder",
    "Reviews": "Funny",
    "Worst-Ratings": 1,
    "Best-Ratings": 4
  },
  {
    "S.No": 3,
    "Product Name": "Frozen Smoke",
    "Reviews": "Strange",
    "Worst-Ratings": 2,
    "Best-Ratings": 4
  }
]


apply.use(express.json())

apply.get('/', (req, res) => {
  res.send(weird_things)
})

apply.post('/', (req, res) => {
  const create = req.body
  weird_things.push(create)
  res.send(weird_things)
})

apply.put('/:index', (req, res) => {
  const index  = parseInt(req.params.index)
  const update= req.body
  weird_things[index] = update
  res.json(weird_things)
})

apply.delete('/:index', (req, res) => {
  const  index = parseInt(req.params.index)
  weird_things.splice(index, 1)
  res.json(weird_things)
})

apply.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

module.exports = apply