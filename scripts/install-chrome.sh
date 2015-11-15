#!/bin/bash

# Installation script for the chrome's extension
PROJECT_PATH=`pwd`
EXTENSION_PATH="$PROJECT_PATH/extension"
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

# check if npm is installed
if ! hash npm 2>/dev/null; then
  echo "Error : npm isn't installed, but it's required for the installation.
    You can get it at https://www.npm.com"
  exit 1
fi

# check if extension folder exists
if [ ! -d "$EXTENSION_PATH" ]; then
  echo "Error : the extension doesn't exist. Cannot build it"
  exit 1
fi

# move into the project folder & run npm to install dependencies
cd $EXTENSION_PATH
npm install $NPM_OPTIONS

echo "Installation successfull !"
exit 0
