// Function to calculate query3 dynamically
function calculateQuery3() {
  const q1 = data?.query1?.[0]?.count || 0;
  const q2 = data?.query2?.[0]?.count || 0;

  if (q1 === 0 && q2 === 0) {
      console.warn("query1 and query2 counts are zero; cannot calculate query3.");
      return [];
  }

  const q3 = ((q1 / (q1 + q2)) * 100).toFixed(2);
  return [{ label: "Model Conversion %", value: parseFloat(q3) }];
}

// Function to render text for specific boxes
function renderTextCards() {
  const textMappings = {
      1: { label: "Objects Converted", value: data?.query1?.[0]?.count || "No data" },
      2: { label: "Objects Not Converted", value: data?.query2?.[0]?.count || "No data" },
      3: { label: "Model Conversion (%)", value: calculateQuery3()?.[0]?.value || "No data" },
      6: { label: "Time for Model (Min)", value: (data?.query6?.[0]?.count).toFixed(2) || "No data" },
  };

  Object.entries(textMappings).forEach(([box, { label, value }]) => {
      const cardElement = document.querySelector(`.card${box} p`);
      const cardHeading = document.querySelector(`.card${box} h4`);

      if (cardElement && cardHeading) {
          cardHeading.textContent = label;
          cardElement.textContent = value;
      } else {
          console.error(`Card element for box ${box} not found.`);
      }
  });
}

function truncateText(text, maxlength){
	if(text.length > maxlength){
		return text.substring(0, maxlength) + "...";
	}
}

// Function to render charts
function renderCharts() {
  const chartMappings = {
      1: { type: "doughnut", queryKey: "query3", dynamicData: calculateQuery3 },
      2: { type: "bar", queryKey: "query4" },
      3: { type: "bar", queryKey: "query5" },
      4: { type: "pie", queryKey: "query7" },
      5: { type: "pie", queryKey: "query8" },
      6: { type: "pie", queryKey: "query9" },
  };

  Object.entries(chartMappings).forEach(([box, config]) => {
      console.log("chart: ", box, config);
      const canvasId = `chart${box}`;
      console.log("canvas: ", canvasId);
      const canvasElement = document.getElementById(canvasId);
      console.log("canvasElement: ", canvasElement);

      if (!canvasElement) {
          console.error(`Canvas element with ID '${canvasId}' not found for box ${box}.`);
          return;
      }

      const ctx = canvasElement.getContext("2d");

      const queryData = config.dynamicData
          ? config.dynamicData()
          : data[config.queryKey];
      console.log("queryData: ", queryData);

      if (!queryData || queryData.length === 0) {
          console.warn(`No data available for ${config.queryKey}.`);
          return;
      }

      const labels = queryData.map(item => item.label || item[Object.keys(item)[0]]);
      console.log("labels: ", labels);
      const values = queryData.map(item => item.value || item[Object.keys(item)[1]]);
      console.log("values: ", values);

      // new Chart(ctx, {
      //     type: config.type,
      //     data: {
      //         labels: labels,
      //         datasets: [{
      //             data: values,
      //             backgroundColor: [
      //                 "#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40", "#c9cbcf"
      //             ]
      //         }]
      //     },
      //     options: {
      //         responsive: true,
      //         plugins: {
      //             legend: { display: config.type !== "bar" },
      //             title: { display: true, text: `Box ${box}: ${config.queryKey.replace("query", "Query ")}` }
      //         }
      //     }
      // });
      
      new Chart(ctx, {
        type: config.type,
        data: {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: [
              "#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40", "#c9cbcf"
            ]
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
            // title: {
            //   display: true,
            //   text: config.title
            // },
            datalabels: {
              color: '#000',
              formatter: (value, context) => {
                console.log(context);
          const maxlength= 10;
          const label = config.type === 'bar' ? context.dataset.data[context.dataIndex] : context.chart.data.labels[context.dataIndex];
          const truncatedLabel = config.type === 'bar' ? label : truncateText(label, maxlength);
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

// Execute after DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  renderTextCards();
  renderCharts();
});
