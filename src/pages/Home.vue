<template>
  <v-app>
    <v-toolbar app>Ciburbem Londrina</v-toolbar>
    <v-content>
      <v-container fluid>
          <HomeForm :treeOptions="treeOptions"/>
          <HomeMap/>
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
        // let marker = L.marker([Number(mark[0]), Number(mark[1])]).addTo(self.map).bindPopup("<h1>"+mark[2]+"</h1>"+mark[3]);
        // return mark;
      }));
    });
    this.treeOptions = await this.trees.map( (tree) => {
      return tree[2];
    });
    console.log(this.treeOptions);
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
