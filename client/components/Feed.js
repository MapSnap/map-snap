var React = require('react');
var Feeditem = require('./Feeditem');
var StyleSheet = require('react-style');

var Feed = React.createClass({

  render: function() {
    var phoArray = [];
    var nameArray = [];
    // var tagsArray = [];
    var lonArray = [];
    var latArray = [];
    for(var i=0; i<this.props.data.length; i++){
      if(this.props.data[i].location !== null){
        phoArray.push(<Feeditem pictures={this.props.data[i].images.low_resolution.url} 
                                username={this.props.data[i].user.username}
                                tags={this.props.data[i].tags}/>);
      }
    }
    return (
      <div>
        {phoArray}
      </div>
    );

  }
});


module.exports = Feed;
