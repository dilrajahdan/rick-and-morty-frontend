<template>
  <article>
    <v-parallax
      :src="require('~/static/rm-prism.jpg')"
      height="500"
      class="pa-16 mb-6"
    >
      <v-row align="center">
        <v-col cols="12" sm="6" offset-sm="3" lg="4" offset-lg="2">
          <h1 class="text-h2 font-weight-bold text-center">
            Rick and Morty Character Finder
          </h1>
        </v-col>
        <v-col cols="12" lg="4">
          <v-img
            class="logo"
            contain
            max-height="200"
            :src="require('~/static/icon-144x144.png')"
          ></v-img
        ></v-col>
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
            <v-img height="300" lazy :src="character.image"></v-img>
            <v-card-title class="headline">{{ character.name }}</v-card-title>
            <v-card-text>
              {{ character.species }}
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
    <v-dialog v-if="character" v-model="dialog" max-width="900px">
      <character-popup :character="character"></character-popup>
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
    character: null,
    characters: [],
    paging: {},
    dialog: false,
  }),
  // set up computed properties to get the next and previous disabled state
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
    // get character details
    async getCharacter(id) {
      const { data } = await this.$axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      )
      this.character = data
      this.dialog = true
    },
  },
}
</script>

<style lang="scss">
.logo {
  animation: rotate 10s linear infinite;
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
