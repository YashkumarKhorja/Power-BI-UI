// Path to your JSON file
// const jsonDataPath = "data.json";
// const jsonDataPath = "C:\\Users\\2362858\\OneDrive - Cognizant\\Desktop\\Power-BI-UI\\query1.json";

const COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#48C0C0",
    "#9966FF",
    "#FF9F40",
];
const jsonData = [{"issuedescription":"Issue found in the table","count":33},{"issuedescription":"Issue found in the Filter","count":31},{"issuedescription":"sum(vClaimInformationConsolidated[StatisticalEntity])","count":10},{"issuedescription":"sum(vClaimInformationConsolidated[MNCode_ShadHO])","count":10},{"issuedescription":"unable to create connection: Connector connect error: {0} [11043]:Connector connect error: {0}(Connector connect error: IDataInitialize::GetDataSource. HRESULT \u003d 80004005. ErrorSource: Microsoft OLE DB Provider for SQL Server, ErrorMsg: Cannot open database \"aip_prod_sqldw\" requested by the login. The login failed.)","count":5},{"issuedescription":"{fixedOrders$[Category],Orders$[Sub-Category]:sum(Orders$[Sales])}\u003e153000","count":3},{"issuedescription":"{fixedOrders$[Category],Orders$[Sub-Category]:sum(Orders$[Sales])}","count":3},{"issuedescription":"DATEPART(year, Orders$[Order Date])","count":3},{"issuedescription":"DATEPART(quarter, Orders$[Order Date])","count":3},{"issuedescription":"DATEPART(month, Orders$[Order Date])","count":3},{"issuedescription":"Add(Orders$[Quantity])","count":3},{"issuedescription":" VALUES(VALUES( Orders$[Category],Orders$[Sub-Category,CALCULATE(SUMX(Orders$,Orders$[Sales)[VALUES( Orders$[Category],Orders$[Sub-Category,CALCULATE(SUMX(Orders$,Orders$[Sales)])","count":3},{"issuedescription":"Reference tables is not found in business layer","count":2},{"issuedescription":"Issue found in the Variable","count":2},{"issuedescription":"unable to create connection:","count":1}];
const issues = jsonData.map((item) => item.issuedescription);
const counts = jsonData.map((item) => item.count);
renderPieChart(issues, counts);

// Fetch the JSON data and render the charts
// fetch(jsonDataPath)
//     .then((response) => response.json())
//     .then((data) => {
//         const issues = data.map((item) => item.issuedescription);
//         const counts = data.map((item) => item.count);

//         console.log(issues, counts)

//         renderPieChart(issues, counts);
//         // renderBarChart(issues, counts);
//     })
//     .catch((error) => console.error("Error loading data:", error));

// Function to render Pie Chart
function renderPieChart(labels, data) {
    const ctx = document.getElementById("pieChart").getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Issue Distribution",
                    data: data,
                    // backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                    backgroundColor: COLORS.slice(0, labels.length),
                    borderColor: "#fff",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                    position: "top",
                },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) =>
                            `${tooltipItem.label}: ${tooltipItem.raw}`,
                    },
                },
                // datalabels: {
                //     color: "#fff",
                //     font: {
                //         size: 12,
                //         weight: "bold",
                //     },
                //     formatter: (value, context) => {
                //         const label = context.chart.data.labels[context.dataIndex];
                //         const percentage = (
                //             (value / context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0)) * 100
                //         ).toFixed(1);
                //         return `${label}: ${percentage}%`;
                //     }
                // }
            },
        },
        // plugins: [ChartDataLabels],
    });
}

// Function to render Bar Chart
function renderBarChart(labels, data) {
    const ctx = document.getElementById("barChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Issue Counts",
                    data: data,
                    backgroundColor: "#36A2EB",
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}