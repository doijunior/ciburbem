<template>
  <v-form ref="form">
    <v-layout row>
      <v-autocomplete
        v-model="tree"
        :items="treeOptions"
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
  props: ['treeOptions'],
  created(){
    console.log(this.props);
  },
  created(){

  },
  data(){
    return {
      tree: "",
      description: "",
      lat: undefined,
      lng: undefined
    }
  },
}
</script>
