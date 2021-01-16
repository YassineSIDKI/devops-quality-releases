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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7125925925925926, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.515, 500, 1500, "authors POST"], "isController": false}, {"data": [0.8, 500, 1500, "activities DELETE "], "isController": false}, {"data": [0.945, 500, 1500, "users DELETE"], "isController": false}, {"data": [0.69, 500, 1500, "coverPhotos all GET"], "isController": false}, {"data": [0.825, 500, 1500, "coverPhotosCoverPhotosForBook  GET"], "isController": false}, {"data": [0.6, 500, 1500, "authors all GET"], "isController": false}, {"data": [0.485, 500, 1500, "authors DELETE"], "isController": false}, {"data": [0.85, 500, 1500, "users all GET"], "isController": false}, {"data": [0.645, 500, 1500, "books PUT"], "isController": false}, {"data": [0.625, 500, 1500, "books POST"], "isController": false}, {"data": [0.855, 500, 1500, "activities GET"], "isController": false}, {"data": [0.82, 500, 1500, "activities PUT "], "isController": false}, {"data": [0.595, 500, 1500, "authors PUT"], "isController": false}, {"data": [0.55, 500, 1500, "books GET"], "isController": false}, {"data": [0.7, 500, 1500, "books DELETE"], "isController": false}, {"data": [0.815, 500, 1500, "coverPhotos POST"], "isController": false}, {"data": [0.9, 500, 1500, "users PUT"], "isController": false}, {"data": [0.89, 500, 1500, "users POST"], "isController": false}, {"data": [0.765, 500, 1500, "authors GET"], "isController": false}, {"data": [0.905, 500, 1500, "users GET"], "isController": false}, {"data": [0.79, 500, 1500, "activities POST"], "isController": false}, {"data": [0.76, 500, 1500, "coverPhotos GET"], "isController": false}, {"data": [0.0, 500, 1500, "books all GET"], "isController": false}, {"data": [0.855, 500, 1500, "coverPhotos DELETE"], "isController": false}, {"data": [0.815, 500, 1500, "coverPhotos PUT"], "isController": false}, {"data": [0.475, 500, 1500, "activities all GET"], "isController": false}, {"data": [0.77, 500, 1500, "authorsAuthorsForBook GET "], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2700, 0, 0.0, 999.9999999999989, 84, 31616, 410.0, 2026.8000000000002, 3455.8999999999996, 11983.179999999982, 49.0089305162274, 1755.4279411314258, 11.537341798718508], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["authors POST", 100, 0, 0.0, 1149.12, 139, 7347, 809.0, 2504.5000000000005, 3038.249999999999, 7322.269999999988, 4.716313729189266, 1.4563460948922322, 1.3734421426213272], "isController": false}, {"data": ["activities DELETE ", 100, 0, 0.0, 600.1500000000001, 92, 4639, 322.5, 1259.0, 2097.1999999999985, 4638.98, 8.379420144126026, 1.7266187992290936, 1.7601692119155357], "isController": false}, {"data": ["users DELETE", 100, 0, 0.0, 287.0700000000002, 84, 4535, 210.0, 570.1000000000006, 733.5999999999999, 4498.959999999981, 2.783266998803195, 0.5735052116674553, 0.5710589809067883], "isController": false}, {"data": ["coverPhotos all GET", 100, 0, 0.0, 853.94, 88, 3871, 448.0, 2165.5000000000014, 3131.899999999996, 3869.8899999999994, 2.254232321183021, 45.65480870020965, 0.4226685602218165], "isController": false}, {"data": ["coverPhotosCoverPhotosForBook  GET", 100, 0, 0.0, 520.2499999999998, 85, 3545, 247.5, 988.4000000000005, 2749.8499999999894, 3544.54, 2.311978359882551, 0.8091924259588931, 0.43146393024761287], "isController": false}, {"data": ["authors all GET", 100, 0, 0.0, 1225.4099999999996, 190, 6356, 557.5, 3058.2000000000025, 4914.249999999986, 6355.21, 5.755726948313572, 257.8726990582192, 1.056715494416945], "isController": false}, {"data": ["authors DELETE", 100, 0, 0.0, 1183.69, 125, 4646, 906.0, 2602.0, 3048.8999999999965, 4645.89, 4.731488052992667, 0.9749452921693872, 0.9800279453513129], "isController": false}, {"data": ["users all GET", 100, 0, 0.0, 467.23999999999984, 84, 3874, 239.0, 792.1000000000005, 2393.399999999988, 3870.0199999999977, 2.3898288882516012, 1.829712742567632, 0.434090012905076], "isController": false}, {"data": ["books PUT", 100, 0, 0.0, 767.7500000000002, 88, 2863, 512.0, 2024.9000000000003, 2340.9999999999973, 2860.8999999999987, 2.138991679322367, 0.8420190878269984, 0.8192505240529615], "isController": false}, {"data": ["books POST", 100, 0, 0.0, 831.3899999999998, 87, 3511, 528.5, 2071.1000000000004, 3247.7999999999947, 3509.9299999999994, 2.1848849658065506, 0.8600850876138871, 0.8472830272673644], "isController": false}, {"data": ["activities GET", 100, 0, 0.0, 599.4300000000001, 100, 4691, 346.5, 1141.9, 3955.449999999976, 4687.249999999998, 10.421008753647353, 3.5785581231763235, 1.9651335843059607], "isController": false}, {"data": ["activities PUT ", 100, 0, 0.0, 569.6800000000002, 87, 4757, 243.5, 1246.6000000000001, 2184.8499999999985, 4740.909999999992, 9.053870529651425, 3.0618704730647353, 2.859396220009054], "isController": false}, {"data": ["authors PUT", 100, 0, 0.0, 976.4300000000004, 145, 5627, 728.0, 1961.1000000000004, 2105.7499999999995, 5626.76, 4.68055230517201, 1.445303358296279, 1.3406308506903815], "isController": false}, {"data": ["books GET", 100, 0, 0.0, 1143.2900000000002, 150, 4929, 780.5, 2924.2000000000007, 3501.4499999999994, 4924.169999999997, 2.0848970060878993, 9.823998044105997, 0.38297766293470104], "isController": false}, {"data": ["books DELETE", 100, 0, 0.0, 654.1300000000001, 84, 3482, 433.5, 1655.1000000000004, 2274.4999999999977, 3474.5799999999963, 2.207261891623441, 0.454816659309127, 0.45287668303719236], "isController": false}, {"data": ["coverPhotos POST", 100, 0, 0.0, 440.4499999999999, 86, 3379, 303.0, 848.6000000000001, 1073.5499999999988, 3366.4999999999936, 2.313797172539855, 0.6988842436197042, 0.6469141899396099], "isController": false}, {"data": ["users PUT", 100, 0, 0.0, 334.96, 86, 1771, 253.5, 651.9, 807.9, 1764.3899999999967, 2.6586552521734506, 0.8103186564485684, 0.7378806861989206], "isController": false}, {"data": ["users POST", 100, 0, 0.0, 369.00999999999993, 85, 2498, 298.0, 667.9, 837.699999999999, 2484.269999999993, 2.4990003998400643, 0.7616582273340664, 0.6957666152289085], "isController": false}, {"data": ["authors GET", 100, 0, 0.0, 645.9999999999998, 109, 4649, 421.5, 1089.7000000000003, 1960.6499999999996, 4638.349999999995, 6.897503103876397, 2.224848901572631, 1.2804837305145538], "isController": false}, {"data": ["users GET", 100, 0, 0.0, 365.9099999999999, 84, 3380, 225.0, 695.0, 1071.099999999999, 3370.0499999999947, 2.432794063982484, 0.7372031230993797, 0.44688336272959495], "isController": false}, {"data": ["activities POST", 100, 0, 0.0, 713.3700000000002, 108, 4878, 286.5, 2075.2000000000007, 4535.249999999977, 4876.079999999999, 9.650646593321753, 3.263690346940745, 3.0375033174097665], "isController": false}, {"data": ["coverPhotos GET", 100, 0, 0.0, 595.1399999999995, 85, 2623, 383.5, 1242.6000000000001, 1684.3499999999995, 2622.99, 2.2759860709652457, 0.792149839542982, 0.4314149378655803], "isController": false}, {"data": ["books all GET", 100, 0, 0.0, 9119.379999999997, 1687, 31616, 9100.0, 15393.900000000001, 17526.19999999999, 31506.089999999946, 2.0299622427022856, 1800.7192806448174, 0.36872361049084484], "isController": false}, {"data": ["coverPhotos DELETE", 100, 0, 0.0, 398.7699999999999, 84, 2445, 239.5, 794.4000000000002, 1392.8499999999945, 2444.3799999999997, 2.354492371444717, 0.48515418981917496, 0.4968806654972688], "isController": false}, {"data": ["coverPhotos PUT", 100, 0, 0.0, 508.0000000000003, 88, 3381, 319.5, 802.7, 2303.999999999994, 3375.6799999999976, 2.3190019015815593, 0.7004563360929456, 0.6418018934650527], "isController": false}, {"data": ["activities all GET", 100, 0, 0.0, 1016.7900000000001, 442, 7674, 823.0, 1682.6, 1717.8, 7615.00999999997, 9.022013713460845, 27.384102366023097, 1.6828170110068568], "isController": false}, {"data": ["authorsAuthorsForBook GET ", 100, 0, 0.0, 663.25, 131, 3594, 469.0, 1232.0, 2508.8499999999945, 3589.399999999998, 7.688167909587145, 3.6073574565618514, 1.4422822806950104], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2700, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
