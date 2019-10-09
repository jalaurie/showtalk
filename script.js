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

//check login state and load profile info
function checkUserForProfile() {
    auth.onAuthStateChanged(function(user) {
        if (user) { // User is signed in.
            uid = user.uid;

            //get profile picture if it exists
            var picsRef = storageRef.child('profiles');
            var curRef = picsRef.child(String(uid));
            curRef.getDownloadURL().then(function(url) {
                document.getElementById('profPic').src = url;
            }).catch(function(error) { //picture doesn't exist
                console.log(error);
            });

            //load profile information
            var userRef = db.collection('user').doc(String(uid));
            userRef.get().then(function(doc) {
                if (doc.exists) {
                   document.getElementById('profName').innerText = doc.data().displayname;
                   document.getElementById('profUser').innerText += doc.data().username;
                } else {
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document: ", error);
            });

            //get the user's lists
            var lists = db.collection('list').where('uid', '==', uid);
            lists.get().then(function(snapshot) {
                var content = "";
                var count = true;
                snapshot.forEach(function(doc) {
                    if(count) { //make first card active
                        content += '<div class="carousel-item active">';
                        count = false;
                    }
                    else {
                        content += '<div class="carousel-item">';
                    }
                    content += '<div class="card"><div class="card-body carouselCardBody">';
                    content += '<h5 class="card-title">' + doc.data().lname + '</h5>'
                    content += '<ul>';
                    var arr = doc.data().items;
                    for(var i=0; i<arr.length; i++) {
                        content += '<li>' + arr[i] + '</li>';
                    }
                    content += '</ul></div></div></div>';
                });
                document.getElementById('carouselLists').innerHTML = content;
            });

            //get the user's 5 most recent status updates
            var s = db.collection('status').where('uid', '==', uid).limit(5);
            s.get().then(function(snapshot) {
                var content = "";
                var count = true;
                snapshot.forEach(function(doc) {
                    if(count) { //make first card active
                        content += '<div class="carousel-item active">';
                        count = false;
                    }
                    else {
                        content += '<div class="carousel-item">';
                    }
                    content += '<div class="card"><div class="card-body carouselCardBody"><p class="card-text">';
                    content += doc.data().time.toDate() + '<br><br>' + doc.data().text;
                    content += '</p></div></div></div>';
                    
                });
                document.getElementById('carouselStatuses').innerHTML = content;
            });

        } else { // User is not signed in.
            window.alert("You are signed out!");
            window.location.href = 'index.html';
        }
    });
}

//check login state and load user settings page
function checkUserForSettings() {
    auth.onAuthStateChanged(function(user) {
        if (user) { // User is signed in.
            uid = user.uid;

            //populate settings form with database values
            var userRef = db.collection('user').doc(String(uid));
            userRef.get().then(function(doc) {
                if (doc.exists) {
                    document.getElementById('setemail').placeholder = doc.data().email;
                    document.getElementById('setuname').placeholder = doc.data().username;
                    document.getElementById('setdname').placeholder = doc.data().displayname;
                } else {
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document: ", error);
            });

        } else { // User is not signed in.
            window.alert("You are signed out!");
            window.location.href = 'index.html';
        }
    });
}

//retrieve uid from url query string
function getIDfromURL() {
    var url = window.location.href;
    var endofurl = url.split('=');
    var cur_uid = endofurl[endofurl.length-1];
    return cur_uid;
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