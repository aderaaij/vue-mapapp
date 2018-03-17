<template>
  <div class="locationsList">
    <ul>
      <li 
        v-for="location in locations" 
        :key="location.properties.id"
        >
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
    overflow-y: scroll;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>
