import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { SHOPPING, API_PREFIX, API_VERSION } from "@/config";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: 0,
        token: localStorage.getItem('token') || '',
        user: localStorage.getItem('user') || null,
        cart: 0,
        customer_id: localStorage.getItem('customer_id') || null,
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.isLoading,
        getCart: state => state.cart,
        getUser: state => state.user
    },
    mutations: {
        auth_request(state) {
            state.isLoading = 1;
        },
        auth_success(state, token, user) {
            state.isLoading = 0;
            state.token = token;
            state.user = user;
        },
        auth_error(state) {
            state.isLoading = 0;
        },

        register_request(state) {
            state.isLoading = 1;
        },
        register_success(state) {
            state.isLoading = 0;
        },
        register_error(state) {
            state.isLoading = 0;
        },

        logout_request(state) {
            state.isLoading = 1;
        },
        logout_success(state) {
            state.isLoading = 0;
            state.token = '';
        },
        logout_error(state) {
            state.isLoading = 0;
        },

        update_profile_request(state) {
            state.isLoading = 1;
        },
        update_profile_success(state) {
            state.isLoading = 0;
        },
        update_profile_error(state) {
            state.isLoading = 0;
        },

        get_user_info_request(state) {
            state.isLoading = 1;
        },
        get_user_info_success(state, user) {
            state.isLoading = 0;
            state.user = user;
        },
        get_user_info_error(state) {
            state.isLoading = 0;
        },

        get_customer_info_success(state, customer_id) {
            state.customer_id = customer_id;
        },

        addToCart(state) {
            state.cart = state.cart + 1;
        },

        removeFromCart(state) {
            state.cart = state.cart - 1;
        },

        raz(state) {
            state.cart = 0;
        },

        initialise(state) {
            const value = JSON.parse(localStorage.getItem('product_id'));
            state.cart = value.length;
        }
    },
    actions: {
        login({ commit }, user_credentials) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'login', user_credentials)
                    .then(resp => {
                        const token = resp.data.token;
                        const user = resp.data.user;
                        localStorage.setItem('token', token);
                        localStorage.setItem('user', JSON.stringify(user));
                        commit('auth_success');
                        resolve(resp);

                    })
                    .catch(err => {
                        commit('auth_error');
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        reject(err);
                    })
            })
        },
        register({ commit }, customer) {
            return new Promise((resolve, reject) => {
                commit('register_request');
                let user = {
                    last_name: customer.last_name,
                    given_names: customer.given_names,
                    phone_numbers: customer.phone_numbers,
                    email: customer.email,
                    password: customer.password,
                    password_confirmation: customer.password_confirmation
                };
                axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'user', user)
                    .then(resp => {
                        let customerObj = {
                            civility: customer.civility,
                            last_name: customer.last_name,
                            given_names: customer.given_names,
                            phone_numbers: customer.phone_numbers,
                            user_id: resp.data.id
                        };
                        axios.post(SHOPPING.DEV_URL + API_PREFIX + API_VERSION + 'customers', customerObj)
                            .then((response) => {
                                commit('register_success');
                                resolve(response);
                            })
                            .catch((error) => {
                                commit('register_error');
                                reject(error);
                            });
                    })
                    .catch(err => {
                        commit('register_error');
                        reject(err);
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout_request')
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('customer');
                delete axios.defaults.headers.common['Authorization'];
                commit('logout_success')
                resolve()
            })
        },
        update_profile({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('update_profile_request')
                const token = localStorage.getItem('token');
                axios({
                        url: AUTH.DEV_URL + API_PREFIX + API_VERSION + 'profile/update',
                        data: user,
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(resp => {
                        commit('update_profile_success')
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('update_profile_error', err)
                        reject(err)
                    })
            })

        },
        get_user_info({ commit }) {
            return new Promise((resolve, reject) => {
                commit('get_user_info_request')
                const token = localStorage.getItem('token');
                axios({
                        url: AUTH.DEV_URL + API_PREFIX + API_VERSION + 'profile',
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(resp => {
                        const user = resp.data.user
                        localStorage.removeItem('user')
                        localStorage.setItem('user', JSON.stringify(user))
                        commit('get_user_info_success', JSON.stringify(user))
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('get_user_info_error', err)
                        reject(err)
                    })
            })

        },

        get_customer_info({ commit }) {
            return new Promise((resolve, reject) => {
                let app = this;
                const user = JSON.parse(localStorage.getItem('user'));
                const token = localStorage.getItem('token');
                app.isLoading = true;
                axios.get(NUPTIAL_NOTEBOOK.DEV_URL + API_PREFIX + API_VERSION + 'customers-by-user/' + user.id, {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    })
                    .then((response) => {
                        const customer_id = response.data.id;
                        localStorage.setItem('customer_id', JSON.stringify(customer_id));
                        commit('get_customer_info_success', customer_id);
                        resolve(response);
                    })
                    .catch((error) => {
                        commit('get_customer_info_error')
                        reject(error);
                    });
            });
        },

    }
})