$(document).ready(function(){


    getVillesForSelect();

    $("#addevents").click(function(){

      const formData = {
         start_date: $('#startdate').val(),
         end_date: $('#enddate').val(),
         nom_events: $('#name').val(),
         description: $('#desc').val(),
         id_ville: $('#ville_select').val()
       };

       $.ajax({
         url: 'http://localhost:3000/events/add_events',
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
      
    });


    /**
     * 
     * Functions 
     */
    
    function getVillesForSelect(){
        return $.ajax({
           url: "http://localhost:3000/villes/get_all_ville",
           type: "get"
        }).done(function(  response ) {
           var options = response;
           var select = $("#ville_select");
           $.each(options, function(index, value) {
              var newOption = $("<option></option>").val(value.id_ville).html(value.nom_ville);
              if (index === 0) {
                 newOption.attr("selected", "selected");
              }
              select.append(newOption);
           });
        });
     }


});    
 