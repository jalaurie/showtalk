$(document).ready(function () {
    //change topbar buttons if display is too scrunched
    if ($(window).width() < 600) {
        $('#sidebarCollapse').html('<i class="fas fa-align-left"></i>');
        $('#logout').html('<i class="fas fa-sign-out-alt"></i>');
    }

    //logout function
    $('#logout').on('click', function () {
        // auth.signOut();
        alert("This will allow the user to logout");
    });

    //follow a user function
    $('#follow').on('click', function() {
        //add following relationship to database
        alert("This will allow a user to follow another user");
    });

    //Sidebar JQuery
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });
    
    $('#dismiss, .overlay').on('click', function () {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});