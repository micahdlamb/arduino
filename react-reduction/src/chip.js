
let valuesPromise

export async function readPin(pin){
    if (!valuesPromise){
        let ip = localStorage.getItem('chip-ip')
        if (!ip) return 0
        //192.168.1.230
        valuesPromise = fetch(`http://${ip}/pins`).then(res => res.json())
        //valuesPromise = mockValues()
        valuesPromise.then(() => valuesPromise = null)
    }

    let values = await valuesPromise
    return Array.isArray(pin) ?
        pin.map(pin => values[pin])
    :   values[pin]
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
