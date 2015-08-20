var React = require('react');
var Feed = require('./Feed');
var GoogleMap = require('google-map-react');

var Map = React.createClass({

	getInitialState: function(){
		return{
			center: [33.979471, -118.422549],
			zoom: 9,
		};
	},

	render: function(){
		return(
		<div>
		test50
		<GoogleMap center={this.state.center} zoom={this.state.zoom}>
		</GoogleMap>
      <Feed source="https://api.instagram.com/v1/locations/search?lat=48.858844&lng=2.294351&client_id=46141b7b17fa4f29911b66e830bafcf1"/>
      test23
		</div>
		);
	}
});

module.exports = Map;
