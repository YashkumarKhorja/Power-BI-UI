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
  return text;
}

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
      const canvasId = `chart${box}`;
      const canvasElement = document.getElementById(canvasId);
      
      if (!canvasElement) {
          console.error(`Canvas element with ID '${canvasId}' not found for box ${box}.`);
          return;
      }

      const ctx = canvasElement.getContext("2d");

      let queryData = config.dynamicData
          ? config.dynamicData()
          : data[config.queryKey];
      
      if (!queryData || queryData.length === 0) {
          console.warn(`No data available for ${config.queryKey}.`);
          return;
      }

      if (config.type === "bar") {
        queryData = queryData.sort((a, b) => {
          return b[Object.keys(b)[1]] - a[Object.keys(a)[1]];
        });
      }

      const labels = queryData.map(item => {
        if(isNaN(item[Object.keys(item)[0]])){
          return item.label || item[Object.keys(item)[0]];
        } else {
          return item.label || item[Object.keys(item)[1]];
        }
      });
      
      const values = queryData.map(item => {
        if(!isNaN(item[Object.keys(item)[1]])){
          return item.value || item[Object.keys(item)[1]];
        } else{
          return item.value || item[Object.keys(item)[0]];
        }
      });
    
    if (config.type === 'doughnut') {
      const total = 100;
      const currentValue = values.reduce((acc, val) => acc + val, 0);
      const remainingValue = total - currentValue;

      if (remainingValue > 0) {
        labels.push("Remaining");
        values.push(remainingValue);
      }
    }
      new Chart(ctx, {
        type: config.type,
        data: {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: [
              "#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40", "#c9cbcf", "#e0e0e0"
            ],
          borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: config.type === 'pie' ? 1.30 : config.type === 'bar' ? 1.5 : config.type === 'doughnut' ? 1.15 : 1.5,
          cutout: config.type === 'doughnut' ? '60%' : undefined, 
          rotation: config.type === 'doughnut' ? -90  : undefined, 
          circumference: config.type === 'doughnut' ? 180 : undefined, 
          layout: config.type === 'pie' ? {
            padding: {
              top: 30, 
              bottom: 30, 
            } } : config.type === 'bar' ? {
              padding: {
            top: 15, 
          }
        } : undefined,
          plugins: {
            legend: {
              display: false 
            },
            datalabels: {
              display: config.type !== 'doughnut',
              color: '#000',
              formatter: (value, context) => {
                const maxlength= 10;
                const label = config.type === ('bar' || 'doughnut') ? context.dataset.data[context.dataIndex] : context.chart.data.labels[context.dataIndex];
                const truncatedLabel = config.type === ('bar' || 'doughnut') ? label : truncateText(label, maxlength);
                return `${truncatedLabel}`;
              },
              font:{
                size: 10
              },
              anchor: 'end',
              align: 'end',
              offset: 2,
              borderColor: '#ccc',
              borderWidth: 0,
              borderRadius: 2,
              padding: 8,
            }
          },
          scales: config.type === 'bar' ? {
            x: {
              ticks: {
                maxRotation: 180,
                callback: function(value){
                  const label = labels[value];
                  const maxlength = 1;
                  return truncateText(label, maxlength);
                }
              }
            }
          } :  undefined,
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

document.addEventListener("DOMContentLoaded", function () {
  renderTextCards();
  renderCharts();
});
