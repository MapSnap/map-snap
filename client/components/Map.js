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
      source: "https://api.instagram.com/v1/tags/nofilter/media/recent?client_id=46141b7b17fa4f29911b66e830bafcf1&callback=?",
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

    this.setState({
      value: ''
    })
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
    var value = this.state.value;
  	return(
      	<div styles={styles.gmap}>
      	<GoogleMap center={this.state.center} zoom={this.state.zoom}>
      	<Marker lat={this.state.center[0]} lng={this.state.center[1]} label='1'></Marker>
        <Marker lat={this.state.center[0]+0.0015} lng={this.state.center[1]} label='2'></Marker>
        </GoogleMap>
            <form onSubmit = {this.locatePhotos}>
              <input type = "text" value = {value} defaultValue = "Enter Location" onChange = {this.handleChange} />
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
