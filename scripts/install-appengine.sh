#!/bin/bash

# Installation script for the Google App Engine application
PROJECT_PATH=`pwd`
APPENGINE_PATH="$PROJECT_PATH/galactichorse"
WEBAPP_PATH="$APPENGINE_PATH/src/main/webapp"
NPM_OPTIONS="--production"

# check the argument --dev
if [ $# -eq 1 ]; then
    if [[ $1 = "--dev" ]]; then
		NPM_OPTIONS=" "
	else
		echo "Error : unsupported argument. Only --dev is available."
	    exit 1
	fi
fi

# check if maven is installed
if ! hash mvn 2>/dev/null; then
  echo "Error : Maven isn't installed, but it's required for the installation.
    You can get it at http://maven.apache.org"
  exit 1
fi

# check if maven version > 3.1 (required to build with Google App Egine plugin)
MAVEN_VERSION=`mvn -version | grep -o 'Apache Maven .* (' | cut -f3 -d' '`
if [[ "$MAVEN_VERSION" < "3.1" ]]; then
  echo "Your Maven version is $MAVEN_VERSION, but this project require's Maven 3.1 or further to work.
    Please uppgrade your version of Maven before running the installation."
  exit 1
fi

# check if npm is installed
if ! hash npm 2>/dev/null; then
  echo "Error : npm isn't installed, but it's required for the installation.
    You can get it at https://www.npm.com"
  exit 1
fi

# check if app engine folder exists
if [ ! -d "$APPENGINE_PATH" ]; then
  echo "Error : the app engine folder doesn't exist. Cannot build it"
  exit 1
fi

# check if webapp folder exists
if [ ! -d "$WEBAPP_PATH" ]; then
  echo "Error : the webapp folder doesn't exist. Cannot build an incomplete application"
  exit 1
fi

# move into the project folder & run maven to build java files
cd $APPENGINE_PATH
mvn install -Dmaven.javadoc.skip=true -DskipTests=true

# move into the webapp folder & run npm to install web dependencies
cd $WEBAPP_PATH
npm install $NPM_OPTIONS

echo "Installation successfull !"
exit 0
