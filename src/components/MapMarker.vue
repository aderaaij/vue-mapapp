<template>
  
  <div   
    :v-bind="getHoveredLocation(location.id)"
    class='e-marker'
    @click="markerClickHandler"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave">
    <svg
      class="e-marker__svg"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 72 130.7"
      width="36">
      <defs>
        <clipPath id="circle">
          <path d="M36,97.4c15,0,27.3-12.2,27.3-27.3c0-15-12.2-27.3-27.3-27.3S8.7,55.1,8.7,70.2S21,97.4,36,97.4z"/>
        </clipPath>
      </defs>
      <path
        fill="currentColor"
        class="e-marker__marker"
        d="M60.7,45.4C54.1,38.8,45.3,35.2,36,35.2c-9.3,0-18.1,3.6-24.7,10.3C4.6,52,1,60.8,1,70.2c0,6.3,1.5,11.6,4.6,16.7
      C8.4,91.3,12.1,95,16,98.9c7.3,7.2,15.5,15.4,19,30.5c0.1,0.5,0.5,0.8,1,0.8s0.9-0.3,1-0.8c3.5-15.1,11.7-23.3,19-30.5
      c3.9-3.9,7.6-7.6,10.4-12.1c3.1-5.1,4.6-10.3,4.6-16.7C71,60.8,67.4,52,60.7,45.4z M36,97.4c-15,0-27.3-12.2-27.3-27.3
      S21,42.9,36,42.9c15,0,27.3,12.2,27.3,27.3C63.3,85.2,51,97.4,36,97.4z"/>
      <path
        fill="transparent"
        class="e-marker__circle"
        d="M36,97.4c15,0,27.3-12.2,27.3-27.3c0-15-12.2-27.3-27.3-27.3S8.7,55.1,8.7,70.2S21,97.4,36,97.4z"/>
      <path
        v-if="iconType === 'city' || iconType === 'village'"
        class="e-marker__icon e-marker__icon--city"
        d="M41.1,68.7V58.5L36,53.4l-5.1,5.1v3.4H20.8v23.7h30.5V68.7H41.1z M27.5,82.2h-3.4v-3.4h3.4V82.2z M27.5,75.4h-3.4
    V72h3.4V75.4z M27.5,68.7h-3.4v-3.4h3.4V68.7z M37.7,82.2h-3.4v-3.4h3.4V82.2z M37.7,75.4h-3.4V72h3.4V75.4z M37.7,68.7h-3.4v-3.4
    h3.4V68.7z M37.7,61.9h-3.4v-3.4h3.4V61.9z M47.9,82.2h-3.4v-3.4h3.4V82.2z M47.9,75.4h-3.4V72h3.4V75.4z"/>
      <path
        v-else-if="iconType === 'beach'"
        class="e-marker__icon e-marker__icon--beach"
        d="M38.3,74.8l2.9-2.9L54,84.8l-2.9,2.9L38.3,74.8z M46.8,63.3l5.7-5.7c-7.9-7.9-20.7-7.9-28.6,0C31.8,55,40.6,57.1,46.8,63.3z
      M23.9,57.6c-7.9,7.9-7.9,20.7,0,28.6l5.7-5.7C23.4,74.2,21.3,65.5,23.9,57.6z M23.9,57.6L23.9,57.6c-0.8,6,2.3,13.8,8.6,20.1
      L44,66.2C37.7,59.9,30,56.8,23.9,57.6z"/>
      <path
        v-else-if="iconType === 'mountain' || iconType == 'volcano'"
        class="e-marker__icon e-marker__icon--mountain"
        d="M39.5,58.8l-6.6,8.8l5,6.7l-2.8,2.1c-3-3.9-7.9-10.5-7.9-10.5l-10.5,14h38.6L39.5,58.8z"/>
      <g
        v-else-if="iconType === 'jungle'"
        class="e-marker__icon e-marker__icon--jungle">
        <path 
          d="M50.1,81.9c-1.7-2.8-2.8-6.1-5.6-8c1.6-0.2,3.2,0.1,4.6-0.5c2.3-0.9,3.2-3.9,2.7-6.3c-0.5-2.5-2.1-4.5-3.7-6.5
      c-0.8-1.1-1.6-2.1-2.5-3.2c-1.3,2.9,0.1,6.6-1.4,9.4c-0.3,0.5-0.8,1-1.4,0.8c-0.6-0.3-0.3-1.3,0-1.9c1.4-2.5,1.8-5.6,1.3-8.4
      c-0.1-0.5-0.3-1.1-0.6-1.5c-0.3-0.4-0.8-0.7-1.3-0.9c-1.5-0.8-3.1-1.3-4.8-1.6c1.3,1.6,1.6,3.9,1.8,6c0.2,1.7,0.3,3.7-0.9,4.9
      c-0.6-0.3-1.1-0.9-1.1-1.6c-0.1-0.7,0-1.4,0.1-2.1c0.3-2,0.3-4.2-0.9-5.9c-1.5-2.4-5.1-3.1-7.5-1.5c1.9,1.6,3.3,3.8,3.9,6.2
      c0.1,0.6,0.1,1.6-0.6,1.6c-0.6,0.1-0.9-0.6-1.2-1.1c-0.6-1.5-1.1-3-1.7-4.4c-0.3-0.6-0.5-1.3-1.1-1.8c-1.3-0.9-3-0.1-4.5,0.3
      C23,54,22,53.9,21.2,53.7c0.7,1.6,0.8,3.5,0.4,5.3c-0.3,0.9-0.6,1.8-0.8,2.8c-0.2,0.9-0.1,2,0.5,2.8c0.8,1,2.3,1.1,3.7,0.9
      c2.6-0.3,5.3-1.1,7.7-0.4c-0.3,0.9-1.1,1.5-2,1.8c-3.5,1.6-7.8,1.8-11.5,0.4c1.3,0.7,2.8,1.4,3.5,2.8c0.3,0.6,0.4,1.3,0.8,1.9
      c0.5,0.9,1.5,1.5,2,2.4c0.4,0.6,0.6,1.3,0.9,2c0.4,0.6,0.9,1.3,1.6,1.3c0.5,0.1,0.9-0.2,1.4-0.4c2.3-1,4.7-1.8,7.2-2.5
      c0.6-0.2,1.5-0.3,1.8,0.4c-0.1,0.5-0.6,0.8-1.1,1.1c-2.7,1.3-5.5,2.3-8.4,3.1c1.8,1.3,3.7,2.5,5.8,3.3c2.1,0.8,4.5,0.9,6.5-0.1
      c2.6-1.2,4.2-4.2,3.7-7c1.7,1.6,2.8,3.8,3.9,5.9c1.1,2.1,2.2,4.1,3.2,6.2c0.2-0.4,0.4-0.7,0.6-1.1C52,85.1,51,83.4,50.1,81.9z
      M33.2,71.4c-0.5,0.3-1.1,0.4-1.6,0.6c-0.8,0.2-1.5,0.3-2.3,0.3c1.6-0.7,3.2-1.3,4.8-1.9h-0.1c0.1-0.1,0.3,0,0.4,0.1
      C34.2,71,33.7,71.2,33.2,71.4z"/>
      </g>
      <g 
        class="e-marker__spinner"
        opacity="0"
        :class="{'e-marker__spinner--active': getPanningStatus}">
        <path 
          class="e-marker__spinner-spin"
          fill="currentColor" 
          d="M45.36,61a13.42,13.42,0,1,0,3.48,12.9H45.36A10,10,0,1,1,35.9,60.5a9.89,9.89,0,0,1,7.1,3l-5.42,5.3H49.29V57.07Z" 
          transform="translate(0 0)"/>
        <!-- <path 
          d="M8.15,8.13h18.7V26.82H8.15Z" 
          fill="none"/> -->
        <!-- <path 
          d="M0 0h24v24H0z" 
          fill="none"/> -->
      </g>
      <image
        opacity="0"
        class="e-marker__image"
        width="100%"
        height="100%"
        clip-path="url(#circle)"
        :xlink:href="`${this.image}?fit=thumb&f=top_left&h=150&w=150&r=150`" />
      <text
        opacity="0"
        class="e-marker__text"
        transform="matrix(1 0 0 1 0 13.9998)">
        <tspan
          x="50%"
          :y="[splitTitle.last ? '0' : '13']" >
          {{ splitTitle.first }}
        </tspan>
        <tspan
          x="50%"
          y="13" >
          {{ splitTitle.last }}
        </tspan>
      </text>
    </svg>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import pose from 'popmotion-pose';
import { spring, tween } from 'popmotion';
import { titleSplit } from '@/helpers';

export default {
  props: {
    location: {
      required: true,
      type: Object
    }
  },

  computed: {
    ...mapGetters(['getHoveredLocation', 'getImage', 'getPanningStatus']),

    splitTitle() {
      return titleSplit(this.location.title);
    },

    image() {
      return this.getImage(this.location.featuredImage.id);
    },

    parentItem() {
      return this.$el.parentNode;
    },

    iconType() {
      return this.location.locationType;
    },

    markerPoser() {
      const props = {
        initialPose: 'closed',
        open: {
          scale: 3,
          delayChildren: 300,
          staggerChildren: 100,
          transition: ({ from, to }) => {
            return spring({
              from,
              to,
              stiffness: 300,
              damping: 10
            });
          }
        },
        closed: { scale: 1 }
      };

      const childProps = {
        icon: {
          open: { scale: 0 },
          closed: { scale: 1 }
        },
        image: {
          open: { opacity: 1 },
          loading: { opacity: 0 },
          closed: { opacity: 0 }
        },
        text: {
          open: { opacity: 1 },
          closed: { opacity: 0 }
        },
        spinner: {
          open: { rotate: 0 },
          loading: {
            rotate: 360,
            transition: ({ from, to }) => {
              console.log(from);
              return tween({ from, to, loop: Infinity });
            }
          },
          closed: { rotate: 0 }
        }
      };

      const markerPose = pose(this.$el, props);
      Object.keys(childProps).forEach(key =>
        markerPose.addChild(this.$el.querySelector(`.e-marker__${key}`), childProps[key])
      );
      return markerPose;
    }
  },

  methods: {
    ...mapActions([
      'setMapCenter',
      'setHoveredLocationId',
      'toggleLocationHover',
      'setActiveLocationId',
      'togglePanToMarker',
      'toggleActiveArticle',
      'setZoom'
    ]),

    onMouseEnter() {
      this.setHoveredLocationId(this.location.id);
    },

    onMouseLeave() {
      this.setHoveredLocationId(null);
      this.toggleLocationHover(false);
    },

    markerClickHandler() {
      this.$router.push(`/${this.location.slug}`);
      this.togglePanToMarker(true);
      this.toggleActiveArticle(true);
      this.setMapCenter([this.location.coordinates.lon, this.location.coordinates.lat]);
      this.setActiveLocationId(this.location.id);
      this.setZoom(11);
      this.toggleLocationHover(true);
    }
  },

  watch: {
    getPanningStatus() {
      if (!this.getPanningStatus) {
        this.markerPoser.set('closed');
        this.parentItem.style.zIndex = '';
      }
    }
  },
  updated() {
    if (this.getHoveredLocation(this.location.id)) {
      this.$emit('marker-offset', this.$el);
      this.markerPoser.set('open');
      this.parentItem.style.zIndex = 501;
      if (this.getPanningStatus) {
        this.markerPoser.set('loading');
      }
    } else {
      if (!this.getPanningStatus) {
        this.markerPoser.set('closed');
        this.parentItem.style.zIndex = '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.e-marker {
  & {
    transform-origin: bottom center;
  }

  &__spinner {
    opacity: 0;

    &--active {
      opacity: 1;
    }
  }

  &__svg {
    display: block;
    fill: #fff;
    color: #fff;
    cursor: pointer;
  }

  &__circle {
    display: none;
  }

  &__text {
    font-size: 11px;
    font-family: 'Source Sans Pro', sans-serif;
    text-shadow: 2px 2px #000;
    font-weight: 700;
    text-align: center;
    color: #fff;
    fill: #fff;
    transform-origin: 50% 50%;
    alignment-baseline: middle;
    text-anchor: middle;
  }
}
</style>
