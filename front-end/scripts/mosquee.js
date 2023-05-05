$(document).ready(function () {
    /************* Main ***************** */

    $(document).ready(function () {
        // Define the DataTable
        var table = $('#mosquee').DataTable({
            "ajax": {
                "url": "http://localhost:3000/mosquee/get_all_mosquee"
            },
            "columns": [
                { "data": "nom_mosque" },
                { "data": "adresse" },
                { "data": "nom_ville" },
                {
                    // Combine the longitude and latitude columns into a single column
                    "render": function (data, type, row) {
                        // Create a button that will display the longitude and latitude in an alert
                        return '<button class="btn btn-primary btn-map" data-longitude="' + row.longitude + '" data-latitude="' + row.latitude + '">Show Map</button>';
                    }
                }
            ]
        });



        // Handle clicks on the "Show Map" button
        $('#mosquee').on('click', '.btn-map', function () {
            var longitude = $(this).data('longitude');
            var latitude = $(this).data('latitude');
            // Create a new map object
            var map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: Number(longitude), lng: Number(latitude) },
                zoom: 16
            });

            // Add a marker to the map
            var marker = new google.maps.Marker({
                position: { lat: Number(longitude), lng: Number(latitude) },
                map: map,
                title: 'Mosque'
            });

            // Display the map in a modal
            $('#map-modal').modal('show');
        });
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
