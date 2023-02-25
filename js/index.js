all_position_right_table = () => {
  position_table = []
  all_position = API_data['all_position']
  $('#RightTable_Data').empty()
  for (var j = 0; j < all_position.length; j++) {
    if (all_position[j]['ticker'][0] == 'B') { col_1 = 'BN' } else if (all_position[j]['ticker'][0] == 'N') { col_1 = 'N' }
    position_table.push([col_1, all_position[j]['ticker'].substr(all_position[j]['ticker'].length - 7, 5), all_position[j]['ticker'].substr(all_position[j]['ticker'].length - 2, 2), parseFloat(all_position[j]['lastPrice']).toFixed(2), all_position[j]['netQuantity'], parseFloat(all_position[j]['sell_avg']).toFixed(2), parseFloat(all_position[j]['pnl']).toFixed(2)])
  }
  if (counter_for_all_position_datatable == 0) {
    counter_for_all_position_datatable += 1
    datatable = $("#Righttable_all_position").DataTable({
      data: position_table,
      "columnDefs": [{ targets: [0, 1, 2,], className: 'dt-body-start' },
      { targets: [4], className: 'dt-body-center' },
      { targets: [3, 5, 6], className: 'dt-body-right' },
      { targets: [0, 1, 2], width: '1px' }
      ],
      "fnRowCallback": function (nRow, aData) {
        if (aData[4] == 0) {
          $('td', nRow).css('background-color', '#dcdcdc');
        }

        if (aData[6] > 0) {
          $('td:eq(6)', nRow).html('<span style=color:green>' + aData[6] + '</span>');
        }
        else {
          $('td:eq(6)', nRow).html('<span style=color:red>' + aData[6] + '</span>');
        }
      },
      "autoWidth": false,
      paging: false,
      info: false,
      ordering: true,
      order: [[1, 'asc']],
      searching: true,
      "dom": '<"pull-left"f><"pull-right"l>tip'
    });
  }
  else if (counter_for_all_position_datatable > 0) {
    console.log("Data is updating")
    datatable.clear();
    datatable.rows.add(position_table);
    datatable.draw();
  }
}

order_update_left_table = (param) => {
  order_updates = []
  if (param == 'ALL') {
    order_update = API_data['order_updates']
    len = Object.keys(API_data['order_updates'])
    $('#order_updates_Data').empty()
    for (var j = 0; j < len.length; j++) {
      for (var i = 0; i < order_update[len[j]].length; i++) {
        var text = order_update[len[j]][i][1]
        index = text.indexOf('\n') + 1
        text = text.substr(index, text.length)
        text = text.replace(/\n/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
        order_updates.push([len[j], moment(order_update[len[j]][i][0] * 1000).format('HH:mm:ss'), text])
      }
    }
  }
  else {
    order_update = API_data['order_updates'][param]
    $('#order_updates_Data').empty()
    for (var j = 0; j < order_update.length; j++) {
      var text = order_update[j][1]
      index = text.indexOf('\n') + 1
      text = text.substr(index, text.length)
      text = text.replace(/\n/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
      order_updates.push([param, moment(order_update[j][0] * 1000).format('HH:mm:ss'), text])
    }
  }

  if (counter_for_order_update_datatable == 0) {
    counter_for_order_update_datatable += 1
    datatable_1 = $("#ChartDatatable_1").DataTable({
      data: order_updates,
      "columnDefs": [{ targets: [0, 1, 2], className: 'dt-body-start' },
      ],
      "autoWidth": false,
      paging: false,
      info: false,
      ordering: true,
      order: [[1, 'desc']],
      searching: true,
      "dom": '<"pull-left"f><"pull-right"l>tip'
    });
  }
  else if (counter_for_order_update_datatable > 0) {
    datatable_1.clear();
    datatable_1.rows.add(order_updates);
    datatable_1.draw();
  }
}

log_update_left_table = (param) => {
  log_table = []
  if (param == 'ALL') {
    console.log('u r inside all')
    log_update = API_data['log_update']
    len = Object.keys(API_data['log_update'])
    $('#log_updates_Data').empty()
    for (var j = 0; j < len.length; j++) {
      for (var i = 0; i < log_update[len[j]].length; i++) {
        var text = log_update[len[j]][i][1]
        text = text.substr(13, text.length)
        text = text.replace(/\n/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
        log_table.push([len[j], moment(log_update[len[j]][i][0] * 1000).format('HH:mm:ss'), text])
      }
    }
  }
  else {
    log_updates = API_data['log_update'][param]
    $('#log_updates_Data').empty()
    for (var j = 0; j < log_updates.length; j++) {
      var text = log_updates[j][1]
      text = text.substr(13, text.length)
      text = text.replace(/\n/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
      log_table.push([param, moment(log_updates[j][0] * 1000).format('HH:mm:ss'), text])
    }
  }

  if (counter_for_log_update_datatable == 0) {
    counter_for_log_update_datatable += 1
    datatable_2 = $("#logDatatable_1").DataTable({
      data: log_table,
      "columnDefs": [{ targets: [0, 1, 2], className: 'dt-body-start' },
      ],
      "autoWidth": false,
      paging: false,
      info: false,
      ordering: true,
      order: [[1, 'desc']],
      searching: true,
      "dom": '<"pull-left"f><"pull-right"l>tip'
    });
  }
  else if (counter_for_log_update_datatable > 0) {
    datatable_2.clear();
    datatable_2.rows.add(log_table);
    datatable_2.draw();
  }
}

startegy_table_1 = () => {
  startegy_table = []
  strategy = API_data['strat']
  name_key = Object.keys(strategy)
  mtm_value = Object.values(strategy)
  $('#strategy_Table_Data').empty()
  for (var j = 0; j < name_key.length; j++) {
    startegy_table.push([name_key[j], parseFloat(mtm_value[j])])
  }
  if (counter_for_startegy_table == 0) {
    counter_for_startegy_table += 1
    console.log('u entered in if part')
    datatable_4 = $("#strategyTable_1").DataTable({
      data: startegy_table,
      "columnDefs": [{ targets: [0], className: 'dt-body-center' },
      { targets: [1], className: 'dt-body-right' },
      ],
      "fnRowCallback": function (nRow, aData) {
        if (aData[1] > 0) {
          $('td:eq(1)', nRow).html('<span style=color:green>' + aData[1] + '</span>');
        }
        else {
          $('td:eq(1)', nRow).html('<span style=color:red>' + aData[1] + '</span>');
        }
      },
      "autoWidth": false,
      paging: false,
      info: false,
      ordering: true,
      searching: true,
      "dom": '<"pull-left"f><"pull-right"l>tip'
    });
  }
  else if (counter_for_all_position_datatable > 0) {
    console.log("Data is updating")
    datatable_4.clear();
    datatable_4.rows.add(startegy_table);
    datatable_4.draw();
  }
}

$(document).ready(function () {

  $.ajaxSetup({ async: false }); // to stop async

  console.log = function () { };

  root = 'https://stats.tradingcafeindia.in'
  route = '/api/fetch1'
  route_hist_list = '/api/hist_list'

  time_API = 1000000
  time_position_table = 5000000
  time_update_table = 5000000
  time_chart = 10000000

  $.get(root + route, function (data, status) {
    API_data = data
    console.log(API_data)
  }).fail(function (response) {
    console.log('Error: ' + response);
  })

  $.get(root + route_hist_list, function (data, status) {
    Hist_List = data
  }).fail(function (response) {
    console.log('Error: ' + response);
  })

  counter_for_log_update_dropdown = counter_for_order_update_dropdown = counter_for_date_dropdown = 0
  counter_for_log_update_datatable = counter_for_order_update_datatable = counter_for_all_position_datatable = counter_for_startegy_table = 0
  counter_for_log_update_function_call = counter_for_order_update_function_call = 0

  all_position_right_table()
  order_update_left_table('ALL')

  if (counter_for_order_update_dropdown == 0) {
    counter_for_order_update_dropdown += 1
    var table1 = document.getElementById('order_update_option')
    var len = Object.keys(API_data['order_updates'])
    table1.innerHTML += row
    for (var j = 0; j < len.length; j++) {
      var row = `<option id="${j}_order_update" value="${len[j]}">${len[j]}</option>`
      table1.innerHTML += row
    }
  }

  if (counter_for_log_update_dropdown == 0) {
    counter_for_log_update_dropdown += 1
    var table1 = document.getElementById('log_update_option')
    var len = Object.keys(API_data['log_update'])
    for (var j = 0; j < len.length; j++) {
      var row = `<option id="${j}_log_update" value="${len[j]}">${len[j]}</option>`
      table1.innerHTML += row
    }
  }

  if (counter_for_date_dropdown == 0) {
    counter_for_date_dropdown += 1
    var table1 = document.getElementById('Date_option')
    for (var j = 0; j < Hist_List.length; j++) {
      var row = `<option id="${j}_log_update" value="${moment(Hist_List[j] * 1000).format('DD-MM-YYYY')}">${moment(Hist_List[j] * 1000).format('DD-MM-YYYY')}</option>`
      table1.innerHTML += row
    }
  }

  $('#Account_option').change(() => {
    let Account_option = $('#Account_option').val()
    if (Account_option == 'Account_no_1') {
      route = '/api/fetch1'
      $.get(root + route, function (data, status) {
        API_data = data
      }).fail(function (response) {
        console.log('Error: ' + response);
      })

      order_update_left_table('ALL')
      all_position_right_table()

      if ($('#flexSwitchCheckChecked').is(":checked")) {
        $('#Table_2_Column').show()
        $('#ChartDatatable_container').hide()
      }
      else {
        $('#flexSwitchCheckChecked').prop('checked', true)
        console.log('checked')
        $('#Table_2_Column').show()
        $('#ChartDatatable_container').hide()
      }

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

      function addData_1(chart) {
        chart.data.labels = x_axis;
        chart.data.datasets.forEach((dataset) => {
          dataset.data = y_axis;
        })
        chart.update();
      }

      addData_1(chart_1)

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
    }
    else if (Account_option == 'Account_no_2') {
      route = '/api/fetch2'
      $.get(root + route, function (data, status) {
        API_data = data
      }).fail(function (response) {
        console.log('Error: ' + response);
      })

      order_update_left_table('ALL')
      all_position_right_table()

      if ($('#flexSwitchCheckChecked').is(":checked")) {
        $('#Table_2_Column').show()
        $('#ChartDatatable_container').hide()
      }
      else {
        $('#flexSwitchCheckChecked').prop('checked', true)
        console.log('checked')
        $('#Table_2_Column').show()
        $('#ChartDatatable_container').hide()
      }

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

      function addData_2(chart) {
        chart.data.labels = x_axis;
        chart.data.datasets.forEach((dataset) => {
          dataset.data = y_axis;
        })
        chart.update();
      }

      addData_2(chart_1)

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
    }
  })

  $('#Radio_1').click(() => {
    $('#order_update').show()
    $('#log_update').hide()
    $('#Strategy').hide()
    order_update_left_table('ALL')
    $('#order_update_option').val('ALL')
  })
  $('#Radio_2').click(() => {
    $('#order_update').hide()
    $('#log_update').show()
    $('#Strategy').hide()
    log_update_left_table('ALL')
    $('#log_update_option').val('ALL')
  })
  $('#Radio_3').click(() => {
    $('#order_update').hide()
    $('#log_update').hide()
    $('#Strategy').show()
    startegy_table_1()
  })


  $('#log_update_option').change(() => {
    let log_update_option = $('#log_update_option').val()
    log_update_left_table(log_update_option)
  })
  $('#order_update_option').change(() => {
    let order_update_option = $('#order_update_option').val()
    order_update_left_table(order_update_option)
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

  chart_1 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: x_axis,
      datasets: [{
        fill: {
          target: 'origin',
          above: 'green',   // Area will be red above the origin
          below: 'red'    // And blue below the origin
        },
        data: y_axis,
        tension: 0.4,
        borderWidth: 0,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        },
        x: {
          ticks: {
            display: true,
            maxTicksLimit: 10
          }
        },
      },
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Live MTM Chart',
          align: 'start',
          color: 'black',
          font: {
            size: 20
          },
          padding: { bottom: 25 }
        },
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

  $('#switch').click(() => {
    if ($('#flexSwitchCheckChecked').is(":checked")) {
      $('#Table_2_Column').show()
      $('#ChartDatatable_container').hide()
    }
    else {
      $('#Table_2_Column').hide()
      $('#ChartDatatable_container').show()
    }
  })

  // updating API after every 1 sec 
  setInterval(() => {
    let Account_option = $('#Account_option').val()
    if (Account_option == 'Account_no_1') {
      route = '/api/fetch1'
      $.get(root + route, function (data, status) {
        API_data = data
      }).fail(function (response) {
        console.log('Error: ' + response);
      })
    }
    else if (Account_option == 'Account_no_2') {
      route = '/api/fetch2'
      $.get(root + route, function (data, status) {
        API_data = data
      }).fail(function (response) {
        console.log('Error: ' + response);
      })
    }
  }, time_API);

  // updating CHART & FIELDS after every 10 sec
  setInterval(() => {

    x_axis = []
    y_axis = []

    for (var i = 0; i < API_data['live_pnl'].length; i++) {
      x_axis.push(moment.unix(Object.keys(API_data['live_pnl'][i])[0]).format('h:mm'))
      y_axis.push(Object.values(API_data['live_pnl'][i])[0])
      live_mtm = Object.values(API_data['live_pnl'][i])[0]
    }

    function addData(chart) {
      chart.data.labels = x_axis;
      chart.data.datasets.forEach((dataset) => {
        dataset.data = y_axis;
      })
      chart.update();
    }
    addData(chart_1)

    $('#BankNifty').text(API_data['bank_nifty'])
    $('#Nifty').text(API_data['nifty50'])
    $('#percentage_pnl').text(API_data['percentage_change'])
    $('#Live_MTM').text(live_mtm)

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
  }, time_chart);

  // updating ALL POSITION TABLE after every 5 sec
  setInterval(() => {
    all_position_right_table()
  }, time_position_table);

  // updating LOG/ORDER UPDATE TABLE after every 5 sec
  setInterval(() => {
    let log_update_option = $('#log_update_option').val()
    let order_update_option = $('#order_update_option').val()

    if (document.getElementById('Radio_1').checked) {
      order_update_left_table(order_update_option)
    }
    else if (document.getElementById('Radio_2').checked) {
      log_update_left_table(log_update_option)
    }
    else if (document.getElementById('Radio_3').checked) {
      startegy_table_1()
    }
  }, time_update_table);

  if ($(document).width() < 975) {
    $('#Table_2_Column').show()
    $('#ChartDatatable_container').hide()
    $('#switch').removeClass('d-none')
  }

  $(window).resize(function () {
    if ($(document).width() >= 975) {
      $('#Table_2_Column').show()
      $('#ChartDatatable_container').show()
      $('#switch').addClass('d-none')
    }
    else if ($(document).width() < 975) {
      if ($('#flexSwitchCheckChecked').is(":checked")) {
        $('#Table_2_Column').show()
        $('#ChartDatatable_container').hide()
      }
      else {
        $('#ChartDatatable_container').show()
        $('#Table_2_Column').hide()
      }
      $('#switch').removeClass('d-none')
    }
  });
})