
var Admin = {

	sitemapUpdate	: function( obj, source, target, copy ){

		siblings = []
		target.select( "> ." + target.childclass ).each( function( child ){ siblings.push( child.id ) });
		
		Tickee.xhr( '/admin/XHR/sitemap', {
				page		: obj.id,
				srcElement	: source.id,
				trgElement	: target.up().id,
				siblings	: siblings,
				copy		: copy
			}, Admin.sitemapUpdateResponse );
	},
			
	sitemapUpdateResponse	: function( e ) {
		
		Tickee.growl( "sitemap updated" )
	},

	addPage			: function(  ) {

		window.location = "/admin/editpage";
		
		/*$('orphans').down("ul").insert(
			new Element( "li", { class: 'dragchild' }
		).insert(
			new Element( "a", { href: '#' }).update( "new page" )
		).insert(
			" (give_unique_id_first)"
		).insert(
			ul = new Element( "ul", { class: 'dropfield' })
		))

		Dropfield( ul, "dragchild" );	
		ul.addListener( "drop", Admin.sitemapUpdate )*/
	}
}

Admin.cb = {

	addBlock		: function() {
		if(  $$( ".cbrow" ).size())
			 Tickee.xhr( '/admin/XHR/addmodule', { page: Tickee.current }, Admin.cb.addBlockAfterXHR );
		else Tickee.growl( "Create a row first." );
	},
	
	addBlockAfterXHR	: function( data ) {
		
		if( data.responseJSON.id )
		
			 $$( ".cbrow" ).pop().addChild({ cbid: data.responseJSON.id, resizable: true, grid: 1, draggable: true, module: true }, "<span field='title'></span><br />" + data.responseJSON.type );
		else Tickee.growl( "Adding failed. Please try again." )
	},
	
	addRow		: function() {
		
		Tickee.xhr( '/admin/XHR/addsection', { page: Tickee.current }, Admin.cb.addRowAfterXHR );
	},
	
	addRowAfterXHR	: function( data ) {
		
		if( !data.responseJSON.id )
			return Tickee.growl( "Adding failed. Please try again." );
		
		row		= new Element( "ul", { "class": "cbrow", deletable: true });
		target	= $$( ".cbrow" ).size()? $$( ".cbrow" ).pop() : $("cb").down();

		target.insert({ after:	row });
		Dropfield( 				row, "cblock", Admin.cb.childListeners, true ).addListener( "delete", Admin.cb.deleteSection );
	},

	
	update			: function( e ) {
	
		console.log( "FooBar." )
	},
	
	updateGrid			: function( el ) {
		
		Tickee.xhr( '/admin/XHR/updatemodule', { page: Tickee.current, modid: el.readAttribute('cbid'), span: el.columnspan, sectionid: el.up().readAttribute('sectionid') }, null );
	},
	
	deleteSection		: function( el ) {

		Tickee.xhr( '/admin/XHR/deletesection', { page: Tickee.current, sectionid: el.readAttribute('sectionid') }, null );
	},
	
	deleteModule		: function( el ) {

		Tickee.xhr( '/admin/XHR/deletemodule', { page: Tickee.current, modid: el.readAttribute('cbid'), sectionid: el.up().readAttribute('sectionid') }, null );
	},
	
	editModule			: function( el ) {
		
		Tickee.xhr( '/admin/XHR/readmodule', { page: Tickee.current, modid: el.readAttribute( "cbid" )}, Admin.cb.editModuleAfterXHR );
		
	},
	
	editModuleAfterXHR	: function( data ) {
	
		$('message').show().update( content = new Element( "div", { "class":"content" }));
		content.update( new Element( "div", { class: "killdot" }).update( "x" ).observe( "click", function(){ $('message').hide(); }));
		
		data	= data.responseJSON;
		
		title	= new Element( "span", { contenteditable: "true", cbid: data.id, field: "title" }).update( data.title ).observe( "blur", Admin.cb.postModuleEdit );
		title.content = data.title;
		
		if( data.type == "basic" )
			content.insert( title ).insert( new Element( "span", { contenteditable: "true", cbid: data.id, field: "content" }).update(  data.content ).observe( "blur", Admin.cb.postModuleEdit ));
	},
	
	postModuleEdit		: function() {
		if( this.content != this.innerHTML ) {
			this.content  = this.innerHTML
			
			cbid = this.readAttribute('cbid');
			field = this.readAttribute('field');
			
			Tickee.xhr( '/admin/XHR/updatemodule', { page: Tickee.current, modid: cbid, field: field, update: this.content }, null ); //, sectionid: el.up().readAttribute('sectionid')
			
			Admin.cb.syncFields( this.content, cbid, field );
		}
	},
	
	syncFields			: function( content, cbid, field )	{
		
		$$("[cbid= " + cbid + "] [field= " + field + "], [cbid= " + cbid + "] > [field= " + field + "]").each( function( el ){ el.update( content ); });
	}
}

Admin.cb.childListeners = {
			"drop"		: Admin.cb.update,
			"resize"	: Admin.cb.updateGrid,
			"delete"	: Admin.cb.deleteModule,
	}