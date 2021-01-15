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
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.804018717313515, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.7523923444976076, 500, 1500, "authors POST"], "isController": false}, {"data": [0.8874407582938388, 500, 1500, "activities DELETE "], "isController": false}, {"data": [0.9005305039787799, 500, 1500, "users DELETE"], "isController": false}, {"data": [0.8324873096446701, 500, 1500, "coverPhotos all GET"], "isController": false}, {"data": [0.8571428571428571, 500, 1500, "coverPhotosCoverPhotosForBook  GET"], "isController": false}, {"data": [0.7918660287081339, 500, 1500, "authors all GET"], "isController": false}, {"data": [0.8096385542168675, 500, 1500, "authors DELETE"], "isController": false}, {"data": [0.9123711340206185, 500, 1500, "users all GET"], "isController": false}, {"data": [0.7369077306733167, 500, 1500, "books PUT"], "isController": false}, {"data": [0.8077889447236181, 500, 1500, "books POST"], "isController": false}, {"data": [0.9164705882352941, 500, 1500, "activities GET"], "isController": false}, {"data": [0.8341232227488151, 500, 1500, "activities PUT "], "isController": false}, {"data": [0.7877697841726619, 500, 1500, "authors PUT"], "isController": false}, {"data": [0.687192118226601, 500, 1500, "books GET"], "isController": false}, {"data": [0.859493670886076, 500, 1500, "books DELETE"], "isController": false}, {"data": [0.8569587628865979, 500, 1500, "coverPhotos POST"], "isController": false}, {"data": [0.8806366047745358, 500, 1500, "users PUT"], "isController": false}, {"data": [0.860313315926893, 500, 1500, "users POST"], "isController": false}, {"data": [0.8666666666666667, 500, 1500, "authors GET"], "isController": false}, {"data": [0.8888888888888888, 500, 1500, "users GET"], "isController": false}, {"data": [0.8643867924528302, 500, 1500, "activities POST"], "isController": false}, {"data": [0.8562340966921119, 500, 1500, "coverPhotos GET"], "isController": false}, {"data": [0.1642512077294686, 500, 1500, "books all GET"], "isController": false}, {"data": [0.8994845360824743, 500, 1500, "coverPhotos DELETE"], "isController": false}, {"data": [0.8269230769230769, 500, 1500, "coverPhotos PUT"], "isController": false}, {"data": [0.5363849765258216, 500, 1500, "activities all GET"], "isController": false}, {"data": [0.8812351543942993, 500, 1500, "authorsAuthorsForBook GET "], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 10899, 0, 0.0, 550.4236168455781, 87, 9251, 353.0, 1086.0, 1609.0, 3391.0, 90.37688129690285, 3335.907270655396, 21.265627267403293], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["authors POST", 418, 0, 0.0, 600.6698564593297, 107, 4359, 385.0, 1232.5000000000005, 1717.199999999997, 2541.1800000000003, 3.5717032239321207, 1.1029062278370687, 1.040122382103887], "isController": false}, {"data": ["activities DELETE ", 422, 0, 0.0, 370.4265402843597, 96, 1684, 299.5, 674.4, 923.6999999999999, 1513.9199999999983, 3.5912142899692787, 0.7399865382651541, 0.7543637614991192], "isController": false}, {"data": ["users DELETE", 377, 0, 0.0, 343.57294429708236, 93, 2402, 265.0, 633.4, 729.0, 1863.0, 3.4829363832892963, 0.7176753680410561, 0.7146078780648916], "isController": false}, {"data": ["coverPhotos all GET", 394, 0, 0.0, 452.7436548223354, 108, 2203, 355.0, 824.5, 1028.25, 1866.1500000000017, 3.5864479600939396, 72.63607836366036, 0.6724589925176137], "isController": false}, {"data": ["coverPhotosCoverPhotosForBook  GET", 392, 0, 0.0, 439.7040816326533, 91, 2649, 304.0, 961.6999999999998, 1329.5499999999988, 2304.56, 3.5759897828863347, 1.2515536626528005, 0.6673444341817186], "isController": false}, {"data": ["authors all GET", 418, 0, 0.0, 520.7775119617213, 184, 2318, 421.0, 971.0, 1094.4999999999995, 1778.5600000000006, 3.602547638952331, 168.64362169155987, 0.6614052305889045], "isController": false}, {"data": ["authors DELETE", 415, 0, 0.0, 499.38554216867465, 89, 2596, 373.0, 1008.0, 1375.6, 2233.5999999999985, 3.5710290587111597, 0.7358272767461472, 0.739659141511707], "isController": false}, {"data": ["users all GET", 388, 0, 0.0, 338.76030927835046, 93, 2395, 260.5, 663.0000000000002, 827.8999999999992, 1589.3800000000008, 3.563621668289278, 2.7283978397839785, 0.6472984670916071], "isController": false}, {"data": ["books PUT", 401, 0, 0.0, 621.8054862842883, 93, 3587, 477.0, 1223.6000000000001, 1559.4999999999986, 2481.88, 3.4931530715355934, 1.375070029116868, 1.3378776944536395], "isController": false}, {"data": ["books POST", 398, 0, 0.0, 534.319095477387, 97, 2908, 343.0, 1196.6000000000008, 1743.2499999999989, 2478.179999999999, 3.5793620101984835, 1.4089996531930966, 1.38802682891459], "isController": false}, {"data": ["activities GET", 425, 0, 0.0, 329.62352941176476, 93, 2169, 227.0, 578.4000000000001, 887.1999999999998, 1568.3200000000002, 3.594992387074945, 1.234308254736931, 0.6779187505286753], "isController": false}, {"data": ["activities PUT ", 422, 0, 0.0, 439.62085308056874, 97, 2394, 306.5, 919.6999999999998, 1082.1, 1804.0699999999965, 3.6057897704940443, 1.2193889035451235, 1.1387499439265512], "isController": false}, {"data": ["authors PUT", 417, 0, 0.0, 611.5155875299752, 92, 4348, 372.0, 1356.7999999999997, 2094.0, 4288.679999999998, 3.570144346843376, 1.1024181815165837, 1.0225721867990274], "isController": false}, {"data": ["books GET", 406, 0, 0.0, 659.6921182266008, 182, 2919, 548.0, 1251.6000000000004, 1646.2499999999995, 2333.79, 3.5024456732718536, 16.54684521088001, 0.6433641163226046], "isController": false}, {"data": ["books DELETE", 395, 0, 0.0, 416.81012658227866, 96, 2576, 310.0, 766.0000000000002, 1052.5999999999995, 2355.160000000001, 3.5907132338236094, 0.7398832932976384, 0.7367229543161282], "isController": false}, {"data": ["coverPhotos POST", 388, 0, 0.0, 462.335051546392, 96, 2985, 334.0, 1001.5000000000001, 1231.999999999999, 1817.3400000000026, 3.599391443096219, 1.0871953736687816, 1.0063496674273626], "isController": false}, {"data": ["users PUT", 377, 0, 0.0, 401.0371352785149, 100, 2596, 281.0, 805.9999999999997, 1058.4999999999998, 2170.8999999999987, 3.4856736041125402, 1.0623752536821474, 0.9673979434988027], "isController": false}, {"data": ["users POST", 383, 0, 0.0, 417.840731070496, 92, 2570, 266.0, 913.0000000000008, 1212.7999999999954, 2193.2799999999997, 3.5080970176595585, 1.0692132142137465, 0.9767145623809262], "isController": false}, {"data": ["authors GET", 420, 0, 0.0, 396.3238095238098, 90, 2179, 304.0, 794.7, 1014.1999999999998, 1376.2700000000002, 3.5846576651929745, 1.1562621355598042, 0.6654720919464692], "isController": false}, {"data": ["users GET", 387, 0, 0.0, 373.6640826873385, 99, 2596, 271.0, 719.7999999999996, 985.1999999999999, 2179.12, 3.5580971994924884, 1.0781818881819685, 0.6535855931541106], "isController": false}, {"data": ["activities POST", 424, 0, 0.0, 408.68632075471703, 92, 2256, 312.5, 871.0, 1202.0, 1680.0, 3.5856843244706043, 1.2126344763759218, 1.128595000021142], "isController": false}, {"data": ["coverPhotos GET", 393, 0, 0.0, 426.9669211195933, 93, 2986, 305.0, 843.6000000000001, 1166.1999999999998, 2254.2000000000007, 3.5889755438256836, 1.249121020620628, 0.6802904427544703], "isController": false}, {"data": ["books all GET", 414, 0, 0.0, 2647.1811594202923, 631, 9251, 1944.0, 6113.5, 7359.75, 8707.2, 3.5486829586072703, 3159.802307514486, 0.6445849905282738], "isController": false}, {"data": ["coverPhotos DELETE", 388, 0, 0.0, 331.09536082474216, 87, 1665, 254.0, 650.5000000000001, 773.8499999999997, 1539.7600000000002, 3.579104670362615, 0.7374912943813592, 0.7553097067071315], "isController": false}, {"data": ["coverPhotos PUT", 390, 0, 0.0, 486.25128205128175, 89, 4389, 329.0, 1003.0, 1305.6999999999994, 1993.7399999999952, 3.547195896167209, 1.0714244094828371, 0.9816964123296892], "isController": false}, {"data": ["activities all GET", 426, 0, 0.0, 862.5751173708924, 377, 2307, 664.0, 1868.6, 2075.3, 2176.46, 3.5504142149917493, 10.768541486090044, 0.662235463929125], "isController": false}, {"data": ["authorsAuthorsForBook GET ", 421, 0, 0.0, 369.80522565320683, 91, 1732, 283.0, 718.2, 990.2999999999996, 1307.4799999999996, 3.5842904211754085, 1.6862304529529957, 0.672403650910546], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 10899, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
