# Florida Energy Systems Consortium [Website](http://floridaenergy.ufl.edu/) Redesign Proposal

## Background
* The Florida Energy Systems Consortium (FESC) was created by the Florida State government to promote collaboration among the energy experts at its 12 supported universities to share energy-related expertise. The consortium assists the state in the development and implementation of an environmentally compatible, sustainable, and efficient energy strategic plan. The Consortium was charged to ‘**perform research and development on innovative energy systems that lead to alternative energy strategies, improved energy efficiencies, and expanded economic development for the state**‘. The website is a repository of information related to  the Consortium to keep key stakeholders (e.g., taxpayers, researchers, government officials, researchers, industry, etc) up to date, on for example, research and development progress, resource availability, committee makeup, etc.

## Objective
* The primary objective of the redesign is to make the website more user friendly and responsive. The information on the website should be easy to locate, accessible and easy to digest on a variety of devices.  The information should be user centric such that the user can drill down into obtaining more and not overloaded with information at first.

## State of the Current Website
### Accessibility Audit

## Google Charts

* Added two charts under research showing the total electrical energy consumption (i.e., sold) and renewable energy production in Florida. The charts were put under the research tab, since presumably they would tie into the motivation/outcomes of the research being conducted in the field. Another logical holding spot would be Energy Economy, since they tie into consumption and production.  
#### Total Electrical Consumption (i.e., sold) Florida
* For electricity consumption, a [LineChart](https://developers.google.com/chart/interactive/docs/gallery/linechart) was chosen as the graph of choice since the data shows how electrical consumption in Florida has changed each year from 1960 to 2016. A LineChart is typically used as a first step in plotting time series data in order to visualize trend in the data over time. The area chart would have been a solid choice also (as seen by the renewable chart/graph).
#### Renewable Energy Production Florida
* For renewable energy production, an [AreaChart](https://developers.google.com/chart/interactive/docs/gallery/areachart) was chosen as the graph of choice since the data shows the amount of renewable energy production in Florida from 1960 to 2015. An area chart is related to a line chart, with the area between the horizontal axis and the data being shaded/colored - which can aid in seeing trends in the data over time by providing increased contrast for the data.
* Normally, for this kind of data, I would either use an AreaChart or overlay the two graphs on the same chart to show the percentage of energy consumption produced by renewable energy.
#### Responsive design
* In order to make Google Charts responsive, the following jquery routine from [Flo Preynat](http://flopreynat.com/blog/make-google-charts-responsive.html) was added to the code.
```javascript
$(window).resize(function() {
  drawTotalConsumptionChart();
  drawEnergyProductionChart();
});
```
