var React = require('react');
var Feed = require('./Feed');
var Map = React.createClass({

	render: function(){
		return(
		<div>
                    <Feed source = "https://api.instagram.com/v1/locations/search?lat=48.858844&lng=2.294351&client_id=46141b7b17fa4f29911b66e830bafcf1"/>
				sdfdsf page
			</div>
			);
	}
});

module.exports = Map;
