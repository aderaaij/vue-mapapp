import Vue from 'vue';
import Vuex from 'vuex';
// import * as getters from './getters';
// import * as actions from './actions';
// import * as mutations from './mutations';
import geoData from '@/data/api';

const SET_LOCATIONS = 'SET_LOCATIONS';
const SET_MAPSTYLE = 'SET_MAPSTYLE';
const SET_LOADING = 'SET_LOADING';
const TOGGLE_LOADING = 'TOGGLE_LOADING';

const api = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/22914/map_dark-matter.json';

Vue.use(Vuex);

const state = {
  mapStyle: {},
  loading: true,
  locations: [],
  zoom: 3,
  center: [-82.98509939999997, 12.2937504],
};

const getters = {
  mapStyle: state => state.mapStyle,
  mapLocations: state => state.locations,
};

const actions = {
  getMapStyle({ state, commit }) {
    return new Promise(resolve => {
      fetch(api)
        .then(response => response.json())
        .then(json => {
          resolve();
          commit(SET_MAPSTYLE, json);
        });
    });
  },

  getLocations({ commit }) {
    return new Promise(resolve => {
      setTimeout(() => {
        commit(SET_LOCATIONS, geoData);
        resolve();
      }, 300);
    });
  },

  toggleLoading({ state, commit }) {
    console.log(state.loading);
    commit(TOGGLE_LOADING, state.loading);
  },
};

const mutations = {
  [SET_MAPSTYLE](state, json) {
    state.mapStyle = json;
  },
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [TOGGLE_LOADING](state, loading) {
    state.loading = !loading;
  },
  [SET_LOCATIONS](state, geoData) {
    state.locations = geoData;
  },
};

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});

export default store;
