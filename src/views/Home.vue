<template>
  <div class="home">
    <display-map 
      v-if="!loading"
      :mapStyle="mapStyle"
      :locations="locations"
    />
    <p v-else>loading</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DisplayMap from '@/components/DisplayMap';

export default {
  name: 'Home',
  components: {
    DisplayMap,
  },
  computed: {
    ...mapState(['loading', 'mapStyle', 'locations']),
  },
  methods: {
    ...mapActions(['getMapStyle', 'getLocations', 'toggleLoading']),
  },
  mounted() {
    Promise.all([this.getMapStyle(), this.getLocations()]).then(() => {
      this.toggleLoading();
      // const bounds = new mapboxgl.LngLatBounds();
      // console.log(this.locations.features);
      // this.locations.features.foreach(item => {
      //   const markerEl = document.createElement('div');
      //   markerEl.innerHTML = '📌';
      //   markerEl.style.cursor = 'pointer';
      //   new mapboxgl.Marker(markerEl, { offset: [12, -10] })
      //     .setLngLat(marker.geometry.coordinates)
      //     .addTo(map);
      //   bounds.extend(marker.geometry.coordinates);
      // });
    });
  },
};
</script>
