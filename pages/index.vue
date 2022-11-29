<template>
  <article>
    <v-sheet color="pink" class="pa-16 mb-6">
      <h1 class="text-h2 text-center">Rick and Morty</h1>
    </v-sheet>

    <v-container>
      <v-row justify="center" align="center">
        <v-col
          v-for="character in characters"
          :key="character.id"
          cols="12"
          sm="8"
          md="3"
        >
          <v-card class="mx-auto" :to="`/character/${character.id}`">
            <!-- <v-parallax :src="character.image" height="200px"> -->
            <!-- <v-card-title class="headline white--text">{{
            character.name
          }}</v-card-title> -->
            <v-img :src="character.image" height="200px"></v-img>
            <v-card-title class="headline">{{ character.name }}</v-card-title>
            <v-card-text>
              {{ character.species }}
            </v-card-text>
            <!-- </v-parallax> -->
          </v-card>
        </v-col>

        <!-- {{ paging }} -->

        <v-btn @click="prevPage()">Prev</v-btn>
        <v-btn @click="nextPage()">Next</v-btn>
      </v-row>
    </v-container>
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
    characters: [],
    paging: {},
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
  },
}
</script>
