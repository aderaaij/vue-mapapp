<template>
  <div>
    <div
      class='mapWrapper'
      :id="(mapOptions.hasOwnProperty('container') ? mapOptions.container : 'map')"
      :ref="'mapdiv'">
      <div        
        v-for="location in locations.features"
        :key="location.properties.id"
        :ref="'markers'"
        @mouseenter="setActive(location)"
        @mouseleave="setHoveredLocationId(null)"
        @click="setCenter(location.geometry.coordinates)">
        <map-marker 
          :class="showMarkers ? 'marker--visible' : 'marker--hidden'"
          :iconType="location.properties.type"
          :id="location.properties.id"
          :location="location"
          @marker-offset="onMarkerOffset"
          />
      </div>
    </div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl';
import { mapState, mapActions, mapGetters } from 'vuex';
import MapMarker from './MapMarker';
import { offSetMarker } from '@/helpers';
export default {
  components: {
    MapMarker,
  },

  data() {
    return { showMarkers: false };
  },

  props: {
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
    ...mapState(['zoom', 'center', 'mapLoaded']),
    ...mapGetters({
      myState: 'getCenter',
    }),
  },

  mounted() {
    const map = this.mapInit();
    const bounds = new mapboxgl.LngLatBounds();

    this.registerEvents(map, bounds);
    this.addMarkers(map, bounds);
  },

  methods: {
    ...mapActions([
      'setCenter',
      'setTripBounds',
      'toggleLocationHover',
      'setHoveredLocationId',
    ]),

    setActive(location) {
      this.toggleLocationHover(location.geometry.coordinates);
      this.setHoveredLocationId(location.properties.id);
    },

    mapInit() {
      if (!this.mapOptions.hasOwnProperty('container')) {
        this.mapOptions.container = 'map';
      }
      const map = new mapboxgl.Map(this.mapOptions);
      this.theMap = map;
      this.$emit('map-init', map);
      return map;
    },

    registerEvents(map, bounds) {
      // Load Event
      map.on('load', () => {
        this.$emit('map-load', map);
        this.showMarkers = true;
      });

      //Map Mouse Move
      map.on('mousemove', e => {
        this.$emit('map-mousemove', map, e);
      });

      //Map Move End
      map.on('moveend', e => {
        this.$emit('map-moveend', map, e);
      });

      //Map Clicked
      map.on('click', e => {
        this.$emit('map-click', map, e);
      });
    },

    onMarkerOffset(marker) {
      // offSetMarker(marker, 3, this.theMap);
    },

    addMarkers(map, bounds) {
      this.locations.features.forEach((item, i) => {
        const markerRef = this.$refs.markers[i];
        new mapboxgl.Marker(markerRef, { offset: [0, -30] })
          .setLngLat(item.geometry.coordinates)
          .addTo(map);
        bounds.extend(item.geometry.coordinates);
      });
      this.setTripBounds(bounds);
    },
  },
};
</script>
<style lang="scss">
@import '~mapbox-gl/dist/mapbox-gl.css';
.mapWrapper {
  width: 70vw;
  height: 100vh;
}

.marker {
  display: block;

  &--visible {
    display: block;
  }

  &--hidden {
    display: none;
  }
}
</style>

