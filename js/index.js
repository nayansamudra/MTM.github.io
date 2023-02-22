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

order_update_left_table = () => {
  order_updates = API_data['order_updates']
  len = Object.keys(API_data['order_updates'])
  var table1 = document.getElementById('order_updates_Data')
  for (var j = 0; j < len.length; j++) {
    var row = `<tr>
          <td>${len[j]}</td>
          <td>${moment(order_updates[len[j]][0][0] * 1000).format('h:mm')}</td>
          <td><div id="des${j}">${order_updates[len[j]][0][1]}</div></td>
                              </tr>`
    table1.innerHTML += row
  }
  $("#ChartDatatable_1").DataTable({
    "columnDefs": [{ targets: [0, 1, 2], className: 'dt-body-center' },
    ],
    "autoWidth": false,
    paging: false,
    info: false,
    ordering: false,
    searching: false,
  });
}

log_update_left_table = (param) => {
  log_updates = API_data['log_update'][param]
  console.log(log_updates)

  var table1 = document.getElementById('log_updates_Data')
  $('#log_updates_Data').empty()
  for (var j = 0; j < log_updates.length; j++) {
    var row = `<tr>
          <td class="text-center">${moment(log_updates[j][0] * 1000).format('h:mm')}</td>
          <td class="text-center">${log_updates[0][1]}</td>
              </tr>`
    table1.innerHTML += row
  }
  if (counter_for_log_update_datatable == 0) {
    counter_for_log_update_datatable += 1
    $("#logDatatable_1").DataTable({
      "columnDefs": [{ targets: [0, 1], className: 'dt-body-center' },
      ],
      "autoWidth": false,
      paging: false,
      info: false,
      ordering: false,
      searching: false,
    });
  }
}

function VolumeBarColor(point) {
  if (point > 0) {
    return 'green'
  } else if (point < 0) {
    return 'red'
  }
}

$(document).ready(function () {

  $.ajaxSetup({ async: false }); // to stop async

  root = 'https://nayansamudra.github.io/MTM.github.io/response.txt'

  $.get(root, function (data, status) {
    API_data = JSON.parse(data)
    console.log(API_data)
  }).fail(function (response) {
    console.log('Error: ' + response);
  })

  all_position_right_table()
  order_update_left_table()

  counter_for_log_update_dropdown = 0
  counter_for_log_update_datatable = 0

  $('#update_option').change(() => {
    let update_val = $('#update_option').val()
    if (update_val == 'Order_Update') {
      $('#order_update').show()
      $('#log_update').hide()
    }
    else if (update_val == 'Log_Update') {
      $('#order_update').hide()
      $('#log_update').show()
      if (counter_for_log_update_dropdown == 0) {
        counter_for_log_update_dropdown += 1
        var table1 = document.getElementById('log_update_option')
        var len = Object.keys(API_data['log_update'])
        for (var j = 0; j < len.length; j++) {
          var row = `<option id="${j}_log_update_dropdown" value="${len[j]}">${len[j]}</option>`
          table1.innerHTML += row
        }
      }
    }
  })

  $('#log_update_option').change(() => {
    let log_update_option = $('#log_update_option').val()
    console.log(log_update_option)
    log_update_left_table(log_update_option)
  })

  x_axis = []
  y_axis = []

  for (var i = 0; i < API_data['live_pnl'].length; i++) {
    x_axis.push(moment.unix(Object.keys(API_data['live_pnl'][i])[0]).format('h:mm'))
    y_axis.push(Object.values(API_data['live_pnl'][i])[0])
    live_mtm = Object.values(API_data['live_pnl'][i])[0]
  }

  $('#BankNifty').text(API_data['bank_nifty'])
  $('#Nifty').text(API_data['nifty50'])
  $('#percentage_pnl').text(API_data['percentage_change'])
  $('#Live_MTM').text(live_mtm)

  const ctx = document.getElementById('chart');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: x_axis,
      datasets: [{
        fill: {
          target: 'origin',
          above: 'green',   // Area will be red above the origin
          below: 'red'    // And blue below the origin
        },
        label: 'Live MTM chart',
        data: y_axis,
        tension: 0.4,
        borderWidth: 0,
        pointRadius: 0
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        tooltip: {
          enabled: false,
        }
      }
    }
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

  $('#popup').click(() => {
    $('#Table_2_Column').show()
    $('#ChartDatatable_container').hide()
  })
  $('#menu').click(() => {
    $('#Table_2_Column').hide()
    $('#ChartDatatable_container').show()
  })

  $(window).resize(function () {
    if ($(document).width() >= 992) {
      $('#Righttable').show()
      $('#ChartDatatable_container').show()
    }
  });
})
