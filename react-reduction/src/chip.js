
let valuesPromise

export async function readPin(pin){
    if (!valuesPromise){
        valuesPromise = fetch('http://192.168.1.230/pins').then(res => res.json())
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
