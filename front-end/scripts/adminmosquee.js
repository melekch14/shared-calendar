$(document).ready(function(){


    getVillesForSelect();

    $("#addmosque").click(function(){

      const formData = {
         nom_mosque: $('#name').val(),
         adresse: $('#adresse').val(),
         longitude: $('#longitude').val(),
         latitude: $('#latitude').val(),
         id_ville: $('#ville_select').val()
       };

       $.ajax({
         url: 'http://localhost:3000/mosquee/add_mosquee',
         type: 'POST',
         data: JSON.stringify(formData),
         contentType: 'application/json',
         success: function(response) {
           alert("Mosquee created successfully!");
         },
         error: function(error) {
           // Display error message
           alert("Error creating mosquee!");
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
 