export default class LocalStorageService {
    getToken(token){
        return localStorage.getItem(token)
    }

    setToken(token){
        localStorage.setItem('token', token)
    }

    removeToken(token){
        localStorage.removeItem(token)
    }

}