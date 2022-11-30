<template>
  <article>
    <site-header></site-header>
    <!-- <v-parallax
      :src="require('~/static/rm-prism.jpg')"
      height="500"
      class="site-header pa-16 mb-6"
    >
      <v-row align="center">
        <v-col
          cols="12"
          md="4"
          offset-md="2"
          class="site-header__logo-container"
        >
          <v-img
            class="site-header__logo"
            contain
            :max-height="$vuetify.breakpoint.smAndDown ? 144 : 288"
            :src="require('~/static/icon-144x144.png')"
          ></v-img
        ></v-col>
        <v-col cols="12" sm="6" offset-sm="3" md="4" offset-md="0" class="">
          <h1
            class="site-header__title text-h2 funky-text text-md-h1 font-weight-bold text-center text-lg-left"
          >
            Friends of Rick and Morty
          </h1>
        </v-col>
      </v-row>
    </v-parallax> -->

    <v-container fluid class="character-list px-16">
      <v-row justify="center" align="center">
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
            @click="getCharacter(character.id)"
          >
            <v-img height="300" lazy :src="character.image">
              <template #placeholder>
                <v-row class="fill-height" align="center" justify="center">
                  <img
                    height="144"
                    width="144"
                    class="character-card__loader"
                    :src="require('~/static/icon-144x144.png')"
                  />
                </v-row>
              </template>
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
      </v-row>
    </v-container>

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

    <!-- Dialog with character details -->
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
// https://rickandmortyapi.com/api/character
import gsap from 'gsap'

export default {
  name: 'IndexPage',
  async asyncData({ $axios }) {
    const { data } = await $axios.get(
      'https://rickandmortyapi.com/api/character'
    )
    return { characters: data.results, paging: data.info }
  },
  data: () => ({
    characterDetail: null,
    characters: [],
    paging: {},
    dialog: false,
  }),

  computed: {
    prevDisabled() {
      return !this.paging.prev
    },
    nextDisabled() {
      return !this.paging.next
    },
  },

  mounted() {
    const tl = gsap.timeline()

    // this.splitText('.site-header__title')

    // init site-header, character-card and footer by setting opacity to 0
    tl.set('.site-header .v-parallax__image-container', { opacity: 0 })
    tl.set('.site-header__logo-container', {
      opacity: 0,
      scale: 3,
      rotate: -180,
      transformOrigin: 'center center',
    })
    tl.set('.site-header__title', { opacity: 0, y: '100%' })

    tl.set('.character-card', {
      opacity: 0,
      rotation: gsap.utils.wrap([-2, 2]),
    })
    tl.set('.character-paging', { opacity: 0, y: 100 })
    tl.set('.character-paging .v-btn', { opacity: 0, y: '100%' })

    // animate intro
    tl.to('.site-header__logo-container', {
      opacity: 1,
      duration: 2,
      ease: 'bounce.out',
      scale: 1,
      rotate: 0,
    })

    tl.to('.site-header__title', {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: 'elastic.out(1, 0.3)',
    })

    tl.to(
      '.site-header .v-parallax__image-container',
      {
        opacity: 1,
        duration: 5,
        ease: 'power2.out',
      },
      '-=1'
    )

    // animate character cards in staggered fashion and randomly rotate from -5deg to 5deg
    tl.to(
      '.character-card',
      {
        opacity: 1,
        ease: 'power4.outIn',
        rotation: 0,
        stagger: {
          from: 'edges',
          grid: [1, 0],
          amount: 0.5,
          duration: 0.5,
        },
      },
      '-=4'
    )

    tl.to(
      '.character-paging',
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: 'power4.outIn',
      },
      '-=3'
    )
    tl.to(
      '.character-paging .v-btn',
      {
        opacity: 1,
        y: 0,
        ease: 'power4.outIn',
        stagger: 0.2,
      },
      '-=3'
    )
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
      const { data } = await this.$axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      )
      this.characterDetail = data
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
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
