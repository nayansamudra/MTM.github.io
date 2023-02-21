function showdata() {
  if (counter >= 19) {
    counter = -1
    console.log(counter)
  }
  if (callcount_for_FII_DII_Data > 0) { return }
  else { fetch_data(); }
}

function showdata_1() {
  if (counter_1 >= 19) {
    counter_1 = -1
    console.log(counter_1)
  }
  if (callcount_for_MTM_Data > 0) { return }
  else { all_position_right_table(); }
}

function VolumeBarColor(point) {
  if (point > 0) {
    return 'green'
  } else if (point < 0) {
    return 'red'
  }
}

fetch_data = () => {
  $.ajax({
    method: 'POST',
    url: 'https://students.tradingcafeindia.com/calcApi/fetch_fii_dii_data',
    success: function (response) {
      myArrayone = response
      var table1 = document.getElementById('FII/DII_Data')
      for (var j = 0; j < response.length; j++) {
        var row = `<tr>
              <td>${moment(response[j][0] * 1000).format('DD-MM-YYYY')}</td>
              <td>${response[j][1]}</td>
              <td>${response[j][2]}</td>
              <td>${response[j][3]}</td>
              <td>${parseFloat(parseFloat(response[j][3]) + parseFloat(response[j][6])).toFixed(2)}</td>
              <td>${response[j][6]}</td>
              <td>${response[j][4]}</td>
              <td>${response[j][5]}</td>
                                  </tr>`
        table1.innerHTML += row
      }
      $("#ChartDatatable_1").DataTable({
        "columnDefs": [{ targets: [0, 1, 2, 3, 5, 6, 7], className: 'dt-body-center' },
        { targets: [4], className: 'dt-body-center' }],
        "autoWidth": false,
        paging: false,
        info: false,
        ordering: false,
        searching: false,
      });
    }
  })
  callcount_for_FII_DII_Data = callcount_for_FII_DII_Data + 1;
}

all_position_right_table = () => {
  all_position = API_data['all_position']
  var table1 = document.getElementById('RightTable_Data')
  for (var j = 0; j < all_position.length; j++) {
    if (all_position[j]['ticker'][0] == 'B') { col_1 = 'BN' } else if (all_position[j]['ticker'][0] == 'N') { col_1 = 'N' }
    var row = `<tr>
          <td>${col_1}</td>
          <td>${all_position[j]['ticker'].substr(all_position[j]['ticker'].length - 7, 5)}</td>
          <td>${all_position[j]['ticker'].substr(all_position[j]['ticker'].length - 2, 2)}</td>
          <td>${all_position[j]['lastPrice']}</td>
          <td>${all_position[j]['netQuantity']}</td>
          <td>${all_position[j]['sell_avg']}</td>
          <td>${all_position[j]['pnl']}</td>
                              </tr>`
    table1.innerHTML += row
  }
  $("#Righttable_all_position").DataTable({
    "columnDefs": [{ targets: [0, 1, 2, 3, 4, 5, 6], className: 'dt-body-center' },
    ],
    "rowCallback": function (row, data) {
      if (data[6] > 0) {
        $('td:eq(6)', row).html('<span style=color:green>' + data[6] + '</span>');
      }
      else {
        $('td:eq(6)', row).html('<span style=color:red>' + data[6] + '</span>');
      }
    },
    "autoWidth": false,
    paging: false,
    info: false,
    ordering: false,
    searching: false,
  });
}

$(document).ready(function () {
  
  $.ajaxSetup({ async: false }); // to stop async

  root = 'http://localhost/mtm_chart/response.txt'

  $.get(root, function (data, status) {
    API_data = JSON.parse(data)
    console.log(API_data)
  }).fail(function (response) {
    console.log('Error: ' + response);
  })

  all_position_right_table()

  $('#BankNifty').text(API_data['bank_nifty'])
  $('#Nifty').text(API_data['nifty50'])
  $('#percentage_pnl').text(API_data['percentage_change'])

  callcount_for_FII_DII_Data = callcount_for_MTM_Data = 0;
  counter = counter_1 = -1
  myArrayone = [[0, 0], [0, 0]]
  if (counter >= 40) {
    counter = -1
    console.log(counter)
  }
  if (counter_1 >= 40) {
    counter_1 = -1
    console.log(counter_1)
  }

  showdata()
  // showdata_1()

  Chart_data = []

  x_axis = []
  y_axis = []

  volume = [[1671509520, 0], [1671509700, -147176152.5], [1671509880, -9378077.5], [1671510060, -46905815], [1671510240, -44619097.5], [1671510420, -89305237.5], [1671510600, -96576167.5], [1671510780, -146166667.5], [1671510960, -52764237.5], [1671511140, 10253812.5], [1671511320, -25147742.5], [1671511500, -17747872.5], [1671511680, -27831990], [1671511860, -62080235], [1671512040, -27510452.5], [1671512220, -8361687.5], [1671512400, -21583072.5], [1671512580, -18536730], [1671512760, -24263525], [1671512940, -11874687.5], [1671513120, -23948150], [1671513300, -17771575], [1671513480, 5695375], [1671513660, 16333462.5], [1671513840, 9231025], [1671514020, -9744937.5], [1671514200, -36970270], [1671514380, -63760177.5], [1671514560, -99608837.5], [1671514740, -76801230], [1671514920, -10742162.5], [1671515100, 39749632.5], [1671515280, 19281777.5], [1671515460, 16865502.5], [1671515640, 22214912.5], [1671515820, -28357742.5], [1671516000, -5495430], [1671516180, -23873867.5], [1671516360, -10243345], [1671516540, -16104570], [1671516720, -18028910], [1671516900, -51410402.5], [1671517080, -49065410], [1671517260, -75573190], [1671517440, -46439470], [1671517620, -11160987.5], [1671517800, 555640], [1671517980, -18047220], [1671518160, 54345850], [1671518340, 35254615], [1671518520, 40232530], [1671518700, 27694430], [1671518880, 10854927.5], [1671519060, 46147802.5], [1671519240, 149295177.5], [1671519420, 93667477.5], [1671519600, 17379507.5], [1671519780, 5179352.5], [1671519960, 41946250], [1671520140, 19027020], [1671520320, 59453467.5], [1671520500, 42282277.5], [1671520680, 48395397.5], [1671520860, 40074047.5], [1671521040, 9818315], [1671521220, 5079737.5], [1671521400, 10155135], [1671521580, -1251015], [1671521760, 101834527.5], [1671521940, 47023905], [1671522120, -4373610], [1671522300, -16629217.5], [1671522480, 1145207.5], [1671522660, -4415797.5], [1671522840, -15075480], [1671523020, -4015955], [1671523200, 15242492.5], [1671523380, 19400925], [1671523560, -949870], [1671523740, -3795275], [1671523920, -23368760], [1671524100, 16306892.5], [1671524280, 30535482.5], [1671524460, 50481300], [1671524640, 17605807.5], [1671524820, -4346035], [1671525000, -29228117.5], [1671525180, -9599342.5], [1671525360, 17279752.5], [1671525540, 12267672.5], [1671525720, 92940212.5], [1671525900, 136639347.5], [1671526080, 68007747.5], [1671526260, 105082397.5], [1671526440, 44836362.5], [1671526620, 220134060], [1671526800, 50207975], [1671526980, 40701147.5], [1671527160, 42559632.5], [1671527340, 25604977.5], [1671527520, 5124002.5], [1671527700, 78809755], [1671527880, 24062697.5], [1671528060, 9145820], [1671528240, 24654927.5], [1671528420, 14390160], [1671528600, 27375662.5], [1671528780, 65571115], [1671528960, 227582937.5], [1671529140, 53586047.5], [1671529320, 160860492.5], [1671529500, 244943692.5], [1671529680, 118557402.5], [1671529860, 253987757.5], [1671530040, 75553990], [1671530220, 71476622.5], [1671530400, 44565155]]

  volume_1 = []

  // for (var i = 0; i < myArrayone.length; i++) {
  //   temp = moment(myArrayone[i][0] * 1000).format('h:mm')
  //   x_axis.push(temp)
  //   y_axis.push(parseFloat(myArrayone[i][6]))
  // }

  // conditional area chart - http://jsfiddle.net/canvasjs/b74a99fb/
  window.onload = function () {

    //   var chart = new CanvasJS.Chart("chartContainer", {
    //     theme: "light2", // "light1", "light2", "dark1", "dark2"
    //     animationEnabled: true,
    //     zoomEnabled: true,
    //     title: {
    //       text: "Try Zooming and Panning"
    //     },
    //     data: [
    //       // {
    //       //   type: "splineArea",
    //       //   color: 'green',
    //       //   dataPoints: [
    //       //     { x: new Date(2012, 00, 1), y: 2600 },
    //       //     { x: new Date(2012, 01, 1), y: 3800 },
    //       //     { x: new Date(2012, 01, 15), y: 0, markerSize: 0, highlightEnabled: false },
    //       //   ]
    //       // }, {
    //       //   type: "splineArea",
    //       //   color: 'red',
    //       //   dataPoints: [
    //       //     { x: new Date(2012, 01, 16), y: 0, markerSize: 0, highlightEnabled: false },
    //       //     { x: new Date(2012, 02, 1), y: -4300 },
    //       //     { x: new Date(2012, 03, 1), y: -2900 },
    //       //     { x: new Date(2012, 04, 1), y: -4100 },
    //       //     { x: new Date(2012, 04, 15), y: 0, markerSize: 0, highlightEnabled: false },]
    //       // }, {
    //       //   type: "splineArea",
    //       //   color: 'green',
    //       //   dataPoints: [
    //       //     { x: new Date(2012, 04, 16), y: 0, markerSize: 0, highlightEnabled: false },
    //       //     { x: new Date(2012, 05, 1), y: 4500 },
    //       //     { x: new Date(2012, 06, 1), y: 8600 },
    //       //     { x: new Date(2012, 07, 1), y: 6400 },
    //       //     { x: new Date(2012, 08, 1), y: 5300 },
    //       //     { x: new Date(2012, 09, 1), y: 6000 }]
    //       // }
    //       {
    //         type: "splineArea",
    //         color: 'green',
    //         dataPoints: [
    //           { x: new Date(2012, 00, 1), y: 2600 },
    //           { x: new Date(2012, 01, 1), y: 3800 },
    //           { x: new Date(2012, 02, 1), y: -4300 },
    //           { x: new Date(2012, 03, 1), y: -2900 },
    //           { x: new Date(2012, 04, 1), y: -4100 },
    //           { x: new Date(2012, 05, 1), y: 4500 },
    //           { x: new Date(2012, 06, 1), y: 8600 },
    //           { x: new Date(2012, 07, 1), y: 6400 },
    //           { x: new Date(2012, 08, 1), y: 5300 },
    //           { x: new Date(2012, 09, 1), y: 6000 }
    //         ]},
    //     ]
    // });

    // addDataPoints();
    // setColor(chart);
    // chart.render();

    // function setColor(chart) {
    //   for (var i = 0; i < chart.options.data.length; i++) {
    //     dataSeries = chart.options.data[i];
    //     for (var j = 0; j < dataSeries.dataPoints.length; j++) {
    //       if (dataSeries.dataPoints[j].y <= 0) {
    //         dataSeries.dataPoints[j].color = 'green';
    //         dataSeries.color = 'green';
    //       }
    //       else{
    //         dataSeries.dataPoints[j].color = 'red';
    //         // dataSeries.color = 'red';
    //       }
    //     }
    //   }
    // }

    // function addDataPoints() {
    //   var xVal, yVal
    //   for (var i = 0; i < 8; i++) {
    //     xVal = moment(myArrayone[i][0] * 1000).format('h:mm')
    //     yVal = parseFloat(myArrayone[i][6]);
    //     Chart_data.push({ x: xVal, y: yVal })
    //     console.log(Chart_data)
    //   }
    // }
  }

  // var options = {
  //   series: [{
  //     name: "MTM value",
  //     data: y_axis
  //   }],
  //   chart: {
  //     height: 350,
  //     type: 'area',
  //     zoom: {
  //       enabled: false
  //     },
  //     toolbar: {
  //       show: false
  //     }
  //   },
  //   dataLabels: {
  //     enabled: false
  //   },
  //   stroke: {
  //     curve: 'straight'
  //   },
  //   title: {
  //     text: 'Live MTM Chart',
  //     align: 'center'
  //   },
  //   grid: {
  //     row: {
  //       colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
  //       opacity: 0.5
  //     },
  //   },
  //   xaxis: {
  //     categories: x_axis,
  //   },
  //   fill: {
  //     colors: [function ({ value, seriesIndex, w }) {
  //       if (value < 0) {
  //         console.log(value)
  //         return 'red'
  //       } else {
  //         return 'green'
  //       }
  //     }]
  //   },
  //   colors: [function ({ value, seriesIndex, w }) {
  //     if (value < 0) {
  //       return 'red'
  //     } else {
  //       return 'green'
  //     }
  //   }]
  // };

  // var chart = new ApexCharts(document.querySelector("#chart"), options);
  // chart.render();



  // var options = {
  //   series: [{
  //     name: 'Cash Flow',
  //     data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,28,26,24,19,18,15,16,13,11,10,8,6,2,1,-1,-3,-8,-9,-11,-13,-16,-19,-20,-22,-25,-29,-45,-49,-48,-48,-89,-56,-23,-14,-59,-14,-14,-94
  //     ]
  //   }],
  //   chart: {
  //     type: 'bar',
  //     height: 350
  //   },
  //   plotOptions: {
  //     bar: {
  //       colors: {
  //         ranges: [{
  //           from: 100,
  //           to: 1,
  //           color: '#F15B46'
  //         }, {
  //           from: -100,
  //           to: 0,
  //           color: '#FEB019'
  //         }]
  //       },
  //       columnWidth: '100%',
  //     }
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   grid: {
  //     show: true,
  //     xaxis: {
  //       lines: {
  //           show: true
  //       }
  //   },   
  //   yaxis: {
  //       lines: {
  //           show: true
  //       }
  //   },  
  //   },
  //   yaxis: {
  //     title: {
  //       text: 'Growth',
  //     },
  //     labels: {
  //       formatter: function (y) {
  //         return y.toFixed(0);
  //       }
  //     }
  //   },
  //   xaxis: {
  //     // type: 'category',
  //     // categories: [
  //     //   '2011-01-01', '2011-02-01', '2011-03-01', '2011-04-01', '2011-05-01', '2011-06-01',
  //     //   '2011-07-01', '2011-08-01', '2011-09-01', '2011-10-01', '2011-11-01', '2011-12-01',
  //     //   '2012-01-01', '2012-02-01', '2012-03-01', '2012-04-01', '2012-05-01', '2012-06-01',
  //     //   '2012-07-01', '2012-08-01', '2012-09-01', '2012-10-01', '2012-11-01', '2012-12-01',
  //     //   '2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01', '2013-06-01',
  //     //   '2013-07-01', '2013-08-01', '2013-09-01', '2013-01-01', '2011-02-01', '2011-03-01', 
  //     //   '2011-04-01', '2011-05-01', '2011-06-01', '2011-07-01', '2011-08-01', '2011-09-01', 
  //     //   '2011-10-01', '2011-11-01', '2011-12-01', '2012-01-01', '2012-02-01', '2012-03-01', 
  //     //   '2012-04-01', '2012-05-01', '2012-06-01', '2012-07-01', '2012-08-01', '2012-09-01', 
  //     //   '2012-10-01', '2012-11-01', '2012-12-01', '2013-01-01', '2013-02-01', '2013-03-01', 
  //     //   '2013-04-01', '2013-05-01', '2013-06-01', '2013-07-01', '2013-08-01', '2013-09-01',        
  //     //   '2011-01-01', '2011-02-01', '2011-03-01', '2011-04-01', '2011-05-01', '2011-06-01',
  //     //   '2011-07-01', '2011-08-01', '2011-09-01', '2011-10-01', '2011-11-01', '2011-12-01',
  //     //   '2012-01-01', '2012-02-01', '2012-03-01', '2012-04-01', '2012-05-01', '2012-06-01',
  //     //   '2012-07-01', '2012-08-01', '2012-09-01', '2012-10-01', '2012-11-01', '2012-12-01',
  //     //   '2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01', '2013-06-01',
  //     //   '2013-07-01', '2013-08-01', '2013-09-01', '2013-01-01', '2011-02-01', '2011-03-01', 
  //     //   '2011-04-01', '2011-05-01', '2011-06-01', '2011-07-01', '2011-08-01', '2011-09-01', 
  //     //   '2011-10-01', '2011-11-01', '2011-12-01', '2012-01-01', '2012-02-01', '2012-03-01', 
  //     //   '2012-04-01', '2012-05-01', '2012-06-01', '2012-07-01', '2012-08-01', '2012-09-01', 
  //     //   '2012-10-01', '2012-11-01', '2012-12-01', '2013-01-01', '2013-02-01', '2013-03-01', 
  //     //   '2013-04-01', '2013-05-01', '2013-06-01', '2013-07-01', '2013-08-01', '2013-09-01',
  //     //   '2011-01-01', '2011-02-01', '2011-03-01', '2011-04-01', '2011-05-01', '2011-06-01',
  //     //   '2011-07-01', '2011-08-01', '2011-09-01', '2011-10-01', '2011-11-01', '2011-12-01',
  //     //   '2012-01-01', '2012-02-01', '2012-03-01', '2012-04-01', '2012-05-01', '2012-06-01',
  //     //   '2012-07-01', '2012-08-01', '2012-09-01', '2012-10-01', '2012-11-01', '2012-12-01',
  //     //   '2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01', '2013-06-01',
  //     //   '2013-07-01', '2013-08-01', '2013-09-01', '2013-01-01', '2011-02-01', '2011-03-01', 
  //     //   '2011-04-01', '2011-05-01', '2011-06-01', '2011-07-01', '2011-08-01', '2011-09-01', 
  //     //   '2011-10-01', '2011-11-01', '2011-12-01', '2012-01-01', '2012-02-01', '2012-03-01', 
  //     //   '2012-04-01', '2012-05-01', '2012-06-01', '2012-07-01', '2012-08-01', '2012-09-01', 
  //     //   '2012-10-01', '2012-11-01', '2012-12-01', '2013-01-01', '2013-02-01', '2013-03-01', 
  //     //   '2013-04-01', '2013-05-01', '2013-06-01', '2013-07-01', '2013-08-01', '2013-09-01',
  //     // ],
  //     labels: {
  //       show: false
  //     },
  //   }
  // };

  // var chart = new ApexCharts(document.querySelector("#chart"), options);
  // chart.render();

  console.log(volume)

  compare = 0;

  for (var i = 0; i < volume.length; i++) {
    volume_1.push({
      x: parseFloat(volume[i][0]), // the date
      y: parseFloat(volume[i][1]), // the Volume
      color: VolumeBarColor(parseFloat(volume[i][1])),
    });
  }

  highchart = Highcharts.stockChart("chart", {
    rangeSelector: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    legend: {
      itemStyle: {
        color: "#000000",
        fontWeight: "bold",
      },
    },
    chart: {
      backgroundColor: "#fff",
    },
    plotOptions: {
      column: {
        horizontal: false,
        columnWidth: '100%',
      }
    },
    toolbar: {
      enabled: false,
    },
    yAxis:
    {
      labels: {
        formatter: function () {
          return "";
        },
      },
      top: "5%",
      height: "100%",
      offset: 0,
      lineWidth: 0,
      gridLineWidth: 0,
    },
    tooltip: {
      split: true,
      formatter: function () {
        tooltipArray = ''
        return tooltipArray;
      },
    },
    xAxis: {
      type: "datetime",
      labels: {
        formatter: function () {
          return moment.unix(this.value).format("h:mm a");
        },
      },
    },
    series: [
      {
        type: "column",
        name: "Volume",
        data: volume_1,
        yAxis: 0,
        dataGrouping: {
          enabled: false,
        },
      },
    ]
  });


  if (parseFloat($('#Live_MTM').text()) > 0) {
    $('#Live_MTM').attr('style', 'color:green')
  }
  else if (parseFloat($('#Live_MTM').text()) < 0) {
    $('#Live_MTM').attr('style', 'color:red')
  }

  if (parseFloat($('#percentage_pnl').text()) > 0) {
    $('#percentage').attr('style', 'color:green')
  }
  else if (parseFloat($('#percentage_pnl').text()) < 0) {
    $('#percentage').attr('style', 'color:red')
  }

  // if (parseFloat($('#BankNifty').text()) > 0) {
  //   $('#BankNifty').attr('style', 'color:green')
  // }
  // else if (parseFloat($('#BankNifty').text()) < 0) {
  //   $('#BankNifty').attr('style', 'color:red')
  // }

  // if (parseFloat($('#Nifty').text()) > 0) {
  //   $('#Nifty').attr('style', 'color:green')
  // }
  // else if (parseFloat($('#Nifty').text()) < 0) {
  //   $('#Nifty').attr('style', 'color:red')
  // }

  $('#popup').click(() => {
    $('#Table_2_Column').show()
    $('#ChartDatatable_container').hide()
  })
  $('#menu').click(() => {
    $('#Table_2_Column').hide()
    $('#ChartDatatable_container').show()
  })


  if ($(document).width() < 992) {
    counter_for_datatable = 0
    $("#ChartDatatable_1 tbody  tr").each(function () {
      $(this).find("td:first").text(moment(myArrayone[counter_for_datatable][0] * 1000).format('DD/MM/YY'));
      if (counter_for_datatable < myArrayone.length) {
        counter_for_datatable += 1
        console.log(counter_for_datatable)
      }
    });
  }
  else if ($(document).width() >= 992) {
    counter_for_datatable = 0
    $("#ChartDatatable_1 tbody tr").each(function () {
      $(this).find("td:first").text(moment(myArrayone[counter_for_datatable][0] * 1000).format('DD-MM-YYYY'));
      if (counter_for_datatable < myArrayone.length) {
        counter_for_datatable += 1
        console.log(counter_for_datatable)
      }
    });
  }
  $(window).resize(function () {
    if ($(document).width() < 992) {
      counter_for_datatable = 0
      $("#ChartDatatable_1 tbody  tr").each(function () {
        $(this).find("td:first").text(moment(myArrayone[counter_for_datatable][0] * 1000).format('DD/MM/YY'));
        if (counter_for_datatable < myArrayone.length) {
          counter_for_datatable += 1
          console.log(counter_for_datatable)
        }
      });
    }
    else if ($(document).width() >= 992) {
      $('#MTMDatatable').show()
      $('#ChartDatatable').show()
      counter_for_datatable = 0
      $("#ChartDatatable_1 tbody tr").each(function () {
        $(this).find("td:first").text(moment(myArrayone[counter_for_datatable][0] * 1000).format('DD-MM-YYYY'));
        if (counter_for_datatable < myArrayone.length) {
          counter_for_datatable += 1
          console.log(counter_for_datatable)
        }
      });
    }
  });
})