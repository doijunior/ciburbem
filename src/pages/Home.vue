<template>
  <v-app>
    <v-toolbar app>Ciburbem Londrina</v-toolbar>
    <v-content>
      <v-container fluid>
        <h1>Ciburbem Londrina</h1>
        <p>Um mapeamento de árvores frutíferas em vias públicas na cidade de Londrina</p>
          <v-alert :value="true" type="warning">
            Sistema em versão de pré-lançamento
          </v-alert>
          <HomeForm :treeOptions="treeOptions" @update="filter"/>
          <HomeMap :trees="treesFiltered"/>
          <!-- {{treeIo}} -->
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import HomeForm from '../components/Home/Form.vue';
import HomeMap from '../components/Home/Map.vue';

export default {
  name: 'Home',
  components: {
    HomeForm,
    HomeMap
  },
  async beforeCreate(){
    this.trees = await this.$http.get(this.$config.database)
    .then(response => {
      return (response.data.feed.entry.map((item) => {
        return this.formatMarker(item);
      }));
    });
    this.treesFiltered = this.trees;
    this.treeOptions = this.treeOptions.concat(
      await this.trees.map( (tree) => {
        return tree[2];
      })
    );
  },
  data(){
    return {
      tree: "",
      description: "",
      trees: [],
      treeOptions: [""],
      treesFiltered: []
    }
  },
  methods: {
    formatMarker(spreadSheetItem){
      let mark = spreadSheetItem.content["$t"].replace(/\w+:/g, "").split(',');
      return [Number(mark[0]), Number(mark[1]), mark[2].trim(), mark[3].trim()];

    },
    filter(val){
      if(val == ""){
        this.treesFiltered = this.trees;
      } else {
        this.treesFiltered = this.trees.filter((tree) => {
          if(tree[2] == val)
            return tree;
        });
      }
    }
  }
}
</script>
