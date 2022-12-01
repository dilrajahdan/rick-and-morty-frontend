<template>
  <v-container fluid class="character-list px-4">
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
          outlined
          class="character-card mx-auto"
          color="deep-purple accent-1"
          light
          :data-id="character.id"
          @click="setCharacter(character.id)"
        >
          <v-img height="300" lazy :src="character.image">
            <template #placeholder>
              <v-row class="fill-height" align="center" justify="center">
                <img
                  height="144"
                  width="144"
                  class="character-card__loader"
                  :src="require('~/static/icon-144x144.png')"
                />
              </v-row>
            </template>
          </v-img>
          <v-card-title :title="character.name" class="text-h5"
            ><span class="text-no-wrap text-truncate funky-text--alt">{{
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
</template>

<script>
export default {
  name: 'CharacterList',
  props: {
    characters: {
      type: Array,
      required: true,
    },
  },
  methods: {
    setCharacter(id) {
      console.log('setCharacter', id)
      this.$emit('selectedCharacter', id)
    },
  },
}
</script>
