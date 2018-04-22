module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js');
  }
};
