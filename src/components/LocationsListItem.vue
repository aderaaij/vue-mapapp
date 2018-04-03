<template>
  <div 
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="onClick"
    class="listItem"
    :class="[getHoveredLocation(id) ? 'listItem--active' : '']">
    <header class="listItem__header">
      <h3>{{ fields.title }}</h3>
      <span>{{ arrivalDate }}</span>
    </header>
    <img :src="`${this.getImageUrl}?fit=thumb&w=500&h=300`">
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { format, compareAsc } from 'date-fns';
export default {
  props: {
    location: {
      required: true,
      type: Object
    }
  },

  computed: {
    ...mapState(['activeLocationId']),
    ...mapGetters(['getHoveredLocation', 'getActiveLocationId', 'getImage']),

    fields() {
      return this.location.fields;
    },

    id() {
      return this.location.sys.id;
    },

    coordinates() {
      return [this.location.fields.coordinates.lon, this.location.fields.coordinates.lat];
    },

    getImageUrl() {
      return this.getImage(this.location.fields.featuredImage.sys.id);
    },

    images() {
      return this.location.properties.images;
    },

    arrivalDate() {
      return format(new Date(this.location.fields.arrivalDate), 'DD/MM/YYYY');
    }
  },

  methods: {
    ...mapActions([
      'setMapCenter',
      'setZoom',
      'toggleLocationHover',
      'setHoveredLocationId',
      'togglePanToMarker',
      'setActiveLocationId'
    ]),

    onMouseEnter() {
      if (!this.getActiveLocationId) {
        this.toggleLocationHover(true);
        this.setHoveredLocationId(this.id);
        this.setMapCenter(this.coordinates);
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
        console.log(this.id);
        this.setActiveLocationId(this.id);
        this.setMapCenter(this.coordinates);
        this.setZoom(11);
        this.toggleLocationHover(true);
        this.togglePanToMarker(true);
      }
    }
  }
};
</script>
<style>
.is-selected {
  background: blue;
}
</style>

<style lang="scss" scoped>
.listItem {
  & {
    transition: background 0.3s ease;
    padding: 1em;
    height: 150px;
  }

  &.is-selected,
  &--active {
    background: #ccc;
  }

  img {
    display: block;
    width: 200px;
    height: auto;
  }

  &__header {
    // display: flex;
  }

  h3 {
    margin: 0 0;
    font-size: 16px;
  }
  span {
    font-size: 12px;
  }
}
</style>