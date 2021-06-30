var LoginForm = document.getElementById("LoginForm");
      var RegForm = document.getElementById("RegForm");
      var inidcator = document.getElementById("indicator");

      function register() {
        RegForm.style.transform = "translateX( 0px )";
        LoginForm.style.transform = "translateX( 0px)";
        indicator.style.transform = "translateX( 120px)";
      }
      function login() {
        RegForm.style.transform = "translateX( 300px )";
        LoginForm.style.transform = "translateX( 300px)";
        indicator.style.transform = "translateX( 0px)";
      }