import * as types from '@/store/types';
import axios from 'axios';

const state = {
  mapStyle: null,
  locations: {
    assets: [],
    entry: [],
    items: []
  },
  activeLocationId: null
};
/* eslint-disable */
console.log(process.env);
const info = {
  space: process.env.VUE_APP_CONTENTFUL_SPACE,
  token: process.env.VUE_APP_CONTENTFUL_TOKEN,
  url: process.env.VUE_APP_CONTENTFUL_BASE
};
/* eslint-enable */
const mapStyle = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/22914/map_dark-matter.json';
const instance = axios.create({
  baseURL: `${info.url}${info.space}`,
  headers: { Authorization: `Bearer ${info.token}` }
});

const getters = {
  getMapStyle: state => state.mapStyle,
  getLocations: state => state.locations.items,
  currentLocation: state => {
    return state.locations.items.find(i => i.sys.id === state.activeLocationId);
  },
  getImage: state => id => {
    const imageObj = state.locations.assets.find(i => i.sys.id === id);
    return imageObj.fields.file.url;
  },
  locationsSortedByDate: state =>
    state.locations.items.sort((a, b) => {
      const dateA = new Date(a.fields.arrivalDate);
      const dateB = new Date(b.fields.arrivalDate);
      return dateA - dateB;
    }),
  getActiveLocationId: state => state.activeLocationId,
  currentTrip: state => state.locations.entry
};

const actions = {
  setMapStyle({ commit }) {
    return new Promise(resolve => {
      axios
        .get(mapStyle)
        .then(res => {
          resolve();
          commit(types.SET_MAPSTYLE, res.data);
        })
        /* eslint-disable-next-line */
        .catch(console.log);
    });
  },

  setLocations({ commit }) {
    return new Promise(resolve => {
      instance
        .get('/entries', {
          params: {
            include: 1,
            content_type: 'location'
          }
        })
        .then(res => {
          const { items } = res.data;
          commit(types.SET_LOCATIONS, {
            items,
            assets: res.data.includes.Asset,
            entry: res.data.includes.Entry
          });
          resolve(items);
        })
        /* eslint-disable-next-line */
        .catch(console.log);
    });
  },

  setActiveLocationId({ commit }, id) {
    commit(types.SET_ACTIVE_LOCATION_ID, id);
  }
};

const mutations = {
  [types.SET_MAPSTYLE](state, json) {
    state.mapStyle = json;
  },

  [types.SET_LOCATIONS](state, locationData) {
    Object.assign(state.locations, locationData);
  },

  [types.SET_ACTIVE_LOCATION_ID](state, id) {
    state.activeLocationId = id;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
