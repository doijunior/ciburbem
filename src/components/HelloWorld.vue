<template>
  <div class="hello">
    <div v-if="marker">
      Latitude: {{this.lat}},
      Longitude: {{this.lng}}
      <label>Árvore:</label>
      <input type='text' v-model='mainTag'/>
      <label>Descrição complementar:</label>
      <input type='text' v-model='description'/>
      <button v-on:click='save'>Adicionar</button>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
import axios from 'axios';
import leaflet from 'leaflet';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      info: null,
      mainTag: "",
      description: "",
      marker: undefined,
      map: undefined
    }
  },
  mounted () {
    this.map = L.map('map');
    this.map .setView([-23.31455,-51.17181], 14);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map );
    var newMarker;
    let self = this;

    this.map.on('click', function(e) {
      if(newMarker)
        self.map.removeLayer(newMarker);
      newMarker = L.marker(e.latlng).addTo(self.map);
      console.log("antes    "+self.marker);
      self.marker = newMarker;
      console.log(self.marker);
    });
    axios
      .get('https://spreadsheets.google.com/feeds/list/1bFy086G8dGg6tzK4fNyI8I6LKXWuc9gjXlXNXxJDRdY/od6/public/basic?alt=json')
      .then(response => {
        self.points = (response.data.feed.entry.map((item) => {
          let mark = item.content["$t"].replace(/\w+:/g, "").split(',');
          console.log([Number(mark[0]), Number(mark[1])]);
          let marker = L.marker([Number(mark[0]), Number(mark[1])]).addTo(self.map).bindPopup(mark[2]);
          return mark;
        }));
      });

    // axios
    //   .get('http://ciburbem.firebaseapp.com/trees')
    //   .then(response => {
    //     let trees = response.data;
    //
    //     for(let id in trees){
    //       let tree = trees[id];
    //       var greenIcon = L.icon({
    //           iconUrl: 'icon.png',
    //
    //           iconSize:     [64, 64], // size of the icon
    //           iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    //           shadowAnchor: [4, 62],  // the same for the shadow
    //           popupAnchor:  [13, -76] // point from which the popup should open relative to the iconAnchor
    //       });
    //       L.marker([tree.lat, tree.lng], {icon: greenIcon}).addTo(mymap).bindPopup("<p>"+tree.mainTag+"</p>"+tree.description);
    //     }
    //   }).catch(error => {
    //     console.log(error);
    //   })
  },
  computed: {
    lat: {
      get: function(){
        if(this.marker)
          return this.marker.getLatLng().lat;
        else {
          return "";
        }
      }
    },
    lng: {
      get: function(){
        if(this.marker)
          return this.marker.getLatLng().lng;
        else {
          return "";
        }
      }
    },
  },
  methods: {
    save: function (event) {
      console.log("OI MUNDO");
      console.log("depois:"+this.marker+this.mainTag+this.description);
      // const provider = new OpenStreetMapProvider();
      // const results = await provider.search({ query: this.$data.address });
      // console.log(results);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
#map
  width: 100%
  height: 400px
  font-weight: bold
  font-size: 13px
  text-shadow: 0 0 2px #fff
  .leaflet-shadow-pane > .leaflet-marker-shadow
    display: none
h3
  margin: 40px 0 0

ul
  list-style-type: none
  padding: 0
li
  display: inline-block
  margin: 0 10px
a
  color: #42b983
</style>
