var React = require('react');
var StyleSheet = require('react-style');
var Feed = require('./Feed');
var Marker = require('./Marker');
var GoogleMap = require('google-map-react');
var $ = require('jquery');

var geocoder;
var map;


var Map = React.createClass({

  getInitialState: function(){
    return{
      center: [33.979471, -118.422549],
      zoom: 12,
      value: '',

      source: "https://api.instagram.com/v1/media/search?lat=33.979471&lng=-118.422549&client_id=46141b7b17fa4f29911b66e830bafcf1&callback=?",
      gooapi:'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDSSUW3UM8-Q_9rLPKe0cYLliI-sMB42sg',
      data: [],

    };
  },

  handleChange: function(event) {
    this.setState({
      value: event.target.value
    })
  },

  locatePhotos: function(event) {
    event.preventDefault();

    //parse address from our page into url format:
    //5000 Ellendale Ave, Los Angeles, CA -->
    //5000+Ellendale+Ave,+Los+Angeles,+CA
    var address = document.getElementById("address").value;
    var parsedAddress = address.replace(/\s/g,'+');

    var gooAddress = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + parsedAddress +  '&key=AIzaSyDSSUW3UM8-Q_9rLPKe0cYLliI-sMB42sg';

    var lat;
    var lng;

    //use gooAddress to obtain latlng through google geocoder
    $.getJSON(gooAddress, null, function(data){
      lat = data.results[0].geometry.location.lat;
      lng = data.results[0].geometry.location.lng;


      var newSource = "https://api.instagram.com/v1/media/search?lat=" + lat + "&lng=" + lng + "&client_id=46141b7b17fa4f29911b66e830bafcf1&callback=?";
      this.setState({
        value: '',
        center: [lat, lng],
        source: newSource
      });

      //make api request to Instagram using lat and lng obtained through Geocode
      $.getJSON(newSource, null, function(obj) {
        var photos = obj.data;
        photos.splice(5);
        if (this.isMounted()) {
          this.setState({
            data: photos
          });
        }
      }.bind(this));
    }.bind(this));
  },

  componentDidMount: function() {
    $.getJSON(this.state.source, null, function(obj) {
      var photos = obj.data;
      photos.splice(5);
      // checks to see if component is still mounted before updating
      if (this.isMounted()) {
        this.setState({
          data: photos
        });
      }

    }.bind(this));
  },

  render: function(){
  	var markerList = this.state.data.map(function(post,index){
  		return (<Marker lat={post.location.latitude} lng={post.location.longitude} label={index+1} key={index}></Marker>);
  	});

  	return(
      	<div styles={styles.gmap}>
      	<GoogleMap center={this.state.center} zoom={this.state.zoom}>
      		{markerList}
        </GoogleMap>

            <form onSubmit = {this.locatePhotos}>
              <input type = "text" id="address" value = {this.state.value} defaultValue = "Enter Location" placeholder="Enter location" onChange = {this.handleChange} />
              <button> Find Photos </button>
            </form>
      	<Feed data = {this.state.data}/>
      	</div>
  	);
  },
     

});


var styles =
StyleSheet.create({
	gmap:{
		height: '50%',
		width: '50%',
		margin: '0 auto'
	}
});

module.exports = Map;
