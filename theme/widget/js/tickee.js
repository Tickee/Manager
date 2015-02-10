
var Tickee = {

	current			: null,
	lang			: "en",

	growl			: function( message ) {
		
		console.log( message )
		window.webkitNotifications.createNotification('','Title', message ).show();
	},
	
	xhr			: function( uri, set, succesListener ) {
		
		new Ajax.Request( uri, {
			method		: 'post',
			parameters	: { set: Object.toJSON( set )},
			onSuccess	: succesListener
		});
	}
}