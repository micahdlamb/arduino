import store, {setSettings} from 'store';

class Chip {
    constructor(name, label){
        this.name = name
        this.label = label
    }

    async readPin(pin){
        if (!this.valuesPromise){
            this.valuesPromise = this.fetchJson(`/pins`)
            if (!this.valuesPromise) return 0
            // valuesPromise = mockValues()
            this.valuesPromise.finally(() => this.valuesPromise = null)
        }
    
        let values = await this.valuesPromise
        return Array.isArray(pin) ?
            pin.map(pin => values[pin])
        :   values[pin]
    }

    async writePin(pin, value){
        return this.fetchJson(`/${pin}/${value}`, {method: 'POST'})
    }

    fetchJson(path, kwds){
        let ip = this.getIp()
        if (!ip){
            store.dispatch({type: "connected", [this.name]: undefined})
            return //mockValues()
        }
        let controller = new AbortController()
        kwds = {...kwds, signal: controller.signal}
        setTimeout(() => controller.abort(), 3000)
        // let request = window.fetch('http://'+ip+path, kwds)
        let request = window.fetch(`proxy?url=${encodeURIComponent('http://'+ip+path)}`, kwds)
        request.then(resp => store.dispatch({type: "connected", [this.name]: true}))
        request.catch(err => store.dispatch({type: "connected", [this.name]: false}))
        return request.then(res => res.json())
    }

    getIp(){
        return store.getState().settings[`${this.name}-ip`]
    }

    setIp(ip){
        store.dispatch(setSettings({[`${this.name}-ip`]: ip}))
    }
}

// function mockValues(){
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve({
//                 1: Math.random(),
//                 2: Math.random(),
//                 3: Math.random(),
//                 4: Math.random(),
//                 5: Math.random(),
//                 T1: Math.random(),
//             })
//         }, 100)
//     })
// }

export const chiller1 = new Chip('chiller1', 'Chiller 1')
export const chiller2 = new Chip('chiller2', 'Chiller 2')
export const lp = new Chip('lp', 'LP')
export const hp = new Chip('hp', 'HP')