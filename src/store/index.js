import Vue from 'vue';
import Vuex from 'vuex';
import geoData from '@/data/api';
import * as types from './types';

const api =
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/22914/map_dark-matter.json';

Vue.use(Vuex);

const state = {
  mapStyle: null,
  locations: null,
  dataLoaded: false,
  mapLoaded: false,
  zoom: 3,
  center: [-82.98509939999997, 12.2937504],
  hoveredLocationId: null,
  locationHover: false,
  isPanningToMarker: false,
  tripBounds: null,
  isActiveTeaser: false,
};

const getters = {
  getDataLoaded: state => state.dataLoaded,
  getMapLoaded: state => state.mapLoaded,
  mapStyle: state => state.mapStyle,
  mapLocations: state => state.locations,
  getCenter: state => state.center,
  getZoom: state => state.zoom,
  getHoveredLocation: state => id =>
    state.hoveredLocationId === id ? true : false,
  getPanningStatus: state => state.isPanningToMarker,
  getTripBounds: state => state.tripBounds,
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

  setTripBounds({ commit }, bounds) {
    commit(types.SET_TRIP_BOUNDS, bounds);
  },

  toggleMapLoaded({ state, commit }) {
    commit(types.TOGGLE_MAP_LOADED, state.mapLoaded);
  },

  toggleDataLoaded({ state, commit }) {
    commit(types.TOGGLE_DATA_LOADED, state.dataLoaded);
  },

  toggleLocationHover({ state, commit }, { active, coordinates, zoom }) {
    commit(types.TOGGLE_LOCATION_HOVER, active);
    commit(types.SET_CENTER, coordinates);
    commit(types.SET_ZOOM, zoom);
  },

  togglePanToMarker({ state, commit }, value) {
    commit(types.TOGGLE_PANTOMARKER, value);
  },

  setHoveredLocationId({ commit }, id) {
    commit(types.SET_HOVERED_LOCATION_ID, id);
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
  [types.SET_ZOOM](state, zoom) {
    state.zoom = zoom;
  },
  [types.SET_TRIP_BOUNDS](state, bounds) {
    state.tripBounds = bounds;
  },
  [types.SET_HOVERED_LOCATION_ID](state, id) {
    state.hoveredLocationId = id;
  },
  [types.TOGGLE_LOCATION_HOVER](state, locationHover) {
    state.locationHover = locationHover;
  },
  [types.TOGGLE_PANTOMARKER](state, value) {
    state.isPanningToMarker = value;
  },
};

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});

export default store;
