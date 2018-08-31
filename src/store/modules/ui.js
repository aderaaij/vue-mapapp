import * as types from '@/store/types';

const state = {
  map: {
    zoom: 3,
    center: [-82.98509939999997, 12.2937504],
    bounds: null,
    loaded: false
  },
  dataLoaded: false,
  mapLoaded: false,
  hoveredLocationId: null,
  locationHover: false,
  isPanningToMarker: false,
  isActiveTeaser: false,
  isActiveArticle: false,
  showArticle: false
};

const getters = {
  getDataLoaded: state => state.dataLoaded,
  getMapLoaded: state => state.mapLoaded,
  getCenter: state => state.map.center,
  getZoom: state => state.map.zoom,
  getHoveredLocation: ({ hoveredLocationId }) => id => {
    if (!id) return false;
    return hoveredLocationId === id ? true : false;
  },
  locationHover: state => state.locationHover,
  getPanningStatus: state => state.isPanningToMarker,
  getTripBounds: state => state.map.bounds,
  getIfActiveArticle: state => state.isActiveArticle,
  showArticle: state => state.showArticle
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

  toggleDataLoaded({ commit }, value) {
    commit(types.TOGGLE_DATA_LOADED, value);
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

  toggleActiveArticle({ commit }, bool) {
    commit(types.TOGGLE_ACTIVE_ARTICLE, bool);
  },

  toggleShowArticle({ commit }, value) {
    commit(types.SHOW_ARTICLE, value);
  }
};

const mutations = {
  [types.TOGGLE_DATA_LOADED](state, value) {
    state.dataLoaded = value;
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
  [types.SET_ACTIVE_ARTICLE_ID](state, id) {
    state.activeLocationId = id;
  },
  [types.TOGGLE_ACTIVE_ARTICLE](state, bool) {
    state.isActiveArticle = bool;
  },
  [types.SHOW_ARTICLE](state, value) {
    state.showArticle = value;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
