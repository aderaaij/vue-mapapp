<template>
  <div class="home">
    <mapbox-map 
      v-if="!loading"
      :mapStyle="mapStyle"
      :locations="locations"
    />
    <p v-else>loading</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MapboxMap from '@/components/MapboxMap';

export default {
  name: 'Home',
  components: {
    MapboxMap,
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
    });
  },
};
</script>