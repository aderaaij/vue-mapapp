<template>
  <div>
    <div
      class='mapWrapper'
      :ref="'mapdiv'"/>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl';
import { mapState } from 'vuex';

export default {
  props: {
    mapStyle: {
      required: true,
      type: Object,
    },
    locations: {
      required: true,
      type: Object,
    },
  },

  computed: {
    ...mapState(['zoom', 'center']),
  },

  mounted() {
    const map = new mapboxgl.Map({
      container: this.$refs.mapdiv,
      style: this.mapStyle,
      zoom: this.zoom,
      center: this.center,
    });
    const bounds = new mapboxgl.LngLatBounds();
    this.locations.features.forEach(item => {
      const markerEl = document.createElement('div');
      markerEl.innerHTML = '📌';
      markerEl.style.cursor = 'pointer';
      new mapboxgl.Marker(markerEl, { offset: [10, -5] })
        .setLngLat(item.geometry.coordinates)
        .addTo(map);
      bounds.extend(item.geometry.coordinates);
    });
  },
};
</script>
<style lang="scss">
@import '~mapbox-gl/dist/mapbox-gl.css';
.mapWrapper {
  width: 100vw;
  height: 100vh;
}
</style>

