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
    console.log(newSource);
    this.setState({
      value: '',
      center: [lat, lng],
      source: newSource
    });
    //trigger new getJSON ?
    //this.componentDidMount();
    console.log(this.state.source);
    $.getJSON(newSource, null, function(obj) {
      console.log("photo get request in locate photos", obj);
      var photos = obj.data;
      // console.log(photos);
      // checks to see if component is still mounted before updating
      if (this.isMounted()) {
        this.setState({
          data: photos
        });
      }
    }.bind(this));
    //console.log("end of setState in locatePhotos");
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
  	return(
      	<div styles={styles.gmap}>
      	<GoogleMap center={this.state.center} zoom={this.state.zoom}>
      		<Marker lat={this.state.center[0]} lng={this.state.center[1]} label='1'></Marker>
        	<Marker lat={this.state.center[0]+0.0015} lng={this.state.center[1]} label='2'></Marker>
        </GoogleMap>
            <form onSubmit = {this.locatePhotos}>
              <input type = "text" value = {this.state.value} defaultValue = "Enter Location" onChange = {this.handleChange} />
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
