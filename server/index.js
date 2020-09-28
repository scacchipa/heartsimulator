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

  chartExporter.export(chartDetails, (err, res) => {
    // Get the image data (base64)
    let imageb64 = res.data;
    // Filename of the output
    let outputFile = `./graphs/${req.body.name}.png`;
    // Save the image to file
    fs.writeFileSync(outputFile, imageb64, "base64", function (err) {
      if (err) console.log(err);
    });
    console.log("Saved image!");
    chartExporter.killPool();
  });
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
