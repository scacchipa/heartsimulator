const express = require('express')
const cors = require('cors');
const fs = require('fs');

const app = express()
app.use(express.json());
app.use(cors());
const port = 3001

app.post('/', (req, res) => {
  console.log('holis',req.body);
  fs.writeFile('myjsonfile.json', JSON.stringify(req.body), 'utf8', function() {
    console.log('done')
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
