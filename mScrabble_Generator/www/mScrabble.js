// get number of players from localstorage
var numberOfPlayers = localStorage.getItem("numberOfPlayers");
var language = localStorage.getItem("language");
// localStorage.clear();

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// adding style tag
var sheet = document.createElement('style');
// contains html elements created dynamically when game start
var envSetup = '';
var t = 7;
// initial score of each player
number = 0;
var X = 60;
var Y = 10;
var rectLength = 22;
var rectBreadth = 22;
var NumberOfRackRect = 8;
// maximum random letters to be use in a game should be 200
var maximumLetters = 0;
var playersRack = {};
var playersRackPartial = {};
var playersRackYCoordinate = {};
var activePlayers = {};
var activePlayr = '';
var activePlayerScore = {};
var tempRackLetters = {};
var filledBoardRect = [];
var selectLetter;
var rX, rY, bX, bY, vX, vY;
var word = [];
var wordss = [];
var wordsss;
var mod;
var qut;
var points = 0;
var correctWord;
var checkBtnClickedCount = {};
var currentScore = 0;
var wordsAroundNewLetter = []
var usedRectArray = [];
var savedWord = [];
const permanentBoardMap = new Map;
const m = new Map()


var dictionaryLocation = language+'.json';
var vowel = localStorage.getItem("vowel");
var letters = localStorage.getItem("letters");
var subscript = "₀₁₂₃₄₅₆₇₈₉"

var player_ = localStorage.getItem("player_");
var rack_ = localStorage.getItem("rack_");
var score_ = localStorage.getItem("score_");
var checkButton = localStorage.getItem("checkButton");
var retryButton = localStorage.getItem("retryButton");
var reshuffleButton = localStorage.getItem("reshuffleButton");
var passButton = localStorage.getItem("passButton");
var newWordShareButton = localStorage.getItem("newWordShareButton");
var alert_1 = localStorage.getItem("alert_1");
var alert_2_2 = localStorage.getItem("alert_2_2");
var alert_3 = localStorage.getItem("alert_3");
var alert_4 = localStorage.getItem("alert_4");
var alert_5_1 = localStorage.getItem("alert_5_1");
var alert_5_2 = localStorage.getItem("alert_5_2");
var alert_6 = localStorage.getItem("alert_6");
var alert_7 = localStorage.getItem("alert_7");
var alert_8 = localStorage.getItem("alert_8");
var alert_9 = localStorage.getItem("alert_9");
var alert_10 = localStorage.getItem("alert_10");;
var alert_11_1 = localStorage.getItem("alert_11_1");
var alert_11_2 = localStorage.getItem("alert_11_2");
var alert_12 = localStorage.getItem("alert_12");
var alert_13 = localStorage.getItem("alert_13");
var alert_14 = localStorage.getItem("alert_14");
var alert_15 = localStorage.getItem("alert_15");
var alert_16 = localStorage.getItem("alert_16");
var alert_17 = localStorage.getItem("alert_17");
var lettersWeight = JSON.parse(JSON.parse(localStorage.getItem("lettersWeight")))

const multiplier = {
    1: '3xWS', 4: '2xLS', 8: '3xWS', 12: '2xLS', 15: '3xWS',
    17: '2xWS', 21: '3xLS', 25: '3xLS', 29: '2xWS',
    33: '2xWS', 37: '2xLS', 39: '2xLS', 43: '2xWS',
    46: '2xLS', 49: '2xWS', 53: '2xLS', 57: '2xWS', 60: '2xLS',
    65: '2xWS', 71: '2xWS',
    77: '3xLS', 81: '3xLS', 85: '3xLS', 89: '3xLS',
    93: '2xLS', 97: '2xLS', 99: '2xLS', 103: '2xLS',
    106: '3xWS', 109: '2xLS', 113: 'star', 117: '2xLS', 120: '3xWS',
    123: '2xLS', 127: '2xLS', 129: '2xLS', 133: '2xLS',
    137: '3xLS', 141: '3xLS', 145: '3xLS', 149: '3xLS',
    155: '2xWS', 161: '2xWS',
    166: '2xLS', 169: '2xWS', 173: '2xLS', 177: '2xWS', 180: '2xLS',
    183: '2xWS', 187: '2xLS', 189: '2xLS', 193: '2xWS',
    197: '2xWS', 201: '3xLS', 205: '3xLS', 209: '2xWS',
    211: '3xWS', 214: '2xLS', 218: '3xWS', 222: '2xLS', 225: '3xWS'};
    
// setting up game environment based on number of players
for (playerCount = 1; playerCount <= numberOfPlayers; playerCount++) {

    var random_color_1 = Math.floor(100 + Math.random() * 900);
    var random_color_2 =Math.floor(100 + Math.random() * 900)
    randomNum_1 = random_color_1;
    emptyRack(X, Y);
    playersRack['Player'+playerCount+'Rack'] = [];
    playersRackPartial['Player'+playerCount+'Rack'] = [];
    playersRackYCoordinate['Player'+playerCount+'Rack'] = Y;
    activePlayers['Player'+playerCount+'Rack'] = 0;
    activePlayerScore['Player'+playerCount+'Rack'] = ['Player'+playerCount+'Score', 0];
    checkBtnClickedCount['Player'+playerCount+'Rack'] = 0;
    if (vowel != 'null') {
    vowelRack();
    }
    emptyBoard();
    colorBoard();
    letterScoreTable(17, 17);

    envSetup += '<button id="Player'+playerCount+'Rack" onclick=randomRack(this.id)>'+ player_ +' '+playerCount +' '+ rack_ +'</button>'+
                '<p id="Player'+ playerCount +'">'+ player_ +' '+playerCount+' '+ score_ +
                '<span id="Player'+ playerCount +'Score"></span></p>';
    // adding css dynamically
    sheet.innerHTML += '#Player'+ playerCount +'Rack {position: absolute;'+
                                'top:'+ t + 'px;'+
                                'width: 60px;'+
                                'height: 33px;'+
                                'background-color: #'+ random_color_1 + random_color_2 +';'+
                                'border: none;'+
                                'color: white;'+
                                'text-align: center;'+
                                'text-decoration: none;'+
                                'display: inline-block;'+
                                'font-size: 11px;'+
                                'margin: auto;'+
                                'cursor: pointer;}'+
                        '#Player'+ playerCount +'{position: absolute;'+
                            'top:'+ t + 'px;'+
                            'right: 0px;'+
                            'width: 80px;'+
                            'height: 27px;'+
                            'background-color: #'+  + random_color_1 + random_color_2 +';'+
                            'border: none;'+
                            'color: white;'+
                            'padding: 3px;'+
                            'text-align: left;'+
                            'text-decoration: none;'+
                            'display: inline-block;'+
                            'font-size: 11px;'+
                            'margin: auto;}'+
                        '#check {position: absolute;'+
                            'top:'+ (t+35) + 'px;'+
                            'right: 0px;'+
                            'width:89px;'+
                            'height: 32px;'+
                            'background-color: #'+ Math.floor(100000 + Math.random() * 900000) +';'+
                            'border: none;'+
                            'color: white;'+
                            'padding: 5px 5px;'+
                            'text-align: center;'+
                            'text-decoration: none;'+
                            'display: inline-block;'+
                            'font-size: 11px;'+
                            'margin: auto;'+
                            'cursor: pointer;}'+
                        '#retry {position: absolute;'+
                            'top:'+ 550 + 'px;'+
                            'left: 10px;'+
                            'width:89px;'+
                            'height: 32px;'+
                            'background-color: #'+ Math.floor(100000 + Math.random() * 900000) +';'+
                            'border: none;'+
                            'color: white;'+
                            'padding: 5px 5px;'+
                            'text-align: center;'+
                            'text-decoration: none;'+
                            'display: inline-block;'+
                            'font-size: 11px;'+
                            'margin: auto;'+
                            'cursor: pointer;}'+
                        '#newWords {position: absolute;'+
                            'top:'+ 670 + 'px;'+
                            'right: 70px;'+
                            'width:120px;'+
                            'height: 32px;'+
                            'background-color: #'+ Math.floor(100000 + Math.random() * 900000) +';'+
                            'border: none;'+
                            'color: white;'+
                            'padding: 5px 5px;'+
                            'text-align: center;'+
                            'text-decoration: none;'+
                            'display: inline-block;'+
                            'font-size: 11px;'+
                            'margin: auto;'+
                            'cursor: pointer;}'+
                        '#reshuffle {position: absolute;'+
                            'top:'+ 550 + 'px;'+
                            'right: 70px;'+
                            'width:120px;'+
                            'height: 35px;'+
                            'background-color: #'+ Math.floor(100000 + Math.random() * 900000) +';'+
                            'border: none;'+
                            'color: white;'+
                            'padding: 5px 5px;'+
                            'text-align: center;'+
                            'text-decoration: none;'+
                            'display: inline-block;'+
                            'font-size: 11px;'+
                            'margin: auto;'+
                            'cursor: pointer;}'+
                        '#pass {position: absolute;'+
                        'top:'+ 550 + 'px;'+
                        'right: 15px;'+
                        'width:50px;'+
                        'height: 32px;'+
                        'background-color: #'+ Math.floor(100 + Math.random() * 900) +';'+
                        'border: none;'+
                        'color: white;'+
                        'padding: 5px 5px;'+
                        'text-align: center;'+
                        'text-decoration: none;'+
                        'display: inline-block;'+
                        'font-size: 11px;'+
                        'margin: auto;'+
                        'cursor: pointer;}';


    t += 35;
    Y += 35;
}
envSetup += '<button id="check">'+ checkButton +'</button>'+
            '<button id="retry">'+ retryButton +'</button>'+
            '<button id="reshuffle">'+ reshuffleButton +'</button>'+
            '<button id="pass">'+ passButton +'</button>'+
            '<button id="newWords">'+ newWordShareButton +'</button>';

document.getElementById("envsetup").innerHTML += envSetup;
document.head.appendChild(sheet);

function score(number) {
    for (playerCount = 1; playerCount<= numberOfPlayers; playerCount++) {
        document.getElementById('Player'+ playerCount +'Score').innerHTML = number;
    }
}
score(number);

// empty rack on  page load
function emptyRack(x, y){
    for(emptyrack = 0; emptyrack < NumberOfRackRect; emptyrack++){
        ctx.beginPath();
        ctx.rect(x, y, rectLength, rectBreadth);
        ctx.rect(x, y, rectLength, rectBreadth);
        ctx.strokeStyle = "#000000";
        ctx.stroke();
        ctx.closePath();
        x = x + rectLength;
    }
}

// vowel rack
function vowelRack() {
    x = 5;
    z = 0;
    v = 0;

    for(i = 0; i < vowel.length; i++){
        z = x + 5;
        ctx.beginPath();
        ctx.rect(x, 180, rectLength, rectBreadth);
        ctx.strokeStyle = "#000000";
        ctx.stroke();
        ctx.fillStyle = "#000000"
        ctx.font = "15px Georgia";
        ctx.fillText(vowel[v], (x+4), 195);
        ctx.closePath();
        x = x + rectLength;
        v = v + 1;
    }
}

// empty board
function emptyBoard() {
    x = 5;
    y = 4*rectBreadth+122;
    for(i = 0; i < 15; i++){
        for(j = 0; j < 15; j++){
            ctx.beginPath();
            ctx.rect(x, y, rectLength, rectBreadth);
            ctx.strokeStyle = "#000000";
            ctx.stroke();
            ctx.closePath();
            x = x + rectLength;
        }
        y = y + rectBreadth;
        x = 5;
    }
}

// color the board
function colorBoard() {
    for ([key, value] of Object.entries(multiplier)) {
        mod = (key % 15);
        qut = Math.floor(key / 15);

        if (mod === 0) {
            x = 14 * rectLength + 5;
            y = (qut - 1) * rectBreadth + 210;
        }
        else {
            x = (mod - 1) * rectLength + 5;
            y = qut * rectBreadth + 210;
        }
        if (value === '2xLS') {
            ls2(x, y);
        }
        else if (value === '3xLS'){
            ls3(x, y)
        }
        else if (value === '2xWS'){
            ws2(x, y)
        }
        else if (value === '3xWS'){
            ws3(x, y)
        }
        else if (value === 'star'){
            getStar(x, y);
        }
    }
}

// Two times letter score 2xLS
function ls2(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, rectLength, rectBreadth);
    ctx.fillStyle = "#20b2aa";
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();
}

// Three times letter score 3xLS
function ls3(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, rectLength, rectBreadth);
    ctx.fillStyle = "#ff0040";
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();
}

// Two times word score 2xWS
function ws2(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, rectLength, rectBreadth);
    ctx.fillStyle = "#0000FF";
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();
}

// Three times word score 3xWS
function ws3(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, rectLength, rectBreadth);
    ctx.fillStyle = "#00BFFF";
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();
}

// star on the center rectangle
function getStar(x, y) {
    ctx.beginPath();
    ctx.fillStyle = "#ffff00";
    ctx.rect(x, y, rectLength, rectBreadth);
    ctx.fill();


    ctx.fillStyle = "black";
    drawStar(ctx, x+11, y+11, 5, 12, 5);
    ctx.fill();
    ctx.closePath();
    function drawStar(context, xCenter, yCenter, nPoints, outerRadius, innerRadius) {
        ctx.beginPath();
        for (var ixVertex = 0; ixVertex <= 2 * nPoints; ++ixVertex) {
            var angle = ixVertex * Math.PI / nPoints - Math.PI / 2;
            var radius = ixVertex % 2 == 0 ? outerRadius : innerRadius;
            context.lineTo(xCenter + radius * Math.cos(angle), yCenter + radius * Math.sin(angle));
        }
        ctx.closePath();
    }
}

function letterScoreTable(length, breadth) {
    canvasWidth = 340;
    totalColumns = 19;
    totalRows = Math.ceil(letters.length / totalColumns);
    l = 0;
    y = 590;
    for (i = 0; i < totalRows; i++) {
        x = 5;
        for(j = 0; j < totalColumns; j++){
            letter = letters[l]
            if (letter !== undefined) {
                ctx.beginPath();
                ctx.rect(x, y, length, breadth);
                ctx.rect(x, y+length, length, breadth);
                ctx.strokeStyle = "#000000";
                ctx.stroke();
                ctx.fillStyle = "#000000"
                ctx.font = "12px Georgia";
                ctx.fillText(letter, (x+3), y+12);
                ctx.font = "10px Georgia";
                ctx.fillText(lettersWeight[letter], (x+3), y+12+length);
                ctx.closePath();
                x = x + breadth;
                l = l + 1;
            }
        }
        y = y + 2*length;
    }
}

// fill rack with  random letters
function randomRack(playerId) {
    if (maximumLetters > 200) {
        // alert("Game Over!");
        alert(alert_1);
        return
    }
    else {
        checkBtnClickedCount[playerId] = 0;
        x = 60;
        z = 0;
        y = playersRackYCoordinate[playerId];
        if(playersRack[playerId].length == 0){
            maximumLetters += NumberOfRackRect;
            for(i = 0; i < NumberOfRackRect; i++){
                z=x+5;
                ctx.beginPath();
                ctx.clearRect(x, y, rectLength, rectBreadth);
                ctx.rect(x, y, rectLength, rectBreadth);
                ctx.strokeStyle = "#000000";
                ctx.stroke();
                ctx.fillStyle = "#000000";
                ctx.font = "15px Georgia";
                ctx.fillText(randomLetters(i, playerId), z, y+15);
                ctx.closePath();
                x = x + rectLength;
            }
        }
        // word is correct Rack is partially empty refill with random letters
        else{
            maximumLetters += playersRackPartial[playerId].length;
            for(j = 0; j < playersRackPartial[playerId].length; j++){
                x = playersRackPartial[playerId][j]*rectLength + 38;
                z=x+5;
                ctx.beginPath();
                ctx.clearRect(x, y, rectLength, rectBreadth);
                ctx.rect(x, y, rectLength, rectBreadth);
                ctx.strokeStyle = "#000000";
                ctx.stroke();
                ctx.fillStyle = "#000000"
                ctx.font = "15px Georgia";
                ctx.fillText(randomLetters(playersRackPartial[playerId][j]-1, playerId), z, y+15);
                ctx.closePath();
                x = x + rectLength;
            }
            playersRackPartial[playerId].length = 0;
        }
    }
}

// Generating random Letters
function randomLetters(l, playerId){
    var randomLetter=letters[Math.floor(Math.random() * letters.length)];
    playersRack[playerId].splice(l, 1, randomLetter);
    return randomLetter;

}

// capture any click event on canvas
canvas.addEventListener('click', function(evt) {
    myFunction(evt);
});

// get the rectangle which is clicked
function myFunction(evt){
    rackCount = 1;
    boardCount = 1;
    vowelCount = 1;
    var rect = canvas.getBoundingClientRect();
    l = evt.clientX - rect.left;
    t = evt.clientY - rect.top;
    activePlayr =  activePlayer();
    if(l>=X && l<(NumberOfRackRect*rectLength+X) && t>=playersRackYCoordinate[activePlayr] && t<playersRackYCoordinate[activePlayr]+rectBreadth){
        selectRackRect(X, playersRackYCoordinate[activePlayr], rackCount);
    }
    else if(l>=5 && l<(vowel.length*rectLength+5) && t>=4*rectBreadth+92 && t<(180+rectBreadth)){
        selectVowelRect(5, 4*rectBreadth+92, vowelCount);
    }

    else if(l>=5 && l<(15*rectLength+5) && t>=4*rectBreadth+122 && t<(210+15*rectBreadth)){
        selectBoardRect(5, 4*rectBreadth+122, boardCount);
    }
    else{
        playerNumber = activePlayr.match(/[0-9]/);
        // alert("Player " + playerNumber + " Chance");
        alert(player_+' '+playerNumber+' '+alert_2_2);
    }
}

function selectRackRect(rX, rY, rackCount){
    if (playersRack[activePlayr].length === 0) {
        // alert('Please fill your empty rack before forming new word :)');
        alert(alert_3);
        return;
    }
    else if (playersRack[activePlayr].includes(undefined) && checkBtnClickedCount[activePlayr] > 0) {
        // alert("Please refill your empty rack :)");
        alert(alert_4);
        return;
    }

    document.getElementById(activePlayr).disabled = true;     // freeze rack button till a word is check

    if (word.length !== 0) {
        // alert('Please place the letter '+word.join('')+' on the board first :)');
        alert(alert_5_1 + word.join('') + alert_5_2);
    }

    else if (l>rX && l<(rX+rectLength) && t>rY && t<(rY+rectBreadth)){
        playersRackPartial[activePlayr].push(rackCount);
        selectLetter = playersRack[activePlayr][rackCount-1];
        tempRackLetters[rackCount-1] = selectLetter;
        emptyRackRect(rX, rY,rackCount);
        if (selectLetter === undefined) {
            // alert("This rack rectangle is empty!");
            alert(alert_6);
        }
        else {
            word.push(selectLetter);                               // store letters for new word
            wordss.push(selectLetter);
            wordsss =  word.join('');
        }
    }
    else{
        rackCount += 1;
        selectRackRect((rX+rectLength), rY, rackCount);
    }
}

// remove letter from selected rack rectangle
function emptyRackRect(eX, eY, rCount){
    playersRack[activePlayr].splice(rCount-1, 1, undefined);
    ctx.beginPath();
    ctx.clearRect(eX, eY, rectLength, rectBreadth);
    ctx.rect(eX, eY, rectLength, rectBreadth);
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();
}

function selectVowelRect(vX, vY, vowelCount){
    if (word.length === 0) {
        // alert("Please select a letter from the rack!");
        alert(alert_7);
    }
    else if(l>vX && l<(vX+rectLength) && t>vY && t<(vY+rectBreadth)){
        selectLetter = vowel[vowelCount-1];
        word.push(selectLetter);                               // store letters for new word
        wordss.push(selectLetter);
        wordsss =  word.join('');
    }
    else{
        vowelCount += 1;
        selectVowelRect((vX+rectLength), vY, vowelCount);
    }
}

function selectBoardRect(bX, bY, boardCount){
    if(selectLetter == undefined){
        // alert("Please select a letter from the rack!");
        alert(alert_7);
    }
    else{
        if(t>bY && t<(bY+rectBreadth)){
            if(l>bX && l<(bX+rectLength)){
                // no replace for filled board rectangle
                if(permanentBoardMap.has(boardCount)) {
                    // alert("Already Taken! : " + permanentBoardMap.get(boardCount));
                    alert(alert_8 + permanentBoardMap.get(boardCount));
                }
                else if(m.has(boardCount)) {
                    // alert("Already Taken! : " + m.get(boardCount));
                    alert(alert_8 + m.get(boardCount));
                }
                else {
                ctx.beginPath();
                ctx.clearRect(bX, bY, rectLength, rectBreadth);
                ctx.rect(bX, bY, rectLength, rectBreadth);
                ctx.strokeStyle = "#000000";
                ctx.stroke();
                ctx.fillStyle = "#000000";
                ctx.font = "15px Georgia";
                ctx.fillText(wordsss, bX+5, bY+15);
                ctx.closePath();
                filledBoardRect.push(boardCount);
                m.set(boardCount, wordsss);
                word.length = 0;
                wordsss = "";
                wordsAroundCurrentLetter(boardCount);
                selectLetter = null;
                }
            }
            else{
                boardCount += 1;
                selectBoardRect((bX+rectLength), bY, boardCount);
            }
        }
        else{
            boardCount += 15;
            selectBoardRect(bX, (bY+rectBreadth), boardCount);
        }
    }
}

// storing all possible words formed around current selected letter
function wordsAroundCurrentLetter(currentBoardRect) {
    let x = [];
    let count = 0;
    wordsAroundNewLetter.length = 0;
    // rectangles used to form the possible words
    const usedRectSet = new Set();
    var localMap = m;

    formWords(localMap);

    function formWords(boardRectMap) {
        for (let [key, value] of permanentBoardMap) {
            if (!boardRectMap.has(key)) {
                boardRectMap.set(key, value);
            }
        }
        // corner case
        if (currentBoardRect%15 == 0) {
            c = currentBoardRect - 1;
            for (let i = c; i > Math.floor(c/15)*15; i--) {
                if (boardRectMap.get(i) === undefined) {
                    break;
                }
                else {
                    count = i;
                }
            }
        }

        // forming all possible words using the letters on left of the new letter
        // each word is ending with the new letter
        for (let i = currentBoardRect; i > Math.floor(currentBoardRect/15)*15; i--) {
            if (boardRectMap.get(i) === undefined) {
                break;
            }
            else {
                count = i;
            }
        }

        // forming all possible words using the letters on right of the new letter
        // each word is starting with the new letter
        for (let i = count; i <= Math.ceil(currentBoardRect/15)*15; i++) {
            if (boardRectMap.get(i) === undefined) {
                break;
            }
            else {
                x.push(boardRectMap.get(i));
                usedRectSet.add(i);
            }
        }
        wordsAroundNewLetter.push(x.join(''));

        x.length = 0;

        // forming all possible words using the letters on top of the new letter
        // each word is ending with the new letter
        for (let i = currentBoardRect; i > 0 && i >= currentBoardRect%15; i= i-15) {
            if (boardRectMap.get(i) === undefined) {
                        break;
            }
            else {
                count = i;
            }
        }

        // forming all possible words using the letters on bottom of the new letter
        // each word is starting with the new letter
        for (let i = count; i<= 225 || i < currentBoardRect%15+225; i= i+15) {
            if (boardRectMap.get(i) === undefined) {
                        break;
            }
            else {
                x.push(boardRectMap.get(i));
                usedRectSet.add(i);
            }
        }
        wordsAroundNewLetter.push(x.join(''));
        tempUsedRectArray = Array.from(usedRectSet);
        for (j = 0; j < tempUsedRectArray.length; j++) {
            if (!usedRectArray.includes(tempUsedRectArray[j])) {
                usedRectArray.push(tempUsedRectArray[j]);
            }
        }
    }
}

// check button clicked
document.getElementById("check").addEventListener("click", function() {
    checkBtnClickedCount[activePlayr] += 1;

    var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                data = JSON.parse(xhr.responseText);
                words(data);
            }
        }
        data = xhr.open('GET', dictionaryLocation, true);
        xhr.send(null);
    document.getElementById(activePlayr).disabled = false;
});

// check the correctness of the word/s formed
function words(data) {
    wordsss = "";
    wordsss =  wordss.join('');
    var wScore = 0;
    var userAnswer;
    let tempMap = new Map();
    correctWord = [];
    currentScore = 0;
    if (!m.has(113) && permanentBoardMap.size == 0) {
        // alert("Please include the star for forming the first word of the game :)");
        alert(alert_9);
        clearBoardRect();
        return;
    }
    // check the word is formed includes atleast one existing letter on board
    else if (permanentBoardMap.size != 0) {
        var oneRectInclude = 0;
        for (i = 0; i < usedRectArray.length; i++) {
            if (permanentBoardMap.has(usedRectArray[i])) {
                oneRectInclude += 1;
            }
        }
        if (oneRectInclude === 0) {
            // alert("Please include atleast one filled rectangle on the board to form the word :)");
            alert(alert_10);
            clearBoardRect();
            return;
        }
    }

    if (wordsAroundNewLetter.length !== 0) {
        for (var i = 0; i < wordsAroundNewLetter.length; i++) {
                if (data.includes(wordsAroundNewLetter[i])) {
                    wScore = wordScore(wordsAroundNewLetter[i]);
                    if (wScore !== undefined) {
                        tempMap.set(wordsAroundNewLetter[i], wScore);
                    }
                    // word formed using atleast two board rectangles
                }
                else {
                        userAnswer = saveWords(wordsAroundNewLetter[i]);
                        if (userAnswer !== false) {
                            tempMap.set(wordsAroundNewLetter[i], userAnswer);
                        }
                }
        }
        if (tempMap.size !== 0) {
            for (let [key, value] of tempMap.entries()) {
                if (value === Math.max(...tempMap.values())) {
                    correctWord.push(key);
                    currentScore += value;
                }
            }
            tempMap.clear();

            var currentPlayerScore = activePlayerScore[activePlayr];
            currentPlayerScore[1] += currentScore;
            document.getElementById(currentPlayerScore[0]).innerHTML = currentPlayerScore[1];
            filledBoardRect.length = 0;
            wordsAroundNewLetter.length = 0;
            usedRectArray.length = 0;
            updateActivePlayer(activePlayr);
            // add board rectangles to permanent map if word is correct
            for (let [key, value] of m) {
                if (!permanentBoardMap.has(key)) {
                    permanentBoardMap.set(key, value);
                }
            }
            m.clear();
            // return alert("Correct : " + correctWord + "\nPoints : " + currentScore);
            return alert(alert_11_1 +' '+correctWord + '\n' + alert_11_2 +' '+currentScore);
        }
        else {
            wordsAroundNewLetter.length = 0;
            clearBoardRect();
            // return alert("Wrong!");
            return alert(alert_12);
        }
    }
    else if (wordsAroundNewLetter.length === 0 && playersRack[activePlayr].length !== 0) {
        // alert("Please form a new word first!");
        alert(alert_13);
    }
    else if (wordsAroundNewLetter.length === 0 && playersRack[activePlayr].length === 0) {
        // alert("Please form word by using letters of the rack!");
        alert(alert_14);
    }
}

function wordScore(word) {
    let tempArray = []
    for (let k = 0; k < word.length; k++) {
        tempArray.push(word.charAt(k));
    }
    letterWeight = 0;
    matraCount = 0;
    // count for matra used
    for(var p = 0; p < tempArray.length; p++) {
        for(var q = 0; q < vowel.length; q++) {
            if(tempArray[p] == vowel[q]){
                matraCount = matraCount + 1;
            }
        }
        if (tempArray[p] in lettersWeight) {
            letterWeight += lettersWeight[tempArray[p]];
        }
    }
    if (word.length - matraCount > 1) {
        return letterWeight;
    }
}

// save the word if number of palyers more than 1 and word is not in dictionary
function saveWords(word) {
    var lWeight = wordScore(word);
    if (lWeight != undefined) {
        var uAnswer = confirm(alert_16+word);
        if (uAnswer === true) {
            savedWord.push(word)
            localStorage.setItem("newWords", newWords = JSON.stringify(savedWord));
            return lWeight;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

// from map m delete rectangle number and letter corresponding to it if word is wrong
function clearBoardRect() {
    wordsAroundNewLetter.length = 0;
    usedRectArray.length = 0;
    m.clear();
    for(j = 0; j < filledBoardRect.length; j++){
        mod = (filledBoardRect[j] % 15);
        qut = Math.floor(filledBoardRect[j] / 15);

        if (mod === 0) {
            x = 14 * rectLength + 5;
            y = (qut - 1) * rectBreadth + 210;
            emptyBoardRect(x, y);
            if (filledBoardRect[j] in multiplier) {
                var rectType = multiplier[filledBoardRect[j]];
                if (rectType === '2xLS') {
                    ls2(x, y);
                }
                else if (rectType === '3xWS'){
                    ws3(x, y)
                }
            }
        }
        else {
            x = (mod - 1) * rectLength + 5;
            y = qut * rectBreadth + 210
            emptyBoardRect(x, y);
            if (filledBoardRect[j] in multiplier) {
                var rectType = multiplier[filledBoardRect[j]];
                if (rectType === '2xLS') {
                    ls2(x, y);
                }
                else if (rectType === '3xLS'){
                    ls3(x, y)
                }
                else if (rectType === '2xWS'){
                    ws2(x, y)
                }
                else if (rectType === '3xWS'){
                    ws3(x, y)
                }
                else if (rectType === 'star'){
                    getStar(x, y)
                }
            }
        }
    }
    filledBoardRect.length = 0;
    word.length = 0;
    selectLetter = null;
    wordss.length = 0;
    rackPreviousState();
}
// }

// empty board rectangle if word is wrong
function emptyBoardRect(x, y) {
    ctx.beginPath();
    ctx.clearRect(x, y, rectLength, rectLength);
    ctx.rect(x, y, rectLength, rectBreadth);
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();
}

// // store rack of active player to previous state if word is wrong
function rackPreviousState() {
    checkBtnClickedCount[activePlayr] = 0;
        r = playersRack[activePlayr];
        y = playersRackYCoordinate[activePlayr];
        x = 60;
        z = 0;
        for (i = 0; i < r.length; i++) {
            if (r[i] === undefined) {
                r[i] = tempRackLetters[i];
            }
            z=x+5;
            ctx.beginPath();
            ctx.clearRect(x, y, rectLength, rectBreadth);
            ctx.rect(x, y, rectLength, rectBreadth);
            ctx.strokeStyle = "#000000";
            ctx.stroke();
            ctx.fillStyle = "#000000";
            ctx.font = "15px Georgia";
            ctx.fillText(r[i], z, y+15);
            ctx.closePath();
            x = x + rectLength;
            delete tempRackLetters[i];
        }
        playersRackPartial[activePlayr].length = 0;
}

function activePlayer() {
    for ([key, value] of Object.entries(activePlayers)) {
        if (value === 1) {
            return key;
        }
    }
}

function updateActivePlayer(activePlayr) {
    arr = activePlayr.match(/[0-9]/) % numberOfPlayers;
    for (key of Object.keys(activePlayers)) {
        if (key === 'Player'+(arr+1)+'Rack') {
            activePlayers[key] = 1;
        }
        else {
            activePlayers[key] = 0;
        }
    }
}


document.getElementById("pass").addEventListener("click", function() {
    passPlayerTurn();
});

function passPlayerTurn() {
    r = playersRack[activePlayr];
    for (i = 0; i < r.length; i++) {
        if (r[i] === undefined  && checkBtnClickedCount[activePlayr] == 1) {
            // alert("Please fill your rack : Player "+activePlayr.match(/[0-9]/));
            alert(alert_15 + activePlayr.match(/[0-9]/));
            return;
        }
        if (r[i] === undefined  && checkBtnClickedCount[activePlayr] == 0) {
            clearBoardRect();
            updateActivePlayer(activePlayr);
            activePlayr = activePlayer();
            alert(player_+' '+activePlayr.match(/[0-9]/)+' '+ alert_2_2);
            return;
        }
    }
    clearBoardRect();
    updateActivePlayer(activePlayr);
    activePlayr = activePlayer();
    alert(player_+' '+activePlayr.match(/[0-9]/)+' '+ alert_2_2);
}

document.getElementById("reshuffle").addEventListener("click", function() {
    reshuffleRack();
});

function reshuffleRack() {
    playerId = activePlayr;
    checkBtnClickedCount[playerId] = 0;
        x = 60;
        z = 0;
        y = playersRackYCoordinate[playerId];
        if(playersRack[playerId].length == NumberOfRackRect && !playersRack[activePlayr].includes(undefined)){
            for(i = 0; i < NumberOfRackRect; i++){
                z=x+5;
                ctx.beginPath();
                ctx.clearRect(x, y, rectLength, rectBreadth);
                ctx.rect(x, y, rectLength, rectBreadth);
                ctx.strokeStyle = "#000000";
                ctx.stroke();
                ctx.fillStyle = "#000000";
                ctx.font = "15px Georgia";
                ctx.fillText(randomLetters(i, playerId), z, y+15);
                ctx.closePath();
                x = x + rectLength;
            }
            passPlayerTurn();
        }
}

document.getElementById("retry").addEventListener("click", function() {
    if (checkBtnClickedCount[activePlayr] == 0) {
        clearBoardRect();
    }
})

document.getElementById("newWords").addEventListener("click", function() {
    alert(alert_17+localStorage.getItem("newWords"));
})

activePlayers['Player1Rack'] = 1;
activePlayr =  activePlayer();