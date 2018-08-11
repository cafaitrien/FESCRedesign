//<!--Load the AJAX API-->
// key = 2a4b1f1449829c4fe7ec230d3a3726b2
//http://api.eia.gov/series/?api_key=YOUR_API_KEY_HERE&series_id=SEDS.TETCB.FL.A
// Load the Visualization API and the corechart package.
// naming temporary variables dog and cat
let freshData = [];
let consumptionData = [];
let combinedData = [];
let energyData = [];
let requestUrl0 = "http://api.eia.gov/series/?api_key=2a4b1f1449829c4fe7ec230d3a3726b2&series_id=SEDS.TETCB.FL.A";
let requestUrl1 = "http://api.eia.gov/series/?api_key=2a4b1f1449829c4fe7ec230d3a3726b2&series_id=SEDS.REPRB.FL.A"
let dataEnergyObtained = 'false';
let dataTotalObtained = 'false';
let showCombined = 'false';

function onDOMLoad() {
  google.charts.load('current', {
    'packages': ['corechart']
  });

  google.charts.setOnLoadCallback(drawTotalConsumptionChart);
  google.charts.setOnLoadCallback(drawEnergyProductionChart);
}
document.addEventListener("DOMContentLoaded", onDOMLoad);

function getData(requestUrl, callback) {
  // Create a new request object
  let request = new XMLHttpRequest()
  request.open('GET', requestUrl, true);
  // Callback for when the request completes
  request.onload = function() {
    if (request.status !== 200) {
      console.log("Something went wrong: ", request);
      return;
    }
    let response = JSON.parse(request.response);
    if (request.readyState === 4) {
      let response = JSON.parse(request.response);
      callback.call(response.series[0].data)
    }
  }

  request.error = function(err) {
    console.log("error is: ", err);
    return;
  }
  request.send();
}

function drawTotalConsumptionChart() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Year');
  data.addColumn('number', 'Total Consumption Chart');

  var options = {
    legend: {
      position: 'none'
    },
    hAxis: {
      format: '####',
      direction: -1,
      slantedText: false,
      showTextEvery: 5
    },
    vAxis: {
      title: 'Billion Btu',
      titleTextStyle: {
        bold: 'true',
        italic: 'false'
      },
    }
  };

  if (dataTotalObtained == 'false') {
    getData(requestUrl0, function() {
      freshData.push(this);
      data.addRows(this);
      var chart = new google.visualization.LineChart(document.getElementById('TotalConsumptionChart'));
      chart.draw(data, options);
      dataTotalObtained = 'true';
      if (consumptionData.length < 1) {
        consumptionData.push(this);
        // combinedData.push(this);
        consumptionData = consumptionData[0];
        // combinedData = combinedData[0];
      }
    });
  } else {
    console.log("else", consumptionData[0].length)
    if(consumptionData[0].length > 2){
      for(let i=0;i<consumptionData.length;i++){
        consumptionData[i].pop();
      }
    }
    data.addRows(consumptionData);
    var chart = new google.visualization.LineChart(document.getElementById('TotalConsumptionChart'));
    chart.draw(data, options);
  }
}

function drawEnergyProductionChart() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Year');
  data.addColumn('number', 'Total Consumption Chart');

  var options = {
    // TODO: find a good color contrast that maintains theme of site
    // backgroundColor: '#cdc092',
    // colors: ['darkorange'],
    legend: {
      position: 'none'
    },
    hAxis: {
      format: '####',
      direction: -1,
      slantedText: false,
      showTextEvery: 5
    },
    vAxis: {
      title: 'Billion Btu',
      titleTextStyle: {
        bold: 'true',
        italic: 'false'
      }
    }
  };
  if (dataEnergyObtained == 'false') {
    getData(requestUrl1, function() {
      freshData.push(this);
      data.addRows(this);
      var chart = new google.visualization.AreaChart(document.getElementById('EnergyProductionChart'));
      chart.draw(data, options);
      dataEnergyObtained = 'true';
      if (energyData.length < 1) {
        energyData.push(this);
        energyData = energyData[0];
        // for(let i=0;i<energyData.length;i++){
        //   combinedData[i].push(energyData[i][1])
        // }
      }
    });
  } else {
    console.log(energyData[0].length)
    data.addRows(energyData);
    var chart = new google.visualization.AreaChart(document.getElementById('EnergyProductionChart'));
    chart.draw(data, options);
  }
}

// function mergeData(data1, data2){
//   let i = 0;
//   while(i<57){
//     data1[i].push(data2[i][1])
//     i++;
//   }
// }
function drawStackedChart() {
  console.log("top stack chart", consumptionData[0].length)
   let combinedData = consumptionData;
  // let dog = freshData[1];
  // combinedData = mergeData(combinedData,energyData)
  console.log("after variables", consumptionData[0].length)
  console.log("energy v: ", energyData[0].length)
  // while(i<combinedData.length){
   for (let i=0; i < energyData.length; i++) {
     combinedData[i].push(energyData[i][1])
   }

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Year');
  data.addColumn('number', 'Total Consumption Chart');
  data.addColumn('number', 'Energy Production Chart')
  data.addRows(combinedData);

  var options = {
    // TODO: find a good color contrast that maintains theme of site
    // backgroundColor: '#cdc092',
    // colors: ['darkorange'],
    legend: {
      position: 'none'
    },
    hAxis: {
      format: '####',
      direction: -1,
      slantedText: false,
      showTextEvery: 5
    },
    vAxis: {
      title: 'Billion Btu',
      titleTextStyle: {
        bold: 'true',
        italic: 'false'
      }
    }
  };

  var chart = new google.visualization.AreaChart(document.getElementById('CombinedChart'));
console.log("after chart", consumptionData[0].length)
  chart.draw(data, options);
  console.log("after chart draw", consumptionData[0].length)
}

$(window).resize(function() {
  console.log("resizefunction", consumptionData[0].length)
  drawTotalConsumptionChart();
  drawEnergyProductionChart();
  if (showCombined === 'true') {
    drawStackedChart();
  }
});

function chartView() {
  console.log("chart", consumptionData[0].length)
  let dog = document.getElementById("CombinedChart");
  let cat = document.getElementById("CombinedChartHeader");
  if (document.getElementById("chart-trigger").checked == true) {
    dog.style.display = "block"
    cat.style.display = "block"
    drawStackedChart();
    console.log("after stack", consumptionData[0].length)
    showCombined = 'true';
  } else {
    dog.style.display = "none"
    cat.style.display = "none"
    document.getElementById('CombinedChart').innerHTML = "";
    showCombined = 'false';
  }
}
