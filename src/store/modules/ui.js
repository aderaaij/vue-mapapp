import * as types from '@/store/types';

const state = {
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
  getCenter: state => state.center,
  getZoom: state => state.zoom,
  getHoveredLocation: state => id =>
    state.hoveredLocationId === id ? true : false,
  getPanningStatus: state => state.isPanningToMarker,
  getTripBounds: state => state.tripBounds,
  getDataLoaded: state => state.dataLoaded,
  getMapLoaded: state => state.mapLoaded,
};

const actions = {
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
  [types.TOGGLE_DATA_LOADED](state, dataLoaded) {
    state.dataLoaded = !dataLoaded;
  },
  [types.TOGGLE_MAP_LOADED](state, mapLoaded) {
    state.mapLoaded = !mapLoaded;
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

export default {
  state,
  getters,
  actions,
  mutations,
};
