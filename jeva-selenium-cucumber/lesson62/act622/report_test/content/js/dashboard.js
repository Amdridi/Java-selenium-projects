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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8203252032520325, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-8"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-7"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-11"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-20"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-21"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-22"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-2"], "isController": false}, {"data": [0.5, 500, 1500, "https://pharma-shop.tn/identite-1"], "isController": false}, {"data": [0.5, 500, 1500, "https://pharma-shop.tn/mon-compte-22"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/mon-compte-20"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/mon-compte-21"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/mon-compte-8"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-10"], "isController": false}, {"data": [0.75, 500, 1500, "https://pharma-shop.tn/mon-compte-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-11"], "isController": false}, {"data": [0.75, 500, 1500, "https://pharma-shop.tn/mon-compte-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-12"], "isController": false}, {"data": [0.75, 500, 1500, "https://pharma-shop.tn/mon-compte-7"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-13"], "isController": false}, {"data": [0.75, 500, 1500, "https://pharma-shop.tn/mon-compte-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-14"], "isController": false}, {"data": [0.9, 500, 1500, "https://pharma-shop.tn/mon-compte-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-15"], "isController": false}, {"data": [0.75, 500, 1500, "https://pharma-shop.tn/mon-compte-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-16"], "isController": false}, {"data": [0.5, 500, 1500, "https://pharma-shop.tn/mon-compte-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-17"], "isController": false}, {"data": [0.5333333333333333, 500, 1500, "https://pharma-shop.tn/mon-compte-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-18"], "isController": false}, {"data": [0.6333333333333333, 500, 1500, "https://pharma-shop.tn/mon-compte-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/identite-19"], "isController": false}, {"data": [0.5, 500, 1500, "https://pharma-shop.tn/mon-compte-19"], "isController": false}, {"data": [0.5, 500, 1500, "https://pharma-shop.tn/mon-compte-17"], "isController": false}, {"data": [0.7, 500, 1500, "https://pharma-shop.tn/mon-compte-18"], "isController": false}, {"data": [0.5, 500, 1500, "https://pharma-shop.tn/mon-compte-15"], "isController": false}, {"data": [0.5, 500, 1500, "https://pharma-shop.tn/mon-compte-16"], "isController": false}, {"data": [0.5, 500, 1500, "https://pharma-shop.tn/mon-compte-13"], "isController": false}, {"data": [0.5, 500, 1500, "https://pharma-shop.tn/mon-compte-14"], "isController": false}, {"data": [0.5, 500, 1500, "https://pharma-shop.tn/mon-compte-11"], "isController": false}, {"data": [0.5, 500, 1500, "https://pharma-shop.tn/mon-compte-12"], "isController": false}, {"data": [0.65, 500, 1500, "https://pharma-shop.tn/mon-compte-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-20"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-21"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-7"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-8"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-6"], "isController": false}, {"data": [0.5, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-2"], "isController": false}, {"data": [0.25, 500, 1500, "https://pharma-shop.tn/mon-compte"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/module/ets_sociallogin/oauth"], "isController": false}, {"data": [0.45, 500, 1500, "https://pharma-shop.tn/identite"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-17"], "isController": false}, {"data": [0.5, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-16"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-19"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-18"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-13"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-15"], "isController": false}, {"data": [1.0, 500, 1500, "https://pharma-shop.tn/connexion?back=my-account-14"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 610, 0, 0.0, 553.7918032786885, 17, 9918, 103.0, 1577.5999999999997, 2238.199999999996, 7427.759999999998, 14.259999532459032, 832.6393043793978, 31.404142412978935], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://pharma-shop.tn/identite-8", 10, 0, 0.0, 123.19999999999999, 94, 177, 116.5, 173.10000000000002, 177.0, 177.0, 0.44279135671271697, 0.3190346318189869, 0.5359764518021608], "isController": false}, {"data": ["https://pharma-shop.tn/identite-7", 10, 0, 0.0, 63.2, 35, 112, 50.5, 111.2, 112.0, 112.0, 0.44391175034403163, 0.3450720246814933, 0.5355986011230967], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-11", 5, 0, 0.0, 106.4, 97, 119, 108.0, 119.0, 119.0, 119.0, 1.2909888974954815, 0.9278982700748774, 1.526745659049832], "isController": false}, {"data": ["https://pharma-shop.tn/identite-6", 10, 0, 0.0, 66.2, 35, 178, 38.0, 172.00000000000003, 178.0, 178.0, 0.444247001332741, 0.3200834351399378, 0.5338339210350955], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-10", 5, 0, 0.0, 80.4, 35, 120, 96.0, 120.0, 120.0, 120.0, 1.2903225806451613, 0.9324596774193549, 1.5385584677419355], "isController": false}, {"data": ["https://pharma-shop.tn/identite-5", 10, 0, 0.0, 69.39999999999999, 34, 212, 45.0, 200.90000000000003, 212.0, 212.0, 0.4440300164291106, 0.3442967119577283, 0.5353076711735714], "isController": false}, {"data": ["https://pharma-shop.tn/identite-9", 10, 0, 0.0, 90.39999999999999, 34, 169, 98.5, 163.70000000000002, 169.0, 169.0, 0.44271294492650964, 0.34448601027094033, 0.5341521908756862], "isController": false}, {"data": ["https://pharma-shop.tn/identite-20", 10, 0, 0.0, 41.3, 35, 50, 39.0, 49.9, 50.0, 50.0, 0.4437738528445904, 0.3210426466672584, 0.5375990863805805], "isController": false}, {"data": ["https://pharma-shop.tn/identite-21", 10, 0, 0.0, 42.599999999999994, 30, 117, 33.5, 109.70000000000003, 117.0, 117.0, 0.44338033164848806, 0.29754976944222755, 0.5678645556220626], "isController": false}, {"data": ["https://pharma-shop.tn/identite-22", 10, 0, 0.0, 43.800000000000004, 33, 103, 37.5, 97.00000000000003, 103.0, 103.0, 0.44343931532969716, 0.34825575916810786, 0.5493191127887899], "isController": false}, {"data": ["Test", 5, 0, 0.0, 14856.0, 14661, 15176, 14790.0, 15176.0, 15176.0, 15176.0, 0.3185930929017459, 1011.7168210183828, 42.71984914617051], "isController": true}, {"data": ["https://pharma-shop.tn/identite-0", 10, 0, 0.0, 313.8, 253, 400, 300.5, 396.7, 400.0, 400.0, 0.44076163610719327, 0.3879907605342031, 0.5457868697108604], "isController": false}, {"data": ["https://pharma-shop.tn/identite-4", 10, 0, 0.0, 26.1, 17, 52, 25.0, 49.50000000000001, 52.0, 52.0, 0.4444641984088182, 0.21181496955420243, 0.32879065458464823], "isController": false}, {"data": ["https://pharma-shop.tn/identite-3", 10, 0, 0.0, 82.6, 34, 154, 78.5, 152.3, 154.0, 154.0, 0.44391175034403163, 0.35209484729435786, 0.5499043508900431], "isController": false}, {"data": ["https://pharma-shop.tn/identite-2", 10, 0, 0.0, 83.6, 38, 167, 56.0, 164.3, 167.0, 167.0, 0.4440103010389841, 0.3317936351123346, 0.5396199410576326], "isController": false}, {"data": ["https://pharma-shop.tn/identite-1", 10, 0, 0.0, 750.8, 664, 805, 759.5, 803.8, 805.0, 805.0, 0.43055196762249204, 36.71086215340567, 0.5009791693576164], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-22", 10, 0, 0.0, 1448.4, 34, 3584, 1030.5, 3581.5, 3584.0, 3584.0, 1.1341726210729273, 499.6040364140297, 1.3501527588749007], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-20", 10, 0, 0.0, 189.3, 33, 492, 115.5, 490.0, 492.0, 492.0, 1.096611470555982, 4.789536270424389, 1.275453380304858], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-21", 10, 0, 0.0, 155.49999999999997, 30, 369, 100.5, 367.1, 369.0, 369.0, 1.11000111000111, 1.4541664932289933, 1.3511878746253745], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-8", 10, 0, 0.0, 200.6, 39, 419, 158.0, 411.90000000000003, 419.0, 419.0, 0.7976389885937625, 2.994885139985642, 0.9269437465103294], "isController": false}, {"data": ["https://pharma-shop.tn/identite-10", 10, 0, 0.0, 94.7, 36, 139, 104.0, 138.8, 139.0, 139.0, 0.44251703690592087, 0.3186641240375255, 0.5412622936764315], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-9", 10, 0, 0.0, 534.8, 35, 1502, 308.5, 1480.4, 1502.0, 1502.0, 0.8017317405596087, 9.108815666840375, 0.9285682073278281], "isController": false}, {"data": ["https://pharma-shop.tn/identite-11", 10, 0, 0.0, 94.7, 36, 136, 106.5, 135.9, 136.0, 136.0, 0.4425953793042401, 0.3207087611755333, 0.538332563401788], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-6", 10, 0, 0.0, 450.29999999999995, 38, 1205, 323.0, 1202.0, 1205.0, 1205.0, 0.7722604062089736, 4.260177547494015, 0.8906636130203105], "isController": false}, {"data": ["https://pharma-shop.tn/identite-12", 10, 0, 0.0, 108.19999999999999, 63, 129, 110.0, 128.6, 129.0, 129.0, 0.4436557231588288, 0.3206972326974268, 0.5352896933229814], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-7", 10, 0, 0.0, 479.79999999999995, 34, 1291, 335.5, 1280.7, 1291.0, 1291.0, 0.7762167197081425, 5.494992795738571, 0.8990166304432198], "isController": false}, {"data": ["https://pharma-shop.tn/identite-13", 10, 0, 0.0, 89.30000000000001, 35, 130, 107.5, 129.8, 130.0, 130.0, 0.44399058739954717, 0.32093928983705544, 0.5365608905341207], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-4", 10, 0, 0.0, 379.9, 19, 994, 280.5, 992.4, 994.0, 994.0, 0.77724234416291, 3.9913367839654907, 0.4743910792009949], "isController": false}, {"data": ["https://pharma-shop.tn/identite-14", 10, 0, 0.0, 48.7, 34, 115, 39.0, 109.40000000000002, 115.0, 115.0, 0.4436163605713779, 0.31936912208322243, 0.5352422006698606], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-5", 10, 0, 0.0, 311.20000000000005, 36, 940, 229.5, 902.5000000000001, 940.0, 940.0, 0.7722604062089736, 1.7357005125878446, 0.8936802552320643], "isController": false}, {"data": ["https://pharma-shop.tn/identite-15", 10, 0, 0.0, 64.5, 34, 142, 42.0, 140.5, 142.0, 142.0, 0.4430267588162325, 0.3198964701842991, 0.5384246106902357], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-2", 10, 0, 0.0, 382.4, 40, 925, 338.0, 905.8000000000001, 925.0, 925.0, 0.7706535141800247, 2.642724428753082, 0.8993466303175092], "isController": false}, {"data": ["https://pharma-shop.tn/identite-16", 10, 0, 0.0, 51.8, 34, 111, 41.0, 107.20000000000002, 111.0, 111.0, 0.44310528181495923, 0.32107824131513646, 0.5337601221862814], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-3", 10, 0, 0.0, 3586.0, 36, 7437, 3411.0, 7428.6, 7437.0, 7437.0, 0.7720815318097591, 298.7979655651637, 1.1358797145228536], "isController": false}, {"data": ["https://pharma-shop.tn/identite-17", 10, 0, 0.0, 49.199999999999996, 35, 121, 39.5, 114.90000000000002, 121.0, 121.0, 0.44238000442380004, 0.3183926399026764, 0.5337504838531298], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-0", 15, 0, 0.0, 2424.8000000000006, 264, 6578, 581.0, 6481.4, 6578.0, 6578.0, 1.0584997530167244, 270.08234521646324, 0.9826957342459954], "isController": false}, {"data": ["https://pharma-shop.tn/identite-18", 10, 0, 0.0, 50.8, 36, 102, 42.5, 98.30000000000001, 102.0, 102.0, 0.4434196523589925, 0.32069979935260734, 0.5354378907635686], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-1", 15, 0, 0.0, 796.1333333333332, 411, 1520, 664.0, 1466.0, 1520.0, 1520.0, 1.0784384211661513, 65.47707981343015, 0.9685584648429074], "isController": false}, {"data": ["https://pharma-shop.tn/identite-19", 10, 0, 0.0, 41.400000000000006, 33, 60, 38.0, 59.1, 60.0, 60.0, 0.44355732978487467, 0.32027957972943, 0.5386362691284098], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-19", 10, 0, 0.0, 868.5, 37, 2002, 814.5, 1968.0, 2002.0, 2002.0, 0.9904912836767037, 49.88081217189976, 1.1549283131933439], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-17", 10, 0, 0.0, 954.6999999999999, 35, 2169, 891.5, 2138.6000000000004, 2169.0, 2169.0, 0.9719117504130625, 57.48649194528137, 1.125671226552629], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-18", 10, 0, 0.0, 705.1000000000001, 36, 1560, 635.5, 1549.4, 1560.0, 1560.0, 0.9725734292939118, 38.27294893381638, 1.1273873638397198], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-15", 10, 0, 0.0, 1142.9, 34, 2499, 1101.0, 2476.9, 2499.0, 2499.0, 0.891583452211127, 48.61402307529423, 1.0404709232346647], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-16", 10, 0, 0.0, 892.9, 36, 2017, 810.5, 1990.7, 2017.0, 2017.0, 0.947238798901203, 45.97012793644028, 1.095244861229516], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-13", 10, 0, 0.0, 1295.6000000000001, 35, 2666, 1220.0, 2660.9, 2666.0, 2666.0, 0.8074283407347598, 47.64174152200242, 0.9367430359305612], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-14", 10, 0, 0.0, 923.4000000000002, 34, 2068, 826.0, 2043.6000000000001, 2068.0, 2068.0, 0.8343763037129746, 39.115707785773886, 0.9663772423863163], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-11", 10, 0, 0.0, 1375.1999999999998, 103, 3368, 1178.0, 3302.5, 3368.0, 3368.0, 0.7975117632985087, 47.99743550123615, 0.931468817290055], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-12", 10, 0, 0.0, 1047.6, 36, 2154, 1005.0, 2144.8, 2154.0, 2154.0, 0.8087343307723412, 34.749750429640116, 0.9366786291953093], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte-10", 10, 0, 0.0, 681.5, 102, 1655, 480.5, 1646.0, 1655.0, 1655.0, 0.799744081893794, 12.767398807381639, 0.9395430962092131], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-20", 5, 0, 0.0, 50.8, 29, 125, 32.0, 125.0, 125.0, 125.0, 1.3280212483399734, 0.8914861387782205, 1.6691048306772909], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-21", 5, 0, 0.0, 35.6, 33, 37, 36.0, 37.0, 37.0, 37.0, 1.326963906581741, 1.0483533207271762, 1.612053808386412], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-7", 5, 0, 0.0, 103.0, 52, 138, 106.0, 138.0, 138.0, 138.0, 1.2866700977869274, 0.9278097658260421, 1.5266642273546063], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-8", 5, 0, 0.0, 77.0, 34, 107, 104.0, 107.0, 107.0, 107.0, 1.3203063110641668, 1.0304578162133615, 1.5614169362292052], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-9", 5, 0, 0.0, 84.6, 37, 133, 105.0, 133.0, 133.0, 133.0, 1.3078733978550876, 0.9410557808004185, 1.568426301334031], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-3", 5, 0, 0.0, 20.0, 17, 24, 20.0, 24.0, 24.0, 24.0, 1.325556733828208, 0.6317106309650053, 0.9488604354453871], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-4", 5, 0, 0.0, 64.4, 34, 112, 37.0, 112.0, 112.0, 112.0, 1.2963443090484832, 1.0061859929997408, 1.531813099559243], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-5", 5, 0, 0.0, 50.6, 35, 108, 37.0, 108.0, 108.0, 108.0, 1.294665976178146, 0.9366099171413775, 1.5247726242879336], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-6", 5, 0, 0.0, 89.8, 39, 104, 102.0, 104.0, 104.0, 104.0, 1.2960082944530844, 1.0049126814411613, 1.5326816841627786], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-0", 5, 0, 0.0, 697.0, 659, 769, 680.0, 769.0, 769.0, 769.0, 1.1327594019030358, 96.59561551314002, 1.2931599031490713], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-1", 5, 0, 0.0, 98.2, 38, 130, 110.0, 130.0, 130.0, 130.0, 1.297016861219196, 0.9661762321660181, 1.5452739948119325], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-2", 5, 0, 0.0, 80.8, 35, 130, 99.0, 130.0, 130.0, 130.0, 1.3196093956188968, 1.0469244853523356, 1.603119226708894], "isController": false}, {"data": ["https://pharma-shop.tn/mon-compte", 10, 0, 0.0, 5402.0999999999985, 1186, 9918, 5394.5, 9884.8, 9918.0, 9918.0, 0.6611133148221605, 949.2398617240183, 17.261901072656354], "isController": false}, {"data": ["https://pharma-shop.tn/module/ets_sociallogin/oauth", 5, 0, 0.0, 405.4, 382, 450, 395.0, 450.0, 450.0, 450.0, 2.5693730729701953, 2.0730625321171634, 3.1620351040596097], "isController": false}, {"data": ["https://pharma-shop.tn/identite", 10, 0, 0.0, 1344.6999999999998, 1251, 1501, 1324.0, 1498.7, 1501.0, 1501.0, 0.42078687144961074, 42.64074992110246, 11.557667525773196], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-17", 5, 0, 0.0, 37.4, 35, 40, 37.0, 40.0, 40.0, 40.0, 1.327668613913967, 0.9573735395645246, 1.5714202734997345], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account", 5, 0, 0.0, 957.0, 912, 1010, 936.0, 1010.0, 1010.0, 1010.0, 1.0741138560687433, 107.90333814446831, 27.609131646079483], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-16", 5, 0, 0.0, 37.4, 35, 39, 37.0, 39.0, 39.0, 39.0, 1.3171759747102212, 0.9518654504741834, 1.5577149466543732], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-19", 5, 0, 0.0, 37.0, 34, 44, 35.0, 44.0, 44.0, 44.0, 1.321003963011889, 0.9520516842800528, 1.5686922060766182], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-18", 5, 0, 0.0, 41.0, 34, 49, 39.0, 49.0, 49.0, 49.0, 1.3171759747102212, 0.953409016069547, 1.5680053839567967], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-13", 5, 0, 0.0, 62.6, 35, 104, 39.0, 104.0, 104.0, 104.0, 1.3262599469496021, 0.9542854774535809, 1.5684578083554377], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-12", 5, 0, 0.0, 97.6, 41, 135, 105.0, 135.0, 135.0, 135.0, 1.2899896800825594, 0.9327230069659443, 1.5280834784571724], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-15", 5, 0, 0.0, 37.0, 33, 40, 37.0, 40.0, 40.0, 40.0, 1.3178703215603584, 0.9482488798102267, 1.5559621277016342], "isController": false}, {"data": ["https://pharma-shop.tn/connexion?back=my-account-14", 5, 0, 0.0, 63.4, 36, 103, 38.0, 103.0, 103.0, 103.0, 1.326963906581741, 0.9545328257696392, 1.5809530918259025], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 610, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
