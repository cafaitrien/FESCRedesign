//<!--Load the AJAX API-->

// Load the Visualization API and the corechart package.
google.charts.load('current', {
  'packages': ['corechart']
});
google.charts.load("current", {
  packages: ["timeline"]
});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawTotalConsumptionChart);
google.charts.setOnLoadCallback(drawEnergyProductionChart);

function drawTotalConsumptionChart() {
  // TODO load data from csv file or convert to google Sheets and load
  // grab the CSV
  //   $.get("electricity-total-consumption-florida.csv", function(csvString) {
  //   // transform the CSV string into a 2-dimensional array
  //   var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
  //   var data = new google.visualization.arrayToDataTable(arrayData);
  // })
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Billion Btu'],
    [2016, 804283],
    [2015, 803865],
    [2014, 771379],
    [2013, 757189],
    [2012, 752941],
    [2011, 768009],
    [2010, 788887],
    [2009, 766848],
    [2008, 771702],
    [2007, 788461],
    [2006, 778685],
    [2005, 767622],
    [2004, 745810],
    [2003, 741696],
    [2002, 718136],
    [2001, 684966],
    [2000, 668216],
    [1999, 638966],
    [1998, 639254],
    [1997, 597240],
    [1996, 586291],
    [1995, 571483],
    [1994, 544365],
    [1993, 521176],
    [1992, 501598],
    [1991, 499299],
    [1990, 489741],
    [1989, 472473],
    [1988, 444382],
    [1987, 417862],
    [1986, 398095],
    [1985, 379307],
    [1984, 353246],
    [1983, 329216],
    [1982, 315744],
    [1981, 317921],
    [1980, 309694],
    [1979, 295551],
    [1978, 289031],
    [1977, 270767],
    [1976, 252408],
    [1975, 242096],
    [1974, 235482],
    [1973, 237104],
    [1972, 209665],
    [1971, 188564],
    [1970, 171346],
    [1969, 153032],
    [1968, 135509],
    [1967, 119314],
    [1966, 108610],
    [1965, 95878],
    [1964, 87016],
    [1963, 78258],
    [1962, 71216],
    [1961, 62705],
    [1960, 57344]
  ]);

  var options = {
    legend: {
      position: 'none'
    },
    hAxis: {
      format: '####',
      title: 'year',
      titleTextStyle: {bold: 'true', italic: 'false'},
      ticks: [1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015]
    },
    vAxis: {
      title: 'Billion Btu',
      titleTextStyle: {bold: 'true', italic: 'false'},
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById('TotalConsumptionChart'));

  chart.draw(data, options);
}

function drawEnergyProductionChart() {
  // TODO load data from csv file or convert to google Sheets and load
  // grab the CSV
  //   $.get("electricity-total-consumption-florida.csv", function(csvString) {
  //   // transform the CSV string into a 2-dimensional array
  //   var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
  //   var data = new google.visualization.arrayToDataTable(arrayData);
  // })
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Billion Btu'],
    [2015, 234192],
    [2014, 226863],
    [2013, 229666],
    [2012, 220020],
    [2011, 222956],
    [2010, 223518],
    [2009, 213642],
    [2008, 195232],
    [2007, 190489],
    [2006, 185564],
    [2005, 183175],
    [2004, 179462],
    [2003, 188473],
    [2002, 174327],
    [2001, 158038],
    [2000, 194952],
    [1999, 204114],
    [1998, 205485],
    [1997, 231308],
    [1996, 240343],
    [1995, 220211],
    [1994, 215563],
    [1993, 217028],
    [1992, 230779],
    [1991, 212955],
    [1990, 198986],
    [1989, 232261],
    [1988, 113802],
    [1987, 107606],
    [1986, 116356],
    [1985, 110698],
    [1984, 108740],
    [1983, 91705],
    [1982, 104674],
    [1981, 83117],
    [1980, 90049],
    [1979, 69419],
    [1978, 65357],
    [1977, 59953],
    [1976, 56507],
    [1975, 50007],
    [1974, 52429],
    [1973, 56250],
    [1972, 54389],
    [1971, 49968],
    [1970, 51035],
    [1969, 51489],
    [1968, 49556],
    [1967, 44550],
    [1966, 42760],
    [1965, 39916],
    [1964, 39016],
    [1963, 38613],
    [1962, 35826],
    [1961, 34417],
    [1960, 35680]
  ]);

  var options = {
    // TODO: find a good color contrast that maintains theme of site
    // backgroundColor: '#cdc092',
    // colors: ['darkorange'],
    legend: {
      position: 'none'
    },
    hAxis: {
      format: '####',
      title: 'year',
      titleTextStyle: {bold: 'true', italic: 'false'},
      ticks: [1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015]
    },
    vAxis: {
      title: 'Billion Btu',
      titleTextStyle: {bold: 'true', italic: 'false'}
    }
  };

  var chart = new google.visualization.AreaChart(document.getElementById('EnergyProductionChart'));

  chart.draw(data, options);
}

$(window).resize(function() {
  drawTotalConsumptionChart();
  drawEnergyProductionChart();
});
