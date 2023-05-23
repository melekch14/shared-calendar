$(document).ready(function () {
  let hijriData = [];
  let hijriYear = [];
  let array = [];
  let selectedMonth;
  let selectedMonths;

  $.ajax({
    url: 'http://localhost:3000/events/allEvents/',
    type: 'GET',
    success: function (response) {
      $.ajax({
        url: 'http://localhost:3000/holidays/get_all_holidays/',
        type: 'GET',
        success: function (holidays) {
          const holidayEvents = holidays.map(holiday => ({
            title: holiday.nom_holiday,
            start: holiday.start_date,
            end: holiday.start_date,
            type: "holiday",
            description: holiday.description
          }));
          const events = response.map(event => ({
            title: event.nom_events,
            start: event.start_date,
            end: event.end_date,
            type: "event",
            description: event.description,
			ville: event.nom_ville
          }));
          const allEvents = events.concat(holidayEvents);
          $('#calendar').fullCalendar('addEventSource', allEvents);
        },
        error: function (error) {
          console.error(error);
        }
      });
    },
    error: function (error) {
      console.error(error);
    }
  });

  $('#calendar').fullCalendar({
    header: {
      left: "prev,next today",
      center: "title",
      right: "month,agendaWeek,agendaDay",
    },
    eventRender: function (event, element) {
      if (event.type === "holiday") {
        element.css("background-color", "#7FFF00");
      }
    },
    dayClick: function (date, jsEvent, view) {
      alert(date.format());
    },
    eventClick: function (event, jsEvent, view) {
      $('#eventModal').modal('show');
      $('#eventModal .modal-title').text(event.title);
      $('#eventModal .modal-body').html(
        '<p>Start: ' + moment(event.start).format('MMM Do YYYY') + '</p>' +
        '<p>End: ' + (event.type === "holiday" ? moment(event.start).format('MMM Do YYYY') : moment(event.end).format('MMM Do YYYY')) + '</p>' +
        '<p>Type: ' + event.type + '</p>' +
        '<p>Description: ' + (event.type === "holiday" ? event.description : event.description) + '</p>' +
        (event.type === "event" ? '<p>Ville: ' + event.ville + '</p>' : '')
      );
    },
    async dayRender(date, cell) {
      var month = date.month();
      var year = date.year();
      var day = date.date();

      hijriData = await fetch('https://api.aladhan.com/v1/gToHCalendar/' + (month + 1) + '/' + year)
        .then(response => response.json())
        .then(data => {
          return data.data.map(day => ({
            gregorianDate: day.gregorian.date,
            gregorianMonth: day.gregorian.month.en,
            hijriDate: day.hijri.date,
            hijriDay: day.hijri.day,
            month: day.hijri.month.ar,
            year: day.hijri.year
          }));
        });

      // Extract the Hijri data for the current day
      const hijriDayData = hijriData[day - 1];


      if (!hijriYear.includes(hijriDayData.year))
        hijriYear.push(hijriDayData.year);

      // Add the Hijri day number to the current day
      cell.append(hijriDayData.hijriDay);

      if ((month + 1) <= selectedMonth) {
        if (!array.includes(hijriDayData.month)) {
          array.push(hijriDayData.month);
          if (array.length > 2) {
            array.shift();
          }
        }
      }
      document.querySelector(".fc-center").innerHTML = "<h2>" + selectedMonths + " / " + array.join(' ') + " " + hijriDayData.year + "</h2>";
    },
    viewRender: function (view, element) {
      selectedMonth = view.intervalStart.format("M");
      selectedMonths = view.intervalStart.format("MMMM YYYY");
    }
  });

  updateTimes(3)
  /************* functions ********************** */

  async function updateTimes(ville) {
    try {
      const url = `http://localhost:3000/prayer-times/by_ville/${ville}`;
      const response = await $.ajax({
        url: url,
        type: "GET",
      });
      const result = response;
      $("#chourouk").text(result.Sunrise);
      $("#ghouroub").text(result.maghrib);
    } catch (error) {
      console.error('Error updating times:', error);
      throw error;
    }
  }
});