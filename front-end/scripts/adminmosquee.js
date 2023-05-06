$(document).ready(function () {

   if (localStorage.length == 0) {
     window.location.href = "login.html";
   }


  $("#out").on('click',function(){
   localStorage.clear();
   window.location.href="login.html";
  });

   getVillesForSelect();

   updateTimes(3)


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

   var table = $('#mosquee').DataTable({
      "ajax": {
         "url": "http://localhost:3000/mosquee/get_all_mosquee"
      },
      "columns": [
         { "data": "nom_mosque" },
         { "data": "adresse" },
         { "data": "nom_ville" },
         { "data": "longitude" },
         { "data": "latitude" },
         {
            "data": null,
            "render": function (data, type, row) {
               return '<button type="button" class="btn btn-primary btn-sm modify-button">Modify</button>';
            }
         },
         {
            "data": null,
            "render": function (data, type, row) {
               return '<button type="button" class="btn btn-danger btn-sm delete-button">Delete</button>';
            }
         }
      ]
   });

   $("#clearall").click(function () {
      $('#idmosque').val("0");
      $('#name').val("");
      $('#adresse').val("");
      $('#ville_select').val("1");
      $('#longitude').val("");
      $('#latitude').val("");
   })

   $('#mosquee tbody').on('click', '.modify-button', function () {
      var data = table.row($(this).parents('tr')).data();
      // Fill the input fields with the data from the clicked row
      $('#idmosque').val(data.id_mosque);
      $('#name').val(data.nom_mosque);
      $('#adresse').val(data.adresse);
      $('#ville_select').val(data.id_ville);
      $('#longitude').val(data.longitude);
      $('#latitude').val(data.latitude);
   });

   function deleteMosque(id) {
      $.ajax({
         url: url = "http://localhost:3000/mosquee/delete_mosquee/" + id,
         type: 'DELETE',
         contentType: 'application/json',
         success: function (response) {
            $.toaster({ priority : "success", title : "success", message : "successfully" });
            $('#mosquee').DataTable().ajax.reload();
         },
         error: function (error) {
            // Display error message
            $.toaster({ priority : "danger", title : "Error", message : "Error" });
         }
      });
   }

   $('#mosquee tbody').on('click', '.delete-button', function () {
      var data = table.row($(this).parents('tr')).data();
      deleteMosque(data.id_mosque);
   });




   $("#addmosque").click(function () {

      const formData = {
         nom_mosque: $('#name').val(),
         adresse: $('#adresse').val(),
         longitude: $('#longitude').val(),
         latitude: $('#latitude').val(),
         id_ville: $('#ville_select').val()
      };

      var url = "";
      var id = $('#idmosque').val();
      if (id == 0) {
         url = 'http://localhost:3000/mosquee/add_mosquee'
      } else {
         url = "http://localhost:3000/mosquee/update_mosquee/" + id
      }

      $.ajax({
         url: url,
         type: 'POST',
         data: JSON.stringify(formData),
         contentType: 'application/json',
         success: function (response) {
            $.toaster({ priority : "success", title : "success", message : "successfully" });
            
            $('#mosquee').DataTable().ajax.reload();
            $('#idmosque').val("0");
            $('#name').val(""),
               $('#adresse').val(""),
               $('#longitude').val(""),
               $('#latitude').val(""),
               $('#ville_select').val("1")
         },
         error: function (error) {
            // Display error message
            $.toaster({ priority : "danger", title : "Error", message : "Error" });
         }
      });

   });


   /**
    * 
    * Functions 
    */

   function getVillesForSelect() {
      return $.ajax({
         url: "http://localhost:3000/villes/get_all_ville",
         type: "get"
      }).done(function (response) {
         var options = response;
         var select = $("#ville_select");
         $.each(options, function (index, value) {
            var newOption = $("<option></option>").val(value.id_ville).html(value.nom_ville);
            if (index === 0) {
               newOption.attr("selected", "selected");
            }
            select.append(newOption);
         });
      });
   }


});
