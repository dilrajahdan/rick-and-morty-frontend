<template>
  <article>
    <site-header></site-header>

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
