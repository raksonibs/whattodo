//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require moment
//= require snabbt
//= require react
//= require_tree .

$(document).ready(function() {
  $('.button').click(function() {
    $.get("/api/v1/create_token", function(data) {
      $('.key-holder').text("Your access token: " + data.access_token)
    })
  })

  $('#select-all').click(function() {
    $('input').attr('checked', 'checked')
  })

  $('#uncheck').click(function() {
    $('input').removeAttr('checked')
  })

  $('.click-create').click(function() {
    $('.form-new-event').toggle()
  })

  $('.edited').click(function() {
    $(this).addClass('change-please')
  })

  $('#edit-all').click(function() {
    var eventIds = {}
    var needChange = $('.edited.change-please')

    $.each(needChange, function(index, eventId) {
      var eventVals = {}
      var allTds = $(eventId).children('td') 
      $.each(allTds, function(index, eventTds) {
        if ( index !== 0 && index !== (allTds.length-1) ) {
          if ( index === 3 ) {
            var textVal = $(eventTds).text().trim()
          } else if ( index === 4 ) {
            var textVal = $(eventTds).find('textarea').val()
          } else {
            var textVal = $(eventTds).find('input').val()
          }

          var attribute = $(eventTds).attr('class').split('-')[1]

          eventVals[attribute] = textVal

        }

        if ( index === (allTds.length-1) ) {
          var eventNum = $($(allTds).children()[0]).val()
          eventIds[eventNum] = eventVals
        }

      })
    })

    if ( eventIds === {} ) {
       $('.target').text('Pick some events to edit noob!')
    } else {
      var events = { events: eventIds }
      var url = '/api/v1/mass_edit'

      $('.target').text('')
      $('.all-output').html('<h1>Editing Events</h1>')
      $('.all-output').snabbt({
        position: [100, 0, 0],
        easing: 'ease'
      }).then({
        from_rotation: [0, 0, -2*Math.PI],
        easing: 'spring',
        spring_constant: 0.2,
        spring_deaccelaration: 0.95,
      });

      $.ajax({
        url: url,
        type: "POST",
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        dataType: "json",
        data: {events: events },
        complete: function(data) {
          $('.all-output').html('')
          var jsonData = data.responseJSON['events']
          var htmlString = '<table><tr><th>Approve/Unapprove</th><th>Name</th><th>Approved</th><th>Location</th><th>Price</th><th>Latitude</th><th>Longitude</th><th>Url</th><th>Image</th><th>DayOn</th><th>DayEnd</th></tr>'
          $.each(jsonData, function(index, eventArr) {            
            htmlString += '<tr><td><input id="event" name="event" type="checkbox" value="'+eventArr['ruby_id']+'"></td>'
            + '<td><label class="check-box" for="event">'+eventArr['name']+'</label></td>'
            +'<td>'+eventArr['approved']+'</td>'
            +'<td>'+eventArr['location']+'</td>'
            +'<td>'+eventArr['price']+'</td>'
            +'<td>'+eventArr['latitude']+'</td>'
            +'<td>'+eventArr['longitude']+'</td>'
            +'<td><a href="'+eventArr['url']+'">'+eventArr['url']+'</a></td>'
            +'<td class="event-image"><img src="'+eventArr['image']+'"></td>'
            +'<td>'+eventArr['dayOn']+'</td>'
            +'<td>'+eventArr['dayEnd']+'</td>'
            +'</tr>'
          })
          htmlString += '</tr>'
          $('.all-output').html(htmlString)
        }
      })

      
    }



  })

  $('#approve-all').click(function() {
    var allData = [],
        url;
    $.each($('input:checked'), function(index, eventId) {
      var eventNum = $(eventId).val()
      allData.push(eventNum)
    })

    url = "/api/v1/approve"

    if (allData.toString() === [].toString()) {
      $('.target').text('Pick some events noob!')
    } else {
      $('.target').text('')
      $('.all-output').html('<h1>Geocoding approved Events</h1>')
      $('.all-output').snabbt({
        position: [100, 0, 0],
        easing: 'ease'
      }).then({
        from_rotation: [0, 0, -2*Math.PI],
        easing: 'spring',
        spring_constant: 0.2,
        spring_deaccelaration: 0.95,
      });

      $.ajax({
        url: url,
        type: "POST",
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        dataType: "json",
        data: {events: allData },
        complete: function(data) {
          $('.all-output').html('')
          var jsonData = data.responseJSON['events']
          var htmlString = '<table><tr><th>Approve/Unapprove</th><th>Name</th><th>Approved</th><th>Location</th><th>Price</th><th>Latitude</th><th>Longitude</th><th>Url</th><th>Image</th><th>DayOn</th><th>DayEnd</th></tr>'
          $.each(jsonData, function(index, eventArr) {            
            htmlString += '<tr><td><input id="event" name="event" type="checkbox" value="'+eventArr['ruby_id']+'"></td>'
            + '<td><label class="check-box" for="event">'+eventArr['name']+'</label></td>'
            +'<td>'+eventArr['approved']+'</td>'
            +'<td>'+eventArr['location']+'</td>'
            +'<td>'+eventArr['price']+'</td>'
            +'<td>'+eventArr['latitude']+'</td>'
            +'<td>'+eventArr['longitude']+'</td>'
            +'<td><a href="'+eventArr['url']+'">'+eventArr['url']+'</a></td>'
            +'<td class="event-image"><img src="'+eventArr['image']+'"></td>'
            +'<td>'+eventArr['dayOn']+'</td>'
            +'<td>'+eventArr['dayEnd']+'</td>'
            +'</tr>'
          })
          htmlString += '</tr>'
          $('.all-output').html(htmlString)
        }
      })
    }
  })
})

