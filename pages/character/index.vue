<template>
    <v-row justify="center" align="center">
        <v-col
        v-for="character in characters"
        :key="character.id"
        cols="12"
        sm="8"
        md="3"
        >
        <v-card class="mx-auto">
            <v-img :src="character.image" height="200px"></v-img>
            <v-card-title class="headline">{{ character.name }}</v-card-title>
            <v-card-text>
            {{ character.species }}
            </v-card-text>
        </v-card>
        </v-col>
    </v-row>

</template>


<script>
// https://rickandmortyapi.com/api/character
export default {
  name: 'CharacterPage',
    async asyncData({ $axios, params }) {
        const { data } = await $axios.get(
        `https://rickandmortyapi.com/api/character/${params.id}`
        )
        return { character: data }
    },
    
    data: () => ({
        character: {},
    }),
    // Get the character id from the route params
    mounted() {
        console.log(this.$route.params.id)
    },
}
