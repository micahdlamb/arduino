import asyncio, requests_async as requests
import aiofiles
from pathlib import Path
from quart import Quart, request, send_from_directory, send_file

app = Quart(__name__, static_folder='react-reduction/build')

promises = dict()

@app.route("/proxy", methods=['GET', 'POST'])
async def proxy():
    url = request.args.get("url")

    if request.method == 'POST':
        return (await requests.post(url)).content

    if url not in promises:
        promises[url] = asyncio.ensure_future(requests.get(url, timeout=3))
        promises[url].add_done_callback(lambda future: promises.pop(url))

    return (await promises[url]).content


root = Path(__file__).parent
settings_file = root / 'settings.json'

@app.route("/settings", methods=['GET', 'POST'])
async def settings():
    if request.method == 'POST':
        async with aiofiles.open(settings_file, 'wb') as f:
            await f.write(await request.data)
            return "success"
    else:
        return await send_file(settings_file, cache_timeout=-1)


@app.route("/logs/<file>")
async def logs(file):
    return await send_file(root / (file+".log"), cache_timeout=-1)


# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path and (Path(app.static_folder) / path).exists():
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


# set QUART_APP=app:app && quart run --host=0.0.0.0 --port=80
if __name__ == '__main__':

    import subprocess,sys
    subprocess.Popen([sys.executable, 'poll.py'])

    app.run(host="0.0.0.0", debug=True)
