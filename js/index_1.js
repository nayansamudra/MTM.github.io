all_position_right_table = () => {
  all_position = API_data['all_position']
  var table1 = document.getElementById('RightTable_Data')
  $('#RightTable_Data').empty()
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
  if (counter_for_all_position_datatable == 0) {
    counter_for_all_position_datatable += 1
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
      ordering: true,
      order: [[1, 'asc']],
      searching: true,
    });
  }
}

order_update_left_table = (param) => {
  if (param == 'All') {
    order_update = API_data['order_updates']
    len = Object.keys(API_data['order_updates'])
    var table1 = document.getElementById('order_updates_Data')
    $('#order_updates_Data').empty()
    for (var j = 0; j < len.length; j++) {
      for (var i = 0; i < order_update[len[j]].length; i++) {
        var text = order_update[len[j]][i][1]
        // console.log(text)
        text = text.replace(/\n/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
        // console.log(text)
        var row = `<tr>
          <td>${len[j]}</td>
          <td>${moment(order_update[len[j]][i][0] * 1000).format('h:mm:ss')}</td>
          <td><div id="des${j}">${text}</div></td>
                              </tr>`
        table1.innerHTML += row
      }
    }
    if (counter_for_order_update_datatable == 0) {
      counter_for_order_update_datatable += 1
      $("#ChartDatatable_1").DataTable({
        "columnDefs": [{ targets: [0, 1, 2], className: 'dt-body-start' },
        ],
        "autoWidth": false,
        paging: false,
        info: false,
        ordering: true,
        searching: true,
      });
    }
  }
  else {
    order_updates = API_data['order_updates'][param]
    // console.log(order_updates)

    var table1 = document.getElementById('order_updates_Data')
    $('#order_updates_Data').empty()
    for (var j = 0; j < order_updates.length; j++) {
      var text = order_updates[j][1]
      // console.log(text)
      text = text.replace(/\n/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
      // console.log(text)
      var row = `<tr>
            <td>${param}</td>
            <td>${moment(order_updates[j][0] * 1000).format('h:mm:ss')}</td>
            <td>${text}</td>
                </tr>`
      table1.innerHTML += row
    }
  }
}

log_update_left_table = (param) => {
  if (param == 'All') {
    log_update = API_data['log_update']
    len = Object.keys(API_data['log_update'])
    var table1 = document.getElementById('log_updates_Data')
    $('#log_updates_Data').empty()
    for (var j = 0; j < len.length; j++) {
      for (var i = 0; i < log_update[len[j]].length; i++) {
        var text = log_update[len[j]][i][1]
        // console.log(text)
        text = text.substr(13, text.length)
        text = text.replace(/\n/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
        // console.log(text)
        var row = `<tr>
          <td>${len[j]}</td>
          <td>${moment(log_update[len[j]][i][0] * 1000).format('h:mm:ss')}</td>
          <td><div id="des${j}">${text}</div></td>
                              </tr>`
        table1.innerHTML += row
      }
    }
    if (counter_for_log_update_datatable == 0) {
      counter_for_log_update_datatable += 1
      $("#logDatatable_1").DataTable({
        "columnDefs": [{ targets: [0, 1, 2], className: 'dt-body-start' },
        ],
        "autoWidth": false,
        paging: false,
        info: false,
        ordering: true,
        searching: true,
      });
    }
  }
  else {
    log_updates = API_data['log_update'][param]
    // console.log(log_updates)

    var table1 = document.getElementById('log_updates_Data')
    $('#log_updates_Data').empty()
    for (var j = 0; j < log_updates.length; j++) {
      var text = log_updates[j][1]
      // console.log(text)
      text = text.substr(13, text.length)
      text = text.replace(/\n/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
      // console.log(text)
      var row = `<tr>
          <td>${param}</td>
          <td>${moment(log_updates[j][0] * 1000).format('h:mm:ss')}</td>
          <td>${text}</td>
              </tr>`
      table1.innerHTML += row
    }
  }
}

$(document).ready(function () {

  $.ajaxSetup({ async: false }); // to stop async

  $('#Account_option').change(() => {
    let Account_option = $('#Account_option').val()
    // console.log(Account_option)
    if (Account_option == 'Account_no_1') {
      root = 'https://stats.tradingcafeindia.in'
      route_1 = '/api/fetch1'
      $.get(root + route_1, function (data, status) {
        API_data = data
        // console.log(API_data)
      }).fail(function (response) {
        // console.log('Error: ' + response);
      })

      counter_for_all_position_datatable = 0
      counter_for_log_update_dropdown = counter_for_order_update_dropdown = 0

      $("#Righttable_all_position").DataTable().destroy()

      order_update_left_table('All')
      log_update_left_table('All')
      all_position_right_table()

      if ($('#flexSwitchCheckChecked').is(":checked")) {
        $('#Table_2_Column').show()
        $('#ChartDatatable_container').hide()
      }
      else {
        $('#flexSwitchCheckChecked').prop('checked',true)
        console.log('checked')
        $('#Table_2_Column').show()
        $('#ChartDatatable_container').hide()
      }

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
      root = 'https://stats.tradingcafeindia.in'
      route_2 = '/api/fetch2'
      $.get(root + route_2, function (data, status) {
        API_data = data
        // console.log(API_data)
      }).fail(function (response) {
        // console.log('Error: ' + response);
      })

      counter_for_all_position_datatable = 0
      counter_for_log_update_dropdown = counter_for_order_update_dropdown = 0

      $("#Righttable_all_position").DataTable().destroy()

      order_update_left_table('All')
      log_update_left_table('All')
      all_position_right_table()

      if ($('#flexSwitchCheckChecked').is(":checked")) {
        $('#Table_2_Column').show()
        $('#ChartDatatable_container').hide()
      }
      else {
        $('#flexSwitchCheckChecked').prop('checked',true)
        console.log('checked')
        $('#Table_2_Column').show()
        $('#ChartDatatable_container').hide()
      }

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

  root = 'https://stats.tradingcafeindia.in'
  route_1 = '/api/fetch1'
  
  $.get(root + route_1, function (data, status) {
    API_data = data
    console.log(API_data)
  }).fail(function (response) {
    // console.log('Error: ' + response);
  })

  counter_for_log_update_dropdown = counter_for_order_update_dropdown = 0
  counter_for_log_update_datatable = counter_for_order_update_datatable = counter_for_all_position_datatable = 0

  all_position_right_table()
  order_update_left_table('All')
  log_update_left_table('All')


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

  $('#Radio_1').click(() => {
    $('#order_update').show()
    $('#log_update').hide()
    order_update_left_table('All')
    $('#order_update_option').val('ALL')
  })
  $('#Radio_2').click(() => {
    $('#order_update').hide()
    $('#log_update').show()
    log_update_left_table('All')
    $('#log_update_option').val('ALL')
  })


  $('#log_update_option').change(() => {
    let log_update_option = $('#log_update_option').val()
    // console.log(log_update_option)
    log_update_left_table(log_update_option)
  })
  $('#order_update_option').change(() => {
    let order_update_option = $('#order_update_option').val()
    // console.log(order_update_option)
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
      // console.log('enable')
      $('#Table_2_Column').show()
      $('#ChartDatatable_container').hide()
    }
    else {
      // console.log('disable')
      $('#Table_2_Column').hide()
      $('#ChartDatatable_container').show()
    }
  })

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
      else{
        $('#ChartDatatable_container').show()
        $('#Table_2_Column').hide()
      }
      $('#switch').removeClass('d-none')
    }
  });



  setInterval(() => {
    let Account_option = $('#Account_option').val()
    console.log(Account_option)
    let log_update_option = $('#log_update_option').val()
    let order_update_option = $('#order_update_option').val()
    if (Account_option == 'Account_no_1') {
      root = ' https://stats.tradingcafeindia.in'
      route_1 = '/api/fetch1'
      $.get(root + route_1, function (data, status) {
        API_data = data
        // console.log(API_data)
      }).fail(function (response) {
        // console.log('Error: ' + response);
      })

      counter_for_all_position_datatable = 0
      counter_for_log_update_dropdown = counter_for_order_update_dropdown = 0

      $("#Righttable_all_position").DataTable().destroy()

      order_update_left_table('All')
      log_update_left_table('All')
      all_position_right_table()

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

      if(document.getElementById('Radio_1').checked){
        $('#order_update').show()
        $('#log_update').hide()
        var len = Object.keys(API_data['order_updates'])
        for(var i=0;i<len.length;i++){
          console.log('u r inside for loop')
          if(order_update_option == len[i]){
            console.log('u r inside for loop - IF statement')
            $('#order_update_option').val(order_update_option)
            order_update_left_table(order_update_option)
            console.log(order_update_option +'- done')
          }
        }
      }
      else if(document.getElementById('Radio_2').checked){
        $('#order_update').hide()
        $('#log_update').show()
        var len = Object.keys(API_data['log_update'])
        for(var i=0;i<len.length;i++){
          if(log_update_option == len[i]){
            $('#log_update_option').val(log_update_option)
            log_update_left_table(log_update_option)
          }
        }
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
      root = ' https://stats.tradingcafeindia.in'
      route_2 = '/api/fetch2'
      $.get(root + route_2, function (data, status) {
        API_data = data
        // console.log(API_data)
      }).fail(function (response) {
        // console.log('Error: ' + response);
      })

      counter_for_all_position_datatable = 0
      counter_for_log_update_dropdown = counter_for_order_update_dropdown = 0

      $("#Righttable_all_position").DataTable().destroy()

      order_update_left_table('All')
      log_update_left_table('All')
      all_position_right_table()

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

      if(document.getElementById('Radio_1').checked){
        $('#order_update').show()
        $('#log_update').hide()
        var len = Object.keys(API_data['order_updates'])
        for(var i=0;i<len.length;i++){
          console.log('u r inside for loop')
          if(order_update_option == len[i]){
            console.log('u r inside for loop - IF statement')
            $('#order_update_option').val(order_update_option)
            order_update_left_table(order_update_option)
            console.log(order_update_option +'- done')
          }
        }
      }
      else if(document.getElementById('Radio_2').checked){
        $('#order_update').hide()
        $('#log_update').show()
        var len = Object.keys(API_data['log_update'])
        for(var i=0;i<len.length;i++){
          if(log_update_option == len[i]){
            $('#log_update_option').val(log_update_option)
            log_update_left_table(log_update_option)
          }
        }
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
  }, 1000);

  setInterval(() => {
    let Account_option = $('#Account_option').val()
    // console.log(Account_option)
    if (Account_option == 'Account_no_1') {
      root = ' https://stats.tradingcafeindia.in'
      route_1 = '/api/fetch1'

      $.get(root+route_1, function (data, status) {
        API_data = data
        // console.log(API_data)
      }).fail(function (response) {
        // console.log('Error: ' + response);
      })

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
    }
    else if (Account_option == 'Account_no_2') {
      root = ' https://stats.tradingcafeindia.in'
      route_2 = '/api/fetch2'
      $.get(root+route_2, function (data, status) {
        API_data = data
        // console.log(API_data)
      }).fail(function (response) {
        // console.log('Error: ' + response);
      })

      x_axis = []
      y_axis = []

      for (var i = 0; i < API_data['live_pnl'].length; i++) {
        x_axis.push(moment.unix(Object.keys(API_data['live_pnl'][i])[0]).format('h:mm'))
        y_axis.push(Object.values(API_data['live_pnl'][i])[0])
        live_mtm = Object.values(API_data['live_pnl'][i])[0]
      }

      function addData_4(chart) {
        chart.data.labels = x_axis;
        chart.data.datasets.forEach((dataset) => {
          dataset.data = y_axis;
        })
        chart.update();
      }

      addData_4(chart_1)
    }
  }, 10000);

})