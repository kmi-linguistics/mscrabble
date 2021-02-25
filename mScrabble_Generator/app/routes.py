from flask import render_template, flash, redirect, url_for, request, jsonify, json
from app import app
import sqlite3
import os

basedir = os.path.abspath(os.path.dirname(__file__))

conn = sqlite3.connect('mScrabble.sqlite')

cur = conn.cursor()

cur.executescript('''
    
    CREATE TABLE IF NOT EXISTS Languages (
        id                  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
        langName            TEXT UNIQUE,
        langNameInScript    TEXT UNIQUE
    );
    ''')

def setdb(langName):
    conn = sqlite3.connect('mScrabble.sqlite')

    cur = conn.cursor()

    cur.executescript('''
    CREATE TABLE IF NOT EXISTS '''+ langName + '''Alerts (
        id          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
        alertCode   TEXT UNIQUE,
        textData    TEXT
    );
    CREATE TABLE IF NOT EXISTS ''' + langName + '''Wordlist (
        id          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
        word        TEXT UNIQUE
    );
    ''')

def insertdb(langName, langNameInScript, newLangData, wordList):
    conn = sqlite3.connect('mScrabble.sqlite')

    cur = conn.cursor()

    cur.execute('''INSERT OR IGNORE INTO Languages (langName, langNameInScript)
    VALUES ( ?, ? )''', ( langName, langNameInScript, ) )

    for key, value in newLangData.items():
        print(key, value)
        cur.execute('''INSERT INTO ''' + langName +'''Alerts  (alertCode, textData)
        VALUES ( ?, ? )''', ( key, value, ) )

    for word in wordList.split('\n'):
        if word == '': continue
        cur.execute('''INSERT OR IGNORE INTO ''' + langName +'''Wordlist (word)
        VALUES ( ? )''', ( word, ) )

    conn.commit()

def lettersWeight(letters, wordList):
    '''
        calculate weight of each letter which form word
    '''
    dictionary = {}
    for word in wordList.split('\n'):
        word=word.strip()
        if word == '': continue
        if word[0] in letters:
            dictionary[word[0]] = dictionary.get(word[0], 0) + 1

    for letter in letters:
        if letter not in dictionary:
            dictionary[letter] = 0

    norm_range_max = 10
    norm_range_min = 1
    diff  = norm_range_max - norm_range_min
    org_range_max = max(dictionary.values())
    org_range_min = min(dictionary.values())
    denom = org_range_max  - org_range_min

    lettersNorm = {}

    string = ''
    for key, value in dictionary.items():
        string += key
        freq = value
        num = freq - org_range_min
        norm = ((diff * num) / denom) + norm_range_min
        if (norm - int(norm) >= 0.5):
            lettersNorm[key] = 11 - (int(norm) + 1)
        else:
            lettersNorm[key] = 11 - int(norm)
    return json.dumps(lettersNorm, ensure_ascii=False)

def wwwFiles(langName):
    wwwPath = os.path.dirname(basedir)+'/www/'
    conn = sqlite3.connect('mScrabble.sqlite')
    cur = conn.cursor()

    if len(langName) != 0:
        languageData = {}
        for i in range(len(langName)):
            lName = langName[i][0]
            cur.execute('SELECT word FROM '+ lName +'Wordlist')
            searchedWord = [item[0] for item in cur.fetchall()]
            print(searchedWord[:5])
            with open(wwwPath+lName+'.json', 'w') as langDict:
                langDict.write(json.dumps(searchedWord))

            cur.execute('SELECT alertCode, textData FROM '+ lName +'Alerts')
            lAlerts = cur.fetchall()
            alertList = []
            for alert in lAlerts:
                a = {}
                a[alert[0]] = alert[1] 
                alertList.append(a)
            languageData[lName] = alertList    
            with open(wwwPath+'languageData.json', 'w') as langData:
                langData.write(json.dumps(languageData, ensure_ascii=False))

@app.route('/')
@app.route('/index')
def index():
    # get language names present in the database table Languages
    conn = sqlite3.connect('mScrabble.sqlite')
    cur = conn.cursor()
    cur.execute('SELECT langName, langNameInScript FROM Languages')
    langName = cur.fetchall()
    wwwFiles(langName)

    # catch the language name for which the button has been clicked on index.html
    lName = request.args.get('a')                             # data through ajax
    if lName != None:
        cur.execute('SELECT alertCode, textData FROM '+ lName +'Alerts')
        lAlerts = cur.fetchall()
        langAlerts = {}
        for data in lAlerts:
            langAlerts[data[0]] = data[1]
        return jsonify(langAlerts=langAlerts)
    
    return render_template('index.html', langName=langName)

@app.route('/index_1')
def index_1():
    return render_template('index_1.html')

@app.route('/newLanguageData', methods=['GET', 'POST'])
def newLanguageData():
    if request.method == 'POST':
        newLangData = dict(request.form)
        newLangWordList = request.files.to_dict()
        wordList = newLangWordList["filename"].read().decode('utf-8')
        langName = newLangData['language']
        langNameInScript = newLangData['langNameInScript']
        newLangData['lettersWeight'] = str(lettersWeight(newLangData['letters'], wordList))
        setdb(langName)
        insertdb(langName, langNameInScript, newLangData, wordList)
        return redirect(url_for('index'))
    return render_template('newLanguageData.html')
       
@app.route('/mScrabble')
def mScrabble():
    return render_template('mScrabble.html')

@app.route('/searchWord')
def searchWord():
    conn = sqlite3.connect('mScrabble.sqlite')
    cur = conn.cursor()

    word = request.args.get('a')                             # data through ajax
    word = word.split(',')
    lName = word[-1]
    word.pop()
    print(word)
    result = []
    for word in word:
        cur.execute('SELECT word FROM '+ lName +'Wordlist WHERE word = ? ', (word, ))
        searchedWord = cur.fetchall()
        print(len(searchedWord))
        if len(searchedWord) != 0: 
            result.append(searchedWord[0][0])
    print(len(result))
    print('Got word', result)
    return jsonify(result=result)
