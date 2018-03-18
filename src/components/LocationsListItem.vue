<template>
  <div 
    @mouseenter="setActive(location)"
    @mouseleave="setInActive(location)"
    @click="activateItem(location)"
    class="listItem"
    :class="[getHoveredLocation(this.location.properties.id) ? 'listItem--active' : '']">
    <h3>{{ location.properties.title }}</h3>
    <img :src="images.medium">
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  props: {
    location: {
      required: true,
      type: Object,
    },
  },

  computed: {
    ...mapGetters(['getHoveredLocation']),

    images() {
      return this.location.properties.images;
    },
  },

  methods: {
    ...mapActions(['setCenter', 'toggleLocationHover', 'setHoveredLocationId']),
    setActive(location) {
      this.toggleLocationHover({
        active: true,
        coordinates: location.geometry.coordinates,
        zoom: 6,
      });
      this.setHoveredLocationId(location.properties.id);
    },
    setInActive(location) {
      this.setHoveredLocationId(null);
      this.toggleLocationHover({
        active: false,
        coordinates: [],
      });
    },
    activateItem(location) {
      console.log(this.location.geometry.coordinates);
      this.setCenter(this.location.geometry.coordinates);
      this.toggleLocationHover({
        active: true,
        coordinates: location.geometry.coordinates,
        zoom: 11,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.listItem {
  & {
    transition: background 0.3s ease;
    padding: 2em;
  }

  &--active {
    background: #ccc;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  h3 {
    margin: 0 0 1em;
  }
}
</style>


</style>
