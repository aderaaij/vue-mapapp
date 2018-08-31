<template>
  <div>
    <transition
      :css="false"
      ref="tw"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave">
      <article 
        v-if="showArticle"
        class="m-article">
        <div class="m-article__topBar">
          <button 
            @click="close()"
            class='m-article__close'>
            <icon-close />
          </button>
        </div>
        <div 
          class="m-article__bg"
          :style="`background-image:url(${imageUrl}?fit=thumb&w=1600&h=900)`">
          <div class="m-article__title">
            <h1>{{ location.title }}</h1>
            <span v-if="trip">{{ trip.fields.title }}</span>
          </div>
        </div>
        <div 
          v-if="location.content"
          class="m-article__content">
          <vue-markdown 
            :prerender="val => onPreRender(val)"
            :postrender="val => onPostRender(val)"
            class="entry-content">{{ location.content }}</vue-markdown>
        </div>
      </article>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VueMarkdown from 'vue-markdown';
import pose from 'popmotion-pose';

import IconClose from '@/assets/icons/close.svg';

export default {
  name: 'Article',

  components: {
    VueMarkdown,
    IconClose
  },

  data: () => ({
    elem: null,
    imageLoaded: false,
    poserConfig: {
      initialPose: 'closed',
      open: { opacity: 1, scale: 1, delayChildren: 300 },
      closed: { opacity: 0, scale: 0.8 }
    }
  }),

  computed: {
    ...mapGetters({
      location: 'currentLocation',
      getImage: 'getImage',
      showArticle: 'showArticle',
      currentTrip: 'currentTrip'
    }),

    imageUrl() {
      return this.getImage(this.location.featuredImage.id);
    },

    trip() {
      return this.location.trip ? this.currentTrip(this.location.trip.id) : null;
    }
  },

  methods: {
    ...mapActions([
      'togglePanToMarker',
      'toggleShowArticle',
      'toggleActiveArticle',
      'setActiveLocationId'
    ]),

    onPreRender(val) {
      return val;
    },

    onPostRender(val) {
      const el = document.createElement('div');
      el.innerHTML = val;
      const images = Array.from(el.querySelectorAll('img'));
      images.forEach(img => {
        const p = img.closest('p');
        const figure = document.createElement('figure');
        figure.classList.add('entry-content__imageContainer');
        figure.appendChild(img);
        el.insertBefore(figure, p);
        el.removeChild(p);
      });

      // Remove empty paragraphs
      const ps = Array.from(el.querySelectorAll('p'));
      ps.forEach(p => (p.innerText === '' ? el.removeChild(p) : p));
      return el.innerHTML;
    },

    close() {
      this.setActiveLocationId(null);
      this.toggleShowArticle(false);
      this.toggleActiveArticle();
      this.togglePanToMarker(false);
      this.$router.push('/');
    },

    poser(currentPose) {
      this.poserConfig.initialPose = currentPose;
      const header = this.elem.querySelector('.m-article__title');
      const masterPose = pose(this.elem, this.poserConfig);
      masterPose.addChild(header, {
        initialPose: 'closed',
        closed: { scale: 0, opacity: 0 },
        open: { scale: 1, opacity: 1 }
      });
      return masterPose;
    },

    onBeforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = 'scale(0.8)';
      this.elem = el;
    },

    onEnter(el, done) {
      this.poser('closed')
        .set('open')
        .then(() => done());
    },

    onBeforeLeave() {},

    onLeave(el, done) {
      this.elem = el;
      this.poser('open')
        .set('closed')
        .then(() => {
          done();
        });
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

  &__topBar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    border-bottom: 1px solid rgba(#fff, 0.6);
    display: grid;
    justify-content: end;
    align-items: center;
  }

  &__close {
    cursor: pointer;
    margin: 0;
    background: transparent;
    border: none;
  }

  &__bg {
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    margin-bottom: 3rem;
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

    span {
      font-family: 'garamond-premier-pro-display';
      font-style: italic;
      font-size: 1.5em;
    }

    h1 {
      font-size: 6em;
      line-height: 1.1;
      margin: 0;
      font-weight: 700;
    }
  }

  &__content {
    display: grid;
    width: 100%;

    img {
      display: block;
      max-width: 100%;
    }
  }
}

.entry-content {
  display: grid;
  grid-template-columns:
    [full-start] minmax(1rem, 1fr) 1fr
    [main-start] minmax(0, 40em) [main-end]
    1fr minmax(1rem, 1fr) [full-end];
  font-family: 'source-sans-pro', sans-serif;

  p {
    line-height: 1.5;
    font-size: 1.25rem;
  }
  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 2.5rem;
  }
  h3 {
    font-size: 2rem;
    margin-bottom: 0;
  }

  figure {
    margin: 0;
  }

  figcaption {
    font-family: 'garamond-premier-pro-display';
    font-size: 1.25rem;
    line-height: 1.5em;
  }

  > *:not(.entry-content__imageContainer) {
    grid-column: main;
  }

  &__imageContainer {
    grid-column: main-start / full-end;
    display: grid;
    padding-right: 1rem;
  }
}
</style>


