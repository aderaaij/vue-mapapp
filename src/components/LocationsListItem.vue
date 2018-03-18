<template>
  <div 
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="onClick"
    class="listItem"
    :class="[getHoveredLocation(this.location.properties.id) ? 'listItem--active' : '']">
    <h3>{{ location.properties.title }}</h3>
    <img :src="images.medium">
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  props: {
    location: {
      required: true,
      type: Object,
    },
  },

  computed: {
    ...mapState(['activeLocationId']),
    ...mapGetters(['getHoveredLocation', 'getActiveLocationId']),

    images() {
      return this.location.properties.images;
    },
  },

  methods: {
    ...mapActions([
      'setCenter',
      'setZoom',
      'toggleLocationHover',
      'setHoveredLocationId',
      'togglePanToMarker',
      'setActiveLocationId',
    ]),

    onMouseEnter() {
      if (!this.getActiveLocationId) {
        this.toggleLocationHover(true);
        this.setHoveredLocationId(this.location.properties.id);
        this.setCenter(this.location.geometry.coordinates);
        this.setZoom(5);
      }
    },

    onMouseLeave() {
      if (!this.getActiveLocationId) {
        this.setHoveredLocationId(null);
        this.toggleLocationHover(false);
      }
    },

    onClick() {
      if (!this.getActiveLocationId) {
        this.setActiveLocationId(this.location.properties.id);
        this.setCenter(this.location.geometry.coordinates);
        this.setZoom(11);
        this.toggleLocationHover(true);
        this.togglePanToMarker(true);
      }
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