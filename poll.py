import sys, os, json, requests, time, contextlib, traceback

from pathlib import Path
dir = Path(__file__).parent

from twilio.rest import Client
client = Client(os.environ['twilio_sid'], os.environ['twilio_token'])

alert_phones = "+17404077509 +16144008013"

def poll():

    class Chip:
        def __init__(self, name):
            self.name = name
            self.log_ready   = Ready()
            self.alert_ready = Ready()

        @property
        def pins(self):
            ip = settings.get(f"{self.name}-ip")
            if not ip: return
            url = requests.utils.quote(f"http://{ip}")
            try:
                response = requests.get(f"http://localhost/proxy?url={url}")
            except requests.exceptions.ConnectionError as error:
                return print(f"Couldn't connect to {self.name} - {ip}")
            response.raise_for_status()
            return response.json()

        def log(self, type, *values):
            wait = settings.get("historyInterval", 5*60)
            if not self.log_ready(wait): return
            with open(dir / f"{self.name}-{type}.log", 'a') as f:
                #items = map(str, (datetime.now().isoformat(),)+values)
                items = map(str, (time.time(),) + values)
                f.write(" ".join(items)+"\n")

        def alert(self, msg):
            if not self.alert_ready(5*60): return
            print(msg)
            from_ = "+16146624426"
            return [client.messages.create(from_=from_, to=to, body=msg) for to in alert_phones.split()]

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
            if settings.get("maxTemp"):
                for chip in [chiller1, chiller2]:
                    pins = chip.pins
                    if not pins: continue

                    chip.log('temp', pins['T1'])
                    if pins["T1"] > settings["maxTemp"]:
                        chip.alert(f"{chip.name} got too hot {round(pins['T1'],1)}° F")

        except KeyboardInterrupt:
            raise
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


class Ready:
    def __init__(self):
        self.last_time = 0

    def __call__(self, wait):
        now = time.time()
        if now - self.last_time < wait:
            return False
        self.last_time = now
        return True


if __name__ == '__main__':
    with open(dir / 'out.log', 'w') as log, contextlib.redirect_stdout(Tee(log, sys.stdout)):
        poll()
