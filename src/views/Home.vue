<template>
  <div class="home">
    <mapbox-map 
      v-if="!loading"
      :mapStyle="mapStyle"
      :locations="locations"
      :map-options="{
        style: mapStyle,
        center: mapCenter,
        zoom: 3
      }"
      @map-load="mapLoaded"
      @map-click="mapClicked"
    />
    <p v-else>loading</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import MapboxMap from '@/components/MapboxMap';

export default {
  name: 'Home',

  components: {
    MapboxMap,
  },

  computed: {
    ...mapState(['loading', 'mapStyle', 'locations']),
    ...mapGetters(['mapCenter']),
  },

  methods: {
    ...mapActions(['getMapStyle', 'getLocations', 'toggleLoading']),

    mapLoaded(map) {
      console.log(map);
    },

    mapClicked(map, e) {
      if (e.originalEvent.target.tagName !== 'CANVAS') {
        map.flyTo({
          center: this.mapCenter,
          zoom: 11,
        });
      }
    },
  },
  mounted() {
    Promise.all([this.getMapStyle(), this.getLocations()]).then(() => {
      this.toggleLoading();
    });
  },
};
</script>