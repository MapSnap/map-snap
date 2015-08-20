var React = require('react');
var Feeditem = require('./Feeditem');
var $ = require('jquery');

var Feed = React.createClass({

  getInitialState: function() {
    return {
      data: []
    };
  },

  componentDidMount: function() {
    $.getJSON(this.props.source, null, function(data) {
      console.log(data);
      var photos = data;
      // checks to see if component is still mounted before updating
      if (this.isMounted()) {
        this.setState({
          data: photos
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <h3> Feed component </h3>
        {this.state.data}
      </div>
      )
  }
});


module.exports = Feed;