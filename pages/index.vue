<template>
  <article>
    <v-sheet color="deep-purple darken-3" class="pa-16 mb-6">
      <v-row>
        <v-col cols="12" sm="6" offset-sm="3">
          <h1 class="text-h2 text-center">Rick and Morty Character Finder</h1>
        </v-col>
        <v-col cols="12" class="">
          <v-img
            contain
            max-height="200"
            :src="require('~/static/icon-144x144.png')"
          ></v-img
        ></v-col>
      </v-row>
    </v-sheet>

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
          <v-card tile class="mx-auto" @click="getCharacter(character.id)">
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
      <v-row>
        <v-col>
          <!-- {{ paging }} -->

          <v-btn
            x-large
            block
            color="pink"
            :disabled="prevDisabled"
            @click="prevPage()"
            >Prev</v-btn
          >
        </v-col>

        <v-col>
          <v-btn
            x-large
            block
            color="pink"
            :disabled="nextDisabled"
            class=""
            @click="nextPage()"
            >Next</v-btn
          >
        </v-col>
      </v-row>
    </v-footer>

    <!-- Dialog with character details -->
    <v-dialog v-if="character" v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title class="headline">{{ character.name }}</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-img :src="character.image" height="200px"></v-img>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <p><strong>Name:</strong> {{ character.name }}</p>
              <p><strong>Species:</strong> {{ character.species }}</p>
              <p><strong>Status:</strong> {{ character.status }}</p>
              <p><strong>Gender:</strong> {{ character.gender }}</p>
              <p><strong>Origin:</strong> {{ character.origin.name }}</p>
              <p><strong>Location:</strong> {{ character.location.name }}</p>
              <p><strong>Img:</strong> {{ character.image }}</p>
              <p><strong>Episodes:</strong> {{ character.episode }}</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
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
