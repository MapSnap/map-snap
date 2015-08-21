var React = require('react');
var StyleSheet = require('react-style');
var Feed = require('./Feed');
var GoogleMap = require('google-map-react');

var Map = React.createClass({

  getInitialState: function(){
    return{
      center: [33.979471, -118.422549],
      zoom: 12,
      value: ''
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

  render: function(){
    var value = this.state.value;
  	return(
      	<div styles={styles.gmap}>
      	<GoogleMap center={this.state.center} zoom={this.state.zoom}>
      	</GoogleMap>
            <form onSubmit = {this.locatePhotos}>
              <input type = "text" value = {value} defaultValue = "Enter Location" onChange = {this.handleChange} />
              <button> Find Photos </button>
            </form>
      	<Feed source = "https://api.instagram.com/v1/tags/nofilter/media/recent?client_id=46141b7b17fa4f29911b66e830bafcf1&callback=?"/>
      	</div>
  	);
  }

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
