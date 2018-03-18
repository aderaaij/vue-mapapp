<template>
  <div 
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="onClick"
    class="listItem"
    :class="[getHoveredLocation(sys.id) ? 'listItem--active' : '']">
    <h3>{{ fields.title }}</h3>
    <!-- <img :src="images.medium"> -->
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

    fields() {
      return this.location.fields;
    },

    sys() {
      return this.location.sys;
    },

    coordinates() {
      return [
        this.location.fields.coordinates.lon,
        this.location.fields.coordinates.lat,
      ];
    },

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
        this.setHoveredLocationId(this.location.sys.id);
        this.setCenter([
          this.fields.coordinates.lon,
          this.fields.coordinates.lat,
        ]);
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
        this.setActiveLocationId(this.location.sys.id);
        this.setCenter([
          this.location.fields.coordinates.lon,
          this.location.fields.coordinates.lat,
        ]);
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