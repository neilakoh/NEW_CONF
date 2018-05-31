#!/bin/bash

APP_FOLDER_NAME=app

if [ -z "$DESTINATION" ]
then
    echo "empty variable"
else
    cd "$DESTINATION"
    mkdir "$PROJECT_NAME"
    cd "$DESTINATION/$PROJECT_NAME"

    if [ -z "$RN_VERSION"]
    then
        react-native init "$PROJECT_NAME"
        cd "$PROJECT_NAME"
    else
        react-native init "$PROJECT_NAME" --version react-native@"$RN_VERSION"
        cd "$PROJECT_NAME"
    fi

    npm install redux react-redux redux-thunk redux-actions rxjs --save
    mkdir "$APP_FOLDER_NAME"
    cd "$APP_FOLDER_NAME"
    touch index.js rootEpic.js "$PROJECT_NAME.js"
    mkdir modules
    cd modules
    mkdir main
    cd main
    mkdir actions reducers components epics assets
fi
