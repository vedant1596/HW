function buildMetadata(sample) {
  var sampleMetadata = d3.json(`/metadata/${sample}`)
  d3.select('#sample-metadata').html('')

  sampleMetadata.then(function (data) {
    var data = data;
    Object.entries(data).forEach(([key, value]) => {
      d3.select('#sample-metadata')
        .append('div')
        .text(`${key}: ${value}`);
    });
  })
  // BONUS: Build the Gauge Chart
  // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  var samplePlotdata = d3.json(`/samples/${sample}`)
  // @TODO: Build a Bubble Chart using the sample data
  samplePlotdata.then(function (data) { // Bubble Plot
    console.log(data);

    var bubbleData = [{
      x: data.otu_ids,
      y: data.sample_values,
      mode: 'markers',
      marker: {
        size: data.sample_values,
        color: data.otu_ids
      },
      textinfo: data.otu_labels
    }]

    var bubbleLayout = {
      height: 500,
      width: 1200
    };
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
  });


  // @TODO: Build a Pie Chart

  samplePlotdata.then(function (data) { // Pie Chart
    var data = data;
    var values = data.sample_values.slice(0, 10);
    var labels = data.otu_ids.slice(0, 10);
    var pieHoverinfo = data.otu_labels.slice(0, 10);
    console.log(values);
    console.log(labels);

    var pieData = [{
      values: values,
      labels: labels,
      type: 'pie',
      hoverinfo: pieHoverinfo
    }];

    var pieLayout = {
      showlegend: true,
      height: 600,
      width: 600
    };

    Plotly.newPlot('pie', pieData, pieLayout);
  });
};



function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

