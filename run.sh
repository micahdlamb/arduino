#!/usr/bin/env bash
ip addr | grep 'state UP' -A2 | tail -n1 | awk '{print $2}' | cut -f1 -d'/'
xdg-open http://localhost:5000 &
source secrets.sh
pipenv run python app.py
