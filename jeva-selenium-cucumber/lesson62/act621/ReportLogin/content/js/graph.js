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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 2.0, "series": [{"data": [[0.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-2", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-1", "isController": false}, {"data": [[600.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-0", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-6", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-90", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-5", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-91", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-4", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-3", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-94", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-9", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-95", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-8", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-92", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-7", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-93", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-10", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-98", "isController": false}, {"data": [[1300.0, 1.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-11", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-99", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-96", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-97", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-14", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-15", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-12", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-13", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-18", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-19", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-16", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-17", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-80", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-83", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-84", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-81", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-82", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-87", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-88", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-85", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-86", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-89", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.google-analytics.com/j/collect?v=1&_v=j99&a=382515470&t=pageview&_s=1&dl=https%3A%2F%2Fpharma-shop.tn%2F&ul=fr-fr&de=UTF-8&dt=Votre%20premi%C3%A8re%20parapharmacie%20en%20ligne%20en%20Tunisie&sd=24-bit&sr=1536x864&vp=1531x664&je=0&_u=AACAAEIJAAAAACAAI~&jid=&gjid=&cid=1966698233.1680104207&tid=UA-71713758-1&_gid=582023006.1680254087&_slc=1&did=d6YPbH&z=462389109", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0]], "isOverall": false, "label": "https://bootstrap.smartsuppchat.com/widget/b9690c990e4111de60bc2b144aa143172e19e795.json", "isController": false}, {"data": [[1400.0, 1.0], [3300.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-32", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-33", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-30", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-31", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-36", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-37", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-34", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-35", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://widget-v2.smartsuppcdn.com/asset-manifest.json", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-38", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-39", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q&cp=0&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=pharmashop&psi=iKUmZPv1G7ypkdUP4pSpgAo.1680254346734&dpr=1.25", "isController": false}, {"data": [[0.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-21", "isController": false}, {"data": [[0.0, 1.0], [1300.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-22", "isController": false}, {"data": [[0.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-20", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-25", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-26", "isController": false}, {"data": [[0.0, 1.0], [1200.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-23", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-24", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-29", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-27", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-28", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.google-analytics.com/j/collect?v=1&_v=j99&a=1576582099&t=pageview&_s=1&dl=https%3A%2F%2Fpharma-shop.tn%2F&dr=https%3A%2F%2Fwww.google.com%2F&ul=fr-fr&de=UTF-8&dt=Votre%20premi%C3%A8re%20parapharmacie%20en%20ligne%20en%20Tunisie&sd=24-bit&sr=1536x864&vp=1531x664&je=0&_u=AACAAEIJAAAAACAAI~&jid=473753450&gjid=218319513&cid=1966698233.1680104207&tid=UA-71713758-1&_gid=582023006.1680254087&_r=1&_slc=1&did=d6YPbH&z=443076985", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-50", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-51", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-54", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-55", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-52", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-53", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-58", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-59", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-56", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-57", "isController": false}, {"data": [[9000.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[0.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "https://translations.smartsuppcdn.com/api/v1/widget/translations/lang/fr/defaults", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-40", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-43", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-44", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://stats.g.doubleclick.net/j/collect?t=dc&aip=1&_r=3&v=1&_v=j99&tid=UA-71713758-1&cid=1966698233.1680104207&jid=473753450&gjid=218319513&_gid=582023006.1680254087&_u=AACAAEIIAAAAACAAI~&z=1446073229", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-41", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-42", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-47", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-48", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-45", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-46", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp-1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp-2", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-49", "isController": false}, {"data": [[1100.0, 1.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp-0", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=pharmashop&cp=0&client=desktop-gws-wiz-on-focus-serp&xssi=t&hl=fr-TN&authuser=0&pq=pharmashop&psi=iKUmZPv1G7ypkdUP4pSpgAo.1680254346734&ofp=EAEypQEKCgoIcGFyYXNob3AKFAoScGhhcm1hc2hvcCB0dW5pc2llChMKEXBoYXJtYXNob3Agc291c3NlCg8KDXBhcmFwaGFybWFjaWUKFwoVcGhhcm1hc2hvcCBtYXF1aWxsYWdlChMKEXBoYXJtYXNob3Agb25saW5lChQKEnBoYXJtYXNob3AgY29udGFjdAoVChNwaGFybWFzaG9wIGJvbiBwbGFuEEc&dpr=1.25", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=p&cp=1&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=google&psi=VqUmZILfJemrkdUP7PyLkAk.1680254295265&dpr=1.25", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-72", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-73", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-70", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-71", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-76", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-77", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-74", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-75", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=pha&cp=3&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=google&psi=VqUmZILfJemrkdUP7PyLkAk.1680254295265&dpr=1.25", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-78", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-79", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-109", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-108", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-107", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-106", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-105", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-104", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-103", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-102", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-101", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-100", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=ph&cp=2&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=google&psi=VqUmZILfJemrkdUP7PyLkAk.1680254295265&dpr=1.25", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-61", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-62", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-60", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-65", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-66", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-63", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-64", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-69", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-67", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-68", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/module/ets_sociallogin/oauth", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-119", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-118", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-117", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-116", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-115", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-114", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-113", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-112", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "https://pharma-shop.tn/-111", "isController": false}, {"data": [[0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "https://pharma-shop.tn/-110", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 9000.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 1.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 251.0, "series": [{"data": [[0.0, 251.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 10.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 1.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 1.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.68025674E12, "maxY": 1.0, "series": [{"data": [[1.68025674E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.68025674E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}, {"data": [[1.68025674E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-3", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68025674E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 34.0, "minX": 0.0, "maxY": 9019.0, "series": [{"data": [[1.0, 1046.0]], "isOverall": false, "label": "https://pharma-shop.tn/-2", "isController": false}, {"data": [[1.0, 1046.0]], "isOverall": false, "label": "https://pharma-shop.tn/-2-Aggregated", "isController": false}, {"data": [[1.0, 102.5], [0.0, 565.0]], "isOverall": false, "label": "https://pharma-shop.tn/-1", "isController": false}, {"data": [[0.6666666666666666, 256.6666666666667]], "isOverall": false, "label": "https://pharma-shop.tn/-1-Aggregated", "isController": false}, {"data": [[1.0, 543.5], [0.0, 616.0]], "isOverall": false, "label": "https://pharma-shop.tn/-0", "isController": false}, {"data": [[0.6666666666666666, 567.6666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/-0-Aggregated", "isController": false}, {"data": [[1.0, 111.0]], "isOverall": false, "label": "https://pharma-shop.tn/-6", "isController": false}, {"data": [[1.0, 111.0]], "isOverall": false, "label": "https://pharma-shop.tn/-6-Aggregated", "isController": false}, {"data": [[1.0, 50.5]], "isOverall": false, "label": "https://pharma-shop.tn/-90", "isController": false}, {"data": [[1.0, 50.5]], "isOverall": false, "label": "https://pharma-shop.tn/-90-Aggregated", "isController": false}, {"data": [[1.0, 42.5]], "isOverall": false, "label": "https://pharma-shop.tn/-5", "isController": false}, {"data": [[1.0, 42.5]], "isOverall": false, "label": "https://pharma-shop.tn/-5-Aggregated", "isController": false}, {"data": [[1.0, 40.5]], "isOverall": false, "label": "https://pharma-shop.tn/-91", "isController": false}, {"data": [[1.0, 40.5]], "isOverall": false, "label": "https://pharma-shop.tn/-91-Aggregated", "isController": false}, {"data": [[1.0, 114.5]], "isOverall": false, "label": "https://pharma-shop.tn/-4", "isController": false}, {"data": [[1.0, 114.5]], "isOverall": false, "label": "https://pharma-shop.tn/-4-Aggregated", "isController": false}, {"data": [[1.0, 81.5]], "isOverall": false, "label": "https://pharma-shop.tn/-3", "isController": false}, {"data": [[1.0, 81.5]], "isOverall": false, "label": "https://pharma-shop.tn/-3-Aggregated", "isController": false}, {"data": [[1.0, 39.5]], "isOverall": false, "label": "https://pharma-shop.tn/-94", "isController": false}, {"data": [[1.0, 39.5]], "isOverall": false, "label": "https://pharma-shop.tn/-94-Aggregated", "isController": false}, {"data": [[1.0, 181.5]], "isOverall": false, "label": "https://pharma-shop.tn/-9", "isController": false}, {"data": [[1.0, 181.5]], "isOverall": false, "label": "https://pharma-shop.tn/-9-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "https://pharma-shop.tn/-95", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "https://pharma-shop.tn/-95-Aggregated", "isController": false}, {"data": [[1.0, 49.0]], "isOverall": false, "label": "https://pharma-shop.tn/-8", "isController": false}, {"data": [[1.0, 49.0]], "isOverall": false, "label": "https://pharma-shop.tn/-8-Aggregated", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "https://pharma-shop.tn/-92", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "https://pharma-shop.tn/-92-Aggregated", "isController": false}, {"data": [[1.0, 51.0]], "isOverall": false, "label": "https://pharma-shop.tn/-7", "isController": false}, {"data": [[1.0, 51.0]], "isOverall": false, "label": "https://pharma-shop.tn/-7-Aggregated", "isController": false}, {"data": [[1.0, 40.5]], "isOverall": false, "label": "https://pharma-shop.tn/-93", "isController": false}, {"data": [[1.0, 40.5]], "isOverall": false, "label": "https://pharma-shop.tn/-93-Aggregated", "isController": false}, {"data": [[1.0, 58.5]], "isOverall": false, "label": "https://pharma-shop.tn/-10", "isController": false}, {"data": [[1.0, 58.5]], "isOverall": false, "label": "https://pharma-shop.tn/-10-Aggregated", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "https://pharma-shop.tn/-98", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "https://pharma-shop.tn/-98-Aggregated", "isController": false}, {"data": [[1.0, 1393.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp", "isController": false}, {"data": [[1.0, 1393.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp-Aggregated", "isController": false}, {"data": [[1.0, 104.0]], "isOverall": false, "label": "https://pharma-shop.tn/-11", "isController": false}, {"data": [[1.0, 104.0]], "isOverall": false, "label": "https://pharma-shop.tn/-11-Aggregated", "isController": false}, {"data": [[1.0, 43.0]], "isOverall": false, "label": "https://pharma-shop.tn/-99", "isController": false}, {"data": [[1.0, 43.0]], "isOverall": false, "label": "https://pharma-shop.tn/-99-Aggregated", "isController": false}, {"data": [[1.0, 42.0]], "isOverall": false, "label": "https://pharma-shop.tn/-96", "isController": false}, {"data": [[1.0, 42.0]], "isOverall": false, "label": "https://pharma-shop.tn/-96-Aggregated", "isController": false}, {"data": [[1.0, 38.5]], "isOverall": false, "label": "https://pharma-shop.tn/-97", "isController": false}, {"data": [[1.0, 38.5]], "isOverall": false, "label": "https://pharma-shop.tn/-97-Aggregated", "isController": false}, {"data": [[1.0, 200.5]], "isOverall": false, "label": "https://pharma-shop.tn/-14", "isController": false}, {"data": [[1.0, 200.5]], "isOverall": false, "label": "https://pharma-shop.tn/-14-Aggregated", "isController": false}, {"data": [[1.0, 131.5]], "isOverall": false, "label": "https://pharma-shop.tn/-15", "isController": false}, {"data": [[1.0, 131.5]], "isOverall": false, "label": "https://pharma-shop.tn/-15-Aggregated", "isController": false}, {"data": [[1.0, 136.0]], "isOverall": false, "label": "https://pharma-shop.tn/-12", "isController": false}, {"data": [[1.0, 136.0]], "isOverall": false, "label": "https://pharma-shop.tn/-12-Aggregated", "isController": false}, {"data": [[1.0, 152.5]], "isOverall": false, "label": "https://pharma-shop.tn/-13", "isController": false}, {"data": [[1.0, 152.5]], "isOverall": false, "label": "https://pharma-shop.tn/-13-Aggregated", "isController": false}, {"data": [[1.0, 204.0]], "isOverall": false, "label": "https://pharma-shop.tn/-18", "isController": false}, {"data": [[1.0, 204.0]], "isOverall": false, "label": "https://pharma-shop.tn/-18-Aggregated", "isController": false}, {"data": [[1.0, 156.5]], "isOverall": false, "label": "https://pharma-shop.tn/-19", "isController": false}, {"data": [[1.0, 156.5]], "isOverall": false, "label": "https://pharma-shop.tn/-19-Aggregated", "isController": false}, {"data": [[1.0, 145.0]], "isOverall": false, "label": "https://pharma-shop.tn/-16", "isController": false}, {"data": [[1.0, 145.0]], "isOverall": false, "label": "https://pharma-shop.tn/-16-Aggregated", "isController": false}, {"data": [[1.0, 146.5]], "isOverall": false, "label": "https://pharma-shop.tn/-17", "isController": false}, {"data": [[1.0, 146.5]], "isOverall": false, "label": "https://pharma-shop.tn/-17-Aggregated", "isController": false}, {"data": [[1.0, 36.0]], "isOverall": false, "label": "https://pharma-shop.tn/-80", "isController": false}, {"data": [[1.0, 36.0]], "isOverall": false, "label": "https://pharma-shop.tn/-80-Aggregated", "isController": false}, {"data": [[1.0, 43.0]], "isOverall": false, "label": "https://pharma-shop.tn/-83", "isController": false}, {"data": [[1.0, 43.0]], "isOverall": false, "label": "https://pharma-shop.tn/-83-Aggregated", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-84", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-84-Aggregated", "isController": false}, {"data": [[1.0, 43.5]], "isOverall": false, "label": "https://pharma-shop.tn/-81", "isController": false}, {"data": [[1.0, 43.5]], "isOverall": false, "label": "https://pharma-shop.tn/-81-Aggregated", "isController": false}, {"data": [[1.0, 45.5]], "isOverall": false, "label": "https://pharma-shop.tn/-82", "isController": false}, {"data": [[1.0, 45.5]], "isOverall": false, "label": "https://pharma-shop.tn/-82-Aggregated", "isController": false}, {"data": [[1.0, 47.5]], "isOverall": false, "label": "https://pharma-shop.tn/-87", "isController": false}, {"data": [[1.0, 47.5]], "isOverall": false, "label": "https://pharma-shop.tn/-87-Aggregated", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-88", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-88-Aggregated", "isController": false}, {"data": [[1.0, 39.5]], "isOverall": false, "label": "https://pharma-shop.tn/-85", "isController": false}, {"data": [[1.0, 39.5]], "isOverall": false, "label": "https://pharma-shop.tn/-85-Aggregated", "isController": false}, {"data": [[1.0, 41.0]], "isOverall": false, "label": "https://pharma-shop.tn/-86", "isController": false}, {"data": [[1.0, 41.0]], "isOverall": false, "label": "https://pharma-shop.tn/-86-Aggregated", "isController": false}, {"data": [[1.0, 44.0]], "isOverall": false, "label": "https://pharma-shop.tn/-89", "isController": false}, {"data": [[1.0, 44.0]], "isOverall": false, "label": "https://pharma-shop.tn/-89-Aggregated", "isController": false}, {"data": [[1.0, 40.0]], "isOverall": false, "label": "https://www.google-analytics.com/j/collect?v=1&_v=j99&a=382515470&t=pageview&_s=1&dl=https%3A%2F%2Fpharma-shop.tn%2F&ul=fr-fr&de=UTF-8&dt=Votre%20premi%C3%A8re%20parapharmacie%20en%20ligne%20en%20Tunisie&sd=24-bit&sr=1536x864&vp=1531x664&je=0&_u=AACAAEIJAAAAACAAI~&jid=&gjid=&cid=1966698233.1680104207&tid=UA-71713758-1&_gid=582023006.1680254087&_slc=1&did=d6YPbH&z=462389109", "isController": false}, {"data": [[1.0, 40.0]], "isOverall": false, "label": "https://www.google-analytics.com/j/collect?v=1&_v=j99&a=382515470&t=pageview&_s=1&dl=https%3A%2F%2Fpharma-shop.tn%2F&ul=fr-fr&de=UTF-8&dt=Votre%20premi%C3%A8re%20parapharmacie%20en%20ligne%20en%20Tunisie&sd=24-bit&sr=1536x864&vp=1531x664&je=0&_u=AACAAEIJAAAAACAAI~&jid=&gjid=&cid=1966698233.1680104207&tid=UA-71713758-1&_gid=582023006.1680254087&_slc=1&did=d6YPbH&z=462389109-Aggregated", "isController": false}, {"data": [[1.0, 190.0]], "isOverall": false, "label": "https://bootstrap.smartsuppchat.com/widget/b9690c990e4111de60bc2b144aa143172e19e795.json", "isController": false}, {"data": [[1.0, 190.0]], "isOverall": false, "label": "https://bootstrap.smartsuppchat.com/widget/b9690c990e4111de60bc2b144aa143172e19e795.json-Aggregated", "isController": false}, {"data": [[1.0, 2401.5]], "isOverall": false, "label": "https://pharma-shop.tn/", "isController": false}, {"data": [[1.0, 2401.5]], "isOverall": false, "label": "https://pharma-shop.tn/-Aggregated", "isController": false}, {"data": [[1.0, 55.5]], "isOverall": false, "label": "https://pharma-shop.tn/-32", "isController": false}, {"data": [[1.0, 55.5]], "isOverall": false, "label": "https://pharma-shop.tn/-32-Aggregated", "isController": false}, {"data": [[1.0, 52.0]], "isOverall": false, "label": "https://pharma-shop.tn/-33", "isController": false}, {"data": [[1.0, 52.0]], "isOverall": false, "label": "https://pharma-shop.tn/-33-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "https://pharma-shop.tn/-30", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "https://pharma-shop.tn/-30-Aggregated", "isController": false}, {"data": [[1.0, 49.0]], "isOverall": false, "label": "https://pharma-shop.tn/-31", "isController": false}, {"data": [[1.0, 49.0]], "isOverall": false, "label": "https://pharma-shop.tn/-31-Aggregated", "isController": false}, {"data": [[1.0, 47.0]], "isOverall": false, "label": "https://pharma-shop.tn/-36", "isController": false}, {"data": [[1.0, 47.0]], "isOverall": false, "label": "https://pharma-shop.tn/-36-Aggregated", "isController": false}, {"data": [[1.0, 54.0]], "isOverall": false, "label": "https://pharma-shop.tn/-37", "isController": false}, {"data": [[1.0, 54.0]], "isOverall": false, "label": "https://pharma-shop.tn/-37-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "https://pharma-shop.tn/-34", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "https://pharma-shop.tn/-34-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://pharma-shop.tn/-35", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://pharma-shop.tn/-35-Aggregated", "isController": false}, {"data": [[1.0, 119.5]], "isOverall": false, "label": "https://widget-v2.smartsuppcdn.com/asset-manifest.json", "isController": false}, {"data": [[1.0, 119.5]], "isOverall": false, "label": "https://widget-v2.smartsuppcdn.com/asset-manifest.json-Aggregated", "isController": false}, {"data": [[1.0, 54.5]], "isOverall": false, "label": "https://pharma-shop.tn/-38", "isController": false}, {"data": [[1.0, 54.5]], "isOverall": false, "label": "https://pharma-shop.tn/-38-Aggregated", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "https://pharma-shop.tn/-39", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "https://pharma-shop.tn/-39-Aggregated", "isController": false}, {"data": [[1.0, 115.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q&cp=0&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=pharmashop&psi=iKUmZPv1G7ypkdUP4pSpgAo.1680254346734&dpr=1.25", "isController": false}, {"data": [[1.0, 115.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q&cp=0&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=pharmashop&psi=iKUmZPv1G7ypkdUP4pSpgAo.1680254346734&dpr=1.25-Aggregated", "isController": false}, {"data": [[1.0, 223.0]], "isOverall": false, "label": "https://pharma-shop.tn/-21", "isController": false}, {"data": [[1.0, 223.0]], "isOverall": false, "label": "https://pharma-shop.tn/-21-Aggregated", "isController": false}, {"data": [[1.0, 681.0]], "isOverall": false, "label": "https://pharma-shop.tn/-22", "isController": false}, {"data": [[1.0, 681.0]], "isOverall": false, "label": "https://pharma-shop.tn/-22-Aggregated", "isController": false}, {"data": [[1.0, 302.0]], "isOverall": false, "label": "https://pharma-shop.tn/-20", "isController": false}, {"data": [[1.0, 302.0]], "isOverall": false, "label": "https://pharma-shop.tn/-20-Aggregated", "isController": false}, {"data": [[1.0, 75.0]], "isOverall": false, "label": "https://pharma-shop.tn/-25", "isController": false}, {"data": [[1.0, 75.0]], "isOverall": false, "label": "https://pharma-shop.tn/-25-Aggregated", "isController": false}, {"data": [[1.0, 48.5]], "isOverall": false, "label": "https://pharma-shop.tn/-26", "isController": false}, {"data": [[1.0, 48.5]], "isOverall": false, "label": "https://pharma-shop.tn/-26-Aggregated", "isController": false}, {"data": [[1.0, 648.0]], "isOverall": false, "label": "https://pharma-shop.tn/-23", "isController": false}, {"data": [[1.0, 648.0]], "isOverall": false, "label": "https://pharma-shop.tn/-23-Aggregated", "isController": false}, {"data": [[1.0, 68.5]], "isOverall": false, "label": "https://pharma-shop.tn/-24", "isController": false}, {"data": [[1.0, 68.5]], "isOverall": false, "label": "https://pharma-shop.tn/-24-Aggregated", "isController": false}, {"data": [[1.0, 140.5]], "isOverall": false, "label": "https://pharma-shop.tn/-29", "isController": false}, {"data": [[1.0, 140.5]], "isOverall": false, "label": "https://pharma-shop.tn/-29-Aggregated", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "https://pharma-shop.tn/-27", "isController": false}, {"data": [[1.0, 55.0]], "isOverall": false, "label": "https://pharma-shop.tn/-27-Aggregated", "isController": false}, {"data": [[1.0, 51.5]], "isOverall": false, "label": "https://pharma-shop.tn/-28", "isController": false}, {"data": [[1.0, 51.5]], "isOverall": false, "label": "https://pharma-shop.tn/-28-Aggregated", "isController": false}, {"data": [[1.0, 143.0]], "isOverall": false, "label": "https://www.google-analytics.com/j/collect?v=1&_v=j99&a=1576582099&t=pageview&_s=1&dl=https%3A%2F%2Fpharma-shop.tn%2F&dr=https%3A%2F%2Fwww.google.com%2F&ul=fr-fr&de=UTF-8&dt=Votre%20premi%C3%A8re%20parapharmacie%20en%20ligne%20en%20Tunisie&sd=24-bit&sr=1536x864&vp=1531x664&je=0&_u=AACAAEIJAAAAACAAI~&jid=473753450&gjid=218319513&cid=1966698233.1680104207&tid=UA-71713758-1&_gid=582023006.1680254087&_r=1&_slc=1&did=d6YPbH&z=443076985", "isController": false}, {"data": [[1.0, 143.0]], "isOverall": false, "label": "https://www.google-analytics.com/j/collect?v=1&_v=j99&a=1576582099&t=pageview&_s=1&dl=https%3A%2F%2Fpharma-shop.tn%2F&dr=https%3A%2F%2Fwww.google.com%2F&ul=fr-fr&de=UTF-8&dt=Votre%20premi%C3%A8re%20parapharmacie%20en%20ligne%20en%20Tunisie&sd=24-bit&sr=1536x864&vp=1531x664&je=0&_u=AACAAEIJAAAAACAAI~&jid=473753450&gjid=218319513&cid=1966698233.1680104207&tid=UA-71713758-1&_gid=582023006.1680254087&_r=1&_slc=1&did=d6YPbH&z=443076985-Aggregated", "isController": false}, {"data": [[1.0, 70.5]], "isOverall": false, "label": "https://pharma-shop.tn/-50", "isController": false}, {"data": [[1.0, 70.5]], "isOverall": false, "label": "https://pharma-shop.tn/-50-Aggregated", "isController": false}, {"data": [[1.0, 70.0]], "isOverall": false, "label": "https://pharma-shop.tn/-51", "isController": false}, {"data": [[1.0, 70.0]], "isOverall": false, "label": "https://pharma-shop.tn/-51-Aggregated", "isController": false}, {"data": [[1.0, 94.5]], "isOverall": false, "label": "https://pharma-shop.tn/-54", "isController": false}, {"data": [[1.0, 94.5]], "isOverall": false, "label": "https://pharma-shop.tn/-54-Aggregated", "isController": false}, {"data": [[1.0, 92.5]], "isOverall": false, "label": "https://pharma-shop.tn/-55", "isController": false}, {"data": [[1.0, 92.5]], "isOverall": false, "label": "https://pharma-shop.tn/-55-Aggregated", "isController": false}, {"data": [[1.0, 68.5]], "isOverall": false, "label": "https://pharma-shop.tn/-52", "isController": false}, {"data": [[1.0, 68.5]], "isOverall": false, "label": "https://pharma-shop.tn/-52-Aggregated", "isController": false}, {"data": [[1.0, 125.0]], "isOverall": false, "label": "https://pharma-shop.tn/-53", "isController": false}, {"data": [[1.0, 125.0]], "isOverall": false, "label": "https://pharma-shop.tn/-53-Aggregated", "isController": false}, {"data": [[1.0, 45.0]], "isOverall": false, "label": "https://pharma-shop.tn/-58", "isController": false}, {"data": [[1.0, 45.0]], "isOverall": false, "label": "https://pharma-shop.tn/-58-Aggregated", "isController": false}, {"data": [[1.0, 44.0]], "isOverall": false, "label": "https://pharma-shop.tn/-59", "isController": false}, {"data": [[1.0, 44.0]], "isOverall": false, "label": "https://pharma-shop.tn/-59-Aggregated", "isController": false}, {"data": [[1.0, 37.5]], "isOverall": false, "label": "https://pharma-shop.tn/-56", "isController": false}, {"data": [[1.0, 37.5]], "isOverall": false, "label": "https://pharma-shop.tn/-56-Aggregated", "isController": false}, {"data": [[1.0, 47.0]], "isOverall": false, "label": "https://pharma-shop.tn/-57", "isController": false}, {"data": [[1.0, 47.0]], "isOverall": false, "label": "https://pharma-shop.tn/-57-Aggregated", "isController": false}, {"data": [[1.0, 9019.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.0, 9019.0]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[1.0, 118.5]], "isOverall": false, "label": "https://translations.smartsuppcdn.com/api/v1/widget/translations/lang/fr/defaults", "isController": false}, {"data": [[1.0, 118.5]], "isOverall": false, "label": "https://translations.smartsuppcdn.com/api/v1/widget/translations/lang/fr/defaults-Aggregated", "isController": false}, {"data": [[1.0, 65.5]], "isOverall": false, "label": "https://pharma-shop.tn/-40", "isController": false}, {"data": [[1.0, 65.5]], "isOverall": false, "label": "https://pharma-shop.tn/-40-Aggregated", "isController": false}, {"data": [[1.0, 49.0]], "isOverall": false, "label": "https://pharma-shop.tn/-43", "isController": false}, {"data": [[1.0, 49.0]], "isOverall": false, "label": "https://pharma-shop.tn/-43-Aggregated", "isController": false}, {"data": [[1.0, 51.5]], "isOverall": false, "label": "https://pharma-shop.tn/-44", "isController": false}, {"data": [[1.0, 51.5]], "isOverall": false, "label": "https://pharma-shop.tn/-44-Aggregated", "isController": false}, {"data": [[1.0, 192.0]], "isOverall": false, "label": "https://stats.g.doubleclick.net/j/collect?t=dc&aip=1&_r=3&v=1&_v=j99&tid=UA-71713758-1&cid=1966698233.1680104207&jid=473753450&gjid=218319513&_gid=582023006.1680254087&_u=AACAAEIIAAAAACAAI~&z=1446073229", "isController": false}, {"data": [[1.0, 192.0]], "isOverall": false, "label": "https://stats.g.doubleclick.net/j/collect?t=dc&aip=1&_r=3&v=1&_v=j99&tid=UA-71713758-1&cid=1966698233.1680104207&jid=473753450&gjid=218319513&_gid=582023006.1680254087&_u=AACAAEIIAAAAACAAI~&z=1446073229-Aggregated", "isController": false}, {"data": [[1.0, 66.0]], "isOverall": false, "label": "https://pharma-shop.tn/-41", "isController": false}, {"data": [[1.0, 66.0]], "isOverall": false, "label": "https://pharma-shop.tn/-41-Aggregated", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://pharma-shop.tn/-42", "isController": false}, {"data": [[1.0, 57.0]], "isOverall": false, "label": "https://pharma-shop.tn/-42-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://pharma-shop.tn/-47", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://pharma-shop.tn/-47-Aggregated", "isController": false}, {"data": [[1.0, 61.5]], "isOverall": false, "label": "https://pharma-shop.tn/-48", "isController": false}, {"data": [[1.0, 61.5]], "isOverall": false, "label": "https://pharma-shop.tn/-48-Aggregated", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://pharma-shop.tn/-45", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://pharma-shop.tn/-45-Aggregated", "isController": false}, {"data": [[1.0, 53.5]], "isOverall": false, "label": "https://pharma-shop.tn/-46", "isController": false}, {"data": [[1.0, 53.5]], "isOverall": false, "label": "https://pharma-shop.tn/-46-Aggregated", "isController": false}, {"data": [[1.0, 46.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp-1", "isController": false}, {"data": [[1.0, 46.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp-1-Aggregated", "isController": false}, {"data": [[1.0, 135.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp-2", "isController": false}, {"data": [[1.0, 135.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp-2-Aggregated", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "https://pharma-shop.tn/-49", "isController": false}, {"data": [[1.0, 61.0]], "isOverall": false, "label": "https://pharma-shop.tn/-49-Aggregated", "isController": false}, {"data": [[1.0, 1188.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp-0", "isController": false}, {"data": [[1.0, 1188.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp-0-Aggregated", "isController": false}, {"data": [[1.0, 85.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=pharmashop&cp=0&client=desktop-gws-wiz-on-focus-serp&xssi=t&hl=fr-TN&authuser=0&pq=pharmashop&psi=iKUmZPv1G7ypkdUP4pSpgAo.1680254346734&ofp=EAEypQEKCgoIcGFyYXNob3AKFAoScGhhcm1hc2hvcCB0dW5pc2llChMKEXBoYXJtYXNob3Agc291c3NlCg8KDXBhcmFwaGFybWFjaWUKFwoVcGhhcm1hc2hvcCBtYXF1aWxsYWdlChMKEXBoYXJtYXNob3Agb25saW5lChQKEnBoYXJtYXNob3AgY29udGFjdAoVChNwaGFybWFzaG9wIGJvbiBwbGFuEEc&dpr=1.25", "isController": false}, {"data": [[1.0, 85.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=pharmashop&cp=0&client=desktop-gws-wiz-on-focus-serp&xssi=t&hl=fr-TN&authuser=0&pq=pharmashop&psi=iKUmZPv1G7ypkdUP4pSpgAo.1680254346734&ofp=EAEypQEKCgoIcGFyYXNob3AKFAoScGhhcm1hc2hvcCB0dW5pc2llChMKEXBoYXJtYXNob3Agc291c3NlCg8KDXBhcmFwaGFybWFjaWUKFwoVcGhhcm1hc2hvcCBtYXF1aWxsYWdlChMKEXBoYXJtYXNob3Agb25saW5lChQKEnBoYXJtYXNob3AgY29udGFjdAoVChNwaGFybWFzaG9wIGJvbiBwbGFuEEc&dpr=1.25-Aggregated", "isController": false}, {"data": [[1.0, 731.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=p&cp=1&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=google&psi=VqUmZILfJemrkdUP7PyLkAk.1680254295265&dpr=1.25", "isController": false}, {"data": [[1.0, 731.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=p&cp=1&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=google&psi=VqUmZILfJemrkdUP7PyLkAk.1680254295265&dpr=1.25-Aggregated", "isController": false}, {"data": [[1.0, 37.5]], "isOverall": false, "label": "https://pharma-shop.tn/-72", "isController": false}, {"data": [[1.0, 37.5]], "isOverall": false, "label": "https://pharma-shop.tn/-72-Aggregated", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-73", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-73-Aggregated", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "https://pharma-shop.tn/-70", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "https://pharma-shop.tn/-70-Aggregated", "isController": false}, {"data": [[1.0, 40.0]], "isOverall": false, "label": "https://pharma-shop.tn/-71", "isController": false}, {"data": [[1.0, 40.0]], "isOverall": false, "label": "https://pharma-shop.tn/-71-Aggregated", "isController": false}, {"data": [[1.0, 39.5]], "isOverall": false, "label": "https://pharma-shop.tn/-76", "isController": false}, {"data": [[1.0, 39.5]], "isOverall": false, "label": "https://pharma-shop.tn/-76-Aggregated", "isController": false}, {"data": [[1.0, 41.5]], "isOverall": false, "label": "https://pharma-shop.tn/-77", "isController": false}, {"data": [[1.0, 41.5]], "isOverall": false, "label": "https://pharma-shop.tn/-77-Aggregated", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-74", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-74-Aggregated", "isController": false}, {"data": [[1.0, 43.5]], "isOverall": false, "label": "https://pharma-shop.tn/-75", "isController": false}, {"data": [[1.0, 43.5]], "isOverall": false, "label": "https://pharma-shop.tn/-75-Aggregated", "isController": false}, {"data": [[1.0, 90.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=pha&cp=3&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=google&psi=VqUmZILfJemrkdUP7PyLkAk.1680254295265&dpr=1.25", "isController": false}, {"data": [[1.0, 90.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=pha&cp=3&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=google&psi=VqUmZILfJemrkdUP7PyLkAk.1680254295265&dpr=1.25-Aggregated", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "https://pharma-shop.tn/-78", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "https://pharma-shop.tn/-78-Aggregated", "isController": false}, {"data": [[1.0, 72.0]], "isOverall": false, "label": "https://pharma-shop.tn/-79", "isController": false}, {"data": [[1.0, 72.0]], "isOverall": false, "label": "https://pharma-shop.tn/-79-Aggregated", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "https://pharma-shop.tn/-109", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "https://pharma-shop.tn/-109-Aggregated", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-108", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-108-Aggregated", "isController": false}, {"data": [[1.0, 37.5]], "isOverall": false, "label": "https://pharma-shop.tn/-107", "isController": false}, {"data": [[1.0, 37.5]], "isOverall": false, "label": "https://pharma-shop.tn/-107-Aggregated", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-106", "isController": false}, {"data": [[1.0, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-106-Aggregated", "isController": false}, {"data": [[1.0, 40.0]], "isOverall": false, "label": "https://pharma-shop.tn/-105", "isController": false}, {"data": [[1.0, 40.0]], "isOverall": false, "label": "https://pharma-shop.tn/-105-Aggregated", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "https://pharma-shop.tn/-104", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "https://pharma-shop.tn/-104-Aggregated", "isController": false}, {"data": [[1.0, 36.0]], "isOverall": false, "label": "https://pharma-shop.tn/-103", "isController": false}, {"data": [[1.0, 36.0]], "isOverall": false, "label": "https://pharma-shop.tn/-103-Aggregated", "isController": false}, {"data": [[1.0, 37.5]], "isOverall": false, "label": "https://pharma-shop.tn/-102", "isController": false}, {"data": [[1.0, 37.5]], "isOverall": false, "label": "https://pharma-shop.tn/-102-Aggregated", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "https://pharma-shop.tn/-101", "isController": false}, {"data": [[1.0, 39.0]], "isOverall": false, "label": "https://pharma-shop.tn/-101-Aggregated", "isController": false}, {"data": [[1.0, 35.5]], "isOverall": false, "label": "https://pharma-shop.tn/-100", "isController": false}, {"data": [[1.0, 35.5]], "isOverall": false, "label": "https://pharma-shop.tn/-100-Aggregated", "isController": false}, {"data": [[1.0, 96.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=ph&cp=2&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=google&psi=VqUmZILfJemrkdUP7PyLkAk.1680254295265&dpr=1.25", "isController": false}, {"data": [[1.0, 96.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=ph&cp=2&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=google&psi=VqUmZILfJemrkdUP7PyLkAk.1680254295265&dpr=1.25-Aggregated", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "https://pharma-shop.tn/-61", "isController": false}, {"data": [[1.0, 38.0]], "isOverall": false, "label": "https://pharma-shop.tn/-61-Aggregated", "isController": false}, {"data": [[1.0, 39.5]], "isOverall": false, "label": "https://pharma-shop.tn/-62", "isController": false}, {"data": [[1.0, 39.5]], "isOverall": false, "label": "https://pharma-shop.tn/-62-Aggregated", "isController": false}, {"data": [[1.0, 44.5]], "isOverall": false, "label": "https://pharma-shop.tn/-60", "isController": false}, {"data": [[1.0, 44.5]], "isOverall": false, "label": "https://pharma-shop.tn/-60-Aggregated", "isController": false}, {"data": [[1.0, 47.5]], "isOverall": false, "label": "https://pharma-shop.tn/-65", "isController": false}, {"data": [[1.0, 47.5]], "isOverall": false, "label": "https://pharma-shop.tn/-65-Aggregated", "isController": false}, {"data": [[1.0, 43.5]], "isOverall": false, "label": "https://pharma-shop.tn/-66", "isController": false}, {"data": [[1.0, 43.5]], "isOverall": false, "label": "https://pharma-shop.tn/-66-Aggregated", "isController": false}, {"data": [[1.0, 36.5]], "isOverall": false, "label": "https://pharma-shop.tn/-63", "isController": false}, {"data": [[1.0, 36.5]], "isOverall": false, "label": "https://pharma-shop.tn/-63-Aggregated", "isController": false}, {"data": [[1.0, 43.5]], "isOverall": false, "label": "https://pharma-shop.tn/-64", "isController": false}, {"data": [[1.0, 43.5]], "isOverall": false, "label": "https://pharma-shop.tn/-64-Aggregated", "isController": false}, {"data": [[1.0, 36.0]], "isOverall": false, "label": "https://pharma-shop.tn/-69", "isController": false}, {"data": [[1.0, 36.0]], "isOverall": false, "label": "https://pharma-shop.tn/-69-Aggregated", "isController": false}, {"data": [[1.0, 48.5]], "isOverall": false, "label": "https://pharma-shop.tn/-67", "isController": false}, {"data": [[1.0, 48.5]], "isOverall": false, "label": "https://pharma-shop.tn/-67-Aggregated", "isController": false}, {"data": [[1.0, 37.5]], "isOverall": false, "label": "https://pharma-shop.tn/-68", "isController": false}, {"data": [[1.0, 37.5]], "isOverall": false, "label": "https://pharma-shop.tn/-68-Aggregated", "isController": false}, {"data": [[1.0, 475.0]], "isOverall": false, "label": "https://pharma-shop.tn/module/ets_sociallogin/oauth", "isController": false}, {"data": [[1.0, 475.0]], "isOverall": false, "label": "https://pharma-shop.tn/module/ets_sociallogin/oauth-Aggregated", "isController": false}, {"data": [[1.0, 189.5]], "isOverall": false, "label": "https://pharma-shop.tn/-119", "isController": false}, {"data": [[1.0, 189.5]], "isOverall": false, "label": "https://pharma-shop.tn/-119-Aggregated", "isController": false}, {"data": [[1.0, 50.5]], "isOverall": false, "label": "https://pharma-shop.tn/-118", "isController": false}, {"data": [[1.0, 50.5]], "isOverall": false, "label": "https://pharma-shop.tn/-118-Aggregated", "isController": false}, {"data": [[1.0, 57.5]], "isOverall": false, "label": "https://pharma-shop.tn/-117", "isController": false}, {"data": [[1.0, 57.5]], "isOverall": false, "label": "https://pharma-shop.tn/-117-Aggregated", "isController": false}, {"data": [[1.0, 43.0]], "isOverall": false, "label": "https://pharma-shop.tn/-116", "isController": false}, {"data": [[1.0, 43.0]], "isOverall": false, "label": "https://pharma-shop.tn/-116-Aggregated", "isController": false}, {"data": [[1.0, 58.5]], "isOverall": false, "label": "https://pharma-shop.tn/-115", "isController": false}, {"data": [[1.0, 58.5]], "isOverall": false, "label": "https://pharma-shop.tn/-115-Aggregated", "isController": false}, {"data": [[1.0, 65.5]], "isOverall": false, "label": "https://pharma-shop.tn/-114", "isController": false}, {"data": [[1.0, 65.5]], "isOverall": false, "label": "https://pharma-shop.tn/-114-Aggregated", "isController": false}, {"data": [[1.0, 46.5]], "isOverall": false, "label": "https://pharma-shop.tn/-113", "isController": false}, {"data": [[1.0, 46.5]], "isOverall": false, "label": "https://pharma-shop.tn/-113-Aggregated", "isController": false}, {"data": [[1.0, 50.0]], "isOverall": false, "label": "https://pharma-shop.tn/-112", "isController": false}, {"data": [[1.0, 50.0]], "isOverall": false, "label": "https://pharma-shop.tn/-112-Aggregated", "isController": false}, {"data": [[1.0, 53.0]], "isOverall": false, "label": "https://pharma-shop.tn/-111", "isController": false}, {"data": [[1.0, 53.0]], "isOverall": false, "label": "https://pharma-shop.tn/-111-Aggregated", "isController": false}, {"data": [[1.0, 74.5]], "isOverall": false, "label": "https://pharma-shop.tn/-110", "isController": false}, {"data": [[1.0, 74.5]], "isOverall": false, "label": "https://pharma-shop.tn/-110-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 7033.15, "minX": 1.68025674E12, "maxY": 302492.01666666666, "series": [{"data": [[1.68025674E12, 302492.01666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.68025674E12, 7033.15]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68025674E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 34.0, "minX": 1.68025674E12, "maxY": 9019.0, "series": [{"data": [[1.68025674E12, 1046.0]], "isOverall": false, "label": "https://pharma-shop.tn/-2", "isController": false}, {"data": [[1.68025674E12, 256.6666666666667]], "isOverall": false, "label": "https://pharma-shop.tn/-1", "isController": false}, {"data": [[1.68025674E12, 567.6666666666666]], "isOverall": false, "label": "https://pharma-shop.tn/-0", "isController": false}, {"data": [[1.68025674E12, 111.0]], "isOverall": false, "label": "https://pharma-shop.tn/-6", "isController": false}, {"data": [[1.68025674E12, 50.5]], "isOverall": false, "label": "https://pharma-shop.tn/-90", "isController": false}, {"data": [[1.68025674E12, 42.5]], "isOverall": false, "label": "https://pharma-shop.tn/-5", "isController": false}, {"data": [[1.68025674E12, 40.5]], "isOverall": false, "label": "https://pharma-shop.tn/-91", "isController": false}, {"data": [[1.68025674E12, 114.5]], "isOverall": false, "label": "https://pharma-shop.tn/-4", "isController": false}, {"data": [[1.68025674E12, 81.5]], "isOverall": false, "label": "https://pharma-shop.tn/-3", "isController": false}, {"data": [[1.68025674E12, 39.5]], "isOverall": false, "label": "https://pharma-shop.tn/-94", "isController": false}, {"data": [[1.68025674E12, 181.5]], "isOverall": false, "label": "https://pharma-shop.tn/-9", "isController": false}, {"data": [[1.68025674E12, 34.0]], "isOverall": false, "label": "https://pharma-shop.tn/-95", "isController": false}, {"data": [[1.68025674E12, 49.0]], "isOverall": false, "label": "https://pharma-shop.tn/-8", "isController": false}, {"data": [[1.68025674E12, 39.0]], "isOverall": false, "label": "https://pharma-shop.tn/-92", "isController": false}, {"data": [[1.68025674E12, 51.0]], "isOverall": false, "label": "https://pharma-shop.tn/-7", "isController": false}, {"data": [[1.68025674E12, 40.5]], "isOverall": false, "label": "https://pharma-shop.tn/-93", "isController": false}, {"data": [[1.68025674E12, 58.5]], "isOverall": false, "label": "https://pharma-shop.tn/-10", "isController": false}, {"data": [[1.68025674E12, 38.0]], "isOverall": false, "label": "https://pharma-shop.tn/-98", "isController": false}, {"data": [[1.68025674E12, 1393.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp", "isController": false}, {"data": [[1.68025674E12, 104.0]], "isOverall": false, "label": "https://pharma-shop.tn/-11", "isController": false}, {"data": [[1.68025674E12, 43.0]], "isOverall": false, "label": "https://pharma-shop.tn/-99", "isController": false}, {"data": [[1.68025674E12, 42.0]], "isOverall": false, "label": "https://pharma-shop.tn/-96", "isController": false}, {"data": [[1.68025674E12, 38.5]], "isOverall": false, "label": "https://pharma-shop.tn/-97", "isController": false}, {"data": [[1.68025674E12, 200.5]], "isOverall": false, "label": "https://pharma-shop.tn/-14", "isController": false}, {"data": [[1.68025674E12, 131.5]], "isOverall": false, "label": "https://pharma-shop.tn/-15", "isController": false}, {"data": [[1.68025674E12, 136.0]], "isOverall": false, "label": "https://pharma-shop.tn/-12", "isController": false}, {"data": [[1.68025674E12, 152.5]], "isOverall": false, "label": "https://pharma-shop.tn/-13", "isController": false}, {"data": [[1.68025674E12, 204.0]], "isOverall": false, "label": "https://pharma-shop.tn/-18", "isController": false}, {"data": [[1.68025674E12, 156.5]], "isOverall": false, "label": "https://pharma-shop.tn/-19", "isController": false}, {"data": [[1.68025674E12, 145.0]], "isOverall": false, "label": "https://pharma-shop.tn/-16", "isController": false}, {"data": [[1.68025674E12, 146.5]], "isOverall": false, "label": "https://pharma-shop.tn/-17", "isController": false}, {"data": [[1.68025674E12, 36.0]], "isOverall": false, "label": "https://pharma-shop.tn/-80", "isController": false}, {"data": [[1.68025674E12, 43.0]], "isOverall": false, "label": "https://pharma-shop.tn/-83", "isController": false}, {"data": [[1.68025674E12, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-84", "isController": false}, {"data": [[1.68025674E12, 43.5]], "isOverall": false, "label": "https://pharma-shop.tn/-81", "isController": false}, {"data": [[1.68025674E12, 45.5]], "isOverall": false, "label": "https://pharma-shop.tn/-82", "isController": false}, {"data": [[1.68025674E12, 47.5]], "isOverall": false, "label": "https://pharma-shop.tn/-87", "isController": false}, {"data": [[1.68025674E12, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-88", "isController": false}, {"data": [[1.68025674E12, 39.5]], "isOverall": false, "label": "https://pharma-shop.tn/-85", "isController": false}, {"data": [[1.68025674E12, 41.0]], "isOverall": false, "label": "https://pharma-shop.tn/-86", "isController": false}, {"data": [[1.68025674E12, 44.0]], "isOverall": false, "label": "https://pharma-shop.tn/-89", "isController": false}, {"data": [[1.68025674E12, 40.0]], "isOverall": false, "label": "https://www.google-analytics.com/j/collect?v=1&_v=j99&a=382515470&t=pageview&_s=1&dl=https%3A%2F%2Fpharma-shop.tn%2F&ul=fr-fr&de=UTF-8&dt=Votre%20premi%C3%A8re%20parapharmacie%20en%20ligne%20en%20Tunisie&sd=24-bit&sr=1536x864&vp=1531x664&je=0&_u=AACAAEIJAAAAACAAI~&jid=&gjid=&cid=1966698233.1680104207&tid=UA-71713758-1&_gid=582023006.1680254087&_slc=1&did=d6YPbH&z=462389109", "isController": false}, {"data": [[1.68025674E12, 190.0]], "isOverall": false, "label": "https://bootstrap.smartsuppchat.com/widget/b9690c990e4111de60bc2b144aa143172e19e795.json", "isController": false}, {"data": [[1.68025674E12, 2401.5]], "isOverall": false, "label": "https://pharma-shop.tn/", "isController": false}, {"data": [[1.68025674E12, 55.5]], "isOverall": false, "label": "https://pharma-shop.tn/-32", "isController": false}, {"data": [[1.68025674E12, 52.0]], "isOverall": false, "label": "https://pharma-shop.tn/-33", "isController": false}, {"data": [[1.68025674E12, 55.0]], "isOverall": false, "label": "https://pharma-shop.tn/-30", "isController": false}, {"data": [[1.68025674E12, 49.0]], "isOverall": false, "label": "https://pharma-shop.tn/-31", "isController": false}, {"data": [[1.68025674E12, 47.0]], "isOverall": false, "label": "https://pharma-shop.tn/-36", "isController": false}, {"data": [[1.68025674E12, 54.0]], "isOverall": false, "label": "https://pharma-shop.tn/-37", "isController": false}, {"data": [[1.68025674E12, 55.0]], "isOverall": false, "label": "https://pharma-shop.tn/-34", "isController": false}, {"data": [[1.68025674E12, 57.0]], "isOverall": false, "label": "https://pharma-shop.tn/-35", "isController": false}, {"data": [[1.68025674E12, 119.5]], "isOverall": false, "label": "https://widget-v2.smartsuppcdn.com/asset-manifest.json", "isController": false}, {"data": [[1.68025674E12, 54.5]], "isOverall": false, "label": "https://pharma-shop.tn/-38", "isController": false}, {"data": [[1.68025674E12, 56.0]], "isOverall": false, "label": "https://pharma-shop.tn/-39", "isController": false}, {"data": [[1.68025674E12, 115.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q&cp=0&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=pharmashop&psi=iKUmZPv1G7ypkdUP4pSpgAo.1680254346734&dpr=1.25", "isController": false}, {"data": [[1.68025674E12, 223.0]], "isOverall": false, "label": "https://pharma-shop.tn/-21", "isController": false}, {"data": [[1.68025674E12, 681.0]], "isOverall": false, "label": "https://pharma-shop.tn/-22", "isController": false}, {"data": [[1.68025674E12, 302.0]], "isOverall": false, "label": "https://pharma-shop.tn/-20", "isController": false}, {"data": [[1.68025674E12, 75.0]], "isOverall": false, "label": "https://pharma-shop.tn/-25", "isController": false}, {"data": [[1.68025674E12, 48.5]], "isOverall": false, "label": "https://pharma-shop.tn/-26", "isController": false}, {"data": [[1.68025674E12, 648.0]], "isOverall": false, "label": "https://pharma-shop.tn/-23", "isController": false}, {"data": [[1.68025674E12, 68.5]], "isOverall": false, "label": "https://pharma-shop.tn/-24", "isController": false}, {"data": [[1.68025674E12, 140.5]], "isOverall": false, "label": "https://pharma-shop.tn/-29", "isController": false}, {"data": [[1.68025674E12, 55.0]], "isOverall": false, "label": "https://pharma-shop.tn/-27", "isController": false}, {"data": [[1.68025674E12, 51.5]], "isOverall": false, "label": "https://pharma-shop.tn/-28", "isController": false}, {"data": [[1.68025674E12, 143.0]], "isOverall": false, "label": "https://www.google-analytics.com/j/collect?v=1&_v=j99&a=1576582099&t=pageview&_s=1&dl=https%3A%2F%2Fpharma-shop.tn%2F&dr=https%3A%2F%2Fwww.google.com%2F&ul=fr-fr&de=UTF-8&dt=Votre%20premi%C3%A8re%20parapharmacie%20en%20ligne%20en%20Tunisie&sd=24-bit&sr=1536x864&vp=1531x664&je=0&_u=AACAAEIJAAAAACAAI~&jid=473753450&gjid=218319513&cid=1966698233.1680104207&tid=UA-71713758-1&_gid=582023006.1680254087&_r=1&_slc=1&did=d6YPbH&z=443076985", "isController": false}, {"data": [[1.68025674E12, 70.5]], "isOverall": false, "label": "https://pharma-shop.tn/-50", "isController": false}, {"data": [[1.68025674E12, 70.0]], "isOverall": false, "label": "https://pharma-shop.tn/-51", "isController": false}, {"data": [[1.68025674E12, 94.5]], "isOverall": false, "label": "https://pharma-shop.tn/-54", "isController": false}, {"data": [[1.68025674E12, 92.5]], "isOverall": false, "label": "https://pharma-shop.tn/-55", "isController": false}, {"data": [[1.68025674E12, 68.5]], "isOverall": false, "label": "https://pharma-shop.tn/-52", "isController": false}, {"data": [[1.68025674E12, 125.0]], "isOverall": false, "label": "https://pharma-shop.tn/-53", "isController": false}, {"data": [[1.68025674E12, 45.0]], "isOverall": false, "label": "https://pharma-shop.tn/-58", "isController": false}, {"data": [[1.68025674E12, 44.0]], "isOverall": false, "label": "https://pharma-shop.tn/-59", "isController": false}, {"data": [[1.68025674E12, 37.5]], "isOverall": false, "label": "https://pharma-shop.tn/-56", "isController": false}, {"data": [[1.68025674E12, 47.0]], "isOverall": false, "label": "https://pharma-shop.tn/-57", "isController": false}, {"data": [[1.68025674E12, 9019.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.68025674E12, 118.5]], "isOverall": false, "label": "https://translations.smartsuppcdn.com/api/v1/widget/translations/lang/fr/defaults", "isController": false}, {"data": [[1.68025674E12, 65.5]], "isOverall": false, "label": "https://pharma-shop.tn/-40", "isController": false}, {"data": [[1.68025674E12, 49.0]], "isOverall": false, "label": "https://pharma-shop.tn/-43", "isController": false}, {"data": [[1.68025674E12, 51.5]], "isOverall": false, "label": "https://pharma-shop.tn/-44", "isController": false}, {"data": [[1.68025674E12, 192.0]], "isOverall": false, "label": "https://stats.g.doubleclick.net/j/collect?t=dc&aip=1&_r=3&v=1&_v=j99&tid=UA-71713758-1&cid=1966698233.1680104207&jid=473753450&gjid=218319513&_gid=582023006.1680254087&_u=AACAAEIIAAAAACAAI~&z=1446073229", "isController": false}, {"data": [[1.68025674E12, 66.0]], "isOverall": false, "label": "https://pharma-shop.tn/-41", "isController": false}, {"data": [[1.68025674E12, 57.0]], "isOverall": false, "label": "https://pharma-shop.tn/-42", "isController": false}, {"data": [[1.68025674E12, 59.0]], "isOverall": false, "label": "https://pharma-shop.tn/-47", "isController": false}, {"data": [[1.68025674E12, 61.5]], "isOverall": false, "label": "https://pharma-shop.tn/-48", "isController": false}, {"data": [[1.68025674E12, 58.0]], "isOverall": false, "label": "https://pharma-shop.tn/-45", "isController": false}, {"data": [[1.68025674E12, 53.5]], "isOverall": false, "label": "https://pharma-shop.tn/-46", "isController": false}, {"data": [[1.68025674E12, 46.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp-1", "isController": false}, {"data": [[1.68025674E12, 135.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp-2", "isController": false}, {"data": [[1.68025674E12, 61.0]], "isOverall": false, "label": "https://pharma-shop.tn/-49", "isController": false}, {"data": [[1.68025674E12, 1188.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp-0", "isController": false}, {"data": [[1.68025674E12, 85.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=pharmashop&cp=0&client=desktop-gws-wiz-on-focus-serp&xssi=t&hl=fr-TN&authuser=0&pq=pharmashop&psi=iKUmZPv1G7ypkdUP4pSpgAo.1680254346734&ofp=EAEypQEKCgoIcGFyYXNob3AKFAoScGhhcm1hc2hvcCB0dW5pc2llChMKEXBoYXJtYXNob3Agc291c3NlCg8KDXBhcmFwaGFybWFjaWUKFwoVcGhhcm1hc2hvcCBtYXF1aWxsYWdlChMKEXBoYXJtYXNob3Agb25saW5lChQKEnBoYXJtYXNob3AgY29udGFjdAoVChNwaGFybWFzaG9wIGJvbiBwbGFuEEc&dpr=1.25", "isController": false}, {"data": [[1.68025674E12, 731.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=p&cp=1&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=google&psi=VqUmZILfJemrkdUP7PyLkAk.1680254295265&dpr=1.25", "isController": false}, {"data": [[1.68025674E12, 37.5]], "isOverall": false, "label": "https://pharma-shop.tn/-72", "isController": false}, {"data": [[1.68025674E12, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-73", "isController": false}, {"data": [[1.68025674E12, 38.0]], "isOverall": false, "label": "https://pharma-shop.tn/-70", "isController": false}, {"data": [[1.68025674E12, 40.0]], "isOverall": false, "label": "https://pharma-shop.tn/-71", "isController": false}, {"data": [[1.68025674E12, 39.5]], "isOverall": false, "label": "https://pharma-shop.tn/-76", "isController": false}, {"data": [[1.68025674E12, 41.5]], "isOverall": false, "label": "https://pharma-shop.tn/-77", "isController": false}, {"data": [[1.68025674E12, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-74", "isController": false}, {"data": [[1.68025674E12, 43.5]], "isOverall": false, "label": "https://pharma-shop.tn/-75", "isController": false}, {"data": [[1.68025674E12, 90.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=pha&cp=3&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=google&psi=VqUmZILfJemrkdUP7PyLkAk.1680254295265&dpr=1.25", "isController": false}, {"data": [[1.68025674E12, 39.0]], "isOverall": false, "label": "https://pharma-shop.tn/-78", "isController": false}, {"data": [[1.68025674E12, 72.0]], "isOverall": false, "label": "https://pharma-shop.tn/-79", "isController": false}, {"data": [[1.68025674E12, 39.0]], "isOverall": false, "label": "https://pharma-shop.tn/-109", "isController": false}, {"data": [[1.68025674E12, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-108", "isController": false}, {"data": [[1.68025674E12, 37.5]], "isOverall": false, "label": "https://pharma-shop.tn/-107", "isController": false}, {"data": [[1.68025674E12, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-106", "isController": false}, {"data": [[1.68025674E12, 40.0]], "isOverall": false, "label": "https://pharma-shop.tn/-105", "isController": false}, {"data": [[1.68025674E12, 39.0]], "isOverall": false, "label": "https://pharma-shop.tn/-104", "isController": false}, {"data": [[1.68025674E12, 36.0]], "isOverall": false, "label": "https://pharma-shop.tn/-103", "isController": false}, {"data": [[1.68025674E12, 37.5]], "isOverall": false, "label": "https://pharma-shop.tn/-102", "isController": false}, {"data": [[1.68025674E12, 39.0]], "isOverall": false, "label": "https://pharma-shop.tn/-101", "isController": false}, {"data": [[1.68025674E12, 35.5]], "isOverall": false, "label": "https://pharma-shop.tn/-100", "isController": false}, {"data": [[1.68025674E12, 96.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=ph&cp=2&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=google&psi=VqUmZILfJemrkdUP7PyLkAk.1680254295265&dpr=1.25", "isController": false}, {"data": [[1.68025674E12, 38.0]], "isOverall": false, "label": "https://pharma-shop.tn/-61", "isController": false}, {"data": [[1.68025674E12, 39.5]], "isOverall": false, "label": "https://pharma-shop.tn/-62", "isController": false}, {"data": [[1.68025674E12, 44.5]], "isOverall": false, "label": "https://pharma-shop.tn/-60", "isController": false}, {"data": [[1.68025674E12, 47.5]], "isOverall": false, "label": "https://pharma-shop.tn/-65", "isController": false}, {"data": [[1.68025674E12, 43.5]], "isOverall": false, "label": "https://pharma-shop.tn/-66", "isController": false}, {"data": [[1.68025674E12, 36.5]], "isOverall": false, "label": "https://pharma-shop.tn/-63", "isController": false}, {"data": [[1.68025674E12, 43.5]], "isOverall": false, "label": "https://pharma-shop.tn/-64", "isController": false}, {"data": [[1.68025674E12, 36.0]], "isOverall": false, "label": "https://pharma-shop.tn/-69", "isController": false}, {"data": [[1.68025674E12, 48.5]], "isOverall": false, "label": "https://pharma-shop.tn/-67", "isController": false}, {"data": [[1.68025674E12, 37.5]], "isOverall": false, "label": "https://pharma-shop.tn/-68", "isController": false}, {"data": [[1.68025674E12, 475.0]], "isOverall": false, "label": "https://pharma-shop.tn/module/ets_sociallogin/oauth", "isController": false}, {"data": [[1.68025674E12, 189.5]], "isOverall": false, "label": "https://pharma-shop.tn/-119", "isController": false}, {"data": [[1.68025674E12, 50.5]], "isOverall": false, "label": "https://pharma-shop.tn/-118", "isController": false}, {"data": [[1.68025674E12, 57.5]], "isOverall": false, "label": "https://pharma-shop.tn/-117", "isController": false}, {"data": [[1.68025674E12, 43.0]], "isOverall": false, "label": "https://pharma-shop.tn/-116", "isController": false}, {"data": [[1.68025674E12, 58.5]], "isOverall": false, "label": "https://pharma-shop.tn/-115", "isController": false}, {"data": [[1.68025674E12, 65.5]], "isOverall": false, "label": "https://pharma-shop.tn/-114", "isController": false}, {"data": [[1.68025674E12, 46.5]], "isOverall": false, "label": "https://pharma-shop.tn/-113", "isController": false}, {"data": [[1.68025674E12, 50.0]], "isOverall": false, "label": "https://pharma-shop.tn/-112", "isController": false}, {"data": [[1.68025674E12, 53.0]], "isOverall": false, "label": "https://pharma-shop.tn/-111", "isController": false}, {"data": [[1.68025674E12, 74.5]], "isOverall": false, "label": "https://pharma-shop.tn/-110", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68025674E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 17.0, "minX": 1.68025674E12, "maxY": 3656.0, "series": [{"data": [[1.68025674E12, 78.5]], "isOverall": false, "label": "https://pharma-shop.tn/-2", "isController": false}, {"data": [[1.68025674E12, 224.66666666666669]], "isOverall": false, "label": "https://pharma-shop.tn/-1", "isController": false}, {"data": [[1.68025674E12, 314.0]], "isOverall": false, "label": "https://pharma-shop.tn/-0", "isController": false}, {"data": [[1.68025674E12, 78.0]], "isOverall": false, "label": "https://pharma-shop.tn/-6", "isController": false}, {"data": [[1.68025674E12, 32.5]], "isOverall": false, "label": "https://pharma-shop.tn/-90", "isController": false}, {"data": [[1.68025674E12, 21.5]], "isOverall": false, "label": "https://pharma-shop.tn/-5", "isController": false}, {"data": [[1.68025674E12, 23.0]], "isOverall": false, "label": "https://pharma-shop.tn/-91", "isController": false}, {"data": [[1.68025674E12, 91.5]], "isOverall": false, "label": "https://pharma-shop.tn/-4", "isController": false}, {"data": [[1.68025674E12, 56.0]], "isOverall": false, "label": "https://pharma-shop.tn/-3", "isController": false}, {"data": [[1.68025674E12, 20.5]], "isOverall": false, "label": "https://pharma-shop.tn/-94", "isController": false}, {"data": [[1.68025674E12, 89.5]], "isOverall": false, "label": "https://pharma-shop.tn/-9", "isController": false}, {"data": [[1.68025674E12, 17.0]], "isOverall": false, "label": "https://pharma-shop.tn/-95", "isController": false}, {"data": [[1.68025674E12, 30.5]], "isOverall": false, "label": "https://pharma-shop.tn/-8", "isController": false}, {"data": [[1.68025674E12, 22.0]], "isOverall": false, "label": "https://pharma-shop.tn/-92", "isController": false}, {"data": [[1.68025674E12, 25.5]], "isOverall": false, "label": "https://pharma-shop.tn/-7", "isController": false}, {"data": [[1.68025674E12, 23.0]], "isOverall": false, "label": "https://pharma-shop.tn/-93", "isController": false}, {"data": [[1.68025674E12, 20.0]], "isOverall": false, "label": "https://pharma-shop.tn/-10", "isController": false}, {"data": [[1.68025674E12, 19.5]], "isOverall": false, "label": "https://pharma-shop.tn/-98", "isController": false}, {"data": [[1.68025674E12, 192.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp", "isController": false}, {"data": [[1.68025674E12, 24.5]], "isOverall": false, "label": "https://pharma-shop.tn/-11", "isController": false}, {"data": [[1.68025674E12, 20.0]], "isOverall": false, "label": "https://pharma-shop.tn/-99", "isController": false}, {"data": [[1.68025674E12, 22.5]], "isOverall": false, "label": "https://pharma-shop.tn/-96", "isController": false}, {"data": [[1.68025674E12, 22.0]], "isOverall": false, "label": "https://pharma-shop.tn/-97", "isController": false}, {"data": [[1.68025674E12, 57.5]], "isOverall": false, "label": "https://pharma-shop.tn/-14", "isController": false}, {"data": [[1.68025674E12, 34.5]], "isOverall": false, "label": "https://pharma-shop.tn/-15", "isController": false}, {"data": [[1.68025674E12, 27.0]], "isOverall": false, "label": "https://pharma-shop.tn/-12", "isController": false}, {"data": [[1.68025674E12, 26.0]], "isOverall": false, "label": "https://pharma-shop.tn/-13", "isController": false}, {"data": [[1.68025674E12, 55.5]], "isOverall": false, "label": "https://pharma-shop.tn/-18", "isController": false}, {"data": [[1.68025674E12, 50.5]], "isOverall": false, "label": "https://pharma-shop.tn/-19", "isController": false}, {"data": [[1.68025674E12, 41.5]], "isOverall": false, "label": "https://pharma-shop.tn/-16", "isController": false}, {"data": [[1.68025674E12, 56.0]], "isOverall": false, "label": "https://pharma-shop.tn/-17", "isController": false}, {"data": [[1.68025674E12, 18.5]], "isOverall": false, "label": "https://pharma-shop.tn/-80", "isController": false}, {"data": [[1.68025674E12, 23.0]], "isOverall": false, "label": "https://pharma-shop.tn/-83", "isController": false}, {"data": [[1.68025674E12, 21.0]], "isOverall": false, "label": "https://pharma-shop.tn/-84", "isController": false}, {"data": [[1.68025674E12, 24.0]], "isOverall": false, "label": "https://pharma-shop.tn/-81", "isController": false}, {"data": [[1.68025674E12, 25.5]], "isOverall": false, "label": "https://pharma-shop.tn/-82", "isController": false}, {"data": [[1.68025674E12, 29.5]], "isOverall": false, "label": "https://pharma-shop.tn/-87", "isController": false}, {"data": [[1.68025674E12, 19.5]], "isOverall": false, "label": "https://pharma-shop.tn/-88", "isController": false}, {"data": [[1.68025674E12, 20.5]], "isOverall": false, "label": "https://pharma-shop.tn/-85", "isController": false}, {"data": [[1.68025674E12, 24.0]], "isOverall": false, "label": "https://pharma-shop.tn/-86", "isController": false}, {"data": [[1.68025674E12, 27.5]], "isOverall": false, "label": "https://pharma-shop.tn/-89", "isController": false}, {"data": [[1.68025674E12, 39.0]], "isOverall": false, "label": "https://www.google-analytics.com/j/collect?v=1&_v=j99&a=382515470&t=pageview&_s=1&dl=https%3A%2F%2Fpharma-shop.tn%2F&ul=fr-fr&de=UTF-8&dt=Votre%20premi%C3%A8re%20parapharmacie%20en%20ligne%20en%20Tunisie&sd=24-bit&sr=1536x864&vp=1531x664&je=0&_u=AACAAEIJAAAAACAAI~&jid=&gjid=&cid=1966698233.1680104207&tid=UA-71713758-1&_gid=582023006.1680254087&_slc=1&did=d6YPbH&z=462389109", "isController": false}, {"data": [[1.68025674E12, 164.5]], "isOverall": false, "label": "https://bootstrap.smartsuppchat.com/widget/b9690c990e4111de60bc2b144aa143172e19e795.json", "isController": false}, {"data": [[1.68025674E12, 392.5]], "isOverall": false, "label": "https://pharma-shop.tn/", "isController": false}, {"data": [[1.68025674E12, 39.0]], "isOverall": false, "label": "https://pharma-shop.tn/-32", "isController": false}, {"data": [[1.68025674E12, 34.5]], "isOverall": false, "label": "https://pharma-shop.tn/-33", "isController": false}, {"data": [[1.68025674E12, 35.5]], "isOverall": false, "label": "https://pharma-shop.tn/-30", "isController": false}, {"data": [[1.68025674E12, 30.5]], "isOverall": false, "label": "https://pharma-shop.tn/-31", "isController": false}, {"data": [[1.68025674E12, 29.0]], "isOverall": false, "label": "https://pharma-shop.tn/-36", "isController": false}, {"data": [[1.68025674E12, 35.0]], "isOverall": false, "label": "https://pharma-shop.tn/-37", "isController": false}, {"data": [[1.68025674E12, 37.0]], "isOverall": false, "label": "https://pharma-shop.tn/-34", "isController": false}, {"data": [[1.68025674E12, 39.5]], "isOverall": false, "label": "https://pharma-shop.tn/-35", "isController": false}, {"data": [[1.68025674E12, 99.5]], "isOverall": false, "label": "https://widget-v2.smartsuppcdn.com/asset-manifest.json", "isController": false}, {"data": [[1.68025674E12, 38.0]], "isOverall": false, "label": "https://pharma-shop.tn/-38", "isController": false}, {"data": [[1.68025674E12, 37.5]], "isOverall": false, "label": "https://pharma-shop.tn/-39", "isController": false}, {"data": [[1.68025674E12, 109.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q&cp=0&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=pharmashop&psi=iKUmZPv1G7ypkdUP4pSpgAo.1680254346734&dpr=1.25", "isController": false}, {"data": [[1.68025674E12, 33.5]], "isOverall": false, "label": "https://pharma-shop.tn/-21", "isController": false}, {"data": [[1.68025674E12, 47.5]], "isOverall": false, "label": "https://pharma-shop.tn/-22", "isController": false}, {"data": [[1.68025674E12, 33.0]], "isOverall": false, "label": "https://pharma-shop.tn/-20", "isController": false}, {"data": [[1.68025674E12, 38.0]], "isOverall": false, "label": "https://pharma-shop.tn/-25", "isController": false}, {"data": [[1.68025674E12, 27.5]], "isOverall": false, "label": "https://pharma-shop.tn/-26", "isController": false}, {"data": [[1.68025674E12, 43.0]], "isOverall": false, "label": "https://pharma-shop.tn/-23", "isController": false}, {"data": [[1.68025674E12, 50.5]], "isOverall": false, "label": "https://pharma-shop.tn/-24", "isController": false}, {"data": [[1.68025674E12, 38.5]], "isOverall": false, "label": "https://pharma-shop.tn/-29", "isController": false}, {"data": [[1.68025674E12, 37.5]], "isOverall": false, "label": "https://pharma-shop.tn/-27", "isController": false}, {"data": [[1.68025674E12, 29.5]], "isOverall": false, "label": "https://pharma-shop.tn/-28", "isController": false}, {"data": [[1.68025674E12, 143.0]], "isOverall": false, "label": "https://www.google-analytics.com/j/collect?v=1&_v=j99&a=1576582099&t=pageview&_s=1&dl=https%3A%2F%2Fpharma-shop.tn%2F&dr=https%3A%2F%2Fwww.google.com%2F&ul=fr-fr&de=UTF-8&dt=Votre%20premi%C3%A8re%20parapharmacie%20en%20ligne%20en%20Tunisie&sd=24-bit&sr=1536x864&vp=1531x664&je=0&_u=AACAAEIJAAAAACAAI~&jid=473753450&gjid=218319513&cid=1966698233.1680104207&tid=UA-71713758-1&_gid=582023006.1680254087&_r=1&_slc=1&did=d6YPbH&z=443076985", "isController": false}, {"data": [[1.68025674E12, 49.0]], "isOverall": false, "label": "https://pharma-shop.tn/-50", "isController": false}, {"data": [[1.68025674E12, 52.0]], "isOverall": false, "label": "https://pharma-shop.tn/-51", "isController": false}, {"data": [[1.68025674E12, 76.0]], "isOverall": false, "label": "https://pharma-shop.tn/-54", "isController": false}, {"data": [[1.68025674E12, 75.5]], "isOverall": false, "label": "https://pharma-shop.tn/-55", "isController": false}, {"data": [[1.68025674E12, 49.0]], "isOverall": false, "label": "https://pharma-shop.tn/-52", "isController": false}, {"data": [[1.68025674E12, 104.0]], "isOverall": false, "label": "https://pharma-shop.tn/-53", "isController": false}, {"data": [[1.68025674E12, 27.0]], "isOverall": false, "label": "https://pharma-shop.tn/-58", "isController": false}, {"data": [[1.68025674E12, 26.5]], "isOverall": false, "label": "https://pharma-shop.tn/-59", "isController": false}, {"data": [[1.68025674E12, 20.5]], "isOverall": false, "label": "https://pharma-shop.tn/-56", "isController": false}, {"data": [[1.68025674E12, 28.5]], "isOverall": false, "label": "https://pharma-shop.tn/-57", "isController": false}, {"data": [[1.68025674E12, 3656.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.68025674E12, 101.0]], "isOverall": false, "label": "https://translations.smartsuppcdn.com/api/v1/widget/translations/lang/fr/defaults", "isController": false}, {"data": [[1.68025674E12, 46.0]], "isOverall": false, "label": "https://pharma-shop.tn/-40", "isController": false}, {"data": [[1.68025674E12, 32.5]], "isOverall": false, "label": "https://pharma-shop.tn/-43", "isController": false}, {"data": [[1.68025674E12, 34.5]], "isOverall": false, "label": "https://pharma-shop.tn/-44", "isController": false}, {"data": [[1.68025674E12, 192.0]], "isOverall": false, "label": "https://stats.g.doubleclick.net/j/collect?t=dc&aip=1&_r=3&v=1&_v=j99&tid=UA-71713758-1&cid=1966698233.1680104207&jid=473753450&gjid=218319513&_gid=582023006.1680254087&_u=AACAAEIIAAAAACAAI~&z=1446073229", "isController": false}, {"data": [[1.68025674E12, 48.0]], "isOverall": false, "label": "https://pharma-shop.tn/-41", "isController": false}, {"data": [[1.68025674E12, 39.5]], "isOverall": false, "label": "https://pharma-shop.tn/-42", "isController": false}, {"data": [[1.68025674E12, 41.5]], "isOverall": false, "label": "https://pharma-shop.tn/-47", "isController": false}, {"data": [[1.68025674E12, 43.0]], "isOverall": false, "label": "https://pharma-shop.tn/-48", "isController": false}, {"data": [[1.68025674E12, 40.0]], "isOverall": false, "label": "https://pharma-shop.tn/-45", "isController": false}, {"data": [[1.68025674E12, 36.0]], "isOverall": false, "label": "https://pharma-shop.tn/-46", "isController": false}, {"data": [[1.68025674E12, 45.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp-1", "isController": false}, {"data": [[1.68025674E12, 135.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp-2", "isController": false}, {"data": [[1.68025674E12, 44.5]], "isOverall": false, "label": "https://pharma-shop.tn/-49", "isController": false}, {"data": [[1.68025674E12, 192.0]], "isOverall": false, "label": "https://www.google.com/search?q=pharmashop&rlz=1C1PNJJ_frTN1050TN1050&sxsrf=APwXEdcSiZBW1PpYTEzwUR_yEox7_u6fbg%3A1680254294624&ei=VqUmZILfJemrkdUP7PyLkAk&oq=pha&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgQIIxAnMgoIABCKBRCxAxBDMg0IABCKBRCxAxDJAxBDMggIABCABBCSAzIICAAQgAQQkgMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwgAEIoFEEMyBwguEIoFEEM6BwgjEOoCECc6DQguEMcBENEDEOoCECc6DwgAEIoFEOoCELQCEEMYAToPCC4QigUQ6gIQtAIQQxgBOgsIABCABBCxAxCDAToICC4QgAQQsQM6CwgAEIoFELEDEIMBSgQIQRgAUABY8N0CYMzpAmgCcAF4AIABYIgBhQKSAQEzmAEAoAEBsAEUwAEB2gEGCAEQARgB&sclient=gws-wiz-serp-0", "isController": false}, {"data": [[1.68025674E12, 85.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=pharmashop&cp=0&client=desktop-gws-wiz-on-focus-serp&xssi=t&hl=fr-TN&authuser=0&pq=pharmashop&psi=iKUmZPv1G7ypkdUP4pSpgAo.1680254346734&ofp=EAEypQEKCgoIcGFyYXNob3AKFAoScGhhcm1hc2hvcCB0dW5pc2llChMKEXBoYXJtYXNob3Agc291c3NlCg8KDXBhcmFwaGFybWFjaWUKFwoVcGhhcm1hc2hvcCBtYXF1aWxsYWdlChMKEXBoYXJtYXNob3Agb25saW5lChQKEnBoYXJtYXNob3AgY29udGFjdAoVChNwaGFybWFzaG9wIGJvbiBwbGFuEEc&dpr=1.25", "isController": false}, {"data": [[1.68025674E12, 725.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=p&cp=1&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=google&psi=VqUmZILfJemrkdUP7PyLkAk.1680254295265&dpr=1.25", "isController": false}, {"data": [[1.68025674E12, 19.0]], "isOverall": false, "label": "https://pharma-shop.tn/-72", "isController": false}, {"data": [[1.68025674E12, 20.0]], "isOverall": false, "label": "https://pharma-shop.tn/-73", "isController": false}, {"data": [[1.68025674E12, 19.5]], "isOverall": false, "label": "https://pharma-shop.tn/-70", "isController": false}, {"data": [[1.68025674E12, 21.5]], "isOverall": false, "label": "https://pharma-shop.tn/-71", "isController": false}, {"data": [[1.68025674E12, 22.0]], "isOverall": false, "label": "https://pharma-shop.tn/-76", "isController": false}, {"data": [[1.68025674E12, 18.5]], "isOverall": false, "label": "https://pharma-shop.tn/-77", "isController": false}, {"data": [[1.68025674E12, 20.5]], "isOverall": false, "label": "https://pharma-shop.tn/-74", "isController": false}, {"data": [[1.68025674E12, 24.0]], "isOverall": false, "label": "https://pharma-shop.tn/-75", "isController": false}, {"data": [[1.68025674E12, 89.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=pha&cp=3&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=google&psi=VqUmZILfJemrkdUP7PyLkAk.1680254295265&dpr=1.25", "isController": false}, {"data": [[1.68025674E12, 21.5]], "isOverall": false, "label": "https://pharma-shop.tn/-78", "isController": false}, {"data": [[1.68025674E12, 28.0]], "isOverall": false, "label": "https://pharma-shop.tn/-79", "isController": false}, {"data": [[1.68025674E12, 20.5]], "isOverall": false, "label": "https://pharma-shop.tn/-109", "isController": false}, {"data": [[1.68025674E12, 19.0]], "isOverall": false, "label": "https://pharma-shop.tn/-108", "isController": false}, {"data": [[1.68025674E12, 19.5]], "isOverall": false, "label": "https://pharma-shop.tn/-107", "isController": false}, {"data": [[1.68025674E12, 20.0]], "isOverall": false, "label": "https://pharma-shop.tn/-106", "isController": false}, {"data": [[1.68025674E12, 22.5]], "isOverall": false, "label": "https://pharma-shop.tn/-105", "isController": false}, {"data": [[1.68025674E12, 20.0]], "isOverall": false, "label": "https://pharma-shop.tn/-104", "isController": false}, {"data": [[1.68025674E12, 19.5]], "isOverall": false, "label": "https://pharma-shop.tn/-103", "isController": false}, {"data": [[1.68025674E12, 19.0]], "isOverall": false, "label": "https://pharma-shop.tn/-102", "isController": false}, {"data": [[1.68025674E12, 21.5]], "isOverall": false, "label": "https://pharma-shop.tn/-101", "isController": false}, {"data": [[1.68025674E12, 17.5]], "isOverall": false, "label": "https://pharma-shop.tn/-100", "isController": false}, {"data": [[1.68025674E12, 95.0]], "isOverall": false, "label": "https://www.google.com/complete/search?q=ph&cp=2&client=gws-wiz-serp&xssi=t&hl=fr-TN&authuser=0&pq=google&psi=VqUmZILfJemrkdUP7PyLkAk.1680254295265&dpr=1.25", "isController": false}, {"data": [[1.68025674E12, 21.0]], "isOverall": false, "label": "https://pharma-shop.tn/-61", "isController": false}, {"data": [[1.68025674E12, 22.0]], "isOverall": false, "label": "https://pharma-shop.tn/-62", "isController": false}, {"data": [[1.68025674E12, 26.0]], "isOverall": false, "label": "https://pharma-shop.tn/-60", "isController": false}, {"data": [[1.68025674E12, 27.0]], "isOverall": false, "label": "https://pharma-shop.tn/-65", "isController": false}, {"data": [[1.68025674E12, 25.5]], "isOverall": false, "label": "https://pharma-shop.tn/-66", "isController": false}, {"data": [[1.68025674E12, 19.5]], "isOverall": false, "label": "https://pharma-shop.tn/-63", "isController": false}, {"data": [[1.68025674E12, 26.0]], "isOverall": false, "label": "https://pharma-shop.tn/-64", "isController": false}, {"data": [[1.68025674E12, 18.5]], "isOverall": false, "label": "https://pharma-shop.tn/-69", "isController": false}, {"data": [[1.68025674E12, 25.5]], "isOverall": false, "label": "https://pharma-shop.tn/-67", "isController": false}, {"data": [[1.68025674E12, 19.5]], "isOverall": false, "label": "https://pharma-shop.tn/-68", "isController": false}, {"data": [[1.68025674E12, 472.0]], "isOverall": false, "label": "https://pharma-shop.tn/module/ets_sociallogin/oauth", "isController": false}, {"data": [[1.68025674E12, 28.0]], "isOverall": false, "label": "https://pharma-shop.tn/-119", "isController": false}, {"data": [[1.68025674E12, 34.5]], "isOverall": false, "label": "https://pharma-shop.tn/-118", "isController": false}, {"data": [[1.68025674E12, 41.0]], "isOverall": false, "label": "https://pharma-shop.tn/-117", "isController": false}, {"data": [[1.68025674E12, 25.5]], "isOverall": false, "label": "https://pharma-shop.tn/-116", "isController": false}, {"data": [[1.68025674E12, 40.5]], "isOverall": false, "label": "https://pharma-shop.tn/-115", "isController": false}, {"data": [[1.68025674E12, 49.0]], "isOverall": false, "label": "https://pharma-shop.tn/-114", "isController": false}, {"data": [[1.68025674E12, 29.0]], "isOverall": false, "label": "https://pharma-shop.tn/-113", "isController": false}, {"data": [[1.68025674E12, 32.0]], "isOverall": false, "label": "https://pharma-shop.tn/-112", "isController": false}, {"data": [[1.68025674E12, 36.5]], "isOverall": false, "label": "https://pharma-shop.tn/-111", "isController": false}, {"data": [[1.68025674E12, 31.5]], "isOverall": false, "label": "https://pharma-shop.tn/-110", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.68025674E12, "title": "Latencies Over Time"}},
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
        });
    }
};

            return {
};