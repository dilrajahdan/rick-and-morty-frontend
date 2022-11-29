<template>
  <v-row justify="center" align="center">
    <v-col
      v-for="character in characters"
      :key="character.id"
      cols="12"
      sm="8"
      md="3"
    >
      <v-card class="mx-auto" :to="`/character/${character.id}`">
        <v-img :src="character.image" height="200px"></v-img>
        <v-card-title class="headline">{{ character.name }}</v-card-title>
        <v-card-text>
          {{ character.species }}
        </v-card-text>
      </v-card>
    </v-col>

    <!-- {{ paging }} -->

    <v-btn @click="prevPage()">Prev</v-btn>
    <v-btn @click="nextPage()">Next</v-btn>
  </v-row>
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
