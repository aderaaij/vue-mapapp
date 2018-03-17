<template>
  <div 
    @mouseenter="setActive(location)"
    class="listItem"
    :class="[isActive ? 'listItem--active' : '']">
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
    ...mapGetters(['getExcerptId']),

    isActive() {
      if (this.location.properties.id === this.getExcerptId) {
        return true;
      }
      return false;
    },

    images() {
      return this.location.properties.images;
    },
  },

  methods: {
    ...mapActions(['setCenter', 'toggleLocationHover', 'setExcerptId']),
    setActive(location) {
      this.toggleLocationHover({
        active: true,
        coordinates: location.geometry.coordinates,
      });
      this.setExcerptId(location.properties.id);
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
