//<!--Load the AJAX API-->
// key = 2a4b1f1449829c4fe7ec230d3a3726b2
//http://api.eia.gov/series/?api_key=YOUR_API_KEY_HERE&series_id=SEDS.TETCB.FL.A
// Load the Visualization API and the corechart package.
// naming temporary variables dog and cat
let consumptionData = [];
let combinedData = [];
let energyData = [];
let relativePercentData = [];
let requestUrl0 = "https://api.eia.gov/series/?api_key=2a4b1f1449829c4fe7ec230d3a3726b2&series_id=SEDS.TETCB.FL.A";
let requestUrl1 = "https://api.eia.gov/series/?api_key=2a4b1f1449829c4fe7ec230d3a3726b2&series_id=SEDS.REPRB.FL.A"
let dataEnergyObtained = 'false';
let dataTotalObtained = 'false';
let showCombined = 'false';
let percentCalculated = 'false';

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
  data.addColumn('number', 'Electricity Total Consumption (i.e. Sold) Floridat');

  var options = {
    height: 300,
    chartArea: {left: '8%', width: '88%'},
    legend: {
      position: 'none'
    },
    hAxis: {
      format: '####',
      direction: -1,
      slantedText: false,
      showTextEvery: 10
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
      data.addRows(this);
      var chart = new google.visualization.LineChart(document.getElementById('TotalConsumptionChart'));
      chart.draw(data, options);
      dataTotalObtained = 'true';
      if (consumptionData.length < 1) {
        consumptionData.push(this);
        consumptionData = consumptionData[0];
      }
    });
  } else {
      //error check to ensure that there are 2 columns
      if (consumptionData[0].length > 2) {
        for (let i = 0; i < consumptionData.length; i++) {
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
  data.addColumn('number', 'Renewable Energy Production Florida');

  var options = {
    // TODO: find a good color contrast that maintains theme of site
    // backgroundColor: '#cdc092',
    // colors: ['darkorange'],
    height: 300,
    legend: {
      position: 'none'
    },
    chartArea: {left: '8%', width: '88%'},
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
      data.addRows(this);
      var chart = new google.visualization.AreaChart(document.getElementById('EnergyProductionChart'));
      chart.draw(data, options);
      dataEnergyObtained = 'true';
      if (energyData.length < 1) {
        energyData.push(this);
        energyData = energyData[0];
      }
    });
  } else {
    //error check to ensure that there are 2 columns
    if (energyData[0].length > 2) {
      for (let i = 0; i < energyData.length; i++) {
        energyData[i].pop();
      }
    }
    data.addRows(energyData);
    var chart = new google.visualization.AreaChart(document.getElementById('EnergyProductionChart'));
    chart.draw(data, options);
  }
}

function computePercentageData(Cdata, Edata) {
  let pData = Edata;
  for (let i = 0; i < Edata.length; i++) {
    pData[i][1] = 100*(Edata[i][1]/Cdata[i][1]);
  }
  return pData;
}
function drawStackedChart() {
    if (percentCalculated==='false'){
      relativePercentData = computePercentageData(consumptionData, energyData);
      percentCalculated = 'true';
    }

    combinedData = consumptionData;
    for (let i = 0; i < energyData.length; i++) {
      combinedData[i].push(energyData[i][1]);
    }

  var data = new google.visualization.DataTable();
  var relativeData = new google.visualization.DataTable();
  data.addColumn('string', 'Year');
  data.addColumn('number', 'Total Electric Consumption (i.e. Sold) Florida');
  data.addColumn('number', 'Renewable Energy Production Florida')
  data.addRows(combinedData);

  relativeData.addColumn('string', 'Year');
  relativeData.addColumn('number', 'Percentage of renewable engergy produced to total electrical consumption');
  relativeData.addRows(relativePercentData);
  var options = {
    // TODO: find a good color contrast that maintains theme of site
    // backgroundColor: '#cdc092',
    // colors: ['darkorange'],
    title: 'Combined/stacked graph',
    isStacked: false,
    height: 300,
    legend: {position: 'bottom', maxLines: 3},
    chartArea: {left: '10%', width: '88%'},
    hAxis: {
      format: '####',
      direction: -1,
      slantedText: false,
      showTextEvery: 10
    },
    vAxis: {
      title: 'Billion Btu',
      titleTextStyle: {
        bold: 'true',
        italic: 'false'
      }
    }
  };
  var options2 = {
    title: 'Percentage of renewable energy produced to total electrical consumption in Florida',
    height: 300,
    legend: {position: 'bottom', maxLines: 4},
    chartArea: {left: '10%', width: '88%'},
    hAxis: {
      format: '####',
      direction: -1,
      slantedText: false,
      showTextEvery: 10
    },
    vAxis: {
      title: 'Percent',
      titleTextStyle: {
        bold: 'true',
        italic: 'false'
      }
    }
  };

  var chart = new google.visualization.AreaChart(document.getElementById('CombinedChart'));
  var chart2 = new google.visualization.AreaChart(document.getElementById('RelativePercent'));

  chart.draw(data, options);
  chart2.draw(relativeData, options2)
}

$(window).resize(function() {
  drawTotalConsumptionChart();
  drawEnergyProductionChart();
  if (showCombined === 'true') {
    drawStackedChart();
  }
});

function chartView() {
  let dog = document.getElementById("CombinedChart");
  let cat = document.getElementById("CombinedChartHeader");
  let horse = document.getElementById("RelativePercent");
  RelativePercent
  if (document.getElementById("chart-trigger").checked == true) {
    dog.style.display = "block"
    cat.style.display = "block"
    horse.style.display = "block"
    drawStackedChart();
    showCombined = 'true';
  } else {
    dog.style.display = "none"
    cat.style.display = "none"
    horse.style.display = 'none'
    document.getElementById('CombinedChart').innerHTML = "";
    showCombined = 'false';
  }
}
