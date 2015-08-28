var React = require('react');

var Feeditem = React.createClass({ 
render: function() {
	
	var tags_hashed = this.props.tags.map(function(elem) { return '#' + elem; });
	
	return (
	      <div>
	      	<img src = {this.props.pictures}/>
					<p>USERNAME={this.props.username}</p>
					<p>TAGS={tags_hashed.join(', ')}</p>
	      </div>
	    );
  }
});

module.exports = Feeditem;
