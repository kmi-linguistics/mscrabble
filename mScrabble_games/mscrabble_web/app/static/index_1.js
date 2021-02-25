var language = localStorage.getItem("language", language);
var playerNumbersText = localStorage.getItem("playerNumbersText", playerNumbersText);
var startButtonLanguage = localStorage.getItem("startButtonLanguage", startButtonLanguage);

var playerNumber = '<label for="numberOfPlayers">'+playerNumbersText+' </label>'+
                    '<select name="numberOfPlayers" id="numberOfPlayers">'+
                        '<option value = "" disabled>-- select --</option>'+
                        '<option value="1">1</option>'+
                        '<option value="2">2</option>'+
                        '<option value="3">3</option>'+
                        '<option value="4">4</option>'+
                    '</select>'
document.getElementById("playerNumber").innerHTML += playerNumber;

var startButton = '<button id="start">'+ startButtonLanguage +'</button>';
document.getElementById("startButtonLanguage").innerHTML += startButton;

document.getElementById("start").addEventListener("click", function() {
    numberOfPlayers = document.getElementById("numberOfPlayers").value;
    localStorage.setItem("numberOfPlayers", numberOfPlayers);
    window.open("http://127.0.0.1:5000/mScrabble", "_self");
});

var random_color_1 = Math.floor(100 + Math.random() * 900);
var random_color_2 =Math.floor(100 + Math.random() * 900)
document.getElementById('start').style.backgroundColor = '#' + random_color_2;
document.body.style.backgroundColor = '#' + random_color_1+random_color_2;