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
    console.log('photos of ', this.state.value);
    console.log('test');

    //use address to obtain latlng through google geocoder
    $.get(this.state.gooapi, null, function(data){
      var coordinates = data;
      console.log(data);


    });
    //assume returned latlng: 34.030371, -118.290308
    var lat = 34.030371;
    var lng = -118.290308;
    var newSource = "https://api.instagram.com/v1/media/search?lat=" + lat + "&lng=" + lng + "&client_id=46141b7b17fa4f29911b66e830bafcf1&callback=?";
    this.setState({
      value: '',
      center: [lat, lng],
      source: newSource
    });

    $.getJSON(newSource, null, function(obj) {
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

  locateAddress: function(){
    var address = document.getElementById("address").value;
    geocoder.geocode({ 'address': "5300 Beethoven St, Los Angeles, CA 90066"},
    
     function(results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        // var marker = new google.maps.Marker({
        //     map: map,
        //     position: results[0].geometry.location
        // });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  },


  componentDidMount: function() {
    $.getJSON(this.state.source, null, function(obj) {
      console.log("originl", obj);
      var photos = obj.data;
      // console.log(photos);
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
              <input type = "text" value = {this.state.value} defaultValue = "Enter Location" placeholder="Enter location" onChange = {this.handleChange} />
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
