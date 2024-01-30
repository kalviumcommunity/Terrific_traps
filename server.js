const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send("Server is working hurray😊");
});
app.listen(8080,()=>{
  console.log("Seems like port 8080 is working");
})
