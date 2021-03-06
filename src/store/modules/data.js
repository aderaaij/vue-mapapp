import * as types from '@/store/types';
import axios from 'axios';
import mapStyle from '@/assets/map_dark-matter.json';

const mapStyleAndKey = (mapStyle) => {
  const newObj = { ...mapStyle };
  newObj.sources.openmaptiles.url = `https://free.tilehosting.com/data/v3.json?key=${process.env.VUE_APP_MAPTILER_TOKEN}`; // eslint-disable-line
  newObj.glyphs = `https://free.tilehosting.com/fonts/{fontstack}/{range}.pbf?key=${process.env.VUE_APP_MAPTILER_TOKEN}`; // eslint-disable-line
  return newObj;
};

const formatLocation = ({ fields, sys }) => ({
  title: fields.title ? fields.title : null,
  slug: fields.slug ? fields.slug : null,
  id: sys.id ? sys.id : null,
  dateArrival: fields.arrivalDate ? fields.arrivalDate : null,
  locationType: fields.locationType ? fields.locationType : null,
  contentTypeId: sys.contentType.sys.id,
  coordinates: fields.coordinates,
  featuredImage: fields.featuredImage.sys,
  trip: fields.trip.sys,
  country: fields.country.sys,
  dateCreated: sys.createdAt,
  content: fields.content ? fields.content : null,
});

const state = {
  mapStyle: null,
  locations: {
    assets: [],
    entry: [],
    items: [],
  },
  activeLocationId: null,
};
/* eslint-disable */
const info = {
  space: process.env.VUE_APP_CONTENTFUL_SPACE,
  token: process.env.VUE_APP_CONTENTFUL_TOKEN,
  url: process.env.VUE_APP_CONTENTFUL_BASE,
};
/* eslint-enable */

const instance = axios.create({
  baseURL: `${info.url}${info.space}`,
  headers: { Authorization: `Bearer ${info.token}` },
});

const getters = {
  getMapStyle: ({ mapStyle }) => mapStyle,
  getLocations: ({ locations }) => locations.items,
  currentLocation: ({ activeLocationId }, getters) =>
    getters.locationsFormatted.find((i) => i.id === activeLocationId),
  getImage: ({ locations }) => (id) => {
    const imageObj = locations.assets.find((i) => i.sys.id === id);
    return imageObj.fields.file.url;
  },
  locationsSortedByDate: ({ locations }) =>
    locations.items.sort((a, b) => {
      const dateA = new Date(a.fields.arrivalDate);
      const dateB = new Date(b.fields.arrivalDate);
      return dateA - dateB;
    }),
  locationsFormatted: ({ locations }) =>
    locations.items.map((loc) => formatLocation(loc)),
  locationsFormmatedSorted: (state, getters) =>
    getters.locationsFormatted.sort((a, b) => {
      const dateA = new Date(a.dateArrival);
      const dateB = new Date(b.dateArrival);
      return dateA - dateB;
    }),
  getActiveLocationId: ({ activeLocationId }) => activeLocationId,
  // currentTrip: (state, getters) =>
  //   state.locations.entry.find(e => e.sys.id === getters.currentLocation.fields.trip.sys.id),
  currentTrip: ({ locations }) => (id) =>
    locations.entry.find((e) => e.sys.id === id),
  currentCountry: ({ locations }) => (id) =>
    locations.entry.find((e) => e.sys.id === id),
};

const actions = {
  setMapStyle({ commit }) {
    commit(
      types.SET_MAPSTYLE,
      `https://api.maptiler.com/maps/hybrid/style.json?key=${process.env.VUE_APP_MAPTILER_TOKEN}`
    );
  },

  setLocations({ commit }) {
    return new Promise((resolve) => {
      instance
        .get('/entries', {
          params: {
            include: 1,
            content_type: 'location',
          },
        })
        .then((res) => {
          const { items } = res.data;
          commit(types.SET_LOCATIONS, {
            items,
            assets: res.data.includes.Asset,
            entry: res.data.includes.Entry,
          });
          resolve(items);
        })
        /* eslint-disable-next-line */
        .catch(console.log);
    });
  },

  setActiveLocationId({ commit }, id) {
    commit(types.SET_ACTIVE_LOCATION_ID, id);
  },
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
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
