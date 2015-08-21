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
    $.getJSON(this.props.source, null, function(obj) {
      console.log("originl", obj);
      var photos = obj.data;
      // console.log(photos);
      // checks to see if component is still mounted before updating
      if (this.isMounted()) {
        this.setState({
          data: photos
        });
      }

    }.bind(this));
  },

  render: function() {
    console.log("in render");
    var phoArray = [];
    var lonArray = [];
    var latArray = [];
    for(var i=0; i<this.state.data.length; i++){
      if(this.state.data[i].location !== null){
      phoArray.push(<Feeditem pictures={this.state.data[i].images.low_resolution.url}/>);
      lonArray.push(this.state.data[i].location.longitude);
      latArray.push(this.state.data[i].location.latitude);
      }
    }
          console.log("lonArray", lonArray);
          console.log("latArray", latArray);

    return (
          <div >
            {phoArray}
          </div>
    );


  }
    // for(var i=0; photos.length; i ++){
    //   console.log("in for loop");
    //   singlepic = Array[i.images.low_resolution.url];
    //   console.log("single data", singlepic);
    // }
  
   //  // });
   //  return (
   //    <div> whastsjl </div>
   //    );
   

});


module.exports = Feed;