var React = require('react');
var Feeditem = require('./Feeditem');
var StyleSheet = require('react-style');

var Feed = React.createClass({
  
  render: function() {
    console.log(this.props.data);
    var phoArray = [];
    for(var i=0; i<this.props.data.length; i++){
      if(this.props.data[i].location !== null){

        phoArray.push(<Feeditem pictures={this.props.data[i].images.low_resolution.url} tags={this.props.data[i].tags} url={this.props.data[i].link} username={this.props.data[i].user.username}/>);

      }
    }

    return (
          <div >
            {phoArray}
          </div>
    );

  }
});


module.exports = Feed;