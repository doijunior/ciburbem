<template>
  <v-container fluid grid-list-md>
  <v-layout row wrap >
     <v-flex md6>
      <v-card color="cyan darken-2" class="white--text">
         <v-layout>
           <v-card-title  class="headline-card">
             <v-flex xs5  class="text-xs-center">
               <v-icon x-large dark>fa-map-marker</v-icon>
             </v-flex>
             <v-flex xs7>
               <div class="headline">{{qntMarkers}}</div>
               <div>é o número de árvores registradas</div>
             </v-flex>
           </v-card-title>
         </v-layout>
       </v-card>
    </v-flex>

    <v-flex md6>
      <v-card color="cyan darken-2" class="white--text">
         <v-layout>
           <v-card-title class="headline-card">
             <v-flex xs5  class="text-xs-center">
               <v-icon x-large dark>fa-tree</v-icon>
             </v-flex>
             <v-flex xs7>
               <div class="headline">{{qntTrees}}</div>
               <div>é a quantidade de frutas distintas cadastradas</div>
             </v-flex>
           </v-card-title>
         </v-layout>
       </v-card>
     </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import L from 'leaflet';

export default {
  name: 'HomeDataAnalytics',
  props: ["qntTrees", "qntMarkers"],
  data () {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="sass">
  .headline-card
    flex-grow: 1
</style>
