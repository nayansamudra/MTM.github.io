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

  x_axis = []
  y_axis = []
  for (var i = 0; i < myArrayone.length; i++) {
    temp = moment(myArrayone[i][0] * 1000).format('h:mm')
    x_axis.push(temp)
    y_axis.push(parseFloat(myArrayone[i][6]))
  }

  var options = {
    series: [{
      name: "MTM value",
      data: y_axis
    }],
    chart: {
      height: 350,
      type: 'area',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Live MTM Chart',
      align: 'center'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: x_axis,
    },
    fill: {
      colors: [function ({ value, seriesIndex, w }) {
        if (value < 0) {
          console.log(value)
          return 'red'
        } else {
          return 'green'
        }
      }]
    },
    colors: [function ({ value, seriesIndex, w }) {
      if (value < 0) {
        return 'red'
      } else {
        return 'green'
      }
    }]
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();

  if (parseFloat($('#Live_MTM').text()) > 0) {
    console.log('u r inside if')
    $('#Live_MTM').attr('style', 'color:green')
  }
  else if (parseFloat($('#Live_MTM').text()) < 0) {
    console.log('u r inside else if')
    $('#Live_MTM').attr('style', 'color:red')
  }

  if (parseFloat($('#percentage_pnl').text()) > 0) {
    console.log('u r inside if')
    $('#percentage').attr('style', 'color:green')
  }
  else if (parseFloat($('#percentage_pnl').text()) < 0) {
    console.log('u r inside else if')
    $('#percentage').attr('style', 'color:red')
  }

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