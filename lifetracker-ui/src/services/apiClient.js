import axios from "axios";
import API_BASE_URL from "./../../constants";

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl;
        this.token = "null";
        this.tokenName = "lifetracker_token";
    }

    async setToken(token) {
        this.token = token;
        localStorage.setItem(this.tokenName, token);
    }

    async request({ endpoint, method = "GET", data = {} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`;

        const headers = {
            "Content-Type": "application/json",
        };

        if (this.token !== "null") {
            headers[`Authorization`] = `Bearer ${this.token}`;
        }

        try {
            const res = await axios({ url, method, data, headers });
            return { data: res.data, error: null };
        } catch (error) {
            console.error({ errorResponse: error.response });
            const message = error?.response?.data?.error?.message;
            return { data: null, error: message || String(error) };
        }
    }

    async login(credentials) {
        //send an http request to the auth/login endpoint
        return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials });
    }

    async signup(credentials) {
        //send an http request to the auth/register endpoint
        return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials });
    }

    async fetchUserFromToken() {
        //use request method to send http request from auth/me endpoint
        return await this.request({ endpoint: `auth/me`, method: `GET` });
    }

    async getActivity() {
        return await this.request({ endpoint: `activity`, method: `GET` });
    }

    async getNutrition() {
        //send an http request to the /nutrition endpoint
        return await this.request({ endpoint: `nutrition`, method: `GET` });
    }

    async createNutrition(nutritionForm) {
        //send an http request to the /nutrition endpoint
        return await this.request({ endpoint: `nutrition/create`, method: `POST`, data: nutritionForm });
    }

    // async getNutritionById() {
    //     //return await this.request({ endpoint: `nutritions/id`, method: `GET` });
    //     return 0;
    // }
}

export default new ApiClient( API_BASE_URL );