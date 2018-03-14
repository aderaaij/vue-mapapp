import Vue from 'vue';
import Vuex from 'vuex';
// import * as getters from './getters';
// import * as actions from './actions';
// import * as mutations from './mutations';

const SET_MAPSTYLE = 'SET_MAPSTYLE';
const SET_LOADING = 'SET_LOADING';

const api = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/22914/map_dark-matter.json';
Vue.use(Vuex);

const state = {
  mapStyle: {},
  loading: false,
};

const getters = {
  mapStyle: state => state.mapStyle,
};

const actions = {
  getMapStyle({ commit }) {
    commit(SET_LOADING, true);
    return new Promise(resolve => {
      fetch(api)
        .then(response => response.json())
        .then(json => {
          resolve();
          commit(SET_MAPSTYLE, json);
        });
    });
  },
};

const mutations = {
  [SET_MAPSTYLE](state, json) {
    state.mapStyle = json;
  },
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
};

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});

export default store;
