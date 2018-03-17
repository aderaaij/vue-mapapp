<template>
  <div class="home">
    <div v-if="dataLoaded" >
      <mapbox-map 
        :mapStyle="mapStyle"
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
    ...mapState([
      'dataLoaded',
      'mapLoaded',
      'mapStyle',
      'locations',
      'locationHover',
    ]),
    ...mapGetters(['getCenter']),
  },

  methods: {
    ...mapActions([
      'setMapStyle',
      'setLocations',
      'toggleDataLoaded',
      'toggleMapLoaded',
      'toggleLocationHover',
    ]),

    onMapLoaded(map) {
      this.toggleMapLoaded();
      this.map = map;
    },

    flyTo() {
      this.map.flyTo({
        center: this.getCenter,
      });
    },

    onMapClicked(map, e) {
      if (e.originalEvent.target.tagName !== 'CANVAS') {
        map.flyTo({
          center: this.getCenter,
          zoom: 11,
        });
      }
    },
  },
  mounted() {
    Promise.all([this.setMapStyle(), this.setLocations()]).then(() => {
      this.toggleDataLoaded();
    });
  },
  updated() {
    if (this.dataLoaded && this.mapLoaded && this.locationHover) {
      this.map.flyTo({
        center: this.getCenter,
        speed: 0.5,
        // zoom: 6,
      });
      this.map.on('moveend', e => {
        this.toggleLocationHover(false);
      });
    }
  },
};
</script>