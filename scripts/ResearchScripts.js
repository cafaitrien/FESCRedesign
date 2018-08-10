//<!--Load the AJAX API-->
// key = 2a4b1f1449829c4fe7ec230d3a3726b2
//http://api.eia.gov/series/?api_key=YOUR_API_KEY_HERE&series_id=SEDS.TETCB.FL.A
// Load the Visualization API and the corechart package.
let freshData = [];
let requestUrl0 = "http://api.eia.gov/series/?api_key=2a4b1f1449829c4fe7ec230d3a3726b2&series_id=SEDS.TETCB.FL.A";
let requestUrl1 = "http://api.eia.gov/series/?api_key=2a4b1f1449829c4fe7ec230d3a3726b2&series_id=SEDS.REPRB.FL.A"
let dataEnergyObtained = 'false';
let dataTotalObtained = 'false';
function onDOMLoad() {
  google.charts.load('current', {'packages': ['corechart']});

  google.charts.setOnLoadCallback(drawTotalConsumptionChart);
  google.charts.setOnLoadCallback(drawEnergyProductionChart);
  google.charts.setOnLoadCallback(drawStackedChart(requestUrl0, requestUrl1))
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
    if(request.readyState === 4){
      let response = JSON.parse(request.response);
      callback.call(response.series[0].data)
      // return response.series[0].data;
    }
    // if (flag == 0) {
    //   drawTotalConsumptionChart(response.series[0].data);
    // } else if (flag == 1) {
    //   drawEnergyProductionChart(response.series[0].data);
    // }
  }

  request.error = function(err) {
    console.log("error is: ", err);
    return;
  }
  request.send();
}

function getTwoData(requestUrl, callback) {
  // Create a new request object
  let request = new XMLHttpRequest()
  request.open('GET', requestUrl, true);
  // Callback for when the request completes
  request.onreadystatechange = function() {
    if (request.status !== 200) {
      console.log("Something went wrong: ", request);
      return;
    }

    if(request.readyState === 4){
      let response = JSON.parse(request.response);
      callback.call(response.series[0].data)
      // return response.series[0].data;
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
  // data.addRows(freshData[0]);
  // headerArray = ['Year', 'Billion Btu']
  //  freshData.shift(headerArray);
    // var data = google.visualization.arrayToDataTable(freshData);
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
  if(dataTotalObtained == 'false'){
    getData(requestUrl0, function(){
      freshData.push(this);
      data.addRows(this);
      var chart = new google.visualization.LineChart(document.getElementById('TotalConsumptionChart'));
      chart.draw(data, options);
      dataTotalObtained = 'true';
    });
  } else {
    data.addRows(freshData[0]);
    var chart = new google.visualization.AreaChart(document.getElementById('TotalConsumptionChart'));
    chart.draw(data, options);
  }
}

function drawEnergyProductionChart() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Year');
  data.addColumn('number', 'Total Consumption Chart');
  // let EnergyData = freshData[1];
  // data.addRows(EnergyData);

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
  if(dataEnergyObtained == 'false'){
    getData(requestUrl1, function(){
      freshData.push(this);
      data.addRows(this);
      var chart = new google.visualization.AreaChart(document.getElementById('EnergyProductionChart'));
      chart.draw(data, options);
      dataEnergyObtained = 'true';
    });
  }
  else {
    data.addRows(freshData[1]);
    var chart = new google.visualization.AreaChart(document.getElementById('EnergyProductionChart'));
    chart.draw(data, options);
  }
}

function drawStackedChart(requestUrl0, requestUrl1) {
  // getTwoData(requestUrl0, function(){dog.push(this);});
  console.log(freshData)
  return
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Year');
  data.addColumn('number', 'Total Consumption Chart');
  data.addRows(freshData);

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

  var chart = new google.visualization.AreaChart(document.getElementById('EnergyProductionChart'));

  chart.draw(data, options);
}

$(window).resize(function() {
  // google.charts.setOnLoadCallback(getData(requestUrl0, 0));
  // google.charts.setOnLoadCallback(getData(requestUrl1, 1));
   drawTotalConsumptionChart();
   drawEnergyProductionChart();
});
