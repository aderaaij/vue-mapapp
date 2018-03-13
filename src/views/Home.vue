<template>
  <div class="home">
    <display-map />
  </div>
</template>

<script>
// @ is an alias to /src
import DisplayMap from '@/components/DisplayMap';

export default {
  name: 'home',
  components: {
    DisplayMap,
  },
};
</script>
