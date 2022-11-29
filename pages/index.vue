<template>
  <article>
    <v-sheet color="pink" class="pa-16 mb-6">
      <h1 class="text-h2 text-center">Rick and Morty</h1>
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
          <v-card class="mx-auto" @click="getCharacter(character.id)">
            <v-img :src="character.image"></v-img>
            <v-card-title class="headline">{{ character.name }}</v-card-title>
            <v-card-text>
              {{ character.species }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <!-- {{ paging }} -->

          <v-btn
            x-large
            color="pink"
            :disabled="!paging.prev"
            @click="prevPage()"
            >Prev</v-btn
          >
          <v-btn
            x-large
            color="pink"
            :disabled="!paging.next"
            class="ml-6"
            @click="nextPage()"
            >Next</v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <!-- Dialog with character details -->
    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title class="headline">{{ character.name }}</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-img :src="character.image" height="200px"></v-img>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <!-- get name, status, species, gender, origin,
last known location, image, number of episodes appearances -->

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
    character: [],
    characters: [],
    paging: {},
    dialog: false,
  }),
  // setup paging
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
