const express = require('express')
const chartExporter = require("highcharts-export-server");
const cors = require('cors');
const fs = require('fs');

const app = express()
app.use(express.json());
app.use(cors());
const port = 3000

app.post('/', (req, res) => {
  console.log(req.body);
  let outputFile = `./graphs/${Date.now()}.png`;

  // Chart details object specifies chart type and data to plot
  const chartDetails = {
    type: "png",
    // scale: 1,
    options: {
      chart: {
        type: "line"
      },
      title: {
        text: "Spread | Normal cell"
      },
      "series": [
        {
          "data": req.body.data,
          "type": "line",
        },
      ]
    }

  };
  // Initialize the exporter
  chartExporter.initPool();

  chartExporter.export(chartDetails, async (req ,phantom_res, err) => {
    // Get the image data (base64)
    let imageb64 = phantom_res.data;
    // Filename of the output
    // Save the image to file
    await fs.writeFileSync(outputFile, imageb64, "base64", function (err) {
      if (err) console.log(err);
    })
    
    chartExporter.killPool();    
    res.status(200).json({status:outputFile});
    console.log("Saved image!");
  });

})

app.get('/download', function(req, res){
  const file = req.query.file;
  res.download(file); // Set disposition and send it.
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
