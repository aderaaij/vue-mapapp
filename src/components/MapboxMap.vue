<template>
  <div>
    <div
      class='mapWrapper'
      :id="(mapOptions.hasOwnProperty('container') ? mapOptions.container : 'map')"
      :ref="'mapdiv'">
      <div        
        v-for="location in getLocationsSorted"
        :key="location.sys.id"
        :ref="'markers'"
        @mouseenter="onMouseEnter(location)"
        @mouseleave="onMouseLeave"
        @click="setMapCenter([location.fields.coordinates.lon, location.fields.coordinates.lat])">
        <map-marker 
          :class="showMarkers ? 'marker--visible' : 'marker--hidden'"
          :iconType="location.fields.locationType"
          :id="location.sys.id"
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
    MapMarker
  },

  data() {
    return { showMarkers: false };
  },

  props: {
    locations: {
      required: true,
      type: Array
    },
    mapOptions: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState(['zoom', 'center', 'mapLoaded']),
    ...mapGetters({
      myState: 'getCenter',
      getHoveredLocation: 'getHoveredLocation',
      getLocationsSorted: 'getLocationsSorted'
    })
  },

  mounted() {
    const map = this.mapInit();
    const bounds = new mapboxgl.LngLatBounds();

    this.registerEvents(map, bounds);
    this.addMarkers(map, bounds);
  },

  methods: {
    ...mapActions([
      'setMapCenter',
      'setTripBounds',
      'toggleLocationHover',
      'setHoveredLocationId',
      'getActiveLocationId'
    ]),

    onMouseEnter(location) {
      this.setHoveredLocationId(location.sys.id);
    },

    onMouseLeave() {
      this.setHoveredLocationId(null);
      this.toggleLocationHover(false);
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
      this.locations.forEach((location, i) => {
        const markerRef = this.$refs.markers[i];
        new mapboxgl.Marker(markerRef, { offset: [0, -30] })
          .setLngLat([
            location.fields.coordinates.lon,
            location.fields.coordinates.lat
          ])
          .addTo(map);
        bounds.extend([
          location.fields.coordinates.lon,
          location.fields.coordinates.lat
        ]);
      });
      this.setTripBounds(bounds);
    }
  }
};
</script>
<style lang="scss">
@import '~mapbox-gl/dist/mapbox-gl.css';
.mapWrapper {
  width: 100vw;
  height: 100vh;
}

.marker {
  display: block;

  &:hover {
    z-index: 101;
  }

  &--visible {
    display: block;
  }

  &--hidden {
    display: none;
  }
}
</style>

