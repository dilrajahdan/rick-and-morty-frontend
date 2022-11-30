<template>
  <article>
    <v-parallax
      :src="require('~/static/rm-prism.jpg')"
      height="500"
      class="pa-16 mb-6"
    >
      <v-row align="center">
        <v-col cols="12" md="4" offset-md="2" class="">
          <v-img
            class="logo"
            contain
            max-height="200"
            :src="require('~/static/icon-144x144.png')"
          ></v-img
        ></v-col>
        <v-col cols="12" sm="6" offset-sm="3" md="4" offset-md="0" class="">
          <h1
            class="site-title text-h2 text-md-h1 font-weight-bold text-center text-lg-left"
          >
            Friends of Rick and Morty
          </h1>
        </v-col>
      </v-row>
    </v-parallax>

    <v-container fluid class="px-16">
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
            class="mx-auto"
            color="deep-purple accent-1"
            light
            @click="getCharacter(character.id)"
          >
            <v-img height="300" lazy :src="character.image">
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-img
                    class="loader"
                    contain
                    max-height="200"
                    :src="require('~/static/icon-144x144.png')"
                  ></v-img>
                </v-row>
              </template>
            </v-img>
            <v-card-title :title="character.name" class="text-h5"
              ><span class="text-no-wrap text-truncate">{{
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

    <v-footer fixed app>
      <v-container>
        <v-row>
          <v-col>
            <!-- {{ paging }} -->

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
      :max-width="$vuetify.breakpoint.smAndDown ? '' : '900px'"
      transition="dialog-bottom-transition"
      scrollable
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
.site-title {
  -webkit-text-stroke: 2px #000;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-image: linear-gradient(45deg, #ffffff 10%, #ffff00 100%);
  text-shadow: #ff0000 4px 4px 0px;
}

.logo {
  animation: rotate 150s linear infinite;
  filter: invert(1);
}

.loader {
  animation: rotate 10s linear infinite;
  filter: invert(1);
  opacity: 0.2;
}

// rotate animation
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
