import {
    HTTP
}
    from '../utils/http'

class ClientModel extends HTTP {
    data = null
    createClient(name, contact) {
        return this.request({
            method: 'POST',
            url: 'client',
            data: {
                name: name,
                contact: contact
            }
        })
    }
}

export {
    ClientModel
}