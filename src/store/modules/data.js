import * as types from '@/store/types';
import geoData from '@/data/api';

const api =
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/22914/map_dark-matter.json';
const state = {
  mapStyle: null,
  locations: null,
};

const getters = {
  getMapStyle: state => state.mapStyle,
  getLocations: state => state.locations,
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
};

const mutations = {
  [types.SET_MAPSTYLE](state, json) {
    state.mapStyle = json;
  },

  [types.SET_LOCATIONS](state, geoData) {
    state.locations = geoData;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
