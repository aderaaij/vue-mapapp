<template>
  <div @mouseenter="setActive(location)">
    <h3>{{ location.properties.title }}</h3>
    <img :src="location.properties.imageUrl">
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    location: {
      required: true,
      type: Object,
    },
  },

  methods: {
    ...mapActions(['setCenter', 'toggleLocationHover', 'setExcerptId']),
    setActive(location) {
      this.toggleLocationHover(location.geometry.coordinates);
      this.setExcerptId(location.properties.id);
    },
  },
};
</script>

<style>

</style>
