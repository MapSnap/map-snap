var React = require('react');
var Feeditem = require('./Feeditem');


var Feed = React.createClass({
  
  

  render: function() {
    console.log("in render");
    var phoArray = [];
    var lonArray = [];
    var latArray = [];
    for(var i=0; i<this.props.data.length; i++){
      if(this.props.data[i].location !== null){
      phoArray.push(<Feeditem pictures={this.props.data[i].images.low_resolution.url}/>);
      lonArray.push(this.props.data[i].location.longitude);
      latArray.push(this.props.data[i].location.latitude);
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