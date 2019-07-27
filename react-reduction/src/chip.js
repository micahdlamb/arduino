
let valuesPromise

export async function readPin(pin){
    if (!valuesPromise){
        let ip = localStorage.getItem('chip-ip')
        if (!ip) return 0
        //192.168.1.230
        valuesPromise = fetch(`http://${ip}/pins`).then(res => res.json())
        //valuesPromise = mockValues()
        valuesPromise.finally(() => valuesPromise = null)
    }

    let values = await valuesPromise
    return Array.isArray(pin) ?
        pin.map(pin => values[pin])
    :   values[pin]
}

export async function writePin(pin, value){
    let ip = localStorage.getItem('chip-ip')
    if (!ip) return
    return fetch(`http://${ip}/${pin}/${value}`, {method: 'POST'}).then(res => res.json())
}

function fetch(url, kwds){
    let controller = new AbortController()
    kwds = {...kwds, signal: controller.signal}
    setTimeout(() => controller.abort(), 1000)
    return window.fetch(url, kwds)
}

function mockValues(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
            ])
        }, 100)
    })
}
