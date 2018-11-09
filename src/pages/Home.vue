<template>
  <v-app>
    <v-toolbar app>Ciburbem Londrina</v-toolbar>
    <v-content>
      <v-container fluid>
          <HomeForm/>
          <HomeMap/>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import HomeForm from '../components/Home/Form.vue';
import HomeMap from '../components/Home/Map.vue'

export default {
  name: 'Home',
  components: {
    HomeForm,
    HomeMap
  },
  data(){
    return {
      tree: "",
      description: "",
      trees: [
        "Amoreira", "Laranjeira"
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
