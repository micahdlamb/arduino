import sys, json, requests, time, contextlib, traceback
from datetime import datetime

from pathlib import Path
dir = Path(__file__).parent

from twilio.rest import Client
account_sid = ''
auth_token = ''
client = Client(account_sid, auth_token)


def poll():

    class Chip:
        def __init__(self, name):
            self.name = name
            self.last_alert_time = 0

        @property
        def pins(self):
            ip = settings.get(f"{self.name}-ip")
            if not ip: return
            url = requests.utils.quote(f"http://{ip}")
            response = requests.get(f"http://localhost:5000/proxy?url={url}")
            response.raise_for_status()
            return response.json()

        def log(self, type, *values):
            with open(dir / f"{self.name}-{type}.log", 'a') as f:
                items = map(str, (datetime.now().isoformat(),)+values)
                f.write(" ".join(items)+"\n")

        def alert(self, msg):
            now = time.time()
            if now - self.last_alert_time < 5*60:
                return
            self.last_alert_time = now
            print(msg)
            from_ = "+16149082932"
            to    = "+17404077509"
            return [client.messages.create(from_=from_, to=to, body=msg) for to in to.split()]

    chiller1 = Chip(name="chiller1")
    chiller2 = Chip(name="chiller2")

    settings_file = dir / "settings.json"
    settings_mtime = None

    while True:
        if (settings_file.stat().st_mtime != settings_mtime):
            settings_mtime = settings_file.stat().st_mtime
            with open(dir / "settings.json") as f:
                settings = json.load(f)
            print("Settings loaded")

        try:
            if settings["maxTemp"]:
                for chip in [chiller1, chiller2]:
                    pins = chip.pins
                    if not pins: continue

                    chip.log('temp', pins['T1'])
                    if pins["T1"] > settings["maxTemp"]:
                        chip.alert(f"{chip.name} got too hot {round(pins['T1'],1)}° F")

        except:
            print(traceback.format_exc())

        time.sleep(3)


class Tee:
    def __init__(self, *files):
        self.files = files
    def write(self, data):
        for file in self.files:
            file.write(data)
    def flush(self):
        for file in self.files:
            file.flush()


if __name__ == '__main__':
    with open(dir / 'out.log', 'w') as log, contextlib.redirect_stdout(Tee(log, sys.stdout)):
        poll()