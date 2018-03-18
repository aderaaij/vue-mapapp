import Vue from 'vue';
import Vuex from 'vuex';
import geoData from '@/data/api';
import * as types from './types';
import data from './modules/data';

const api =
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/22914/map_dark-matter.json';

Vue.use(Vuex);

const state = {
  dataLoaded: false,
  mapLoaded: false,
  zoom: 3,
  center: [-82.98509939999997, 12.2937504],
  hoveredLocationId: null,
  activeLocationId: null,
  locationHover: false,
  isPanningToMarker: false,
  tripBounds: null,
  isActiveTeaser: false,
};

const getters = {
  getDataLoaded: state => state.dataLoaded,
  getMapLoaded: state => state.mapLoaded,
  getCenter: state => state.center,
  getZoom: state => state.zoom,
  getHoveredLocation: state => id =>
    state.hoveredLocationId === id ? true : false,
  getPanningStatus: state => state.isPanningToMarker,
  getTripBounds: state => state.tripBounds,
  getActiveLocationId: state => state.activeLocationId,
};

const actions = {
  setCenter({ commit }, position) {
    commit(types.SET_CENTER, position);
  },

  setTripBounds({ commit }, bounds) {
    commit(types.SET_TRIP_BOUNDS, bounds);
  },

  setZoom({ commit }, zoom) {
    commit(types.SET_ZOOM, zoom);
  },

  toggleMapLoaded({ state, commit }) {
    commit(types.TOGGLE_MAP_LOADED, state.mapLoaded);
  },

  toggleDataLoaded({ state, commit }) {
    commit(types.TOGGLE_DATA_LOADED, state.dataLoaded);
  },

  toggleLocationHover({ commit }, value) {
    commit(types.TOGGLE_LOCATION_HOVER, value);
  },

  togglePanToMarker({ commit }, value) {
    commit(types.TOGGLE_PANTOMARKER, value);
  },

  setHoveredLocationId({ commit }, id) {
    commit(types.SET_HOVERED_LOCATION_ID, id);
  },

  setActiveLocationId({ commit }, id) {
    commit(types.SET_ACTIVE_LOCATION_ID, id);
  },
};

const mutations = {
  [types.TOGGLE_DATA_LOADED](state, dataLoaded) {
    state.dataLoaded = !dataLoaded;
  },
  [types.TOGGLE_MAP_LOADED](state, mapLoaded) {
    state.mapLoaded = !mapLoaded;
  },
  [types.TOGGLE_LOCATION_HOVER](state, value) {
    state.locationHover = value;
  },
  [types.TOGGLE_PANTOMARKER](state, value) {
    state.isPanningToMarker = value;
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
  [types.SET_ACTIVE_LOCATION_ID](state, id) {
    state.activeLocationId = id;
  },
};

const store = new Vuex.Store({
  modules: {
    data,
  },
  state,
  getters,
  actions,
  mutations,
});

export default store;
