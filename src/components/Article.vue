<template>
  <div>
    <article class="m-article">
      <div class="m-article__bg" :style="`background-image:url('')`">
      </div>
      <h1></h1>
    </article>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { tween, styler } from 'popmotion';
export default {
  computed: {
    ...mapGetters(['getLocationsSorted', 'getHoveredLocationId', 'getActiveLocationId']),
    location() {
      if (!this.getLocationsSorted) return;
      return this.getLocationsSorted.find(item => item.sys.id === this.getHoveredLocationId);
    }
  },

  mounted() {
    console.log(this.getActiveLocationId);
  }
};
</script>
<style lang="scss" scoped>
.m-article {
  & {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(#fff, 0.9);
    height: 100vh;
    overflow-y: scroll;
  }
}
</style>


