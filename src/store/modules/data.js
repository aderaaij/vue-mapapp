import * as types from '@/store/types';
import axios from 'axios';

const formatLocation = location => ({
  title: location.fields.title,
  slug: location.fields.slug,
  id: location.sys.id,
  dateArrival: location.fields.arrivalDate,
  locationType: location.fields.locationType,
  contentTypeId: location.sys.contentType.sys.id,
  coordinates: location.fields.coordinates,
  featuredImage: location.fields.featuredImage.sys,
  trip: location.fields.trip.sys,
  country: location.fields.country.sys,
  dateCreated: location.sys.createdAt
});

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
  currentLocation: (state, getters) => {
    return getters.locationsFormatted.find(i => i.id === state.activeLocationId);
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
  locationsFormatted: state => state.locations.items.map(loc => formatLocation(loc)),
  locationsFormmatedSorted: (state, getters) =>
    getters.locationsFormatted.sort((a, b) => {
      const dateA = new Date(a.dateArrival);
      const dateB = new Date(b.dateArrival);
      return dateA - dateB;
    }),
  getActiveLocationId: state => state.activeLocationId,
  // currentTrip: (state, getters) =>
  //   state.locations.entry.find(e => e.sys.id === getters.currentLocation.fields.trip.sys.id),
  currentTrip: state => id => state.locations.entry.find(e => e.sys.id === id),
  currentCountry: state => id => state.locations.entry.find(e => e.sys.id === id)
};

const actions = {
  setMapStyle({ commit }) {
    return new Promise(resolve => {
      axios
        .get(mapStyle)
        .then(res => {
          resolve(res);
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
