#!/usr/bin/env bash
git pull
pipenv install
cd react-reduction
npm install
npm run build

