<template>
  <v-card class="character-popup" outlined>
    <v-btn
      class="close-button"
      x-large
      icon
      color="pink accent-3"
      outlined
      @click="close"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <v-img
      light
      :src="character.image"
      :height="$vuetify.breakpoint.smAndDown ? 300 : 400"
      class="mb-6"
      position="50% 30%"
      contain
    >
      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-img
            class="loader fill-height"
            contain
            max-height="200"
            :src="require('~/static/icon-144x144.png')"
          ></v-img>
        </v-row>
      </template>
      <v-container class="fill-height pb-0">
        <v-row align="end" class="fill-height">
          <v-card-text
            class="text-h2 font-weight-bold deep-purple accent-2 text-center"
          >
            <span class="funky-text">{{ character.name }}</span>
          </v-card-text>
        </v-row>
      </v-container>
    </v-img>

    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
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
              @change="openLink($event)"
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
    openLink(url) {
      window.open(url, '_blank')
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/utils.scss';

.close-button {
  position: absolute;
  top: 1em;
  right: 1em;
  z-index: 10;
}

.character-popup {
  border: 4px #7c4dff solid !important;
}
</style>
