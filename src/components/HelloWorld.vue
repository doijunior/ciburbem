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
    let L;
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
      self.marker = newMarker;
    });
    axios
      .get('https://spreadsheets.google.com/feeds/list/1bFy086G8dGg6tzK4fNyI8I6LKXWuc9gjXlXNXxJDRdY/od6/public/basic?alt=json')
      .then(response => {
        self.points = (response.data.feed.entry.map((item) => {
          let mark = item.content["$t"].replace(/\w+:/g, "").split(',');
          let marker = L.marker([Number(mark[0]), Number(mark[1])]).addTo(self.map).bindPopup("<h1>"+mark[2]+"</h1>"+mark[3]);
          return mark;
        }));
      });
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
