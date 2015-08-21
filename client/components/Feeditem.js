var React = require('react');

var Feeditem = React.createClass({ 
render: function() {
	return (
	      <div>
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