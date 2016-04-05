#!/bin/bash

set -e
mkdir -p pastalog/pastalog
cp -R build pastalog/pastalog
cp package.json pastalog/pastalog
cp README.md pastalog
rm -f pastalog/pastalog/database.json
rm -f pastalog/pastalog/database.json.~BACKUP
rm -rf pastalog/pastalog/database
