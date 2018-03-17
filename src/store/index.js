import Vue from 'vue';
import Vuex from 'vuex';
import geoData from '@/data/api';
import * as types from './types';

const api =
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/22914/map_dark-matter.json';

Vue.use(Vuex);

const state = {
  mapStyle: null,
  dataLoaded: false,
  locations: null,
  mapLoaded: false,
  zoom: 3,
  center: [-82.98509939999997, 12.2937504],
  excerptId: null,
  locationHover: false,
};

const getters = {
  mapStyle: state => state.mapStyle,
  mapLocations: state => state.locations,
  getCenter: state => state.center,
  getExcerptId: state => state.excerptId,
};

const actions = {
  setMapStyle({ state, commit }) {
    return new Promise(resolve => {
      fetch(api)
        .then(response => response.json())
        .then(json => {
          resolve();
          commit(types.SET_MAPSTYLE, json);
        });
    });
  },

  setLocations({ commit }) {
    return new Promise(resolve => {
      commit(types.SET_LOCATIONS, geoData);
      resolve();
    });
  },

  setCenter({ commit }, position) {
    commit(types.SET_CENTER, position);
  },

  setActiveId({ commit }, id) {
    commit(types.SET_CENTER);
  },

  toggleMapLoaded({ state, commit }) {
    commit(types.TOGGLE_MAP_LOADED, state.mapLoaded);
  },

  toggleDataLoaded({ state, commit }) {
    commit(types.TOGGLE_DATA_LOADED, state.dataLoaded);
  },

  toggleLocationHover({ state, commit }, position) {
    commit(types.TOGGLE_LOCATION_HOVER, state.locationHover);
    commit(types.SET_CENTER, position);
  },

  setExcerptId({ state, commit }, id) {
    commit(types.SET_EXCERPT_ID, id);
  },
};

const mutations = {
  [types.SET_MAPSTYLE](state, json) {
    state.mapStyle = json;
  },
  [types.TOGGLE_DATA_LOADED](state, dataLoaded) {
    state.dataLoaded = !dataLoaded;
  },
  [types.TOGGLE_MAP_LOADED](state, mapLoaded) {
    state.mapLoaded = !mapLoaded;
  },
  [types.SET_LOCATIONS](state, geoData) {
    state.locations = geoData;
  },
  [types.SET_CENTER](state, center) {
    state.center = center;
  },
  [types.SET_EXCERPT_ID](state, excerptId) {
    state.excerptId = excerptId;
  },
  [types.TOGGLE_LOCATION_HOVER](state, locationHover) {
    state.locationHover = !locationHover;
  },
};

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});

export default store;
