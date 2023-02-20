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
  var options = {
    series: [{
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    chart: {
      height: 350,
      type: 'line',
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();

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

  $('#popup').click(()=>{
    $('#MTMDatatable').show()
    $('#ChartDatatable').hide()
  })
  $('#menu').click(()=>{
    $('#MTMDatatable').hide()
    $('#ChartDatatable').show()
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