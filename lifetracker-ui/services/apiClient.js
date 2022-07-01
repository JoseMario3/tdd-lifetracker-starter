import axios from "axios";
import { API_BASE_URL } from "./constants.js";

class apiClient {
    constructor(remoteHostUrl) {
        super();
        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
    }

    static setToken(token) {
        this.token = token;
    }

    static request() {
        //use axios to issue http requests
    }

    static login() {
        //send an http request to the auth/login endpoint
    }

    static signup() {
        //send an http request to the auth/register endpoint
    }

    static fetchUserFromToken() {
        //use request method to send http request from auth/me ep
    }
}

export { apiClient };