<template>
  <v-form ref="form">
    <v-autocomplete
      v-model="treeFilter"
      :items="treeOptions"
      :label="'Árvore'"
      prepend-icon="fas fa-search"
      @change="teste"
    >
      <v-slide-x-reverse-transition
        slot="append-outer"
        mode="out-in"
      >
      </v-slide-x-reverse-transition>
    </v-autocomplete>

    <v-expansion-panel>
      <v-expansion-panel-content>
        <div slot="header">Cadastrar Ponto</div>
        <v-card>
          <v-layout row>
            <v-autocomplete
              v-model="tree"
              :items="treeOptions"
              :label="'Árvore'"
              v-if="!other"
            >
              <v-slide-x-reverse-transition
                slot="append-outer"
                mode="out-in"
              >
              </v-slide-x-reverse-transition>
            </v-autocomplete>
            <v-text-field
              v-model="tree"
              label="Árvore"
              v-if="other"
            ></v-text-field>
            <v-checkbox
              v-model="other"
              label="Outra"
            ></v-checkbox>
            <v-text-field
              v-model="description"
              label="Descrição"
              required
            ></v-text-field>
            <v-btn color="success">Salvar</v-btn>
          </v-layout>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
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
      treeFilter: "",
      description: "",
      lat: undefined,
      lng: undefined,
      other: false
    }
  },
  methods: {
    teste(){
      console.log("OI");
      this.$emit('update', this.treeFilter);
    }
  }
}
</script>
