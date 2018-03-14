<template>
  <div>
    <div
      class='mapWrapper'
      :ref="'mapdiv'">
      <div
        v-for="location in locations.features"
        :location="location"
        :position="location.geometry.coordinates"
        :key="location.title"
        :ref="'markers'"
        @click="getCenter(location.geometry.coordinates)">
        <map-marker 
          :iconType="location.properties.type"
          
          />
      </div>
    </div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl';
import { mapState, mapActions, mapGetters } from 'vuex';
import MapMarker from './MapMarker';
import kebabCase from 'lodash.kebabcase';
export default {
  components: {
    MapMarker,
  },

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

  methods: {
    doClickety: function() {
      console.log('done clickety!');
    },
    ...mapActions(['getCenter']),
  },

  mounted() {
    const map = new mapboxgl.Map({
      container: this.$refs.mapdiv,
      style: this.mapStyle,
      zoom: this.zoom,
      center: this.center,
    });
    const bounds = new mapboxgl.LngLatBounds();
    this.locations.features.forEach((item, i) => {
      const markerRef = this.$refs.markers[i];
      new mapboxgl.Marker(this.$refs.markers[i], { offset: [0, -30] })
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

