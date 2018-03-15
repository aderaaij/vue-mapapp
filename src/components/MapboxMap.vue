<template>
  <div>
    <div
      class='mapWrapper'
      :id="(mapOptions.hasOwnProperty('container') ? mapOptions.container : 'map')"
      :ref="'mapdiv'">
      <div
        v-for="location in locations.features"
        :location="location"
        :position="location.geometry.coordinates"
        :key="location.title"
        :ref="'markers'"
        :center="center"
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
    mapOptions: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState(['zoom', 'center']),
  },

  mounted() {
    //Initialze Map
    const map = this.mapInit();
    //Add Controls to map
    // this.addControls(map);
    //Register Map Events
    this.registerEvents(map);
  },

  methods: {
    ...mapActions(['getCenter']),
    mapInit() {
      //Add container to options object
      if (!this.mapOptions.hasOwnProperty('container')) {
        this.mapOptions.container = 'map';
      }
      //New Mapbox Instance
      const map = new mapboxgl.Map(this.mapOptions);
      //Emit init event passing map object
      this.$emit('map-init', map);
      return map;
    },
    registerEvents(map) {
      // Load Event
      map.on('load', () => {
        // Emit evet usable in parent compontent
        this.$emit('map-load', map);

        // Add locations
        this.locations.features.forEach((item, i) => {
          const markerRef = this.$refs.markers[i];
          new mapboxgl.Marker(this.$refs.markers[i], { offset: [0, -30] })
            .setLngLat(item.geometry.coordinates)
            .addTo(map);
        });
      });

      //Map Mouse Move
      map.on('mousemove', e => {
        this.$emit('map-mousemove', map, e);
      });

      //Map Clicked
      map.on('click', e => {
        this.$emit('map-click', map, e);
      });
    },
  },
  updated() {
    console.log('updated');
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

