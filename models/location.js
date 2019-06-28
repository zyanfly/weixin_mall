import {
    HTTP
}
from '../utils/http'

class LocationModel extends HTTP {
    data = null
    getLocation() {
        return this.request({
            url: 'location'
        })
    }
}

export {
    LocationModel
}