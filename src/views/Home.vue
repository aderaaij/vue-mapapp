<template>
  <div class="home">
    <div v-if="getDataLoaded" >
      <mapbox-map
        :locations="locations"
        :map-options="{
          style: mapStyle,
          center: getCenter,
          zoom: 3
        }"
        @map-load="onMapLoaded"
        @map-click="onMapClicked"
      />
      <locations-list :locations="locations.features"/>    
    </div>
    <p v-else>loading</p>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

import MapboxMap from '@/components/MapboxMap';
import LocationsList from '@/components/LocationsList';

export default {
  name: 'Home',

  components: {
    MapboxMap,
    LocationsList,
  },

  computed: {
    ...mapState(['mapStyle', 'locations', 'locationHover']),
    ...mapGetters([
      'getCenter',
      'getTripBounds',
      'getZoom',
      'getDataLoaded',
      'getMapLoaded',
    ]),

    initLoaded() {
      if (this.getDataLoaded && this.getMapLoaded) {
        return true;
      }
      return false;
    },
  },

  methods: {
    ...mapActions([
      'setMapStyle',
      'setLocations',
      'toggleDataLoaded',
      'toggleMapLoaded',
      'toggleLocationHover',
      'togglePanToMarker',
    ]),

    onMapLoaded(map) {
      this.map = map;
      this.toggleMapLoaded();
      this.fitBounds(map);
    },

    fitBounds(map) {
      map.fitBounds(this.getTripBounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
      });
    },

    flyTo() {
      this.map.flyTo({
        center: this.getCenter,
      });
    },

    onMapClicked(map, e) {
      if (e.originalEvent.target.tagName !== 'CANVAS') {
        this.togglePanToMarker(true);
        map.flyTo({
          center: this.getCenter,
          zoom: 11,
        });
      }
    },
  },
  created() {
    Promise.all([this.setMapStyle(), this.setLocations()]).then(() => {
      this.toggleDataLoaded();
    });
  },
  updated() {
    if (this.initLoaded && this.locationHover) {
      this.map.flyTo({
        center: this.getCenter,
        speed: 0.7,
        zoom: this.getZoom,
      });
      this.map.on('moveend', e => {
        this.toggleLocationHover(false);
      });
    }
  },
};
</script>