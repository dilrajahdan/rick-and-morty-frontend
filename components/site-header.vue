<template>
  <v-parallax
    :src="require('~/static/rm-prism.jpg')"
    height="500"
    class="site-header pa-16 mb-6"
  >
    <v-row align="center">
      <v-col cols="12" md="4" offset-md="2" class="site-header__logo-container">
        <v-img
          class="site-header__logo"
          contain
          :max-height="$vuetify.breakpoint.smAndDown ? 144 : 288"
          :src="require('~/static/icon-144x144.png')"
        ></v-img
      ></v-col>
      <v-col cols="12" sm="6" offset-sm="3" md="4" offset-md="0" class="">
        <h1
          class="site-header__title text-h2 funky-text text-md-h1 font-weight-bold text-center text-lg-left"
        >
          Friends of Rick and Morty
        </h1>
      </v-col>
    </v-row>
  </v-parallax>
</template>
