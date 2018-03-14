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
    ...mapState(['loading', 'mapStyle']),
  },

  methods: {
    ...mapActions(['getMapStyle']),
  },

  mounted() {
    this.getMapStyle().then(() => {
      const map = new mapboxgl.Map({
        container: this.$refs.mapdiv,
        style: this.mapStyle,
        zoom: 2,
        center: [-82.98509939999997, 12.2937504],
      });
      map.resize();
    });
  },
};
</script>
<style lang="scss">
@import '~mapbox-gl/dist/mapbox-gl.css';
.mapdiv {
  width: 100vw;
  height: 100vh;
}
</style>

