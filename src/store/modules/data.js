import * as types from '@/store/types';
import geoData from '@/data/api';
// import contentful from 'contentful';
import axios from 'axios';

const api =
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/22914/map_dark-matter.json';

const contentfulApi =
  'http://cdn.contentful.com/spaces/bvocjxecix04/entries?access_token=dcf9690d920d2faa196153fc111fd188ecf1d6a4890a2970d6c6924843ced4c2';
const state = {
  mapStyle: null,
  locations: null,
};

// const client = contentful.createClient({
//   space: 'bvocjxecix04',
//   accessToken:
//     'dcf9690d920d2faa196153fc111fd188ecf1d6a4890a2970d6c6924843ced4c2',
// });

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

  // setLocations({ commit }) {
  //   return new Promise(resolve => {
  //     commit(types.SET_LOCATIONS, geoData);
  //     resolve();
  //   });
  // },
  setLocations({ commit }) {
    return new Promise(resolve => {
      axios
        .get(contentfulApi)
        .then(response => {
          console.log(response.data.items);
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
