<template>
  <div class="locationsList">
    <header class='locationsList__header'>
      <h2 @click="onClick">Central-America trip 2016/2017</h2>
    </header>
    <ul>
      <li 
        v-for="location in locations" 
        :key="location.sys.id">
        <locations-list-item :location="location" />
      </li>
    </ul>
  </div>
</template>

<script>
import LocationsListItem from './LocationsListItem';
export default {
  components: {
    LocationsListItem,
  },

  props: {
    locations: {
      required: true,
      type: Array,
    },
  },
  methods: {
    onClick() {
      console.log('click');
    },
  },
};
</script>

<style lang="scss" scoped>
.locationsList {
  & {
    position: fixed;
    top: 0;
    right: 0;
    background: rgba(#fff, 0.7);
    height: 100vh;
    width: 30vw;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__header {
    position: relative;
    z-index: 101;
    background: #fff;
    padding: 1em 2em;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    overflow-y: scroll;
  }
}
</style>
