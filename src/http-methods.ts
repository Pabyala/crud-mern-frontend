import http from './http-common';

class httpMethods {
    getAll(){
        return http.get('/get');
    }
}

export default new httpMethods();