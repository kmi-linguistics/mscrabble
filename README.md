# _mScrabble_
======

Inspired by English word game scrabble, _mScrabble_ (Multilingual Scrabble) is an online board game adapted and built for muliple languages. The game works for both mobile and desktop platforms.

The primary focus of this project is to develop language technology specifically useful for endangered and minoritised languages. With this in mind, we also make available a browser-based generator for creating / generating the game for any language, given a list of words and a list of characters being used in writing the language.

This repository contains the following directories -
- mScrabble_games - this directory contains games already developed for four languages - Mahali, Koda (both are critically endangered Austro-Asiatic Languages spoken in Eastern Indian states of West Bengal and Jharkhand by a few hundred speakers), Hindi and English. We will soon be adding new minoritised Indian languages such as Magahi, Bhojpuri, Braj Bhasha, Awadhi, etc. Both the .apk and the desktop (server-based) versions of the game are included. In order to run the desktop version, just go into directory and do `flask run`. You will be able to run it on any browser using `localhost:5000` (see Installation instructions below for installing Flask).

- mSrabble_generator - this is the main generator component. Please see below for instructions on generating the game in your language of choice.


## Requirements and Installation
======
- In order to run the mobile application, you need an Android-based phone / tablet. You could install the apk and start playing.

- For generator and running the Desktop version of the game, you need to install the following -
⋅⋅- Python 3
..- Flask [pip install Flask]

- For generator only, in addition to the above two, you will also need to setup the following -
..- Apache Cordova [see instructions here](https://cordova.apache.org/docs/en/10.x/guide/cli/)
..- Android Studio [see instructions here](https://developer.android.com/studio)


## Video Instructions (for generator)
======
For a step-by-step instruction on using the generator, please [visit this link](https://drive.google.com/file/d/1B0romtN_rKns2z31vimCavIi6UTO0ARi/view?usp=sharing)


## Contact
======

For any queries / help / suggestions / requests, you may send an email to this Google Group - `language-games@googlegroups.com`. You will need to join the group in order to post there. You may [join the group here](https://groups.google.com/forum/#!forum/language-games/join).


## Citation
======
If you are using the generator or the game, please cite [this paper](https://computel-workshop.org/wp-content/uploads/2021/02/2021.computel-2.3.pdf) -

```
@INPROCEEDINGS {mscrabble2021,
    author    = "Ritesh Kumar, Bornini Lahiri, Siddharth Singh",
    title     = "mScrabble: A Multilingual Scrabble and Lexicon Collection Generator",
    booktitle = "Proceedings of the 4th Workshop on the Use of Computational Methods in the Study of Endangered Languages: Vol. 2 Extended Abstracts",
    year      = "2021",
    pages     = "10-15"
}

```
