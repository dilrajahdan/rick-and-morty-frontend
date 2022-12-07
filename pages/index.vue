<template>
  <article>
    <site-header></site-header>

    <!-- <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field> -->
    <!-- <transition-group
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @enter-cancelled="onEnterCancelled"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
      @leave-cancelled="onLeaveCancelled"
    > -->
    <character-list
      v-show="characters.length"
      key="characters"
      :characters="filteredCharacters"
      @selectedCharacter="getCharacter"
    ></character-list>
    <!-- </transition-group> -->

    <v-footer class="character-paging" fixed app>
      <v-container>
        <v-row>
          <v-col>
            <v-btn
              x-large
              block
              color="pink accent-3"
              :disabled="prevDisabled"
              @click="prevPage()"
              >Prev</v-btn
            >
          </v-col>

          <v-col>
            <v-btn
              x-large
              block
              color="pink accent-3"
              :disabled="nextDisabled"
              class=""
              @click="nextPage()"
              >Next</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-footer>

    <v-dialog
      v-if="characterDetail"
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :max-width="$vuetify.breakpoint.smAndDown ? '' : '600px'"
      scrollable
      hide-overlay
    >
      <character-popup
        :character="characterDetail"
        @close="closeDialog"
      ></character-popup>
    </v-dialog>
  </article>
</template>

<script>
// import gsap from 'gsap'
import { introScene } from '~/shared/animations.js'

export default {
  name: 'IndexPage',
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.get(
        'https://rickandmortyapi.com/api/character'
      )
      return { characters: data.results, paging: data.info }
    } catch (error) {
      console.warn('error with https://rickandmortyapi.com/', error)
    }
  },
  data: () => ({
    characterDetail: null,
    characters: [],
    paging: {},
    dialog: false,
    search: '',
  }),

  computed: {
    prevDisabled() {
      return !this.paging.prev
    },
    nextDisabled() {
      return !this.paging.next
    },

    filteredCharacters() {
      return this.characters.filter((character) => {
        return character.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },

  mounted() {
    introScene()
  },

  methods: {
    async nextPage() {
      const { data } = await this.$axios.get(this.paging.next)
      this.characters = data.results
      this.paging = data.info
    },
    async prevPage() {
      const { data } = await this.$axios.get(this.paging.prev)
      this.characters = data.results
      this.paging = data.info
    },

    async getCharacter(id) {
      console.log('getCharacter', id)
      try {
        const { data } = await this.$axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        )
        this.characterDetail = data
        this.dialog = true
      } catch (e) {
        console.warn('error: No character id', e)
      }
    },

    closeDialog() {
      this.dialog = false
    },
    // ============

    // import gsap from 'gsap'
    // called before the element is inserted into the DOM.
    // use this to set the "enter-from" state of the element
    // onBeforeEnter(el) {
    //   // const card = el.querySelector('.character-card')

    //   // console.log('onBeforeEnter', card)

    //   const tl = gsap.timeline()
    //   tl.restart(true)

    //   tl.set(el, {
    //     opacity: 0,
    //     rotate: 0,
    //   })
    // },

    // // called one frame after the element is inserted.
    // // use this to start the animation.
    // onEnter(el, done) {
    //   // call the done callback to indicate transition end
    //   // optional if used in combination with CSS
    //   const card = el.querySelector('.character-card')
    //   console.log('onEnter', card)
    //   // console.log('onEnter', el.getElementByClass('character-card'))

    //   const tl = gsap.timeline()
    //   // tl.clear().pause(0)

    //   tl.to(el, {
    //     opacity: 1,

    //     ease: 'power4.out',
    //     stagger: 1,
    //     rotate: gsap.utils.random(-5, 5),
    //     onComplete: done(),
    //   })

    //   // done()
    // },

    // // called when the enter transition has finished.
    // onAfterEnter(el) {},
    // onEnterCancelled(el) {},

    // // called before the leave hook.
    // // Most of the time, you should just use the leave hook.
    // onBeforeLeave(el) {},

    // // called when the leave transition starts.
    // // use this to start the leaving animation.
    // onLeave(el, done) {
    //   // call the done callback to indicate transition end
    //   // optional if used in combination with CSS
    //   console.log('onLeave', el)
    //   // const card = el.querySelector('.character-card')

    //   const tl = gsap.timeline()

    //   tl.to(el, {
    //     scale: 0,
    //     opacity: 0,
    //     y: 0,
    //     duration: 0.5,
    //     ease: 'power4.out',
    //     stagger: 1,
    //     rotate: gsap.utils.random(-5, 5),
    //     onComplete: done(),
    //   })

    //   // done()
    // },

    // // called when the leave transition has finished and the
    // // element has been removed from the DOM.
    // onAfterLeave(el) {},

    // // only available with v-show transitions
    // onLeaveCancelled(el) {},
  },
}
</script>

<style lang="scss">
@import '~/assets/utils.scss';

.site-header__logo {
  animation: rotate 150s linear infinite;
  filter: invert(1);
}

.v-application .character-card {
  &:hover {
    transition: all 155ms ease-in-out;

    .v-image__image {
      transition: all 555ms ease-in-out;
      background-size: 120%;
    }
  }

  .character-card__loader {
    animation: rotate 10s linear infinite;
    filter: invert(1);

    .v-image__image {
      background-size: auto;
    }
  }

  .v-image__image {
    background-size: 110%;
    transition: all 325ms ease-in-out;
  }
}
</style>
