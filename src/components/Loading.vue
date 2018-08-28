<template>
  <div class="loader-wrap">
    <icon-earth class="loader"/>
  </div>
</template>

<script>
import IconEarth from '@/assets/icons/earth.svg';
export default {
  components: {
    IconEarth
  }
};
</script>

<style lang="scss">
.loader-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loader {
  width: 120px;
  height: 120px;
  animation: rotating 3s linear infinite;
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
