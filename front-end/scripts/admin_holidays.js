$(document).ready(function () {

  if (localStorage.length == 0) {
    window.location.href = "login.html";
  }


 $("#out").on('click',function(){
  localStorage.clear();
  window.location.href="login.html";
 });

  var table = $('#fete').DataTable({
    "ajax": {
      "url": "http://localhost:3000/holidays/all_holidays"
    },
    "columns": [
      { "data": "nom_holiday" },
      { "data": "start_date" },
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

  $('#fete tbody').on('click', '.modify-button', function () {
    var data = table.row($(this).parents('tr')).data();
    // Fill the input fields with the data from the clicked row
    $('#idholiday').val(data.id_holiday);
    $('#date-input').val(data.start_date.substring(5));
    $('#nom').val(data.nom_holiday);
    $('#desc').val(data.description)
  });

  function deleteFete(id){
    $.ajax({
       url: url = "http://localhost:3000/holidays/delete_holiday/" + id,
       type: 'DELETE',
       contentType: 'application/json',
       success: function (response) {
        $.toaster({ priority : "success", title : "success", message : "successfully" });
          $('#fete').DataTable().ajax.reload();
       },
       error: function (error) {
          // Display error message
          $.toaster({ priority : "danger", title : "Error", message : "Error" });
       }
    });
 }

  $('#fete tbody').on('click', '.delete-button', function () {
    var data = table.row($(this).parents('tr')).data();
    deleteFete(data.id_holiday);
 });


  $("#clearall").click(function () {
    $('#idholiday').val("0");
    $('#date-input').val("");
    $('#nom').val("");
    $('#desc').val("");
 })

  $('#date-input').inputmask();

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

  $('#addholidays').on('click', function (event) {
    const month = parseInt($('#date-input').val().substring(0, 2));
    const day = parseInt($('#date-input').val().substring(3, 5));
    if ((day < 1 || day > 31) || (month < 1 || month > 12)) {
      event.preventDefault();
      $.toaster({ priority : "warning", title : "warning", message : "jour ou mois non valide" });
    } else {
      const currentYear = new Date().getFullYear();
      const jour = currentYear + "-" + $('#date-input').val();
      const formData = {
        start_date: jour,
        nom_holiday: $('#nom').val(),
        description: $('#desc').val()
      };

      var url = "";
      var id = $('#idholiday').val();
      if (id == 0) {
         url = 'http://localhost:3000/holidays/add_holiday'
      } else {
         url = "http://localhost:3000/holidays/update_holiday/" + id
      }


      $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(formData),
        contentType: 'application/json',
        success: function (response) {
          $.toaster({ priority : "success", title : "success", message : "successfully" });
          $('#fete').DataTable().ajax.reload();
          $('#idholiday').val("0");
          $('#nom').val("")
          $('#desc').val("")
          $('#date-input').val("")

        },
        error: function (error) {
          // Display error message
          $.toaster({ priority : "danger", title : "Error", message : "Error" });
        }
      });
    }
  });




});
