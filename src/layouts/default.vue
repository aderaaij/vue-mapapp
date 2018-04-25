<template>
  <div>
    <router-view />
    <div 
      :class="getPanningStatus ? 'home--panning' : ''"
      class="home">
      <div v-if="getDataLoaded" >
        <mapbox-map
          :locations="getLocations"
          :map-options="{
            style: getMapStyle,
            center: getCenter,
            zoom: getZoom
          }"
          @map-load="onMapLoaded"
          @map-click="onMapClicked"
          @map-moveend="onMoveEnd"
        />
        <!-- <locations-list :locations="getLocations"/> -->
      </div>
      <p v-else>loading</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

import MapboxMap from '@/components/MapboxMap';
import LocationsList from '@/components/LocationsList';

export default {
  name: 'Default',

  components: {
    MapboxMap,
    LocationsList
  },

  computed: {
    ...mapGetters([
      'getCenter',
      'getTripBounds',
      'getZoom',
      'getDataLoaded',
      'getMapLoaded',
      'getLocations',
      'getMapStyle',
      'getIfActiveArticle',
      'getPanningStatus',
      'getActiveLocationId',
      'locationHover'
    ]),

    initLoaded() {
      if (this.getDataLoaded && this.getMapLoaded) {
        return true;
      }
      return false;
    }
  },

  methods: {
    ...mapActions([
      'setMapStyle',
      'setLocations',
      'toggleDataLoaded',
      'toggleMapLoaded',
      'toggleLocationHover',
      'togglePanToMarker',
      'setActiveLocationid',
      'toggleActiveArticle',
      'toggleShowArticle'
    ]),

    onMapLoaded(map) {
      this.map = map;
      this.toggleMapLoaded();
      this.fitBounds(map);
    },

    onMoveEnd(map, e) {},

    fitBounds(map) {
      map.fitBounds(this.getTripBounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 }
      });
    },

    onMapClicked(map, e) {
      if (e.originalEvent.target.tagName !== 'CANVAS') {
        this.togglePanToMarker(true);
        map.flyTo({
          center: this.getCenter,
          zoom: 11
        });
      }
    },

    disableMap() {
      this.map.scrollZoom.disable();
      this.map.boxZoom.disable();
      this.map.dragPan.disable();
      this.map.dragRotate.disable();
      this.map.doubleClickZoom.disable();
    },

    enableMap() {
      this.map.scrollZoom.enable();
      this.map.boxZoom.enable();
      this.map.dragPan.enable();
      this.map.dragRotate.enable();
      this.map.doubleClickZoom.enable();
    },

    activateArticle() {
      this.togglePanToMarker(false);
      this.toggleShowArticle(true);
      this.map.off('moveend', this.activateArticle);
      this.enableMap();
    }
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
        zoom: this.getZoom
      });
      this.disableMap();
      this.map.on('moveend', e => {
        this.toggleLocationHover(false);
      });
    }

    if (this.getPanningStatus && this.getActiveLocationId !== null) {
      this.disableMap();
      this.map.on('moveend', this.activateArticle);
      this.toggleLocationHover(false);
    }
  }
};
</script>

<style lang="scss">
@import '~normalize.css/normalize.css';
@import url('https://use.typekit.net/skr1kbv.css');

h1,
h2,
h3,
h4,
h5 {
  font-family: 'brandon-grotesque', sans-serif;
}
.home {
  &--panning {
    cursor: wait;
    #map {
      pointer-events: none;
      cursor: wait;
    }
  }
}
</style>
