$(document).ready(function () {

    /*if (localStorage.length != 0) {
      var obj = JSON.parse(localStorage.sessionData);
      if (obj.email == "admin@admin.com") {
        window.location.href = "admin.html"
      }
    } else {
     
    }*/
    $(".errorMessage").css("display", "none");
  
    $("#login").on('click',function () {
      $.ajax({
        url: 'http://localhost:3000/users/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          email: $("#email").val(),
          password: $("#password").val()
        }),
        success: function (data) {
          if(data.email == "admin@admin.com"){
            localStorage.setItem('sessionData', JSON.stringify(data));
            window.location.href = "admin_mosque.html";
          }
        },
        error: function (xhr, status, error) {
            console.log(error);
          $(".errorMessage").css("display", "block");
        }
      });
    });
  });
  