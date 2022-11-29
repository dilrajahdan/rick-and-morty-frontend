<template>
  <!-- <v-dialog  v-model="character" max-width="900px"> -->
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
  <!-- </v-dialog> -->
</template>

<script>
export default {
  name: 'CharacterPopup',
  props: {
    character: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
}
</script>
