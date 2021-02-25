var alerts = [ 
    {
        "language": "Language Name"
    },
    {
        "langNameInScript": "Language Name in Script (e.g.: हिंदी for hindi)"
    }, 
    {
        "vowel": "Characters for permanent rack"
    },
    {
        "letters": "Charaters for dynamic rack (letters)"
    },  
    {
        "player_": "Player "
    },
    {
        "rack_": " Rack"
    },
    {
        "score_": " Score: "
    },
    {
        "checkButton": "Check"
    },
    {
        "retryButton": "Retry"
    },
    {
        "reshuffleButton": "Change rack letters"
    },
    {
        "passButton": "Pass"
    },
    {
        "newWordShareButton":  "Share New Words "
    },
    {
        "alert_1": "Game Over!"
    },
    {
        "alert_2_2": " Turn"
    },
    {
        "alert_3": "Please fill your empty rack before forming new word :)"
    },
    {
        "alert_4": "Please refill your empty rack :)"
    },
    {
        "alert_5_1": "Please place the letter '"
    },
    {
        "alert_5_2": "' on the board first :)"
    },
    {
        "alert_6": "This rack rectangle is empty!"
    },
    {
        "alert_7": "Please select a letter from the rack!"
    },
    {
        "alert_8": "Already Taken! : "
    },
    {
        "alert_9": "Please include the star for forming the first word of the game :)"
    },
    {
        "alert_10": "Please include at least one filled rectangle on the board to form the word :)"
    },
    {
        "alert_11_1": "Correct : "
    },
    {
        "alert_11_2": "Points : "
    },
    {
        "alert_12": "Wrong!"
    },
    {
        "alert_13": "Please form a new word first!"
    },
    {
        "alert_14": "Please form word by using letters of the rack!"
    },
    {
        "alert_15": "Please fill your rack : Player "
    },
    {
        "alert_16" : "Do you have these words in your language ? : "

    },
    {
        "alert_17":  "Take a screenshot to share new words with us: "
    },
    {
        "msg_1":  "How many people will play?"
    },
    {
        "msg_2":  "Start"
    }
]    

var sheet = document.createElement('style');
var inputField = '<form action="http://127.0.0.1:5000/newLanguageData" method="POST" enctype="multipart/form-data" id="data" name="data">';
var translationField = '<fieldset>'+
                        '<legend style="color:red;">*Please put the translation of these into your own language</legend>';

for (i = 0; i < alerts.length; i++) {
    if (i == 4) {
        inputField += '<label for="filename">Upload the wordlist(*in txt format containing one word per line)</label>'+
                    '<br>'+
                    '<input type="file" id="myFile" name="filename" required>'+
                    '<br><br>';

        translationField += '<label for="'+Object.keys(alerts[i])[0]+'">'+Object.values(alerts[i])[0]+'</label>'+
                    '<br>'+
                    '<input type="text" id="'+Object.keys(alerts[i])[0]+'" name="'+Object.keys(alerts[i])[0]+'">'+
                    '<br><br>';
    }
    else if (Object.keys(alerts[i])[0] === 'vowel') {
        inputField += '<label for="'+Object.keys(alerts[i])[0]+'">'+Object.values(alerts[i])[0]+'</label>'+
                    '<br>'+
                    '<input type="text" id="'+Object.keys(alerts[i])[0]+'" name="'+Object.keys(alerts[i])[0]+'">'+
                    '<br><br>';
    }
    else if (i <= 3) {
        inputField += '<label for="'+Object.keys(alerts[i])[0]+'">'+Object.values(alerts[i])[0]+'</label>'+
                    '<br>'+
                    '<input type="text" id="'+Object.keys(alerts[i])[0]+'" name="'+Object.keys(alerts[i])[0]+'" required>'+
                    '<br><br>';
    }
    else if (i > 4) {
        translationField += '<label for="'+Object.keys(alerts[i])[0]+'">'+Object.values(alerts[i])[0]+'</label>'+
                            '<br>'+
                            '<input type="text" id="'+Object.keys(alerts[i])[0]+'" name="'+Object.keys(alerts[i])[0]+'">'+
                            '<br><br>';
    }
}

translationField += '</fieldset>'
inputField += translationField;

inputField += '<input type="submit" value="Submit" onclick="data()"></form>';

sheet.innerHTML += 'input[type=text] {'+
                    'width: 50%;'+
                    'padding: 5px 5px;'+
                    'margin: 8px 0;'+
                    '}'+
                    'input[type=submit] {'+
                    'background-color: #008CBA;'+
                    'font-size: 16px;'+
                    'padding: 12px 28px;'+
                    'border-radius: 4px;'+
                    'cursor:pointer;'+
                    '}';

document.getElementById("newLangData").innerHTML += inputField;
document.head.appendChild(sheet);