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

        phoArray.push(<Feeditem pictures={this.props.data[i].images.low_resolution.url}/>);
        phoArray.push("USERNAME= ");
        phoArray.push(this.props.data[i].user.username);
        phoArray.push(<br/>);
        phoArray.push("TAGS=");
            lonArray.push(this.props.data[i].location.longitude);
            latArray.push(this.props.data[i].location.latitude);

        var tagsArray = (this.props.data[i].tags);
        phoArray.push(tagsArray[0]);
        for(var x =1; x < tagsArray.length; x++){
          phoArray.push(", ");
          phoArray.push(tagsArray[x]);
        }

      }
    }
    //console.log("phoArray", phoArray);

    return (
          <div >
            {phoArray}
          </div>
    );

  }
});


module.exports = Feed;