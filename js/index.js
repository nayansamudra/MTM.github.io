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
  else { fetch_data_1(); }
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

fetch_data_1 = () => {
  $.ajax({
    method: 'POST',
    url: 'https://students.tradingcafeindia.com/calcApi/fetch_fii_dii_data',
    success: function (response) {
      myArrayone = response
      var table1 = document.getElementById('MTM_Data')
      for (var j = 0; j < response.length; j++) {
        var row = `<tr>
              <td>${response[j][0]}</td>
              <td>${response[j][1]}</td>
              <td>${response[j][2]}</td>
              <td>${response[j][3]}</td>
              <td>${response[j][4]}</td>
              <td>${response[j][5]}</td>
              <td>${response[j][6]}</td>
                                  </tr>`
        table1.innerHTML += row
      }
      $("#MTMDatatable_1").DataTable({
        "columnDefs": [{ targets: [0, 1, 2, 3, 4, 5, 6], className: 'dt-body-center' },
          // { targets: [4], className: 'dt-body-center' }
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
  })
  callcount_for_MTM_Data = callcount_for_MTM_Data + 1;
}

$(document).ready(function () {
  $.ajaxSetup({ async: false }); // to stop async

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
  showdata_1()

  Chart_data = []

  x_axis = []
  y_axis = []

  // for (var i = 0; i < myArrayone.length; i++) {
  //   temp = moment(myArrayone[i][0] * 1000).format('h:mm')
  //   x_axis.push(temp)
  //   y_axis.push(parseFloat(myArrayone[i][6]))
  // }

  // conditional area chart - http://jsfiddle.net/canvasjs/b74a99fb/
  window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      animationEnabled: true,
      zoomEnabled: true,
      title: {
        text: "Try Zooming and Panning"
      },
      data: [{
        type: "splineArea",
        color: 'green',
        dataPoints: [
          { x: new Date(2012, 00, 1), y: 2600 },
          { x: new Date(2012, 01, 1), y: 3800 },
          { x: new Date(2012, 01, 15), y: 0, markerSize: 0, highlightEnabled: false },
        ]
      }, {
        type: "splineArea",
        color: 'red',
        dataPoints: [
          { x: new Date(2012, 01, 16), y: 0, markerSize: 0, highlightEnabled: false },
          { x: new Date(2012, 02, 1), y: -4300 },
          { x: new Date(2012, 03, 1), y: -2900 },
          { x: new Date(2012, 04, 1), y: -4100 },
          { x: new Date(2012, 04, 15), y: 0, markerSize: 0, highlightEnabled: false },]
      }, {
        type: "splineArea",
        color: 'green',
        dataPoints: [
          { x: new Date(2012, 04, 16), y: 0, markerSize: 0, highlightEnabled: false },
          { x: new Date(2012, 05, 1), y: 4500 },
          { x: new Date(2012, 06, 1), y: 8600 },
          { x: new Date(2012, 07, 1), y: 6400 },
          { x: new Date(2012, 08, 1), y: 5300 },
          { x: new Date(2012, 09, 1), y: 6000 }]
      }]
    });

    // addDataPoints();
    // setColor(chart);
    chart.render();

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