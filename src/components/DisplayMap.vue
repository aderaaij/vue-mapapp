<template>
  <div>
    <div class='mapdiv' :ref="'mapdiv'"></div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl';
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState(['loading']),
  },
  methods: {
    ...mapActions({
      get: 'getMapStyle',
    }),
  },
  mounted() {
    this.get().then(() => {
      console.log(mapState({ bla: 'mapStyle' }));
      const map = new mapboxgl.Map({
        container: this.$refs.mapdiv,
        style: this.mapStyle,
      });
    });
  },
};
</script>
<style lang="scss">
@import '~/mapboxgl/dist/mapbox-gl.css';
.mapdiv {
  width: 100vw;
  height: 100vh;
}
</style>

