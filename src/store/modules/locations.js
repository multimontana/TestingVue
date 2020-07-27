import axios from 'axios';

export const locations = {
    state: {
        areas : [],
        selectedAreaLocations : [],
        current_time: ''
    },
    mutations: {
        SET_ALL_AREAS(state,payload) {
           state.areas =  payload.map(function (item) {
               return  item.split('/')[0]
            });
            state.areas  = state.areas.filter(function (value, index, self) {
                return self.indexOf(value.split('/')[0]) === index;
            })
        },
        SET_TIME_FOR_AREA(state,payload) {
            state.selectedAreaLocations  = payload.map(function (item) {
               return  item.split('/')[1]
            })
            state.selectedAreaLocations  = state.selectedAreaLocations.filter(function (value, index, self) {
                return self.indexOf(value.split('/')[0]) === index;
            })
        },
        SET_TIME(state,payload) {
           state.current_time = payload;
        }
    },
    actions: {
        selectAllLocationsAction: ({commit}, data) => {
            return new Promise((resolve, reject) => {
                axios({url: data.url, method: 'GET'})
                    .then(response => {
                        commit('SET_ALL_AREAS',response.data)
                        resolve(response)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        getTimeByLocAndAreaAction: ({commit}, data) => {
            return new Promise((resolve, reject) => {
                axios({url: data.url, method: 'GET'})
                    .then(response => {
                        commit('SET_TIME',response.data)
                        resolve(response)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        getSelectedAreaTimeAction: ({commit},data) => {
            return new Promise((resolve, reject) => {
                axios({url: data.url, method: 'GET'})
                    .then(response => {
                        commit('SET_TIME_FOR_AREA',response.data)
                        resolve(response)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
    },
    getters: {
        getAreas:(state) => {
            return state.areas;
        },
        getLocations:(state) => {
            return state.selectedAreaLocations;
        }
    }
}