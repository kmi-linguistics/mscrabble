var random_color_1 = Math.floor(100 + Math.random() * 900);
var random_color_2 = Math.floor(100 + Math.random() * 900)

document.body.style.backgroundColor = '#' + random_color_1+random_color_2;

var languageDataLocation = 'languageData.json'
var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                data = JSON.parse(xhr.responseText);
                console.log(data);
                myFunction(Object.keys(data));
            }
        }
        data = xhr.open('GET', languageDataLocation, true);
        xhr.send(null);

function myFunction(langName) {
    var btn = '';
    for (i = 0; i < langName.length; i++) {
        btn += '<button class="buttonLanguage" id="'+langName[i]+'" onclick=index_1(this.id)>'+data[langName[i]][1]['langNameInScript']+'</button>';
    }
    document.getElementById("langButton").innerHTML += btn;
}

function index_1(langName) {
        localStorage.setItem("language", data[langName][0]['language']);
        playerNumbers(data[langName][31]['msg_1'], data[langName][32]['msg_2'])
        for (i = 0; i < data[langName].length; i++) {
            for ([key, value] of Object.entries(data[langName][i])) {
                if (key == 'lettersWeight') {
                    localStorage.setItem(key, JSON.stringify(value));
                }
                else {
                    localStorage.setItem(key, String(value));
                }
            }
        }
}

function playerNumbers(playerNumbersText, startButtonLanguage) {
    localStorage.setItem("playerNumbersText", playerNumbersText);
    localStorage.setItem("startButtonLanguage", startButtonLanguage);
    window.location.href = 'index_1.html';
}