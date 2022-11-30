<template>
  <v-card>
    <v-img
      :src="character.image"
      height="500px"
      gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
    >
      <v-container class="fill-height">
        <v-row align="end" class="fill-height">
          <v-card-text class="text-h1 font-weight-bold">{{
            character.name
          }}</v-card-text>
        </v-row>
      </v-container>
    </v-img>

    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="4"> </v-col>
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
