var React = require('react');
var Feed = require('./Feed');
var Map = React.createClass({

  // getInitialState: function () {

  // },

  render: function(){
  	return(
  	<div>
            
        <Feed source = "https://api.instagram.com/v1/tags/nofilter/media/recent?client_id=46141b7b17fa4f29911b66e830bafcf1&callback=?"/>
  	</div>
  		);
  }
});

module.exports = Map;
