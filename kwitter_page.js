var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition;
function start() {
    document.getElementById("text").innerHTML = "";
    recognition.start();
}
recognition.onresult = function run (event) {
    console.log(event);
    var Content = event.results[0][0].transcript;
    document.getElementById("text").innerHTML = Content;
    console.log(Content);
    speak();
}
function speak() {

var synth = window.speechSynthesis;

speakerData = document.getElementById("text").value;
var utterThis = new SpeechSynthesisUtterance(speakerData);

synth.speak(utterThis);
}


//YOUR FIREBASE LINKS
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

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
Name = message_data["name"];
message = message_data["message"];
like = message_data["like"];
name_with_tag = "<h4>" + Name + " <img class = 'user_tick' src = 'tick.png'></h4>";
message_with_tag = "<h4 class = 'message_h4'>" + message + "</h4>";
like_button = "<button id = '" + firebase_message_id + "' class = 'btn btn-warning' value = '" + like + "' onclick = 'updateLike(this.id)'>";
span = "<span class = 'glyphicon glyphicon-thumbs-up'> Like: " + like + "</span></button><hr>";
row = name_with_tag + message_with_tag + like_button + span;
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
      function updateLike(message_id) {
            console.log(Name + " has like this message: " + message + " Like id:" + message_id);
            button_id = message_id;
            likes = document.getElementById(button_id).value;
            updatedLikes = Number(likes) + 1;
            console.log(Name + "has liked this message: " + message + " " + updatedLikes + " time/times");
            firebase.database().ref(room_name).child(message_id).update({
                  like: updatedLikes
            });
      }
getData();


function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

function send() {
      msg = document.getElementById("text").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("text").innerHTML = "";
}
