## Google Charts

* Added two charts under research showing the total electrical energy consumption (i.e., sold) and renewable energy production in Florida. The charts were put under the research tab, since presumably they would tie into the motivation/outcomes of the research being conducted in the field. Another logical holding spot would be Energy Economy, since they tie into consumption and production.  
#### Total Electrical Consumption (i.e., sold) Florida
* For electricity consumption, a [LineChart](https://developers.google.com/chart/interactive/docs/gallery/linechart) was chosen as the graph of choice since the data shows how electrical consumption in Florida has changed each year from 1960 to 2016. A LineChart is typically used as a first step in plotting time series data. The area chart would have been a solid choice also (as seen by the renewable chart/graph).
#### Renewable Energy Production Florida
* For renewable energy production, an [AreaChart](https://developers.google.com/chart/interactive/docs/gallery/areachart) was chosen as the graph of choice since the data shows the amount of renewable energy production in Florida from 1960 to 2015.
* Normally, for this kind of data, I would either use an AreaChart or overlay the two graphs on the same chart to show the percentage of energy consumption produced by renewable energy.
#### Responsive design
* In order to make Google Charts responsive, the following jquery routine from [Flo Preynat](http://flopreynat.com/blog/make-google-charts-responsive.html) was added to the code.
```javascript
$(window).resize(function() {
  drawTotalConsumptionChart();
  drawEnergyProductionChart();
});
```
