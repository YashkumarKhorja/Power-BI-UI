// Directly embed the JSON data
const data = {
  "query3": [
    { "no_of_models": 1, "track": "To QlikSense" },
    { "no_of_models": 18, "track": "Cognos To QlikSense" },
    { "no_of_models": 1, "track": "cognos to powerbi" },
    { "no_of_models": 1, "track": "cognos to qliksense" },
    { "no_of_models": 13, "track": "mstr to powerbi" },
    { "no_of_models": 1, "track": "mstrtopbi" },
    { "no_of_models": 1, "track": "mstrtopowerbi" },
    { "no_of_models": 41, "track": "obiee to powerbi" },
    { "no_of_models": 68, "track": "qliksense to powerbi" },
    { "no_of_models": 56, "track": "tableau to powerbi" },
    { "no_of_models": 1, "track": "track" }
  ]
};

// Extract data for the Pie Chart
const queryKey = "query3"; // Key for your dataset
const jsonData = data[queryKey];

// Map labels and values
const xValues = jsonData.map(item => item.track);
const yValues = jsonData.map(item => item.no_of_models);

// Define colors for the Pie Chart
const barColors = [
  "#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145",
  "#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#ffa600", "#003f5c"
];

// Render the Pie Chart
new Chart("myChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "App Summary by Track"
    }
  },
  
  tooltips: {
      callbacks: {
        // Customize the label for tooltips
        label: function(tooltipItem, chartData) {
          const dataset = chartData.datasets[tooltipItem.datasetIndex];
          const currentValue = dataset.data[tooltipItem.index];
          const label = chartData.labels[tooltipItem.index];
          const percentage = ((currentValue / total) * 100).toFixed(2);
          return `${label}: ${currentValue} models (${percentage}%)`;
        }
      }
    }
  });
