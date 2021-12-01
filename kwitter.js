var firebaseConfig = {
    apiKey: "AIzaSyDgQcCuUPaCPKsd0TeWMXygqUu9gXjpc9k",
    authDomain: "kwitter-417cc.firebaseapp.com",
    databaseURL: "https://kwitter-417cc-default-rtdb.firebaseio.com",
    projectId: "kwitter-417cc",
    storageBucket: "kwitter-417cc.appspot.com",
    messagingSenderId: "154199866044",
    appId: "1:154199866044:web:18bb513009d3c240472eb9"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  user_name = localStorage.getItem("user_name");

  room_name = localStorage.getItem("room_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addUser() {
    user_name = document.getElementById("user_name").value;

    firebase.database().ref("/").child(user_name).update({
        purpose: "adding user"
    });

    localStorage.setItem("user_name", user_name);
    window.location = "kwitter_room.html";
}