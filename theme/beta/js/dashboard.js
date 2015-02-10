var Dashboard = {
	
	header		: function() {
		
		if( Public.get('nav > select') )
			Public.get('nav > select').addEventListener('change', function( e ){ window.location = e.target.value });
	}
}
