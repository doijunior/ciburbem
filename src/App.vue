<template>
  <!-- <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
  <v-app>
    <v-toolbar app>Ciburbem Londrina</v-toolbar>
    <v-content>
      <v-container fluid>
        <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <v-form>
          <v-text-field
            v-model="name"
            :counter="10"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="E-mail"
            required
          ></v-text-field>
        </v-form>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data(){
    return {
      name: "",
      email: ""
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
