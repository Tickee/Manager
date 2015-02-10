
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
	},
	
	editAware	: function( page ) {
		
		Tickee.current = page
		
		$$("[contenteditable]").each( function(el){
			el.observe( "focus", Tickee.editFocus )
			el.observe( "blur", Tickee.editBlur )
		})
	},
	
	editFocus	: function( e ) {
		this.originalContent = this.innerHTML
	},
	
	editBlur	: function( e ) {
		
		if( this.innerHTML != this.originalContent )
			Tickee.xhr( '/admin/XHR/editpage', {
					page		: Tickee.current,
					lang		: Tickee.lang,
					element		: this.id,
					string		: this.innerHTML,
					srcString	: this.originalContent
				}, Tickee.editSucces );		
	},
	
	editSucces	: function( response ) {

		
		if( typeof response.responseJSON.status == "STRING" )
			console.log( status )
		
		else if( response.responseJSON.status.redir )
			window.location = response.responseJSON.status.redir;
			
	},
	
	tween			: function( obj, style, start, end, speed ) {
		
		if( !obj.tw ) obj.tw = {};
		if( !obj.twpos ) obj.twpos = {};
		
		if( obj.tw[ style ]) clearInterval( obj.tw[ style ]);
		
		obj.twpos[ style ] = start;
		
		obj.tw[ style ] = setInterval( LEDc._tweenfunc, 34, obj, style, end, speed );
	
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
		window.tw.scroll	= setInterval( Tickee._tweenScrollfunc, 34, end, speed );
	
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






var dragSrcEl = null;
var dragTouched = null;
var dragSibling = null;
var dragDirection = null;
var dragClickSelect = null;
var dragClickCopyState = null;
var dragKeyDown = "";
	
var Dropfield = function( element, class_allowed, childListeners ){
	
	if( !element )
		 element = new Element( "ul" );
	
	else if( typeof element == "STRING" )
		 element = $( element );

	/**
	 *	OBJECT EXTEND
	 *	Sugar the dropfield element	
	 */
	Object.extend( element, Dropfield.__proto__ );
	
	element.child.class		= class_allowed
	element.child.listeners	= childListeners
	
	return element.init();
}

/**
 *	prototype functions
 */
Dropfield.__proto__	= {
	
	child			: {
		class		: '',
		listeners	: {},
	},
	
	columns			: 9,	
	listener		: {},
	
	init			: function() {
		
		$$( "." + this.child.class ).each( this.childAware, this );
		
		if( this.readAttribute( 'deletable' ))	this.addDelete()
		
		Element.observe( document.body, "keydown", Dropfield.handleKeyDown )
		Element.observe( document.body, "keyup", Dropfield.handleKeyUp )

		return this.observe( 'dragenter', this.handleDragEnter
		   ).observe( 'dragover', this.handleDragOver
		   ).observe( 'dragleave', this.handleDragLeave
		   ).observe( 'drop', this.handleDrop );	
	},
	
	childAware		: function( child ) {
	
		if( !child.touched )
			 Object.extend( child, Dropfield.__childproto__ ).init( this.child );

	},
	
	addListener		: function( type, func ){
	
		this.listener[type] = func;
		return this;
	},
	
	addDelete		: function(){
	
		kill = new Element( "div", { class: "killdot" }).update( "x" )
		this.insert({ top: kill });
		
		return kill.observe( 'click', this.delete.bind( this ));
	},
	
	delete			: function() {
		this.listener.delete( this )
		this.remove()
	},
	
	addDropfield	: function( class_allowed ){
		
		field = new Element( "ul", { "class": this.className });
		this.insert({ after: field });
		
		return Dropfield( field, class_allowed, this.child );

	},
	
	addChild	: function( params, content ){
		
		params.class = ( params.class )?
			params.class +" "+ this.child.class : this.child.class;
		
		this.insert( li = new Element( "li", params ));
		this.childAware( li );
		
		if( content )
			li.update( content );
			
		li.draggable = "true";
		
		return li;
	},
	
	handleKeyDown	: function(e) {
		
		dragKeyDown = dragKeyDown + "." + e.keyCode;

		
		switch( dragKeyDown ) {
			case ".91.67":
				dragClickSelect.addClassName( "copyState" );
				dragClickCopyState = Dropfield.handleEndSelect( dragClickSelect );
				break;
				
			case ".91.88":
				dragClickSelect.addClassName( "cutState" );
				dragClickCopyState = Dropfield.handleEndSelect( dragClickSelect );
				break;
				
			case ".91.86":
				parent = dragClickCopyState.up(1);
				dragClickSelect.down( "ul" ).insert(( dragClickCopyState.hasClassName( "cutState" ))? dragClickCopyState : dragClickCopyState.cloneNode( true ));
				Dropfield.listener.drop( dragClickCopyState, parent, dragClickSelect.down("ul"), dragClickCopyState.hasClassName( "copyState" ));
				Dropfield.handleEndKeyCSS();
				break;
		}
		
		//var dragKeyStatus = null;
	},
	
	handleKeyUp	: function(e) { dragKeyDown = "" },
	
	handleEndSelect	: function( trg ) {
	
		$$( ".selected" ).invoke( "removeClassName", "selected" );
		dragClickSelect = null;
	
		return trg;
	},
	
	handleEndKeyCSS : function() {
		$( dragClickSelect, dragClickCopyState ).invoke( "removeClassName", "selected" );
		$( dragClickSelect, dragClickCopyState ).invoke( "removeClassName", "copyState" );
		$( dragClickSelect, dragClickCopyState ).invoke( "removeClassName", "cutState" );
	},
		
	handleDragOver	: function(e) {
		
		this.addClassName('over');
		dragTouched = this
		
		e.preventDefault();
 		e.dataTransfer.dropEffect = 'move';
		return false;
	},
	
	handleDragEnter	: function(e) { dragTouched = this },
	
	handleDragLeave	: function(e) { this.removeClassName('over') },
	
	handleDragEnd	: function(e) {
	
		$$( "." + this.touched ).invoke( "removeClassName", 'over' );
		this.removeClassName('drag');
 	},
 	
 	handleDrop		: function(e) {

		this.removeClassName( "over" );

		if (e.stopPropagation)
			e.stopPropagation();
			
		columncount = 0;
		
		if( dragSrcEl.hasClassName( this.child.class ) && !this.descendantOf( dragSrcEl ) && this.columns > this.childElements().size() ) {

			srcEl = dragSrcEl.up(1);
			child = dragSrcEl.remove();
			
			if(  dragTouched && dragSibling && dragSibling.descendantOf( this ))
		 
				 dragSibling.insert({ before: child })	
			else this.insert(( dragDirection )? { "top": child }: { "bottom": child });

			if( this.listener.drop )
				this.listener.drop( child, srcEl, this, false );
		}
		
		return false;
	}
 	
}

/**
 *	prototype functions for dropfield child
 */
Dropfield.__childproto__	= {
	
	blockperc			: 10,
	columnspan 			: 1,
	
	listener			: {},
	
	init		: function( dna ) {
		
		if( this.readAttribute( 'resizable' ))	this.addSizers()
		if( this.readAttribute( 'grid' ))		this.snapSize( Number( this.readAttribute('grid')) -1 )
		
		this.addDelete()
		
		$H( dna.listeners ).each( function( node ){ this.addListener( node.key, node.value )}, this );

		this.observe( 'dragstart', this.handleDragStart
			).observe( 'dragenter', this.handleDragEnterSibling
			).observe( 'dragover', this.handleDragOverSibling
			).observe( 'dragleave', this.handleDragSiblingLeave
			).observe( 'dragend', this.handleDragEnd
			).observe( 'click', ( this.readAttribute( "module" ))? this.handleModule : this.handleSelect
			).touched = dna.class;
	},
	
	addListener		: function( type, func ){
	
		this.listener[type] = func;
		return this;
	},
	
	addDelete		: function(){
	
		kill = new Element( "div", { class: "killdot" }).update( "x" )
		this.insert({ top: kill });
		
		return kill.observe( 'click', this.delete.bind( this ));
	},
	
	delete			: function() {
		this.listener.delete( this )
		this.remove()
	},
	
	addSizers		: function(){
	
		this.insert( dot = new Element( "div", { class: "dragdot right" }));
		
		dot.observe( 'dragstart', this.sizerDragStart.bind( this )
		  ).observe( 'drag', this.sizerDrag.bind( this )
		  ).observe( 'dragend', this.sizerDragEnd.bind( this )
		  ).draggable = true;

	},
	
	sizerDragStart	: function( e ){
				
		e.dataTransfer.effectAllowed = 'none';
		this.startWidth	= this.getWidth();
		this.startX		= e.clientX;
		
		this.parentWidth = this.up().getWidth();
		
	},
	
	sizerDrag		: function( e ){
	
		width	= ( this.startWidth + e.clientX - this.startX );
		am		= Math.round(( width / ( this.parentWidth * .99 )) * 9 );
		
		if( this.columnspan != am ) {
			this.resizeSiblings( am );
			this.snapSize();
		}
	},
	
	sizerDragEnd	: function( e ){
	
		this.resizeCall();
		
	},
	
	resizeSiblings		: function( am ){
	
		count		= am;
		siblings	= this.siblings();
		
		if( siblings ) {
			siblings.each( function( el ){  count += el.columnspan; });
		
			count = ( count > 9 )? count -9 : 0;
		
			siblings.each( function( el ){ 
		
				if( count ) {
					recount = ( el.columnspan > count )? -count : 1 - el.columnspan; 
					el.snapSize( recount, true );
					count += recount;
				}
			});
		}
		
		this.columnspan = ( am - count > 9 )? 9 : am - count;
		
		return this;
	},
	
	snapSize		: function( n, call ){
	
		if( n ) this.columnspan += n;
		this.style.width	= ( this.columnspan * this.blockperc + this.columnspan -1 ) + "%";
		
		if( call )
			this.resizeCall();
	},
	
	resizeCall		: function() {
		
		this.listener.resize( this );
	},
		
	handleSelect	: function(e) {
		
		$$( ".selected" ).invoke( "removeClassName", "selected" );
		e.target.addClassName( "selected" );
		
		dragClickSelect = e.target;
	},
	
	handleModule	: function(e) {
		
		Admin.cb.editModule( this );
	},
	
	handleDragStart	: function(e) {
		
		if( !dragSrcEl || !dragSrcEl.descendantOf( this )) 
			 dragSrcEl = this.addClassName( "drag" );
		
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/html', this.innerHTML );
	},
		
	handleDragOverSibling	: function(e) { dragSibling = this.addClassName('over') },
	
	handleDragEnterSibling	: function(e) { dragSibling = this.addClassName('over') },
	
	handleDragSiblingLeave	: function(e) {
		
		this.removeClassName('over');
		if( dragSibling )
			dragDirection = ( dragSibling.parentNode.firstDescendant() == dragSibling );
		
		dragSibling = null;
	},
	
	handleDragEnd	: function(e) {
	
		$$( "." + this.touched ).invoke( "removeClassName", 'over' );
		this.removeClassName('drag');
 	}
 	
}