<template>
  <v-app>
    <v-toolbar app>Ciburbem Londrina</v-toolbar>
    <v-content>
      <v-container fluid>
        <HomeDataAnalytics :qntTrees="treeOptions.length" :qntMarkers="trees.length"/>
        <HomeForm :treeOptions="treeOptions" @update="filter"/>
      </v-container>
      <HomeMap :trees="trees"/>
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
        let mark = item.content["$t"].replace(/\w+:/g, "").split(',');
        return [Number(mark[0]), Number(mark[1]), mark[2].trim(), mark[3].trim()];
      }));
    });
    this.treeOptions = this.trees.map( (tree) => {
      return tree[2];
    }).filter( (tree, i, trees) => {
      if(trees.indexOf(tree) == i){
        return tree;
      }
    });
  },
  data(){
    return {
      tree: "",
      description: "",
      trees: [],
      treeOptions: []
    }
  },
  methods: {
    filter(val){
      this.trees = this.trees.filter((tree) => {
        if(tree[2] == val)
          return tree;
      });
    }
  }
}
</script>
