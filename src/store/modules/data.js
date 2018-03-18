import * as types from '@/store/types';
import geoData from '@/data/api';
// import contentful from 'contentful';
import axios from 'axios';

const state = {
  mapStyle: null,
  locations: null,
};

const api =
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/22914/map_dark-matter.json';
const contentfulApi = `${info.url}${info.space}/entries?access_token=${
  info.token
}`;
const getters = {
  getMapStyle: state => state.mapStyle,
  getLocations: state => state.locations,
};

const actions = {
  setMapStyle({ commit }) {
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
      axios
        .get(contentfulApi)
        .then(response => {
          commit(types.SET_LOCATIONS, response.data.items);
          resolve();
        })
        .catch(error => console.log(error));
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
