$(document).ready(function(){
    /************* Main ***************** */

    $(document).ready(function() {
        $('#mosquee').DataTable({
            "ajax": {
                "url": "http://localhost:3000/mosquee/get_all_mosquee"
            },
            "columns": [
                { "data": "nom_mosque" },
                { "data": "adresse" },
                { "data": "longitude" },
                { "data": "latitude" },
                { "data": "nom_ville" }
            ]
        });
    });
    
    

});    
 