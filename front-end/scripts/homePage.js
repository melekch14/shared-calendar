$(document).ready(function () {
   /************* Main ***************** */

   getVillesForSelect().done(function () {
      var selectedText = $("#ville_select").val();
      getCurrentTime(selectedText);
   });

   $("#ville_select").change(function () {
      var selectedText = $("#ville_select").val();
      getCurrentTime(selectedText);
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
    


   async function getCurrentTime(ville) {
      var url = "http://localhost:3000/prayer-times/by_ville/" + ville;
      await $.ajax({
         url: url,
         type: "get",
         success: function (response) {
            var result = response;
            console.log(response);
            $("#fajr").text(result.fajr);
            $("#sunrise").text(result.Sunrise);
            $("#dhuhr").text(result.dhuhr);
            $("#asr").text(result.asr);
            $("#maghrib").text(result.maghrib);
            $("#isha").text(result.isha);
         },
         error: function (error) {
            console.log(error);
         }
      });
   }

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
