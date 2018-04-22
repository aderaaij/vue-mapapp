<template>
  <div class="locationsList">
    <header class='locationsList__header'>
      <h2 @click="onClick">Central-America trip 2016/2017</h2>
    </header>
    <div ref="slider">
      <div
        v-for="location in locationsSortedByDate" 
        :key="location.sys.id">
        <locations-list-item :location="location" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LocationsListItem from './LocationsListItem';
import Flickity from 'flickity';

export default {
  components: {
    LocationsListItem
  },

  props: {
    locations: {
      required: true,
      type: Array
    }
  },

  computed: {
    ...mapGetters(['locationsSortedByDate'])
  },
  methods: {
    onClick() {
      console.log('click');
    },
    startSlider() {
      const flkty = new Flickity(this.$refs.slider, {
        // options
        cellAlign: 'left',
        contain: true
      });
    }
  },
  mounted() {
    this.startSlider();
  }
};
</script>

<style lang="scss" scoped>
@import '~flickity/css/flickity.css';
.locationsList {
  & {
    position: fixed;
    bottom: 0;
    left: 0;
    background: rgba(#fff, 1);
    height: 250px;
    width: 100vw;
    display: none;
    flex-direction: column;
    overflow: hidden;
  }

  &__header {
    position: relative;
    font-size: 1rem;
    z-index: 101;
    background: #fff;
    padding: 0.5em 2em;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

    h2 {
      font-size: 18px;
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    overflow-y: scroll;
    display: flex;
  }
}
</style>
