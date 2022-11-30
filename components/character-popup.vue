<template>
  <v-card>
    <v-btn
      class="close-button"
      x-large
      icon
      color="pink accent-3"
      @click="close"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-img light :src="character.image" height="500px" class="mb-6">
      <v-container class="fill-height pb-0">
        <v-row align="end" class="fill-height">
          <v-card-text class="text-h2 font-weight-bold deep-purple accent-1">{{
            character.name
          }}</v-card-text>
        </v-row>
      </v-container>
    </v-img>

    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          <p class="text-h5"><strong>Name:</strong> {{ character.name }}</p>
          <p class="text-h5">
            <strong>Species:</strong> {{ character.species }}
          </p>
          <p class="text-h5"><strong>Status:</strong> {{ character.status }}</p>
          <p class="text-h5"><strong>Gender:</strong> {{ character.gender }}</p>
        </v-col>
        <v-col cols="12" sm="6">
          <p class="text-h5">
            <strong>Origin:</strong> {{ character.origin.name }}
          </p>
          <p class="text-h5">
            <strong>Location:</strong> {{ character.location.name }}
          </p>

          <p class="text-h5">
            <!-- <strong>Watch Featuring Episode</strong> -->

            <v-select
              label="Watch Featuring Episode"
              :items="character.episode"
            ></v-select>
          </p>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-btn x-large block color="pink accent-3" @click="close">Close</v-btn>
      </v-container>
    </v-card-actions>
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
  // get array of episodes and return array of episode names
  methods: {
    getEpisodes() {
      const episodes = this.character.episode
      const episodeNames = []
      episodes.forEach((episode) => {
        episodeNames.push(episode.name)
      })
      return episodeNames
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss">
.close-button {
  position: absolute;
  top: 1em;
  right: 1em;
  z-index: 10;
}
</style>
