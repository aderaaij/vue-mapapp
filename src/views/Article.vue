<template>
  <div>
    <transition name="slide-fade">
      <article 
        v-if="showArticle && imageLoaded"
        class="m-article">
        <button 
          @click="close()"
          class='m-article__close'>
          <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
        <div class="m-article__bg" :style="`background-image:url(${imageUrl}?fit=thumb&w=1600&h=900)`">
          <div class="m-article__title">
            <h1>{{ currentLocation.fields.title }}</h1>
          </div>
        </div>
      </article>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { tween, styler } from 'popmotion';

export default {
  name: 'Article',

  data: () => ({
    imageLoaded: false
  }),

  computed: {
    ...mapGetters(['currentLocation', 'getImage', 'showArticle']),

    imageUrl() {
      return this.getImage(this.currentLocation.fields.featuredImage.sys.id);
    }
  },

  methods: {
    ...mapActions([
      'togglePanToMarker',
      'toggleShowArticle',
      'toggleActiveArticle',
      'setActiveLocationId'
    ]),

    close() {
      this.toggleActiveArticle();
      this.toggleShowArticle(false);
      this.togglePanToMarker(false);
      this.setActiveLocationId(null);
      this.$router.push('/');
    },

    checkImageLoaded() {
      var img = new Image();
      img.onload = () => {
        this.imageLoaded = true;
      };
      img.src = `${this.imageUrl}?fit=thumb&w=1600&h=900`;
    }
  },

  mounted() {
    this.checkImageLoaded();
  }
};
</script>
<style lang="scss">
.m-article {
  & {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(#fff, 0.9);
    height: 100vh;
    overflow-y: scroll;
    z-index: 901;
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
    border: none;
  }

  &__bg {
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    display: grid;
    grid-template-columns: 2em repeat(4, 1fr) 2em;
    grid-template-rows: repeat(6, 1fr);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
      z-index: 1;
      pointer-events: none;
    }
  }

  &__title {
    position: relative;
    z-index: 101;
    grid-column: 2 / 6;
    grid-row: 5 / 6;
    display: grid;
    align-items: center;
    text-align: center;
    color: #fff;

    h1 {
      font-size: 6em;
      line-height: 1.1;
      margin: 0;
      font-weight: 700;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.7s ease;
  opacity: 1;
  transform: scale(1);
  transform-origin: center center;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>


