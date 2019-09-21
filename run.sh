ip addr | grep 'state UP' -A2 | tail -n1 | awk '{print $2}' | cut -f1 -d'/'
#xdg-open http://localhost &
source secrets.sh
pipenv run python app.py
