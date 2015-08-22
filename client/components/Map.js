var React = require('react');
var StyleSheet = require('react-style');
var Feed = require('./Feed');
var Marker = require('./Marker');
var GoogleMap = require('google-map-react');
var $ = require('jquery');


var Map = React.createClass({

  getInitialState: function(){
    return{
      center: [33.979471, -118.422549],
      zoom: 12,
      value: '',
      source: "https://api.instagram.com/v1/media/search?lat=33.979471&lng=-118.422549&client_id=46141b7b17fa4f29911b66e830bafcf1&callback=?",
      data: []
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
