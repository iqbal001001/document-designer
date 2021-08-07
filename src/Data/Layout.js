import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:64909/',
});
export default {
    getDataList: () =>
    instance({
        'method':'GET',
        'url':'/api/Layout/'
    }),
    getData: (id) =>
    instance({
        'method':'GET',
        'url':'/api/Layout/' + id
    }),
    postData: (data) =>
    instance({
        'method': 'POST',
        'url':'/api/Layout/',
        'data':data
    })
}