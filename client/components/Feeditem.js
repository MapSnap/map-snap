var React = require('react');

var Feeditem = React.createClass({ 
  
  handleclick: function (index) {
    for ( var i = 0; i < this.props.url.length; i+=1) {

    }
  },

  render: function() {
    var tagsArray = [];
      for (var i = 0; i < this.props.tags.length; i+=1) {
        if (this.props.tags[i+1] !== ' ') {
         tagsArray.unshift(this.props.tags[i] + ' #');  
        }
      }
  	return (
  	      <div>
           
            {this.props.username} <br/>
            #{tagsArray} <br/>
           
  	       <img src = {this.props.pictures}/>
  	      </div>
  	    )
    }
});

module.exports = Feeditem;
// var FeedItem = React.createClass({
//   render: function() {
//     // put render logic here
//     return (
//       <div styles={styles.container}>
//       <img src = {this.props.pictures}/>
//       </div>
//     )
//   }
// });