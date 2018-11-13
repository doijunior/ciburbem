<template>
  <v-app>
    <v-toolbar app>Ciburbem Londrina</v-toolbar>
    <v-content>
      <v-container fluid>
          <HomeForm :treeOptions="treeOptions" @update="filter"/>
          <HomeMap :trees="trees"/>
          <!-- {{treeIo}} -->
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
  async beforeCreate(){
    this.trees = await this.$http.get('https://spreadsheets.google.com/feeds/list/1bFy086G8dGg6tzK4fNyI8I6LKXWuc9gjXlXNXxJDRdY/od6/public/basic?alt=json')
    .then(response => {
      return (response.data.feed.entry.map((item) => {
        let mark = item.content["$t"].replace(/\w+:/g, "").split(',');
        return [Number(mark[0]), Number(mark[1]), mark[2], mark[3]];
      }));
    });
    this.treeOptions = await this.trees.map( (tree) => {
      return tree[2];
    });
  },
  data(){
    return {
      tree: "",
      description: "",
      trees: [
        "Amoreira", "Laranjeira"
      ],
      treeOptions: []
    }
  },
  methods: {
    filter(val){
      console.log("x", val);
      this.trees = this.trees.map((tree) => {
        if(tree[2] == val)
          return tree;
      })
    }
  }
}
</script>
