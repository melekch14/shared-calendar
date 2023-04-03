$(document).ready(function () {
            let hijriData = [];
            let hijriYear = [];
            let array = [];
            let selectedMonth;
            let selectedMonths;

            $.ajax({
                url: 'http://localhost:3000/events/allEvents/',
                type: 'GET',
                success: function(response) {
                    console.log(response);
                  const events = response.map(event => ({
                    title: event.nom_events,
                    start: event.start_date,
                    end: event.end_date
                  }));
                  $('#calendar').fullCalendar('addEventSource', events);
                },
                error: function(error) {
                  console.error(error);
                }
              });



            $('#calendar').fullCalendar({
                header: {
                    left: "prev,next today",
                    center: "title",
                    right: "month,agendaWeek,agendaDay",
                },
                dayClick: function (date, jsEvent, view) {
                    alert(date.format());
                },
                eventClick: function(event) {
                    // Handle the event click here
                    alert('Event: ' + event.title);
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
        });