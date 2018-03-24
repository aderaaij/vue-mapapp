import Vue from 'vue';
import Vuex from 'vuex';
import geoData from '@/data/api';
import * as types from './types';
import data from './modules/data';

const api =
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/22914/map_dark-matter.json';

Vue.use(Vuex);

const state = {
  map: {
    zoom: 3,
    center: [-82.98509939999997, 12.2937504],
    bounds: null,
    loaded: false,
  },
  dataLoaded: false,
  mapLoaded: false,
  hoveredLocationId: null,
  activeLocationId: null,
  locationHover: false,
  isPanningToMarker: false,
  isActiveTeaser: false,
  isActiveArticle: false,
};

const getters = {
  getDataLoaded: state => state.dataLoaded,
  getMapLoaded: state => state.mapLoaded,
  getCenter: state => state.map.center,
  getZoom: state => state.map.zoom,
  getHoveredLocation: state => id => {
    if (!id) return false;
    return state.hoveredLocationId === id ? true : false;
  },
  getPanningStatus: state => state.isPanningToMarker,
  getTripBounds: state => state.map.bounds,
  getHoveredLocationId: state => state.hoveredLocationId,
  getActiveLocationId: state => state.activeLocationId,
  getIfActiveArticle: state => state.isActiveArticle,
};

const actions = {
  setMapCenter({ commit }, position) {
    commit(types.SET_MAP_CENTER, position);
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

  setActiveArticleId({ commit }, id) {
    commit(types.SET_ACTIVE_ARTICLE_ID, id);
  },

  toggleActiveArticle({ commit }) {
    commit(types.TOGGLE_ACTIVE_ARTICLE);
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
  [types.SET_MAP_CENTER](state, center) {
    state.map.center = center;
  },
  [types.SET_ZOOM](state, zoom) {
    state.map.zoom = zoom;
  },
  [types.SET_TRIP_BOUNDS](state, bounds) {
    state.map.bounds = bounds;
  },
  [types.SET_HOVERED_LOCATION_ID](state, id) {
    state.hoveredLocationId = id;
  },
  [types.SET_ACTIVE_LOCATION_ID](state, id) {
    state.activeLocationId = id;
  },
  [types.SET_ACTIVE_ARTICLE_ID](state, id) {
    state.activeLocationId = id;
  },
  [types.TOGGLE_ACTIVE_ARTICLE](state) {
    state.isActiveArticle = !state.isActiveArticle;
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
