<template>
  <div class="home">
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
      <locations-list :locations="getLocations"/>
      <!-- <location-article/>   -->
      <Article v-if="getIfActiveArticle"/>
    </div>
    <p v-else>loading</p>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

import MapboxMap from '@/components/MapboxMap';
import Article from '@/components/Article';
import LocationsList from '@/components/LocationsList';

export default {
  name: 'Home',

  components: {
    MapboxMap,
    LocationsList,
    Article,
  },

  computed: {
    ...mapState(['locationHover', 'isPanningToMarker', 'isActiveArticle']),
    ...mapGetters([
      'getCenter',
      'getTripBounds',
      'getZoom',
      'getDataLoaded',
      'getMapLoaded',
      'getLocations',
      'getMapStyle',
      'getIfActiveArticle',
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
      'setActiveArticleId',
      'toggleActiveArticle',
    ]),

    onMapLoaded(map) {
      this.map = map;
      this.toggleMapLoaded();
      this.fitBounds(map);
    },

    onMoveEnd(map, e) {
      if (this.isPanningToMarker) {
        this.togglePanToMarker(false);
      }
    },

    fitBounds(map) {
      map.fitBounds(this.getTripBounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
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
      this.map.scrollZoom.disable();
      this.map.boxZoom.disable();
      this.map.dragPan.disable();
      this.map.dragRotate.disable();
      this.map.doubleClickZoom.disable();
      this.map.on('moveend', e => {
        this.toggleLocationHover(false);
      });
    }
    if (this.isPanningToMarker) {
      this.map.on('moveend', () => {
        this.setActiveArticleId(this.getActiveLocationId);
        this.toggleActiveArticle();
      });
    }
  },
};
</script>