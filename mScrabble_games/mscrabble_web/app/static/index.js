document.getElementById("newLang").addEventListener("click", newLangData);

var random_color_1 = Math.floor(100 + Math.random() * 900);
var random_color_2 = Math.floor(100 + Math.random() * 900)

document.body.style.backgroundColor = '#' + random_color_1+random_color_2;

function newLangData() {
    window.open("http://127.0.0.1:5000/newLanguageData", "_self");
}

function playerNumbers(playerNumbersText, startButtonLanguage) {
    localStorage.setItem("playerNumbersText", playerNumbersText);
    localStorage.setItem("startButtonLanguage", startButtonLanguage);
    window.open("http://127.0.0.1:5000/index_1",  "_self");
}

function myFunction(langName) {
    console.log(langName)
    var btn = '';
    for (i = 0; i < langName.length; i++) {
        btn += '<button class="buttonLanguage" id="'+langName[i][0]+'" onclick=index_1(this.id)>'+langName[i][1]+'</button>';
    }
    document.getElementById("langButton").innerHTML += btn;
}

function index_1(eleid) {
    $.getJSON('/index', {
        a:eleid
    }, function(data) {
        localStorage.setItem("language", data.langAlerts['language']);
        playerNumbers(data.langAlerts['msg_1'], data.langAlerts['msg_2'])
        for ([key, value] of Object.entries(data.langAlerts)) {
            localStorage.setItem(key, value);
        }
        
    });
    return false; 
}