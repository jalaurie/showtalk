//configure Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCJrkCYPsB0D28FttkSqjuEM1p9bhToLlw",
    authDomain: "show-talk.firebaseapp.com",
    databaseURL: "https://show-talk.firebaseio.com",
    projectId: "show-talk",
    storageBucket: "show-talk.appspot.com",
    messagingSenderId: "310521785544",
    appId: "1:310521785544:web:cac5de72403451b89349fd",
    measurementId: "G-QTXGWJYVWH"
};
//initialize Firebase
firebase.initializeApp(firebaseConfig);

//initialize Firebase references
let db = firebase.firestore();
let storageRef = firebase.storage().ref();
let auth = firebase.auth();

//global userID variable
var uid;

//ensures login state is true on any inside page
function checkUser() {
    auth.onAuthStateChanged(function(user) {
        if (user) { // User is signed in.
            uid = user.uid;
        } else { // User is not signed in.
            window.alert("You are signed out!");
            window.location.href = 'index.html';
        }
    });
}

//check login state and load profile picture
function checkUserForProfile() {
    auth.onAuthStateChanged(function(user) {
        if (user) { // User is signed in.
            uid = user.uid;

            //get profile picture if it exists
            var picsRef = storageRef.child('profiles');
            var curRef = picsRef.child(String(uid));
            console.log(uid);

            curRef.getDownloadURL().then(function(url) {
                document.getElementById('profPic').src = url;
            }).catch(function(error) { //picture doesn't exist
                console.log(error);
            });

        } else { // User is not signed in.
            window.alert("You are signed out!");
            window.location.href = 'index.html';
        }
    });
}

//forgot password function
function forgot() {
    var email = document.getElementById('forgotemail').value;
    auth.sendPasswordResetEmail(email).then(function() {
        window.alert("Please check your email for the password reset link.");
        window.history.back();
    }).catch(function(error) {
        window.alert("Whoops! Something went wrong. Please check that you entered the correct email.");
        console.log(error.code + ": " + error.message);
    });
}

//change topbar buttons if display is too scrunched
if ($(window).width() < 600) {
    $('#sidebarCollapse').html('<i class="fas fa-align-left"></i>');
    $('#logout').html('<i class="fas fa-sign-out-alt"></i>');
}

//logout function
$('#logout').on('click', function () {
    auth.signOut();
});

//follow a user function
$('#follow').on('click', function() {
    //add following relationship to database
    alert("This will allow a user to follow another user");
});

//search for a friend function
$('#searchFriends').on('click', function() {
    //query the database for that username
    alert("This will allow a user to search for other users by username");
});

//sidebar functions
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