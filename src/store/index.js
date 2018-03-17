import Vue from 'vue';
import Vuex from 'vuex';
import geoData from '@/data/api';

const SET_LOCATIONS = 'SET_LOCATIONS';
const SET_MAPSTYLE = 'SET_MAPSTYLE';

const TOGGLE_DATA_LOADED = 'TOGGLE_DATA_LOADED';
const TOGGLE_MAP_LOADED = 'TOGGLE_MAP_LOADED';
const TOGGLE_LOCATION_HOVER = 'TOGGLE_LOCATION_HOVER';

const SET_CENTER = 'SET_CENTER';
const SET_EXCERPT_ID = 'SET_EXCERPT_ID';

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
          commit(SET_MAPSTYLE, json);
        });
    });
  },

  setLocations({ commit }) {
    return new Promise(resolve => {
      setTimeout(() => {
        commit(SET_LOCATIONS, geoData);
        resolve();
      }, 300);
    });
  },

  setCenter({ commit }, position) {
    commit(SET_CENTER, position);
  },

  setActiveId({ commit }, id) {
    commit(SET_CENTER);
  },

  toggleMapLoaded({ state, commit }) {
    commit(TOGGLE_MAP_LOADED, state.mapLoaded);
  },

  toggleDataLoaded({ state, commit }) {
    commit(TOGGLE_DATA_LOADED, state.dataLoaded);
  },

  toggleLocationHover({ state, commit }, position) {
    commit(TOGGLE_LOCATION_HOVER, state.locationHover);
    commit(SET_CENTER, position);
  },

  setExcerptId({ state, commit }, id) {
    commit(SET_EXCERPT_ID, id);
  },
};

const mutations = {
  [SET_MAPSTYLE](state, json) {
    state.mapStyle = json;
  },
  [TOGGLE_DATA_LOADED](state, dataLoaded) {
    state.dataLoaded = !dataLoaded;
  },
  [TOGGLE_MAP_LOADED](state, mapLoaded) {
    state.mapLoaded = !mapLoaded;
  },
  [SET_LOCATIONS](state, geoData) {
    state.locations = geoData;
  },
  [SET_CENTER](state, center) {
    state.center = center;
  },
  [SET_EXCERPT_ID](state, excerptId) {
    state.excerptId = excerptId;
  },
  [TOGGLE_LOCATION_HOVER](state, locationHover) {
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
