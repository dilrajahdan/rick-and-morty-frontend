<template>
  <v-container key="container" fluid class="character-list px-4 px-sm-8">
    <!-- <v-row key="characters" justify="center" align="center"> -->
    <transition-group
      tag="v-row"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @enter-cancelled="onEnterCancelled"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
      @leave-cancelled="onLeaveCancelled"
    >
      <v-col
        v-for="character in characters"
        :key="character.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <v-card
          tile
          outlined
          class="character-card mx-auto"
          color="deep-purple accent-1"
          light
          :data-id="character.id"
          @click="setCharacter(character.id)"
        >
          <v-img height="300" lazy :src="character.image">
            <!-- <template #placeholder>
              <v-row class="fill-height" align="center" justify="center">
                <img
                  height="144"
                  width="144"
                  class="character-card__loader"
                  :src="require('~/static/icon-144x144.png')"
                />
              </v-row>
            </template> -->
          </v-img>
          <v-card-title :title="character.name" class="text-h5"
            ><span class="text-no-wrap text-truncate funky-text--alt">{{
              character.name
            }}</span></v-card-title
          >

          <v-card-text>
            <v-chip
              label
              :color="
                character.species === 'Human'
                  ? 'deep-purple accent-2'
                  : 'teal accent-3'
              "
              :text-color="character.species === 'Human' ? 'white' : ''"
              class=""
              >{{ character.species }}</v-chip
            >
          </v-card-text>
        </v-card>
      </v-col>
    </transition-group>
    <!-- </v-row> -->
  </v-container>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'CharacterList',
  props: {
    characters: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tl: null, // timeline
    }
  },
  methods: {
    setCharacter(id) {
      console.log('setCharacter', id)
      this.$emit('selectedCharacter', id)
    },

    // called before the element is inserted into the DOM.
    // use this to set the "enter-from" state of the element
    onBeforeEnter(el) {
      // const card = el.querySelector('.character-card')
      // console.log('onBeforeEnter', card)
    },

    // called one frame after the element is inserted.
    // use this to start the animation.
    onEnter(el, done) {
      // call the done callback to indicate transition end
      // optional if used in combination with CSS

      this.tl = gsap.timeline()

      // ***
      // const q = gsap.utils.selector(this.$el);
      // const cards = gsap.utils.toArray('.character-card')
      // console.log('cards', cards)

      this.tl.set(el, {
        opacity: 0,
        rotate: 0,
      })

      this.tl.to(el, {
        opacity: 1,
        // scale: 1,
        rotate: gsap.utils.random(-4, 4),
        ease: 'power4.out',
        duration: 0.2,
        onComplete: done(),
      })

      // done()
    },

    // called when the enter transition has finished.
    onAfterEnter(el) {},
    onEnterCancelled(el) {},

    // called before the leave hook.
    // Most of the time, you should just use the leave hook.
    onBeforeLeave(el) {},

    // called when the leave transition starts.
    // use this to start the leaving animation.
    onLeave(el, done) {
      // call the done callback to indicate transition end
      // optional if used in combination with CSS
      // console.log('onLeave', el)
      // const card = el.querySelector('.character-card')

      this.tl = gsap.timeline()

      this.tl.to(el, {
        // scale: 0.5,
        opacity: 0,
        rotate: 17,
        duration: 0.2,
        ease: 'power4.out',
        // stagger: 0.1,

        onComplete() {
          // console.log('onLeave DONE', this)
          done()
        },
      })

      // done()
    },

    // called when the leave transition has finished and the
    // element has been removed from the DOM.
    onAfterLeave(el) {
      // console.log('onAfterLeave - Elemnt removed ', this)
    },

    // only available with v-show transitions
    onLeaveCancelled(el) {},
  },
}
</script>
