import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:64909/',
});
export default {
    getDataList: () =>
    instance({
        'method':'GET',
        'url':'/api/Template/'
    }),
    getData: (id) =>
    instance({
        'method':'GET',
        'url':'/api/Template/' + id
    }),
    getCurrentLayoutData: (id) =>
    instance({
        'method':'GET',
        'url':'/api/Template/CurrentLayout/' + id
    }),
    postData: (data) =>
    instance({
        'method': 'POST',
        'url':'/api/Template/',
        'data':data
    })
}