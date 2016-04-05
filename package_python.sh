#!/bin/bash

set -e
mkdir -p pastalog
cp -R build pastalog
cp package.json pastalog
cp README.md pastalog
rm -f pastalog/database.json
rm -f pastalog/database.json.~BACKUP
rm -rf pastalog/database
