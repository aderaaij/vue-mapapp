import * as types from '@/store/types';
import geoData from '@/data/api';
// import contentful from 'contentful';
import axios from 'axios';

const state = {
  mapStyle: null,
  locations: null
};

const info = {
  space: process.env.VUE_APP_CONTENTFUL_SPACE,
  token: process.env.VUE_APP_CONTENTFUL_TOKEN,
  url: process.env.VUE_APP_CONTENTFUL_BASE
};

const api = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/22914/map_dark-matter.json';
const contentfulApi = `${info.url}${info.space}/entries?access_token=${info.token}&include=1`;

const getters = {
  getMapStyle: state => state.mapStyle,
  getLocations: state => state.locations.items,
  getImage: state => id => {
    const imageObj = state.locations.assets.find(item => item.sys.id === id);
    return imageObj.fields.file.url;
  },
  getLocationsSorted: state => {
    return state.locations.items.sort((a, b) => {
      const dateA = new Date(a.fields.arrivalDate);
      const dateB = new Date(b.fields.arrivalDate);
      return dateA - dateB;
    });
  }
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
        .then(res => {
          const items = res.data.items.filter(item => item.sys.contentType.sys.id === 'location');
          console.log(res.data.includes.Asset);
          commit(types.SET_LOCATIONS, {
            items,
            assets: res.data.includes.Asset
          });
          resolve(items);
        })
        .catch(error => console.log(error));
    });
  },

  setLocationImages({ dispatch, commit }) {
    return dispatch('setLocations').then(res => {
      res.forEach(item => {
        // console.log(item.fields.featuredImage.sys.id);
      });
    });
  }
};

const mutations = {
  [types.SET_MAPSTYLE](state, json) {
    state.mapStyle = json;
  },

  [types.SET_LOCATIONS](state, geoData) {
    state.locations = geoData;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
