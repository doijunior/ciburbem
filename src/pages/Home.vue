<template>
  <v-app>
    <v-toolbar app>Ciburbem Londrina</v-toolbar>
    <v-content>
      <v-container fluid>
        <HomeDataAnalytics :qntTrees="species" :qntMarkers="trees.length"/>
        <HomeForm :treeOptions="treeOptions" @update="filter"/>
      </v-container>
      <HomeMap :trees="treesFiltered"/>
    </v-content>
  </v-app>
</template>

<script>
import HomeDataAnalytics from '../components/Home/DataAnalytics.vue';
import HomeForm from '../components/Home/Form.vue';
import HomeMap from '../components/Home/Map.vue';

export default {
  name: 'Home',
  components: {
    HomeDataAnalytics,
    HomeForm,
    HomeMap
  },
  async beforeCreate(){
    this.trees = await this.$http.get(this.$config.database)
    .then(response => {
      return (response.data.feed.entry.map((item) => {
        let content = item.content["$t"];
        let description = content.substr( content.indexOf("descr:") + 6, content.length);
        let mark = content.replace(/\w+:/g, "").split(',');
        return [Number(mark[0]), Number(mark[1]), mark[2].trim(), description.trim()];
      }));
    });
    this.treeOptions = ["Todas"].concat(
      this.trees.map( (tree) => {
        return tree[2];
      }).filter( (tree, i, trees) => {
        if(trees.indexOf(tree) == i){
          return tree;
        }
      })
    );

    this.treesFiltered = this.trees;
    this.species = this.treeOptions.length - 1;
  },
  data(){
    return {
      tree: "",
      description: "",
      trees: [],
      treeOptions: [],
      treesFiltered: [],
      species: 0
    }
  },
  methods: {
    filter(val){
      this.treesFiltered = this.trees.filter((tree) => {
        console.log(val)
        if(val == "Todas")
          return tree;
        if(tree[2] == val)
          return tree;
      });
    }
  }
}
</script>
