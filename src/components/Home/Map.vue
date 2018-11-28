<template>
  <div class="hello">
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet';

export default {
  name: 'HomeMap',
  props: ["trees"],
  data () {
    return {
      info: null,
      mainTag: "",
      description: "",
      marker: undefined,
      map: undefined,
      layer: undefined
    }
  },
  mounted() {
    this.map = L.map('map');
    this.layer = L.layerGroup().addTo(this.map);
    this.map.setView([this.$config.lat,this.$config.lng], this.$config.zoom);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map );
    var newMarker;
    let self = this;

    this.map.on('click', function(e) {
      if(newMarker)
        self.map.removeLayer(newMarker);
        var myIcon = L.icon({
          iconUrl: './marker-icon-green.png',
          iconSize: [25, 41],
          iconAnchor: [13, 41],
        });
        console.log(e.latlng);  
        newMarker = L.marker(e.latlng, {icon: myIcon}).addTo(self.map);
      self.marker = newMarker;
    });
    this.updateMap();
  },
  watch: {
    trees: function(){
      this.updateMap();
    }
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
    save: function(){

    },
    updateMap: function(){
      this.layer.clearLayers();
      this.trees.forEach( (tree) => {
        L.marker([tree[0], tree[1]]).addTo(this.layer).bindPopup("<h1>"+tree[2]+"</h1>"+tree[3]);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
#map
  z-index: 1
  width: 100%
  height: 600px
  font-weight: bold
  font-size: 13px
  text-shadow: 0 0 2px #fff
  .leaflet-shadow-pane > .leaflet-marker-shadow
    display: none
</style>
