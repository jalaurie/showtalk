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