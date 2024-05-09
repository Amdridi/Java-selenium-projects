/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 10.0, "series": [{"data": [[0.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-8", "isController": false}, {"data": [[0.0, 7.0], [100.0, 3.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-7", "isController": false}, {"data": [[0.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-11", "isController": false}, {"data": [[0.0, 7.0], [100.0, 3.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-6", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-10", "isController": false}, {"data": [[0.0, 7.0], [100.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-5", "isController": false}, {"data": [[0.0, 5.0], [100.0, 5.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-9", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-20", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-21", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-22", "isController": false}, {"data": [[14600.0, 1.0], [14700.0, 2.0], [14900.0, 1.0], [15100.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[300.0, 4.0], [200.0, 5.0], [400.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-0", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-4", "isController": false}, {"data": [[0.0, 5.0], [100.0, 5.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-3", "isController": false}, {"data": [[0.0, 6.0], [100.0, 4.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-2", "isController": false}, {"data": [[600.0, 1.0], [700.0, 8.0], [800.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-1", "isController": false}, {"data": [[0.0, 5.0], [2300.0, 1.0], [2800.0, 1.0], [3500.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-22", "isController": false}, {"data": [[0.0, 5.0], [100.0, 1.0], [200.0, 2.0], [400.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-20", "isController": false}, {"data": [[0.0, 5.0], [300.0, 2.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-21", "isController": false}, {"data": [[0.0, 1.0], [300.0, 2.0], [100.0, 6.0], [400.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-8", "isController": false}, {"data": [[0.0, 3.0], [100.0, 7.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-10", "isController": false}, {"data": [[0.0, 2.0], [1200.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [400.0, 1.0], [800.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-9", "isController": false}, {"data": [[0.0, 4.0], [100.0, 6.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-11", "isController": false}, {"data": [[0.0, 4.0], [1100.0, 1.0], [1200.0, 1.0], [700.0, 1.0], [100.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-6", "isController": false}, {"data": [[0.0, 2.0], [100.0, 8.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-12", "isController": false}, {"data": [[0.0, 5.0], [1100.0, 1.0], [600.0, 2.0], [1200.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-7", "isController": false}, {"data": [[0.0, 5.0], [100.0, 5.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-13", "isController": false}, {"data": [[0.0, 5.0], [600.0, 1.0], [900.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-4", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-14", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [400.0, 2.0], [100.0, 2.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-5", "isController": false}, {"data": [[0.0, 8.0], [100.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-15", "isController": false}, {"data": [[0.0, 3.0], [700.0, 2.0], [100.0, 2.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-2", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-16", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0], [6700.0, 1.0], [6900.0, 1.0], [7000.0, 1.0], [7300.0, 1.0], [7400.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-3", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-17", "isController": false}, {"data": [[300.0, 3.0], [6100.0, 1.0], [5900.0, 1.0], [6200.0, 1.0], [800.0, 1.0], [6400.0, 1.0], [400.0, 1.0], [6500.0, 1.0], [200.0, 2.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-0", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-18", "isController": false}, {"data": [[1200.0, 1.0], [600.0, 3.0], [1400.0, 1.0], [700.0, 2.0], [1500.0, 1.0], [400.0, 5.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-1", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-19", "isController": false}, {"data": [[0.0, 5.0], [1500.0, 1.0], [1600.0, 3.0], [2000.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-19", "isController": false}, {"data": [[2100.0, 1.0], [0.0, 5.0], [1700.0, 2.0], [1800.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-17", "isController": false}, {"data": [[0.0, 3.0], [1100.0, 2.0], [1300.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-18", "isController": false}, {"data": [[2100.0, 3.0], [0.0, 5.0], [2200.0, 1.0], [2400.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-15", "isController": false}, {"data": [[0.0, 5.0], [1500.0, 1.0], [1600.0, 1.0], [1700.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-16", "isController": false}, {"data": [[0.0, 4.0], [2300.0, 1.0], [2400.0, 1.0], [2500.0, 1.0], [2600.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-13", "isController": false}, {"data": [[0.0, 5.0], [1600.0, 1.0], [1700.0, 1.0], [1800.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-14", "isController": false}, {"data": [[2200.0, 2.0], [2500.0, 1.0], [2700.0, 1.0], [3300.0, 1.0], [100.0, 5.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-11", "isController": false}, {"data": [[2100.0, 1.0], [0.0, 1.0], [100.0, 4.0], [1800.0, 2.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-12", "isController": false}, {"data": [[1100.0, 1.0], [1500.0, 1.0], [800.0, 1.0], [1600.0, 1.0], [100.0, 5.0], [1000.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-10", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-20", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-21", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-7", "isController": false}, {"data": [[0.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-8", "isController": false}, {"data": [[0.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-9", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-3", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-4", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-5", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-6", "isController": false}, {"data": [[600.0, 3.0], [700.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-0", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-1", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-2", "isController": false}, {"data": [[1100.0, 1.0], [9500.0, 1.0], [9400.0, 2.0], [9300.0, 1.0], [1200.0, 3.0], [9900.0, 1.0], [1400.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte", "isController": false}, {"data": [[300.0, 3.0], [400.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/module/ets_sociallogin/oauth", "isController": false}, {"data": [[1200.0, 5.0], [1300.0, 2.0], [1400.0, 2.0], [1500.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-17", "isController": false}, {"data": [[900.0, 3.0], [1000.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-16", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-19", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-18", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-13", "isController": false}, {"data": [[0.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-12", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-15", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-14", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 15100.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 66.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 465.0, "series": [{"data": [[0.0, 465.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 79.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 66.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.68027582E12, "maxY": 4.586776859504134, "series": [{"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-16", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-6", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-28", "isController": false}, {"data": [[1.68027582E12, 4.586776859504134]], "isOverall": false, "label": "Thread Group", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-5", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-22", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68027582E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 18.0, "minX": 0.0, "maxY": 15176.0, "series": [{"data": [[4.0, 138.0], [2.0, 118.0], [1.0, 113.0], [5.0, 124.83333333333334], [3.0, 114.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-8", "isController": false}, {"data": [[3.9999999999999996, 123.19999999999999]], "isOverall": false, "label": "https://pharma-shop.tn/identite-8-Aggregated", "isController": false}, {"data": [[4.0, 37.0], [2.0, 45.0], [1.0, 54.0], [5.0, 65.83333333333333], [3.0, 101.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-7", "isController": false}, {"data": [[3.9999999999999996, 63.2]], "isOverall": false, "label": "https://pharma-shop.tn/identite-7-Aggregated", "isController": false}, {"data": [[5.0, 106.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-11", "isController": false}, {"data": [[5.0, 106.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-11-Aggregated", "isController": false}, {"data": [[4.0, 38.0], [2.0, 42.0], [1.0, 37.0], [5.0, 84.66666666666667], [3.0, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-6", "isController": false}, {"data": [[3.9999999999999996, 66.2]], "isOverall": false, "label": "https://pharma-shop.tn/identite-6-Aggregated", "isController": false}, {"data": [[5.0, 80.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-10", "isController": false}, {"data": [[5.0, 80.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-10-Aggregated", "isController": false}, {"data": [[4.0, 35.0], [2.0, 50.0], [1.0, 48.0], [5.0, 76.66666666666667], [3.0, 101.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-5", "isController": false}, {"data": [[3.9999999999999996, 69.39999999999999]], "isOverall": false, "label": "https://pharma-shop.tn/identite-5-Aggregated", "isController": false}, {"data": [[4.0, 100.0], [2.0, 116.0], [1.0, 113.0], [5.0, 89.83333333333333], [3.0, 36.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-9", "isController": false}, {"data": [[3.9999999999999996, 90.39999999999999]], "isOverall": false, "label": "https://pharma-shop.tn/identite-9-Aggregated", "isController": false}, {"data": [[4.0, 40.0], [2.0, 50.0], [1.0, 49.0], [5.0, 39.5], [3.0, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-20", "isController": false}, {"data": [[3.9999999999999996, 41.3]], "isOverall": false, "label": "https://pharma-shop.tn/identite-20-Aggregated", "isController": false}, {"data": [[4.0, 31.0], [2.0, 117.0], [1.0, 40.0], [5.0, 34.166666666666664], [3.0, 33.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-21", "isController": false}, {"data": [[3.9999999999999996, 42.599999999999994]], "isOverall": false, "label": "https://pharma-shop.tn/identite-21-Aggregated", "isController": false}, {"data": [[4.0, 34.0], [2.0, 39.0], [1.0, 37.0], [5.0, 48.666666666666664], [3.0, 36.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-22", "isController": false}, {"data": [[3.9999999999999996, 43.800000000000004]], "isOverall": false, "label": "https://pharma-shop.tn/identite-22-Aggregated", "isController": false}, {"data": [[4.0, 14661.0], [2.0, 14751.0], [1.0, 15176.0], [5.0, 14902.0], [3.0, 14790.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[3.0, 14856.0]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[4.0, 271.0], [2.0, 352.0], [1.0, 279.0], [5.0, 312.5], [3.0, 361.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-0", "isController": false}, {"data": [[3.9999999999999996, 313.8]], "isOverall": false, "label": "https://pharma-shop.tn/identite-0-Aggregated", "isController": false}, {"data": [[4.0, 18.0], [2.0, 22.0], [1.0, 26.0], [5.0, 28.666666666666668], [3.0, 23.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-4", "isController": false}, {"data": [[3.9999999999999996, 26.1]], "isOverall": false, "label": "https://pharma-shop.tn/identite-4-Aggregated", "isController": false}, {"data": [[4.0, 37.0], [2.0, 46.0], [1.0, 54.0], [5.0, 97.66666666666667], [3.0, 103.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-3", "isController": false}, {"data": [[3.9999999999999996, 82.6]], "isOverall": false, "label": "https://pharma-shop.tn/identite-3-Aggregated", "isController": false}, {"data": [[4.0, 60.0], [2.0, 47.0], [1.0, 49.0], [5.0, 90.83333333333333], [3.0, 135.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-2", "isController": false}, {"data": [[3.9999999999999996, 83.6]], "isOverall": false, "label": "https://pharma-shop.tn/identite-2-Aggregated", "isController": false}, {"data": [[4.0, 707.0], [2.0, 805.0], [1.0, 790.0], [5.0, 740.0], [3.0, 766.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-1", "isController": false}, {"data": [[3.9999999999999996, 750.8]], "isOverall": false, "label": "https://pharma-shop.tn/identite-1-Aggregated", "isController": false}, {"data": [[5.0, 1448.4]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-22", "isController": false}, {"data": [[5.0, 1448.4]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-22-Aggregated", "isController": false}, {"data": [[5.0, 189.3]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-20", "isController": false}, {"data": [[5.0, 189.3]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-20-Aggregated", "isController": false}, {"data": [[5.0, 155.49999999999997]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-21", "isController": false}, {"data": [[5.0, 155.49999999999997]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-21-Aggregated", "isController": false}, {"data": [[5.0, 200.6]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-8", "isController": false}, {"data": [[5.0, 200.6]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-8-Aggregated", "isController": false}, {"data": [[4.0, 137.0], [2.0, 139.0], [1.0, 114.0], [5.0, 86.83333333333333], [3.0, 36.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-10", "isController": false}, {"data": [[3.9999999999999996, 94.7]], "isOverall": false, "label": "https://pharma-shop.tn/identite-10-Aggregated", "isController": false}, {"data": [[5.0, 534.8]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-9", "isController": false}, {"data": [[5.0, 534.8]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-9-Aggregated", "isController": false}, {"data": [[4.0, 104.0], [2.0, 135.0], [1.0, 114.0], [5.0, 83.0], [3.0, 96.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-11", "isController": false}, {"data": [[3.9999999999999996, 94.7]], "isOverall": false, "label": "https://pharma-shop.tn/identite-11-Aggregated", "isController": false}, {"data": [[5.0, 450.29999999999995]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-6", "isController": false}, {"data": [[5.0, 450.29999999999995]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-6-Aggregated", "isController": false}, {"data": [[4.0, 119.0], [2.0, 115.0], [1.0, 125.0], [5.0, 99.0], [3.0, 129.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-12", "isController": false}, {"data": [[3.9999999999999996, 108.19999999999999]], "isOverall": false, "label": "https://pharma-shop.tn/identite-12-Aggregated", "isController": false}, {"data": [[5.0, 479.79999999999995]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-7", "isController": false}, {"data": [[5.0, 479.79999999999995]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-7-Aggregated", "isController": false}, {"data": [[4.0, 98.0], [2.0, 128.0], [1.0, 117.0], [5.0, 85.83333333333333], [3.0, 35.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-13", "isController": false}, {"data": [[3.9999999999999996, 89.30000000000001]], "isOverall": false, "label": "https://pharma-shop.tn/identite-13-Aggregated", "isController": false}, {"data": [[5.0, 379.9]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-4", "isController": false}, {"data": [[5.0, 379.9]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-4-Aggregated", "isController": false}, {"data": [[4.0, 39.0], [2.0, 39.0], [1.0, 52.0], [5.0, 52.833333333333336], [3.0, 40.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-14", "isController": false}, {"data": [[3.9999999999999996, 48.7]], "isOverall": false, "label": "https://pharma-shop.tn/identite-14-Aggregated", "isController": false}, {"data": [[5.0, 311.20000000000005]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-5", "isController": false}, {"data": [[5.0, 311.20000000000005]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-5-Aggregated", "isController": false}, {"data": [[4.0, 43.0], [2.0, 41.0], [1.0, 82.0], [5.0, 73.33333333333333], [3.0, 39.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-15", "isController": false}, {"data": [[3.9999999999999996, 64.5]], "isOverall": false, "label": "https://pharma-shop.tn/identite-15-Aggregated", "isController": false}, {"data": [[5.0, 382.4]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-2", "isController": false}, {"data": [[5.0, 382.4]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-2-Aggregated", "isController": false}, {"data": [[4.0, 111.0], [2.0, 37.0], [1.0, 73.0], [5.0, 43.0], [3.0, 39.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-16", "isController": false}, {"data": [[3.9999999999999996, 51.8]], "isOverall": false, "label": "https://pharma-shop.tn/identite-16-Aggregated", "isController": false}, {"data": [[5.0, 3586.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-3", "isController": false}, {"data": [[5.0, 3586.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-3-Aggregated", "isController": false}, {"data": [[4.0, 39.0], [2.0, 40.0], [1.0, 121.0], [5.0, 42.66666666666667], [3.0, 36.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-17", "isController": false}, {"data": [[3.9999999999999996, 49.199999999999996]], "isOverall": false, "label": "https://pharma-shop.tn/identite-17-Aggregated", "isController": false}, {"data": [[0.0, 6288.6], [5.0, 492.90000000000003]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-0", "isController": false}, {"data": [[3.333333333333333, 2424.8000000000006]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-0-Aggregated", "isController": false}, {"data": [[4.0, 38.0], [2.0, 47.0], [1.0, 65.0], [5.0, 53.333333333333336], [3.0, 38.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-18", "isController": false}, {"data": [[3.9999999999999996, 50.8]], "isOverall": false, "label": "https://pharma-shop.tn/identite-18-Aggregated", "isController": false}, {"data": [[0.0, 447.2], [5.0, 970.6]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-1", "isController": false}, {"data": [[3.333333333333333, 796.1333333333332]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-1-Aggregated", "isController": false}, {"data": [[4.0, 36.0], [2.0, 51.0], [1.0, 60.0], [5.0, 38.666666666666664], [3.0, 35.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-19", "isController": false}, {"data": [[3.9999999999999996, 41.400000000000006]], "isOverall": false, "label": "https://pharma-shop.tn/identite-19-Aggregated", "isController": false}, {"data": [[5.0, 868.5]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-19", "isController": false}, {"data": [[5.0, 868.5]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-19-Aggregated", "isController": false}, {"data": [[5.0, 954.6999999999999]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-17", "isController": false}, {"data": [[5.0, 954.6999999999999]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-17-Aggregated", "isController": false}, {"data": [[5.0, 705.1000000000001]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-18", "isController": false}, {"data": [[5.0, 705.1000000000001]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-18-Aggregated", "isController": false}, {"data": [[5.0, 1142.9]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-15", "isController": false}, {"data": [[5.0, 1142.9]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-15-Aggregated", "isController": false}, {"data": [[5.0, 892.9]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-16", "isController": false}, {"data": [[5.0, 892.9]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-16-Aggregated", "isController": false}, {"data": [[5.0, 1295.6000000000001]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-13", "isController": false}, {"data": [[5.0, 1295.6000000000001]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-13-Aggregated", "isController": false}, {"data": [[5.0, 923.4000000000002]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-14", "isController": false}, {"data": [[5.0, 923.4000000000002]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-14-Aggregated", "isController": false}, {"data": [[5.0, 1375.1999999999998]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-11", "isController": false}, {"data": [[5.0, 1375.1999999999998]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-11-Aggregated", "isController": false}, {"data": [[5.0, 1047.6]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-12", "isController": false}, {"data": [[5.0, 1047.6]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-12-Aggregated", "isController": false}, {"data": [[5.0, 681.5]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-10", "isController": false}, {"data": [[5.0, 681.5]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-10-Aggregated", "isController": false}, {"data": [[5.0, 50.8]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-20", "isController": false}, {"data": [[5.0, 50.8]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-20-Aggregated", "isController": false}, {"data": [[5.0, 35.6]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-21", "isController": false}, {"data": [[5.0, 35.6]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-21-Aggregated", "isController": false}, {"data": [[5.0, 103.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-7", "isController": false}, {"data": [[5.0, 103.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-7-Aggregated", "isController": false}, {"data": [[5.0, 77.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-8", "isController": false}, {"data": [[5.0, 77.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-8-Aggregated", "isController": false}, {"data": [[5.0, 84.6]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-9", "isController": false}, {"data": [[5.0, 84.6]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-9-Aggregated", "isController": false}, {"data": [[5.0, 20.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-3", "isController": false}, {"data": [[5.0, 20.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-3-Aggregated", "isController": false}, {"data": [[5.0, 64.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-4", "isController": false}, {"data": [[5.0, 64.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-4-Aggregated", "isController": false}, {"data": [[5.0, 50.6]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-5", "isController": false}, {"data": [[5.0, 50.6]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-5-Aggregated", "isController": false}, {"data": [[5.0, 89.8]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-6", "isController": false}, {"data": [[5.0, 89.8]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-6-Aggregated", "isController": false}, {"data": [[5.0, 697.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-0", "isController": false}, {"data": [[5.0, 697.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-0-Aggregated", "isController": false}, {"data": [[5.0, 98.2]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-1", "isController": false}, {"data": [[5.0, 98.2]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-1-Aggregated", "isController": false}, {"data": [[5.0, 80.8]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-2", "isController": false}, {"data": [[5.0, 80.8]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-2-Aggregated", "isController": false}, {"data": [[5.0, 5402.0999999999985]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte", "isController": false}, {"data": [[5.0, 5402.0999999999985]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-Aggregated", "isController": false}, {"data": [[5.0, 405.4]], "isOverall": false, "label": "https://pharma-shop.tn/module/ets_sociallogin/oauth", "isController": false}, {"data": [[5.0, 405.4]], "isOverall": false, "label": "https://pharma-shop.tn/module/ets_sociallogin/oauth-Aggregated", "isController": false}, {"data": [[4.0, 1251.0], [2.0, 1478.0], [1.0, 1356.0], [5.0, 1333.3333333333333], [3.0, 1362.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite", "isController": false}, {"data": [[3.9999999999999996, 1344.6999999999998]], "isOverall": false, "label": "https://pharma-shop.tn/identite-Aggregated", "isController": false}, {"data": [[5.0, 37.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-17", "isController": false}, {"data": [[5.0, 37.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-17-Aggregated", "isController": false}, {"data": [[5.0, 957.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account", "isController": false}, {"data": [[5.0, 957.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-Aggregated", "isController": false}, {"data": [[5.0, 37.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-16", "isController": false}, {"data": [[5.0, 37.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-16-Aggregated", "isController": false}, {"data": [[5.0, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-19", "isController": false}, {"data": [[5.0, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-19-Aggregated", "isController": false}, {"data": [[5.0, 41.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-18", "isController": false}, {"data": [[5.0, 41.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-18-Aggregated", "isController": false}, {"data": [[5.0, 62.6]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-13", "isController": false}, {"data": [[5.0, 62.6]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-13-Aggregated", "isController": false}, {"data": [[5.0, 97.6]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-12", "isController": false}, {"data": [[5.0, 97.6]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-12-Aggregated", "isController": false}, {"data": [[5.0, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-15", "isController": false}, {"data": [[5.0, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-15-Aggregated", "isController": false}, {"data": [[5.0, 63.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-14", "isController": false}, {"data": [[5.0, 63.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-14-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 22926.933333333334, "minX": 1.68027582E12, "maxY": 607877.3166666667, "series": [{"data": [[1.68027582E12, 607877.3166666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.68027582E12, 22926.933333333334]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68027582E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 20.0, "minX": 1.68027582E12, "maxY": 14856.0, "series": [{"data": [[1.68027582E12, 123.19999999999999]], "isOverall": false, "label": "https://pharma-shop.tn/identite-8", "isController": false}, {"data": [[1.68027582E12, 63.2]], "isOverall": false, "label": "https://pharma-shop.tn/identite-7", "isController": false}, {"data": [[1.68027582E12, 106.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-11", "isController": false}, {"data": [[1.68027582E12, 66.2]], "isOverall": false, "label": "https://pharma-shop.tn/identite-6", "isController": false}, {"data": [[1.68027582E12, 80.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-10", "isController": false}, {"data": [[1.68027582E12, 69.39999999999999]], "isOverall": false, "label": "https://pharma-shop.tn/identite-5", "isController": false}, {"data": [[1.68027582E12, 90.39999999999999]], "isOverall": false, "label": "https://pharma-shop.tn/identite-9", "isController": false}, {"data": [[1.68027582E12, 41.3]], "isOverall": false, "label": "https://pharma-shop.tn/identite-20", "isController": false}, {"data": [[1.68027582E12, 42.599999999999994]], "isOverall": false, "label": "https://pharma-shop.tn/identite-21", "isController": false}, {"data": [[1.68027582E12, 43.800000000000004]], "isOverall": false, "label": "https://pharma-shop.tn/identite-22", "isController": false}, {"data": [[1.68027582E12, 14856.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.68027582E12, 313.8]], "isOverall": false, "label": "https://pharma-shop.tn/identite-0", "isController": false}, {"data": [[1.68027582E12, 26.1]], "isOverall": false, "label": "https://pharma-shop.tn/identite-4", "isController": false}, {"data": [[1.68027582E12, 82.6]], "isOverall": false, "label": "https://pharma-shop.tn/identite-3", "isController": false}, {"data": [[1.68027582E12, 83.6]], "isOverall": false, "label": "https://pharma-shop.tn/identite-2", "isController": false}, {"data": [[1.68027582E12, 750.8]], "isOverall": false, "label": "https://pharma-shop.tn/identite-1", "isController": false}, {"data": [[1.68027582E12, 1448.4]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-22", "isController": false}, {"data": [[1.68027582E12, 189.3]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-20", "isController": false}, {"data": [[1.68027582E12, 155.49999999999997]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-21", "isController": false}, {"data": [[1.68027582E12, 200.6]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-8", "isController": false}, {"data": [[1.68027582E12, 94.7]], "isOverall": false, "label": "https://pharma-shop.tn/identite-10", "isController": false}, {"data": [[1.68027582E12, 534.8]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-9", "isController": false}, {"data": [[1.68027582E12, 94.7]], "isOverall": false, "label": "https://pharma-shop.tn/identite-11", "isController": false}, {"data": [[1.68027582E12, 450.29999999999995]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-6", "isController": false}, {"data": [[1.68027582E12, 108.19999999999999]], "isOverall": false, "label": "https://pharma-shop.tn/identite-12", "isController": false}, {"data": [[1.68027582E12, 479.79999999999995]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-7", "isController": false}, {"data": [[1.68027582E12, 89.30000000000001]], "isOverall": false, "label": "https://pharma-shop.tn/identite-13", "isController": false}, {"data": [[1.68027582E12, 379.9]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-4", "isController": false}, {"data": [[1.68027582E12, 48.7]], "isOverall": false, "label": "https://pharma-shop.tn/identite-14", "isController": false}, {"data": [[1.68027582E12, 311.20000000000005]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-5", "isController": false}, {"data": [[1.68027582E12, 64.5]], "isOverall": false, "label": "https://pharma-shop.tn/identite-15", "isController": false}, {"data": [[1.68027582E12, 382.4]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-2", "isController": false}, {"data": [[1.68027582E12, 51.8]], "isOverall": false, "label": "https://pharma-shop.tn/identite-16", "isController": false}, {"data": [[1.68027582E12, 3586.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-3", "isController": false}, {"data": [[1.68027582E12, 49.199999999999996]], "isOverall": false, "label": "https://pharma-shop.tn/identite-17", "isController": false}, {"data": [[1.68027582E12, 2424.8000000000006]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-0", "isController": false}, {"data": [[1.68027582E12, 50.8]], "isOverall": false, "label": "https://pharma-shop.tn/identite-18", "isController": false}, {"data": [[1.68027582E12, 796.1333333333332]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-1", "isController": false}, {"data": [[1.68027582E12, 41.400000000000006]], "isOverall": false, "label": "https://pharma-shop.tn/identite-19", "isController": false}, {"data": [[1.68027582E12, 868.5]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-19", "isController": false}, {"data": [[1.68027582E12, 954.6999999999999]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-17", "isController": false}, {"data": [[1.68027582E12, 705.1000000000001]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-18", "isController": false}, {"data": [[1.68027582E12, 1142.9]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-15", "isController": false}, {"data": [[1.68027582E12, 892.9]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-16", "isController": false}, {"data": [[1.68027582E12, 1295.6000000000001]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-13", "isController": false}, {"data": [[1.68027582E12, 923.4000000000002]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-14", "isController": false}, {"data": [[1.68027582E12, 1375.1999999999998]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-11", "isController": false}, {"data": [[1.68027582E12, 1047.6]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-12", "isController": false}, {"data": [[1.68027582E12, 681.5]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-10", "isController": false}, {"data": [[1.68027582E12, 50.8]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-20", "isController": false}, {"data": [[1.68027582E12, 35.6]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-21", "isController": false}, {"data": [[1.68027582E12, 103.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-7", "isController": false}, {"data": [[1.68027582E12, 77.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-8", "isController": false}, {"data": [[1.68027582E12, 84.6]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-9", "isController": false}, {"data": [[1.68027582E12, 20.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-3", "isController": false}, {"data": [[1.68027582E12, 64.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-4", "isController": false}, {"data": [[1.68027582E12, 50.6]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-5", "isController": false}, {"data": [[1.68027582E12, 89.8]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-6", "isController": false}, {"data": [[1.68027582E12, 697.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-0", "isController": false}, {"data": [[1.68027582E12, 98.2]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-1", "isController": false}, {"data": [[1.68027582E12, 80.8]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-2", "isController": false}, {"data": [[1.68027582E12, 5402.0999999999985]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte", "isController": false}, {"data": [[1.68027582E12, 405.4]], "isOverall": false, "label": "https://pharma-shop.tn/module/ets_sociallogin/oauth", "isController": false}, {"data": [[1.68027582E12, 1344.6999999999998]], "isOverall": false, "label": "https://pharma-shop.tn/identite", "isController": false}, {"data": [[1.68027582E12, 37.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-17", "isController": false}, {"data": [[1.68027582E12, 957.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account", "isController": false}, {"data": [[1.68027582E12, 37.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-16", "isController": false}, {"data": [[1.68027582E12, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-19", "isController": false}, {"data": [[1.68027582E12, 41.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-18", "isController": false}, {"data": [[1.68027582E12, 62.6]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-13", "isController": false}, {"data": [[1.68027582E12, 97.6]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-12", "isController": false}, {"data": [[1.68027582E12, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-15", "isController": false}, {"data": [[1.68027582E12, 63.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-14", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68027582E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.68027582E12, "maxY": 2662.6, "series": [{"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-8", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-7", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-11", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-6", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-10", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-5", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-9", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-20", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-21", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-22", "isController": false}, {"data": [[1.68027582E12, 2662.6]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.68027582E12, 313.8]], "isOverall": false, "label": "https://pharma-shop.tn/identite-0", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-4", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-3", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-2", "isController": false}, {"data": [[1.68027582E12, 679.5999999999999]], "isOverall": false, "label": "https://pharma-shop.tn/identite-1", "isController": false}, {"data": [[1.68027582E12, 132.79999999999998]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-22", "isController": false}, {"data": [[1.68027582E12, 136.8]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-20", "isController": false}, {"data": [[1.68027582E12, 139.70000000000002]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-21", "isController": false}, {"data": [[1.68027582E12, 85.39999999999999]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-8", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-10", "isController": false}, {"data": [[1.68027582E12, 179.30000000000004]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-9", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-11", "isController": false}, {"data": [[1.68027582E12, 247.5]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-6", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-12", "isController": false}, {"data": [[1.68027582E12, 270.5]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-7", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-13", "isController": false}, {"data": [[1.68027582E12, 226.7]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-4", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-14", "isController": false}, {"data": [[1.68027582E12, 211.8]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-5", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-15", "isController": false}, {"data": [[1.68027582E12, 268.1]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-2", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-16", "isController": false}, {"data": [[1.68027582E12, 112.8]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-3", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-17", "isController": false}, {"data": [[1.68027582E12, 403.8]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-0", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-18", "isController": false}, {"data": [[1.68027582E12, 569.1999999999999]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-1", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-19", "isController": false}, {"data": [[1.68027582E12, 98.99999999999999]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-19", "isController": false}, {"data": [[1.68027582E12, 122.29999999999997]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-17", "isController": false}, {"data": [[1.68027582E12, 92.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-18", "isController": false}, {"data": [[1.68027582E12, 80.7]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-15", "isController": false}, {"data": [[1.68027582E12, 89.7]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-16", "isController": false}, {"data": [[1.68027582E12, 102.40000000000002]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-13", "isController": false}, {"data": [[1.68027582E12, 87.70000000000002]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-14", "isController": false}, {"data": [[1.68027582E12, 121.1]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-11", "isController": false}, {"data": [[1.68027582E12, 104.60000000000001]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-12", "isController": false}, {"data": [[1.68027582E12, 171.09999999999997]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-10", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-20", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-21", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-7", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-8", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-9", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-3", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-4", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-5", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-6", "isController": false}, {"data": [[1.68027582E12, 644.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-0", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-1", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-2", "isController": false}, {"data": [[1.68027582E12, 492.90000000000003]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte", "isController": false}, {"data": [[1.68027582E12, 405.2]], "isOverall": false, "label": "https://pharma-shop.tn/module/ets_sociallogin/oauth", "isController": false}, {"data": [[1.68027582E12, 313.8]], "isOverall": false, "label": "https://pharma-shop.tn/identite", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-17", "isController": false}, {"data": [[1.68027582E12, 644.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-16", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-19", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-18", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-13", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-12", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-15", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-14", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68027582E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.68027582E12, "maxY": 413.0, "series": [{"data": [[1.68027582E12, 70.5]], "isOverall": false, "label": "https://pharma-shop.tn/identite-8", "isController": false}, {"data": [[1.68027582E12, 20.2]], "isOverall": false, "label": "https://pharma-shop.tn/identite-7", "isController": false}, {"data": [[1.68027582E12, 67.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-11", "isController": false}, {"data": [[1.68027582E12, 24.5]], "isOverall": false, "label": "https://pharma-shop.tn/identite-6", "isController": false}, {"data": [[1.68027582E12, 38.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-10", "isController": false}, {"data": [[1.68027582E12, 26.2]], "isOverall": false, "label": "https://pharma-shop.tn/identite-5", "isController": false}, {"data": [[1.68027582E12, 50.3]], "isOverall": false, "label": "https://pharma-shop.tn/identite-9", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-20", "isController": false}, {"data": [[1.68027582E12, 7.9]], "isOverall": false, "label": "https://pharma-shop.tn/identite-21", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-22", "isController": false}, {"data": [[1.68027582E12, 413.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.68027582E12, 26.6]], "isOverall": false, "label": "https://pharma-shop.tn/identite-0", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-4", "isController": false}, {"data": [[1.68027582E12, 34.8]], "isOverall": false, "label": "https://pharma-shop.tn/identite-3", "isController": false}, {"data": [[1.68027582E12, 30.8]], "isOverall": false, "label": "https://pharma-shop.tn/identite-2", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-1", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-22", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-20", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-21", "isController": false}, {"data": [[1.68027582E12, 29.9]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-8", "isController": false}, {"data": [[1.68027582E12, 49.8]], "isOverall": false, "label": "https://pharma-shop.tn/identite-10", "isController": false}, {"data": [[1.68027582E12, 105.6]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-9", "isController": false}, {"data": [[1.68027582E12, 47.3]], "isOverall": false, "label": "https://pharma-shop.tn/identite-11", "isController": false}, {"data": [[1.68027582E12, 183.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-6", "isController": false}, {"data": [[1.68027582E12, 60.9]], "isOverall": false, "label": "https://pharma-shop.tn/identite-12", "isController": false}, {"data": [[1.68027582E12, 179.90000000000003]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-7", "isController": false}, {"data": [[1.68027582E12, 41.3]], "isOverall": false, "label": "https://pharma-shop.tn/identite-13", "isController": false}, {"data": [[1.68027582E12, 167.3]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-4", "isController": false}, {"data": [[1.68027582E12, 8.1]], "isOverall": false, "label": "https://pharma-shop.tn/identite-14", "isController": false}, {"data": [[1.68027582E12, 143.70000000000002]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-5", "isController": false}, {"data": [[1.68027582E12, 14.4]], "isOverall": false, "label": "https://pharma-shop.tn/identite-15", "isController": false}, {"data": [[1.68027582E12, 189.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-2", "isController": false}, {"data": [[1.68027582E12, 7.3999999999999995]], "isOverall": false, "label": "https://pharma-shop.tn/identite-16", "isController": false}, {"data": [[1.68027582E12, 55.70000000000001]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-3", "isController": false}, {"data": [[1.68027582E12, 8.3]], "isOverall": false, "label": "https://pharma-shop.tn/identite-17", "isController": false}, {"data": [[1.68027582E12, 147.73333333333332]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-0", "isController": false}, {"data": [[1.68027582E12, 6.700000000000002]], "isOverall": false, "label": "https://pharma-shop.tn/identite-18", "isController": false}, {"data": [[1.68027582E12, 90.73333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-1", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/identite-19", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-19", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-17", "isController": false}, {"data": [[1.68027582E12, 14.3]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-18", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-15", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-16", "isController": false}, {"data": [[1.68027582E12, 7.2]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-13", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-14", "isController": false}, {"data": [[1.68027582E12, 92.1]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-11", "isController": false}, {"data": [[1.68027582E12, 29.800000000000004]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-12", "isController": false}, {"data": [[1.68027582E12, 122.6]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-10", "isController": false}, {"data": [[1.68027582E12, 13.2]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-20", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-21", "isController": false}, {"data": [[1.68027582E12, 53.8]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-7", "isController": false}, {"data": [[1.68027582E12, 40.2]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-8", "isController": false}, {"data": [[1.68027582E12, 41.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-9", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-3", "isController": false}, {"data": [[1.68027582E12, 26.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-4", "isController": false}, {"data": [[1.68027582E12, 13.6]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-5", "isController": false}, {"data": [[1.68027582E12, 52.8]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-6", "isController": false}, {"data": [[1.68027582E12, 14.8]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-0", "isController": false}, {"data": [[1.68027582E12, 55.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-1", "isController": false}, {"data": [[1.68027582E12, 38.8]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-2", "isController": false}, {"data": [[1.68027582E12, 172.5]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/module/ets_sociallogin/oauth", "isController": false}, {"data": [[1.68027582E12, 26.6]], "isOverall": false, "label": "https://pharma-shop.tn/identite", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-17", "isController": false}, {"data": [[1.68027582E12, 14.8]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-16", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-19", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-18", "isController": false}, {"data": [[1.68027582E12, 25.4]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-13", "isController": false}, {"data": [[1.68027582E12, 53.8]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-12", "isController": false}, {"data": [[1.68027582E12, 0.0]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-15", "isController": false}, {"data": [[1.68027582E12, 26.8]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-14", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68027582E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 17.0, "minX": 1.68027582E12, "maxY": 9918.0, "series": [{"data": [[1.68027582E12, 9918.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.68027582E12, 1577.5999999999997]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.68027582E12, 7427.759999999998]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.68027582E12, 2238.199999999996]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.68027582E12, 17.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.68027582E12, 103.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68027582E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 37.5, "minX": 1.0, "maxY": 6166.0, "series": [{"data": [[8.0, 37.5], [9.0, 6166.0], [37.0, 41.0], [47.0, 44.0], [3.0, 880.5], [13.0, 1579.0], [53.0, 42.0], [14.0, 5288.0], [1.0, 352.0], [17.0, 1747.0], [18.0, 1730.0], [5.0, 581.0], [86.0, 44.5], [21.0, 39.0], [23.0, 54.0], [24.0, 41.5], [25.0, 331.0], [28.0, 39.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 86.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 674.0, "series": [{"data": [[8.0, 0.0], [9.0, 248.0], [37.0, 0.0], [47.0, 0.0], [3.0, 674.0], [13.0, 241.0], [53.0, 0.0], [14.0, 417.0], [1.0, 352.0], [17.0, 182.0], [18.0, 188.5], [5.0, 581.0], [86.0, 0.0], [21.0, 0.0], [23.0, 0.0], [24.0, 0.0], [25.0, 106.5], [28.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 86.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 10.166666666666666, "minX": 1.68027582E12, "maxY": 10.166666666666666, "series": [{"data": [[1.68027582E12, 10.166666666666666]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68027582E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.3333333333333333, "minX": 1.68027582E12, "maxY": 7.0, "series": [{"data": [[1.68027582E12, 2.8333333333333335]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.68027582E12, 0.3333333333333333]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.68027582E12, 7.0]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68027582E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.08333333333333333, "minX": 1.68027582E12, "maxY": 0.25, "series": [{"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-8-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-18-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-22-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-1-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-6-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-20-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-13-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-16-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-17-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-14-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/module/ets_sociallogin/oauth-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-12-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-3-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-15-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-5-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-8-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-14-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-7-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-6-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "Test-success", "isController": true}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-12-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-21-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-17-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-0-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-10-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-5-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-4-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-20-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-3-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-10-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-19-success", "isController": false}, {"data": [[1.68027582E12, 0.25]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-1-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-11-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-2-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-19-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-21-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-12-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-9-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-17-success", "isController": false}, {"data": [[1.68027582E12, 0.25]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-0-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-7-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-0-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-15-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-14-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-2-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-13-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-4-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-18-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-15-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-8-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-16-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-9-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-13-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-9-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-20-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-1-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-16-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-6-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-22-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-11-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-11-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-7-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/identite-18-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-19-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-4-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-5-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-10-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-3-success", "isController": false}, {"data": [[1.68027582E12, 0.08333333333333333]], "isOverall": false, "label": "https://pharma-shop.tn/connexion?back=my-account-21-success", "isController": false}, {"data": [[1.68027582E12, 0.16666666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/mon-compte-2-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68027582E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 10.25, "minX": 1.68027582E12, "maxY": 10.25, "series": [{"data": [[1.68027582E12, 10.25]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68027582E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
