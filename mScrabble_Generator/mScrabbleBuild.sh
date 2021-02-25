#!/bin/sh

cd mScrabble/
cp -r ../www/ ./
cordova platform remove android
cordova platform add android
cordova requirements
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
echo $JAVA_HOME
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=${PATH}:$HOME/Android/Sdk/platform-tools:/home/siddharth/Android/Sdk/tools
echo $ANDROID_HOME
export PATH=${PATH}:$HOME/.gradle/wrapper/dists/gradle-6.5-all/2oz4ud9k3tuxjg84bbf55q0tn/gradle-6.5/bin
cordova requirements
cordova build
