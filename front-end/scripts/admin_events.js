$(document).ready(function () {


   if (localStorage.length == 0) {
      window.location.href = "login.html";
   }


   $("#out").on('click', function () {
      localStorage.clear();
      window.location.href = "login.html";
   });

   getVillesForSelect();

   var table = $('#event').DataTable({
      "ajax": {
         "url": "http://localhost:3000/events/getallEvents"
      },
      "columns": [
         { "data": "nom_events" },
         { "data": "start_date" },
         { "data": "end_date" },
         { "data": "nom_ville" },
         { "data": "description" },
         {
            "data": null,
            "render": function (data, type, row) {
               return '<button type="button" class="btn btn-primary btn-sm modify-button">Modifier</button>';
            }
         },
         {
            "data": null,
            "render": function (data, type, row) {
               return '<button type="button" class="btn btn-danger btn-sm delete-button">Supprimer</button>';
            }
         }

      ]
   });

   $('#event tbody').on('click', '.modify-button', function () {
      var data = table.row($(this).parents('tr')).data();
      // Fill the input fields with the data from the clicked row
      $('#idevent').val(data.id_events);
      $('#startdate').val(data.start_date);
      $('#enddate').val(data.end_date);
      $('#name').val(data.nom_events);
      $('#desc').val(data.description)
      $('#ville_select').val(data.id_ville)
   });

   function deleteEvent(id) {
      $.ajax({
         url: url = "http://localhost:3000/events/delete_events/" + id,
         type: 'DELETE',
         contentType: 'application/json',
         success: function (response) {
            $.toaster({ priority: "success", title: "success", message: "successfully" });
            $('#event').DataTable().ajax.reload();
         },
         error: function (error) {
            // Display error message
            $.toaster({ priority: "danger", title: "Error", message: "Error" });
         }
      });
   }

   $("#clearall").click(function () {
      $('#idevent').val("0");
      $('#enddate').val("");
      $('#name').val("");
      $('#desc').val("");
      $('#ville_select').val("1");
   })

   $('#event tbody').on('click', '.delete-button', function () {
      var data = table.row($(this).parents('tr')).data();
      deleteEvent(data.id_events);
   });

   $("#addevents").click(function () {

      const formData = {
         start_date: $('#startdate').val(),
         end_date: $('#enddate').val(),
         nom_events: $('#name').val(),
         description: $('#desc').val(),
         id_ville: $('#ville_select').val()
      };

      if ($('#startdate').val() > $('#enddate').val()) {
         $.toaster({ priority: "warning", title: "warning", message: "Date non valide" });
      } else {
         var url = "";
         var id = $('#idevent').val();
         if (id == 0) {
            url = 'http://localhost:3000/events/add_events'
         } else {
            url = "http://localhost:3000/events/update_events/" + id
         }

         $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (response) {
               $.toaster({ priority: "success", title: "success", message: "successfully" });
               $('#event').DataTable().ajax.reload();
               $('#idevent').val("0")
               $('#startdate').val(""),
                  $('#enddate').val(""),
                  $('#name').val(""),
                  $('#desc').val(""),
                  $('#ville_select').val("1")
            },
            error: function (error) {
               // Display error message
               $.toaster({ priority: "danger", title: "Error", message: "Error" });
            }
         });
      }
   });

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
