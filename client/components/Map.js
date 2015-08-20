var React = require('react');
var Feed = require('./Feed');
var GoogleMap = require('google-map-react');

var Map = React.createClass({
  getInitialState: function(){
    return{
      center: [33.979471, -118.422549],
      zoom: 12,
    };
  },

  render: function(){
  	return(
  	<div>
    <GoogleMap center={this.state.center} zoom={this.state.zoom}>
    </GoogleMap>
            
        <Feed source = "https://api.instagram.com/v1/tags/nofilter/media/recent?client_id=46141b7b17fa4f29911b66e830bafcf1&callback=?"/>
  	</div>
  	);
  }

});


module.exports = Map;
