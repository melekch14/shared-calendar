$(document).ready(function(){

   $('#date-input').inputmask();
  
   $('#addholidays').on('click', function(event) {
      const month = parseInt($('#date-input').val().substring(0, 2));
      const day = parseInt($('#date-input').val().substring(3, 5));
      if ((day < 1 || day > 31) || (month < 1 || month > 12)) {
        event.preventDefault();
        alert('Please enter a valid day and month.');
      }else {
         const currentYear = new Date().getFullYear();
         const jour = currentYear+"-"+$('#date-input').val();
         const formData = {
            start_date: jour,
            nom_holiday: $('#nom').val(),
            description: $('#desc').val()
          };
   
          $.ajax({
            url: 'http://localhost:3000/holidays/add_holiday',
            type: 'POST',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
              alert("event created successfully!");
            },
            error: function(error) {
              // Display error message
              alert("Error creating event!");
            }
          });
      }
    });
   

    
  
});    
 