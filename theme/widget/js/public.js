/**
 * PUBLIC is a small javascript collection, based on "HTML5" javascript: javascript 1.6
 * Notice:	this Class does not support deprecated browser, at all. Recents Chrome, Firefox, IE or related browsers are needed.
 * 			We advice adding a projectmountainfresh.com implementation before using this Class.
 *
 * 			All code is copyright-free, but it's decent to refer to the makers: www.tick.ee
 */

var Public = {

//	HTML Element get / filter / creation

	get				: function( query )	{
		
		return ( typeof query == "object" )?
				
				 query : document.querySelector( query );
	},
	
	filter			: function( query )	{
		
		nodelist	= document.querySelectorAll( query );
		list		= new Array();
		
		for( key in nodelist )
			if ( typeof nodelist[ key ] == "object" ) list.push( nodelist[ key ]);
		
		return list;
	},

	element			: function( tag, attributes ) {

  		el = document.createElement( tag );
		
		if( attributes )
			for ( key in attributes ) el.setAttribute( key, attributes[ key ]);
		
		return el;
	},

//	Basic Growl-like implementation

	growl			: function( message ) {
		
		growl	= this.element( 'div', { 'class': 'Growl' });
		growl.innerHTML = message;
		parent	= ( this.get( "aside" ))? this.get( "aside" ) : this.get( "footer" );
		
		while ( sibling = this.get( "Growl" ))
				parent.removeChild( sibling );
				
		parent.appendChild( growl );

	},
	
//	XHR or "Ajax" handler
	
	xhr			: function( uri, params, succesListener ) {
		
		var xhr = new XMLHttpRequest();
			xhr.addEventListener( "load", succesListener, false ); //	# progress	# load	# error	# abort
		
		var data = new FormData();
		for (var key in  params )
			data.append( key, params[ key ]);
			
			xhr.open( "POST", uri );
			xhr.send( data );
	},
	
	validateXhr			: function( data, error_override ) {
		
		
		try { json = JSON.parse( data.target.responseText ); } catch( err ) {
			
			Public.growl( "Data error (bad json)" );
			return false;
		}
		
		if ( json.error ) {
			
			if( error_override ) return json;
				Public.growl( "Data Error: \n" + json.error );
			
		} else if ( json.redirect ) {
			
			if( json.delay ) {
			
				if( json.message ) Public.growl( json.message );	
				setTimeout( function( red ) { window.location = red }, Number( json.delay ) * 1000, json.redirect );
			
			} else window.location = json.redirect
		
		}
		
		return json;	
	},
	
// XHTTP or UPDATED "Ajax" handler

	xhttp			: function( uri, set, succesListener ) {
		
		var xhr = new XMLHttpRequest();
			xhr.addEventListener( "load", succesListener, false ); //	# progress	# load	# error	# abort
		
		var data = new FormData();
		for (var key in  set )
			data.append( key, set[ key ]);
			
			xhr.open( "POST", uri );
			xhr.send( data );

	},
	
//	Dynamic FIX/RELEASE Element handling

	fixed		: function( fixes ) {
		
		this.fixes = fixes;
		
		fixes.forEach( function( obj ){
			
			if( obj.el ){
				obj.el.startstate	= window.getComputedStyle( obj.el ).getPropertyValue( 'position' );
				obj.el.startpos		= obj.el.getBoundingClientRect().top;
				obj.el.locked		= ( obj.el.startstate == 'fixed' )? true : false;
		}});
		
		window.addEventListener( 'scroll', this.fixed.scroll );
		
		return this;
	},

	ie			: function(){
		
		if( navigator ) {
			navigator.userAgent.match(/MSIE (\d+)/);
			return (navigator.appName == 'Microsoft Internet Explorer' && RegExp.$1 < 9 );
		}
	}
}

Public.fixed.scroll = function() { 
	
	if( Public.ie()) return false;
	
	Public.scrollTop		= window.pageYOffset;
	Public.fixes.forEach( Public.fixed.checkpos );
}

Public.fixed.checkpos = function( obj ) { 

	if( !obj.el ) return false;
	
	range = Public.fixed.inrange( obj.el, obj.pos )

		 if(!obj.el.locked && range )																	Public.fixed.lock( obj.el, obj.pos );
	else if( obj.el.locked &&
			((!range && obj.el.startstate == 'fixed' ) || ( range && obj.el.startstate != 'fixed' )))	Public.fixed.release( obj.el, obj.pos );

}

Public.fixed.inrange = function( el, int ) {  

	screentop = document.body.scrollTop;

	if( el.startstate == 'fixed' ) {

		if( int < 0 
		&&  ( document.body.scrollHeight - window.innerHeight - screentop <= -int ))

			return false;

	} else {

		objecttop = el.getBoundingClientRect().top;
		
		if(( !el.locked && objecttop > int )
		|| ( el.locked && el.startpos - int <= screentop ))
			 	
			 return false;
	}

	return true;

}

Public.fixed.lock = function( el, pos ) { 

	el.parentNode.className += (( el.parentNode.className )? " ": "" ) + "fixed-parent";
	el.className += (( el.className )? " ": "" ) + "fixed";
	
	el.locked = true;
}

Public.fixed.release = function( el, pos ) { 
	
	el.parentNode.className = el.parentNode.className.replace(/fixed-parent/g, '' );
	el.className = el.className.replace(/fixed/g, '' );
	
	el.locked = false;
}




// CONSOLE ERROR Prevention

if( !console )

	var console =	{
		log	: function( message ) { alert( message ); }
	} 
