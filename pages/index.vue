<template>
  <article>
    <site-header></site-header>

    <character-list
      :characters="characters"
      @selectedCharacter="getCharacter"
    ></character-list>

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
import { setScene } from '~/shared/animations.js'

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
    setScene()
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
