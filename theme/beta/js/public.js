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
	
	addClassName	: function( obj, name )	{
		
		obj = Public.get( obj );
		classes = obj.className.split(" ");
		
		if( classes.indexOf(name) < 0 ) {
			
			classes.push( name );
			obj.className = classes.join(" ");
		}
		
		return obj;
	},
	
	removeClassName	: function( obj, name )	{
		
		obj = Public.get( obj );
		classes = obj.className.split(" ");
		
		if( classes.indexOf(name) >= 0 ) {
			
			classes.splice( classes.indexOf(name), 1);
			obj.className = classes.join(" ");
		}
		
		return obj;
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
		data.append( 'set', JSON.stringify( params ));
		//for (var key in  params )	data.append( key, (typeof params[ key ] == 'object')? JSON.stringify( params[ key ]): params[ key ]);
			
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
	
	enable_switches	: function() {
	
		Public.filter("switch").forEach( function( el ){
			
			el.addEventListener( 'click', function(){
				
				this.setAttribute('value', (this.getAttribute('value') < this.getAttribute('max') )? Number( this.getAttribute('value'))+1 : 0 );
			
			});
			
		});
	
	},
	
//	Dynamic FIX/RELEASE Element handling

	fixed		: function( fixes ) {
		
		this.fixes = fixes;
		
		fixes.forEach( function( obj ){
			
			if( obj.el ){
				obj.el.startpos		= obj.el.getBoundingClientRect().top;
				obj.el.locked		= false;

		}});
		
		window.addEventListener( 'scroll', this.fixed.scroll );
		
		return this;
	},
	
	
////////////////// TEST //////////////////////	
	
	tween			: function( obj, style, start, end, speed ) {
		
		if( !obj.tw ) obj.tw = {};
		if( !obj.twpos ) obj.twpos = {};
		
		if( obj.tw[ style ]) clearInterval( obj.tw[ style ]);
		
		obj.twpos[ style ] = start;
		
		obj.tw[ style ] = setInterval( Public._tweenfunc, 34, obj, style, end, speed );
	
	},
	_tweenfunc		: function( obj, style, end, speed ){
			
			obj.twpos[ style ] += ( end - obj.twpos[ style ])/ speed;
			obj.setStyle(style + ":" + obj.twpos[ style ] + "px" );
			
			if( Math.round( obj.twpos[ style ] ) == end ){
				obj.setStyle(style + ":" + end + "px" );
				clearInterval( obj.tw[ style ]);
			}
	},
	
	tweenScroll			: function( end, speed ) {
		
		if( !window.tw ) window.tw = {};
		if( !window.twpos ) window.twpos = {};
		
		if( window.tw.scroll ) clearInterval( window.tw.scroll );
		
		window.twpos.scroll	= document.body.scrollTop;
		window.tw.scroll	= setInterval( Public._tweenScrollfunc, 34, end, speed );
	
	},
	_tweenScrollfunc		: function( end, speed ){
			
			window.twpos.scroll += ( end - window.twpos.scroll )/ speed;
			window.scrollTo( 0, window.twpos.scroll );
			
			if( Math.round( window.twpos.scroll ) == end ){
				window.scrollTo( 0, end );
				clearInterval( window.tw.scroll );
			}
	}

////////////////// END TEST //////////////////////		
	
}

Public.fixed.scroll = function() { 
	
	Public.scrollTop		= window.pageYOffset;
	Public.fixes.forEach( Public.fixed.checkpos );
}

Public.fixed.checkpos = function( obj ) { 

	if( !obj.el ) return false;
	
	if( Public.fixed.inrange( obj.el, obj.pos ))
	
		if( obj.el.locked )		Public.fixed.release( obj.el );
		else					Public.fixed.lock( obj.el );

}

Public.fixed.inrange = function( el, int ) {  

	screentop = window.pageYOffset;
	objecttop = el.getBoundingClientRect().top;
	
	return !(( !el.locked && objecttop > int ) || ( el.locked && el.startpos - int <= screentop ));

}



Public.fixed.lock = function( el ) { 

	Public.addClassName( el.parentNode, "fixed-parent" );
	Public.addClassName( el, "fixed" );
	
	el.locked = true;
}

Public.fixed.release = function( el ) { 
	
	Public.removeClassName( el.parentNode, "fixed-parent" );
	Public.removeClassName( el, "fixed" );
		
	el.locked = false;
}




// CONSOLE ERROR Prevention

if( !console )

	var console =	{
		log	: function( message ) { alert( message ); }
	} 


/*
var Engine = {
	
	default_action	: 'dashboard',
	
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

	growl			: function( message ) {
		
		growl	= Engine.element( 'div', { 'class': 'Growl' });
		growl.innerHTML = message;
		parent	= Engine.get( "aside" )
		
		while ( parent.firstChild )
				parent.removeChild(parent.firstChild);
				
		parent.appendChild( growl );

	},
	
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
			
			Engine.growl( "Data error (bad json)" );
			return false;
		}
		
		if ( json.error ) {
			
			if( error_override ) return json;
				Engine.growl( "Data Error: \n" + json.error );
			
		} else if ( json.redirect ) {
			
			if( json.delay ) {
			
				if( json.message ) Engine.growl( json.message );	
				setTimeout( function( red ) { window.location = red }, Number( json.delay ) * 1000, json.redirect );
			
			} else window.location = json.redirect
		
		}
		
		return json;	
	},
	
	trigger		: function( string, listen ) {
		
		trigger = this.get( string );
		trigger.addEventListener( listen, this.triggerHandler );

	},
	
	triggerHandler		: function( e ) {
		
		trigger = e.target.id.split( '.' ).pop();
		
		if ( Engine.triggerlist[ trigger ])
			 Engine.triggerlist[ trigger ]();
			
		else Engine.xhr( 'xhr.php', { task: trigger }, Engine.validateXhr );
		
	},
	
	addView				: function( json, n ) {
		
		column = Engine.get( "section > div > div:nth-child(" + ( n +1) + ")" );
		
		if( json.content )
			column.innerHTML = json.content;
			
		if( json.elements )
			Engine.appendElements( column, json.elements );
		
	},
	
	appendElements		: function( parent, elements, update ) {
	
		if( update )
			parent.innerHTML = "";
		
		if( elements ) {
		
			parent.appendChild( container = Engine.element( 'div' ))
			elements.forEach( function( element ){
					 
					 child = new Elements[ element.type ]( element.args, element.callback );
					 container.appendChild( child );
					 if( child.post_append) child.post_append();
			});
		}
	},
	
	clearSection		: function( amount, classname ) {
		
			section = Engine.get( "section > div" );
			
			while ( section.firstChild )
					section.removeChild( section.firstChild );
			
			if( amount )	
				for( n = 0; n < amount; n++ ) section.appendChild( Engine.element( "div", { columnid: n }));
						
			if( classname )
				section.parentNode.className = classname + " grid" + amount;
					
			//// TO-DO: remove pending XHR view calls if new starts
	},
	
	findColumn			: function( target ) {
	
		while( !target.getAttribute( 'columnid' ) && target.parentNode )
				target = target.parentNode;
		
		return target.getAttribute( 'columnid' );	
	}
}

Engine.triggerlist	= {

//	ACTION Json	
	json				: function( type, action, params ) {
		
		if( !params )	params = { type: type }
		else		 	params['type'] = type
						params['action'] = action

		Engine.xhr( 'xhr.php', params, Engine.triggerlist.json_response );
	},
	json_response		: function( data ) {
		
			json = Engine.validateXhr( data );
		if( json.message )

			Engine.growl( json.message );
	},



//	ACTION Login
	login				: function() {
		
		user = Engine.get( "input[type='text']" ).value;
		pass = Engine.get( "input[type='password']" ).value;
		
		Engine.xhr( 'xhr.php', { task:'login', user:user, pass:pass }, this.login_response );
		
	},
	login_response		: function( data ) {
		
			json = Engine.validateXhr( data, true );
		if( json.error )
		
			Engine.growl( "Wrong. Please retry" );
	},
	

	
//	ACTION View	
	view				: function( type, column, params ) {
		
		if( !params || !params.action ) 
			 params 		= { action: Engine.default_action }
			 params.task	= "view"
			 params.type	= type
			 params.column	= column
		
		Engine.xhr( 'xhr.php', params, Engine.triggerlist.view_response );

	},
	view_response		: function( data ) {
		
			json = Engine.validateXhr( data );
		if( json ) {
			Engine.addView( json, Number( json.column ));
		}
	},

//	ACTION Dashboard	
	dashboard			: function() {
		
		Engine.xhr( 'xhr.php', { task:'dashboard' }, this.dashboard_response );
	},
	dashboard_response	: function( data ) {

			json = Engine.validateXhr( data );
		if( json )
			json.views.forEach( Engine.triggerlist.view ); 
		
	},
	
//	ACTION Pages	
	pages			: function() {
		
		Engine.xhr( 'xhr.php', { task:'pages' }, this.pages_response );
	},
	pages_response	: function( data ) {
		
			json = Engine.validateXhr( data );
		if( json )
			Engine.growl( json.message );
		
	},
	
//	ACTION MailChimp	
	mailchimp			: function() {
		
		Engine.clearSection( 3, 'blackwhite');
		
		Engine.triggerlist.view( 'mailchimp', 0, { action: 'options' });
		Engine.triggerlist.view( 'mailchimp', 2, { action: 'dashboard' });
	}	
}





*/

/*
Public = {
	
	filter			: function( query )	{
		
		nodelist	= document.querySelectorAll( query );
		list		= new Array();
		
		for( key in nodelist )
			if ( typeof nodelist[ key ] == "object" ) list.push( nodelist[ key ]);
		
		return list;
	},
	
	
	hover		: function( e ) {
		
		Public.toggleTrigger( this.innerHTML );
		
		document.querySelector( "body > nav" ).className = 'active';
	},
	
	unhover		: function( e ) {
		
		document.querySelector( "body > nav" ).className = sidebar_show? '': 'hidden';
		
	},
	
	toggleTrigger		: function( title ) {
		
		trigger = document.querySelector( "body > nav div[trigger='" + title + "']" );
		childs = trigger.parentNode.children
		
		for ( k in childs ) if( typeof childs[k] == 'object' ) childs[k].style.display = 'none';
		
		trigger.style.display = 'block';
		
		return trigger;
	},
	
	
	fixed		: function( fixes ) {

		this.fixes = fixes;
		window.addEventListener( 'scroll', Public.fixed.scroll );
		
		fixes.forEach( function( obj ){
		
			obj.el.startstate	= window.getComputedStyle( obj.el ).getPropertyValue( 'position' );
			obj.el.startpos		= obj.el.getBoundingClientRect().top;
			obj.el.locked		= ( obj.el.startstate == 'fixed' )? true : false;
		});

		return this;
	},
	
	tween			: function( obj, style, start, end, speed ) {
		
		if( !obj.tw ) obj.tw = {};
		if( !obj.twpos ) obj.twpos = {};
		
		if( obj.tw[ style ]) clearInterval( obj.tw[ style ]);
		
		obj.twpos[ style ] = start;
		
		obj.tw[ style ] = setInterval( Public._tweenfunc, 34, obj, style, end, speed );
	
	},
	_tweenfunc		: function( obj, style, end, speed ){
			
			obj.twpos[ style ] += ( end - obj.twpos[ style ])/ speed;
			obj.setStyle(style + ":" + obj.twpos[ style ] + "px" );
			
			if( Math.round( obj.twpos[ style ] ) == end ){
				obj.setStyle(style + ":" + end + "px" );
				clearInterval( obj.tw[ style ]);
			}
	},
	
	tweenScroll			: function( end, speed ) {
		
		if( !window.tw ) window.tw = {};
		if( !window.twpos ) window.twpos = {};
		
		if( window.tw.scroll ) clearInterval( window.tw.scroll );
		
		window.twpos.scroll	= document.viewport.getScrollOffsets().top;
		window.tw.scroll	= setInterval( Public._tweenScrollfunc, 34, end, speed );
	
	},
	_tweenScrollfunc		: function( end, speed ){
			
			window.twpos.scroll += ( end - window.twpos.scroll )/ speed;
			window.scrollTo( 0, window.twpos.scroll );
			
			if( Math.round( window.twpos.scroll ) == end ){
				window.scrollTo( 0, end );
				clearInterval( window.tw.scroll );
			}
	}

}

Public.fixed.scroll = function() { 
	
	Public.scrollTop		= window.pageYOffset;

	Public.fixes.forEach( Public.fixed.checkpos );
}

Public.fixed.checkpos = function( obj ) { 

	if( !obj.el ) return false;
	
	
	range = Public.fixed.inrange( obj.el, obj.pos )

		 if( !range && obj.el.locked && obj.el.startstate == 'fixed' ) Public.fixed.release( obj.el, obj.pos )	
	else if( range && !obj.el.locked && obj.el.startstate == 'fixed' ) Public.fixed.lock( obj.el, obj.pos )

}

Public.fixed.inrange = function( el, int ) {  
	
	if( el.startstate == 'fixed' ) {
		
		if( int < 0 
		&&  ( document.body.scrollHeight - window.innerHeight - document.body.scrollTop <= -int ))
		
			return false;
	}

	return true;

}

Public.fixed.lock = function( el, pos ) { 
	
	el.style.position = "fixed";
	if( pos < 0 ) el.style.top = "";
	
	el.locked = true;
}

Public.fixed.release = function( el, pos ) { 
	
	el.style.position = "absolute";
	el.style.top = document.body.scrollHeight - el.clientHeight + pos + "px";
	el.locked = false;
}

*/






/*

Tickee.fixed = function( fixpos ) {

	this.fixpos = fixpos;
	Event.observe(window, 'scroll', Tickee.fixed.scroll.bind( this ) );
	
	this.sidebar =  this.fixed.sidebar();

	return this;
}

Tickee.fixed.scroll = function() { 
	
	this.scrollTop = document.viewport.getScrollOffsets().top;
	
	this.fixpos.each( this.fixed.checkpos, this );
	
	this.sidebar.each( this.fixed.checksidebar );	
}

Tickee.fixed.checkpos = function( obj ) { 
	
	if( obj.el )
	if(		   !obj.el.fixed && obj.el.viewportOffset().top < obj.fix ) {
				obj.el.addClassName( "fixed" ).up().addClassName( "fixed-parent" );
			 	obj.el.fixed = this.scrollTop;
	
	} else if(	obj.el.fixed && this.scrollTop < obj.el.fixed ) {
			 	obj.el.removeClassName( "fixed" ).up().removeClassName( "fixed-parent" );
			 	obj.el.fixed = false;
	}
}

Tickee.fixed.checksidebar	= function( a ){
	
	if( a.targetlist && !a.up().active && a.targetlist[0].viewportOffset().top > 225 && a.targetlist[0].viewportOffset().top < 325 ) {
		this.sidebar.each( function( a ){ a.up().removeClassName( "active" ).active = false; });
		a.up().addClassName( "active" ).active = true;
	}
	
}

Tickee.fixed.sidebar	= function() {
	
	sidebar	=	$$(".sidebar")?
				$$(".sidebar a") : [];
	
	sidebar.each( function( a ){
		
		a.targetlist = $$( "[name='" + a.href.split("#").pop() + "']" );
		
		a.observe( "click", function(){
			
			sidebar.each( function( a ){ a.up().removeClassName( "active" ); });
			a.up().addClassName( "active" ).active = true;;

			if( a.targetlist[0] )
				Tickee.tweenScroll( a.targetlist[0].cumulativeOffset().top - 200, 5 )
			
		}, this );
	});
				
				
				
	return sidebar;
}

Tickee.calcPlan = function() {

	Public.get("module.calculate").innerHTML = "<input type='text' placeholder='100' />Avg tickets per event<br /><input type='text' placeholder='12' id='input-month' /><span id='descr-month'>events per year</span><br /><input type='text' value='0.5' />service fee<br /><a href='javascript:Tickee.resultPlan()' class='calc'>Calculate</a>";

	
	$('input-month').observe( "change", function(){ $('descr-month').update(( $('input-month').value > 1 )? "events per month" : "event per month" ) });
	
	
}

Tickee.resultPlan = function() {

	form = $$("module.calculate input");

	var tpe = ( form[0].value )? form[0].value : 100;
	var epy = ( form[1].value )? form[1].value : 12;
	var sf  = ( form[2].value )? form[2].value : .5;
	var plan = ( tpe > 2500 )? 3000 : 300;
	
	console.log( "tpe: " + tpe );
	console.log( "epy: " + epy );
	console.log( "sf : " + sf  );
	
	result = tpe * epy * sf - plan;
	add = ( result > 0 )? "profit/year!" : "costs/year";

	Public.get("module.calculate").addClassName("center").update( "<div class='price'>&euro; " + result + " <i>" + add + "</i></div>Premium fees subtracted" ) 
	
	
}*/
/*
Tickee.activateSignupForm = function() {

	$( "email" ).observe( "blur", function( el ) {
		if( $( "email" ).value.length > 6 ) Tickee.xhr( '/XHR/user_search', { email: $( "email" ).value }, Tickee.asf.userCheck );
		//create_event(self, event_name, venue_id, price, units, currency="EUR")
		
		//account_exists
	});
	
	$( "account" ).observe( "blur", function( el ) {
		Tickee.xhr( '/XHR/account_exists', { account: $( "account" ).value }, Tickee.asf.accountCheck );
		//create_event(self, event_name, venue_id, price, units, currency="EUR")
	});
	
	$( "location" ).observe( "blur", function( el ) {
		Tickee.xhr( '/XHR/location_search', { location: $( "location" ).value, address: $( "address" ).value }, Tickee.asf.locationCheck );
		//create_event(self, event_name, venue_id, price, units, currency="EUR")
	});

	

}

Tickee.asf	= {

	userCheck		: function( data ) {
		
		if( data.responseJSON.exists )
			$( "email" ).addClassName( "error" ).up().writeAttribute( "info", "E-mail address already exists" )
			
		else $( "email" ).removeClassName( "error" )
	},
	
	accountCheck		: function( data ) {
		
		if( data.responseJSON.exists )
			$( "account" ).addClassName( "error" ).up().writeAttribute( "info", "Account already exists" )
			
		else $( "account" ).removeClassName( "error" )
	},
	
	locationCheck		: function( data ) {
		
		if( data.responseJSON.locations.size() )
			$( "location" ).addClassName( "exist" ).up().writeAttribute( "info", "Location already exists" )
			
		else $( "location" ).removeClassName( "exist" )
	},
	
	signup				: function( stage ) {

		if( !$( "email" ).hasClassName( "error" ))
			Tickee.xhr( '/XHR/create_user', { email: $( "email" ).value, password: $( "password" ).value }, Tickee.asf.signup_1 );
			

	},
	
	signup_1				: function( data ) {

		if( data.responseJSON.created )
				
				Tickee.xhr( '/XHR/create_account', { email: $( "email" ).value, account: $( "account" ).value, user:data.responseJSON.user.id }, Tickee.asf.signup_2 );
				$( "email" ).addClassName( "ok" );

	
	},
	
	signup_2				: function( stage ) {
		
		Tickee.xhr( '/XHR/create_location', { location: $( "location" ).value, address: $( "address" ).value }, Tickee.asf.signup_3 );
		$( "account" ).addClassName( "ok" );
		
	},
	
	signup_3				: function( stage ) {

		
		$$( "input" ).each( function( el ) { el.addClassName( "ok" ); });
			
 			
		//create_location(self, location_name, street_line1, postal_code, city, street_line2=None, country_code="BE")
	}

}*/