var React = require('react');
var StyleSheet = require('react-style');

var Marker = React.createClass({
	render: function(){
		return (
			<div styles = {styles.marker}>
			{this.props.label}
			</div>
		);
	}
});

var styles = StyleSheet.create({
	marker:{
		position: 'absolute',
		width: 20, 
		height: 20,
		left: -20 / 2, //width
		top: -20 / 2, //height

		border: '5px solid #f44336',
		borderRadius: 20, //height
		backgroundColor: 'white',
		textAlign: 'center',
		color: '#3f51b5',
		fontSize: 16,
		fontWeight: 'bold',
		padding: 4
	}
});

module.exports = Marker;