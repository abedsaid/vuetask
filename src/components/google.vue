<template>
  <div class="container">
      <h1>Search Google places | 
        <a class="btn btn-danger btn-lg" href="#" role="button" v-on:click="logout">logout</a></h1>
    <div class="pac-card" id="pac-card">
      <div>
        <div id="title">
          Autocomplete search
        </div>
        <div id="type-selector" class="pac-controls">
          <input type="radio" name="type" id="changetype-all" checked="checked">
          <label for="changetype-all">All</label>

          <input type="radio" name="type" id="changetype-establishment">
          <label for="changetype-establishment">Establishments</label>

          <input type="radio" name="type" id="changetype-address">
          <label for="changetype-address">Addresses</label>

          <input type="radio" name="type" id="changetype-geocode">
          <label for="changetype-geocode">Geocodes</label>
        </div>
        <div id="strict-bounds-selector" class="pac-controls">
          <input type="checkbox" id="use-strict-bounds" value="">
          <label for="use-strict-bounds">Strict Bounds</label>
        </div>
      </div>
      <div id="pac-container">
        <input id="pac-input" type="text" placeholder="Enter a location" autocomplete="off">
      </div>
    </div>
    <div id="map"></div>
    <div id="infowindow-content">
      <img src="" width="16" height="18" id="place-icon">
      <span id="place-name"  class="title"></span><br>
      <span id="place-address"></span>
    </div>
  </div>
</template>

<script>


export default {
  
  name: 'google',
  components:{
  },
  data(){
    return {
      
    }
    },
    mounted: function() {
        var map;
        //console.log("map: ", google.maps)
            map = new google.maps.Map(document.getElementById('map'), {
            center: {lat:61.180059, lng: -149.822075},
            scrollwheel: false,
            zoom: 4
            })

        var card = document.getElementById('pac-card');
        var input = document.getElementById('pac-input');
        var types = document.getElementById('type-selector');
        var strictBounds = document.getElementById('strict-bounds-selector');

        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
        
        var autocomplete = new google.maps.places.Autocomplete(input);
        
        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        
        var marker = new google.maps.Marker({
          anchorPoint: new google.maps.Point(0, -29),
          map: map
        });
        
        autocomplete.addListener('place_changed', function() {
            autocomplete.bindTo('bounds', map);
            infowindow.close();
            marker.setVisible(false);
                
            var place = autocomplete.getPlace();
            var geocoder = new google.maps.Geocoder();

          console.log(place)
          if (!place.geometry) {
              geocoder.geocode( { 'address': place.name}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    place.geometry = results[0].geometry
                    if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                    } else {
                        map.setCenter(place.geometry.location);
                        map.setZoom(17); 
                    }
                    marker.setPosition(place.geometry.location);
                    marker.setVisible(true);

                } else {
                window.alert("No details available for input: '" + place.name + "'");
                return;
                }
            });
          }
          

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindowContent.children['place-icon'].src = place.icon;
          infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-address'].textContent = address;
          infowindow.open(map, marker);
        });
       
        this.setupClickListener('changetype-all', []);
        this.setupClickListener('changetype-address', ['address']);
        this.setupClickListener('changetype-establishment', ['establishment']);
        this.setupClickListener('changetype-geocode', ['geocode']);

        document.getElementById('use-strict-bounds')
            .addEventListener('click', function() {
              console.log('Checkbox clicked! New state=' + this.checked);
              autocomplete.setOptions({strictBounds: this.checked});
            });

            
     
    },
    methods: {
        setupClickListener: function(id, types) {
            var radioButton = document.getElementById(id);
            var input = document.getElementById('pac-input');
            var autocomplete = new google.maps.places.Autocomplete(input);
          radioButton.addEventListener('click', function() {
              console.log(types)
            autocomplete.setTypes(types);
          });
        },
        logout: function() {
          var vm = this
            FB.logout(function(response){
                localStorage.removeItem('name')
                localStorage.removeItem('email')
                localStorage.removeItem('accessToken')
                vm.$router.push('/')
            });
        },
  },
  

}
</script>

<style scoped>
    #map {
        height:500px;
        width: 100%;
      }
      #description {
        font-family: Roboto;
        font-size: 15px;
        font-weight: 300;
      }

      #infowindow-content .title {
        font-weight: bold;
      }

      #infowindow-content {
        display: none;
      }

      #map #infowindow-content {
        display: inline;
      }

      .pac-card {
        margin: 10px 10px 0 0;
        border-radius: 2px 0 0 2px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        outline: none;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        background-color: #fff;
        font-family: Roboto;
      }

      #pac-container {
        padding-bottom: 12px;
        margin-right: 12px;
      }

      .pac-controls {
        display: inline-block;
        padding: 5px 11px;
      }

      .pac-controls label {
        font-family: Roboto;
        font-size: 13px;
        font-weight: 300;
      }

      #pac-input {
        background-color: #fff;
        font-family: Roboto;
        font-size: 15px;
        font-weight: 300;
        margin-left: 12px;
        padding: 0 3px 0 13px;
        text-overflow: ellipsis;
        width: 400px;
      }

      #pac-input:focus {
        border-color: #4d90fe;
      }

      #title {
        color: #fff;
        background-color: #4d90fe;
        font-size: 25px;
        font-weight: 500;
        padding: 3px 12px;
      }
</style>

