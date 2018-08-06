# Florida Energy Systems Consortium [Website](http://floridaenergy.ufl.edu/) Redesign Proposal

## Background
* The Florida Energy Systems Consortium (FESC) was created by the Florida State government to promote collaboration among the energy experts at its 12 supported universities to share energy-related expertise. The consortium assists the state in the development and implementation of an environmentally compatible, sustainable, and efficient energy strategic plan. The Consortium was charged to ‘**perform research and development on innovative energy systems that lead to alternative energy strategies, improved energy efficiencies, and expanded economic development for the state**‘. The website is a repository of information related to  the Consortium to keep key stakeholders (e.g., taxpayers, researchers, government officials, researchers, industry, etc) up to date, on for example, research and development progress, resource availability, committee makeup, etc.

![Image of FESC Homepage](/SiteEvaluation/WebsiteLandingPage.png)
## Objective
* The primary objective of the redesign is to make the website more user friendly and responsive. The information on the website should be easy to locate, accessible and easy to digest on a variety of devices.  The information should be user centric such that the user can drill down into obtaining more and not overloaded with information at first.

## State of the Current Website
* The website uses two different navigation bars to direct you throughout the website. A top horizontal navigation bar directs you to a specific search area (e.g., Home, FESC Research, etc), while a vertical navigation bar on the right provides information related to the topic selected with the horizontal navigation bar. This style of navigation construction is confusing and not intuitive to the end user. For instance, as illustrated above, the user can click contact us in the upper righthand corner or the lower lefthand corner.  The content of the website itself, while informative is old and appears to be an “information dump” as opposed to a repository of information designed to educate the end user of the website.  For instance, under Solar, it would be helpful to first give a high level overview of solar power and then discuss current research projects – as opposed to jumping straight into completed research projects. The search bar at the top, while potentially useful needs a modern update, so that when you search, e.g., “David Norton”, the top entry is the contact card for David Norton, Interim Director and not an entry related to the 2017 FESC/Polytech conference.  Overall, the website has a lot of information, but is very frustrating to use.  The current theme does a disservice to the various stakeholders in the project – due to for instance, not clearly and concisely discussing the subject matter, introducing the subject matter, maintaining consistency across the multiple tabs, etc.  In addition, the website is not responsive.

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
