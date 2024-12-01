// Directly embed the JSON data
const data = {
"query8":[{"issuedescription":"Issue found in the table","count":33},{"issuedescription":"Issue found in the Filter","count":31},{"issuedescription":"sum(vClaimInformationConsolidated[StatisticalEntity])","count":10},{"issuedescription":"sum(vClaimInformationConsolidated[MNCode_ShadHO])","count":10},{"issuedescription":"unable to create connection: Connector connect error: {0} [11043]:Connector connect error: {0}(Connector connect error: IDataInitialize::GetDataSource. HRESULT \u003d 80004005. ErrorSource: Microsoft OLE DB Provider for SQL Server, ErrorMsg: Cannot open database \"aip_prod_sqldw\" requested by the login. The login failed.)","count":5},{"issuedescription":"{fixedOrders$[Category],Orders$[Sub-Category]:sum(Orders$[Sales])}\u003e153000","count":3},{"issuedescription":"{fixedOrders$[Category],Orders$[Sub-Category]:sum(Orders$[Sales])}","count":3},{"issuedescription":"DATEPART(year, Orders$[Order Date])","count":3},{"issuedescription":"DATEPART(quarter, Orders$[Order Date])","count":3},{"issuedescription":"DATEPART(month, Orders$[Order Date])","count":3},{"issuedescription":"Add(Orders$[Quantity])","count":3},{"issuedescription":" VALUES(VALUES( Orders$[Category],Orders$[Sub-Category,CALCULATE(SUMX(Orders$,Orders$[Sales)[VALUES( Orders$[Category],Orders$[Sub-Category,CALCULATE(SUMX(Orders$,Orders$[Sales)])","count":3},{"issuedescription":"Reference tables is not found in business layer","count":2},{"issuedescription":"Issue found in the Variable","count":2},{"issuedescription":"unable to create connection:","count":1}],
"query9":[{"issuedescription":"Issue found in the table","count":33},{"issuedescription":"Issue found in the Filter","count":31},{"issuedescription":"sum(vClaimInformationConsolidated[StatisticalEntity])","count":10},{"issuedescription":"sum(vClaimInformationConsolidated[MNCode_ShadHO])","count":10},{"issuedescription":"unable to create connection: Connector connect error: {0} [11043]:Connector connect error: {0}(Connector connect error: IDataInitialize::GetDataSource. HRESULT \u003d 80004005. ErrorSource: Microsoft OLE DB Provider for SQL Server, ErrorMsg: Cannot open database \"aip_prod_sqldw\" requested by the login. The login failed.)","count":5},{"issuedescription":"{fixedOrders$[Category],Orders$[Sub-Category]:sum(Orders$[Sales])}\u003e153000","count":3},{"issuedescription":"{fixedOrders$[Category],Orders$[Sub-Category]:sum(Orders$[Sales])}","count":3},{"issuedescription":"DATEPART(year, Orders$[Order Date])","count":3},{"issuedescription":"DATEPART(quarter, Orders$[Order Date])","count":3},{"issuedescription":"DATEPART(month, Orders$[Order Date])","count":3},{"issuedescription":"Add(Orders$[Quantity])","count":3},{"issuedescription":" VALUES(VALUES( Orders$[Category],Orders$[Sub-Category,CALCULATE(SUMX(Orders$,Orders$[Sales)[VALUES( Orders$[Category],Orders$[Sub-Category,CALCULATE(SUMX(Orders$,Orders$[Sales)])","count":3},{"issuedescription":"Reference tables is not found in business layer","count":2},{"issuedescription":"Issue found in the Variable","count":2},{"issuedescription":"unable to create connection:","count":1}],
"query4":[{"no_of_models":1,"track":" To QlikSense"},{"no_of_models":18,"track":"Cognos To QlikSense"},{"no_of_models":1,"track":"cognos to powerbi"},{"no_of_models":1,"track":"cognos to qliksense"},{"no_of_models":13,"track":"mstr to powerbi"},{"no_of_models":1,"track":"mstrtopbi"},{"no_of_models":1,"track":"mstrtopowerbi"},{"no_of_models":41,"track":"obiee to powerbi"},{"no_of_models":68,"track":"qliksense to powerbi"},{"no_of_models":56,"track":"tableau to powerbi"}],
"query5":[{"no_of_models":1,"track":" To QlikSense"},{"no_of_models":18,"track":"Cognos To QlikSense"},{"no_of_models":1,"track":"cognos to powerbi"},{"no_of_models":1,"track":"cognos to qliksense"},{"no_of_models":13,"track":"mstr to powerbi"},{"no_of_models":1,"track":"mstrtopbi"},{"no_of_models":1,"track":"mstrtopowerbi"},{"no_of_models":41,"track":"obiee to powerbi"},{"no_of_models":68,"track":"qliksense to powerbi"},{"no_of_models":56,"track":"tableau to powerbi"}],
"query7":[{"no_of_models":12,"track":"tableau to powerbi"},{"no_of_models":1,"track":"mstrtopbi"},{"no_of_models":14,"track":"qliksense to powerbi"},{"no_of_models":1,"track":"obiee to powerbi"},{"no_of_models":12,"track":"Cognos To QlikSense"},{"no_of_models":14,"track":"cognos to qliksense"},{"no_of_models":11,"track":"cognos to powerbi"}]
};
/*
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
*/

const chartConfigs = [
  { queryKey: "query4", type: "bar", labelField: "track", valueField: "no_of_models", title: "Query 4 - Bar Chart" },
  { queryKey: "query5", type: "bar", labelField: "track", valueField: "no_of_models", title: "Query 5 - Bar Chart" },
  { queryKey: "query7", type: "pie", labelField: "track", valueField: "no_of_models", title: "Query 7 - Pie Chart" },
  { queryKey: "query8", type: "pie", labelField: "issuedescription", valueField: "count", title: "Query 8 - Pie Chart" },
  { queryKey: "query9", type: "pie", labelField: "issuedescription", valueField: "count", title: "Query 9 - Pie Chart" },
];

// Function to render text for card1, card2, card3, and card6
function renderTextCards() {
  // Card 1: Set text from data
  if (data.card1 && data.card1.text) {
    document.querySelector('.card1 p').textContent = data.card1.text;
  }

  // Card 2: Set text from data
  if (data.card2 && data.card2.text) {
    document.querySelector('.card2 p').textContent = data.card2.text;
  }

  // Card 3: Set predefined text and number from JSON
  if (data.card3 && data.card3.text && data.card3.number !== undefined) {
    document.querySelector('.card3 p').textContent = `${data.card3.text} ${data.card3.number}`;
  }

  // Card 6: Set predefined text and number from JSON
  if (data.card6 && data.card6.text && data.card6.number !== undefined) {
    document.querySelector('.card6 p').textContent = `${data.card6.text} ${data.card6.number}`;
  }
}

function truncateText(text, maxlength){
	if(text.length > maxlength){
		return text.substring(0, maxlength) + "...";
	}
}


// Function to render charts dynamically
function renderCharts() {
  chartConfigs.forEach((config, index) => {
    // Get the canvas element based on its ID
    const canvasId = `chart${index + 1}`;
    const canvasElement = document.getElementById(canvasId);

    // Check if the canvas element exists
    if (!canvasElement) {
      console.error(`Canvas element with ID '${canvasId}' not found.`);
      return;
    }

    const ctx = canvasElement.getContext("2d");

    const queryData = data[config.queryKey];
    if (!queryData) {
      console.error(`Query data for ${config.queryKey} not found`);
      return;
    }

    // Extract labels and values based on configuration
    const labels = queryData.map(item => item[config.labelField]);
    const values = queryData.map(item => item[config.valueField]);

    // Render chart using Chart.js
    new Chart(ctx, {
      type: config.type,
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            "#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40", "#c9cbcf"
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.25,
        plugins: {
          legend: {
            display: false // Hide the default legend
          },
          title: {
            display: true,
            text: config.title
          },
          datalabels: {
            color: '#000',
            formatter: (value, context) => {
				const maxlength= 10;
				const label = context.chart.data.labels[context.dataIndex];
				const truncatedLabel = truncateText(label, maxlength);
              return `${truncatedLabel}`;
            },
            font:{
				size: 10
			},
            anchor: 'end',
            align: 'end',
            offset: 5,
            borderColor: '#ccc',
            borderWidth: 0,
            borderRadius: 2,
            padding: 4
          }
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, chartData) {
              const dataset = chartData.datasets[tooltipItem.datasetIndex];
              const currentValue = dataset.data[tooltipItem.index];
              const label = chartData.labels[tooltipItem.index];
              const total = dataset.data.reduce((acc, val) => acc + val, 0);              
              const maxlength = 20;
              const truncatedLabel = truncateText(label, maxlength);
              return `${truncatedLabel}: ${currentValue}`;
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  });
}
// Ensure DOM content is loaded before rendering charts and text
document.addEventListener("DOMContentLoaded", function () {
  renderTextCards();
  renderCharts();
});