<template>
  <v-form ref="form">
    <v-layout row>
      <v-autocomplete
        v-model="tree"
        :items="trees"
        :label="'Árvore'"
        prepend-icon="fas fa-search"
      >
        <v-slide-x-reverse-transition
          slot="append-outer"
          mode="out-in"
        >
        </v-slide-x-reverse-transition>
      </v-autocomplete>
      <v-text-field
        v-model="description"
        label="Descrição"
        required
      ></v-text-field>
      <v-btn color="success">Salvar</v-btn>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  name: 'home-form',
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
