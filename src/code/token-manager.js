import {axiosInstance} from "./http-common";
import {TOKEN} from "./constants";

export class TokenManager {
    token = null;

    setToken(token) {
        this.token = token
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`

        localStorage.setItem(TOKEN, token)
    }

    logout() {
        this.token = null
        delete axiosInstance.defaults.headers['Authorization']
        localStorage.removeItem(TOKEN)
    }

    renew() {
        const token = localStorage.getItem(TOKEN)
        if (token) {
            this.setToken(token)
        }
    }

    getPayload() {
        if (this.token) {
            const parts = this.token.split(".")
            const rawToken = atob(parts[1])
            return JSON.parse(rawToken)
        }
        return null
    }

    isUserLogged() {
        return this.token != null
    }
}
