	<? if(!IE): ?>
	
	<footer>
		<a href="http://tick.ee">&copy; 2011 tickee bvba.</a>
	</footer>
	
	<? endif; ?>

	<script src="http://www.google-analytics.com/ga.js" type='text/javascript'></script> 
	<script type="text/javascript"> 
		var pageTracker = _gat._getTracker("UA-29867136-5");
		pageTracker._initData();
		pageTracker._trackPageview();

	</script>

<?
#	EXTENSION CHECK
	if( $Account && ( $path = $Account->check_extension( PAGE, 'js' )))
		
		echo "<script src='http://tick.ee$path' type='text/javascript'></script>";
?>

<?	if( PAGE != "ticket" ) : ?>
	<script type="text/javascript"> 

		if( window.innerHeight > 436 )
			Public.get('#widget').style.marginTop = Math.round(( window.innerHeight -436)/3 ) + "px";

	</script>
<? endif; ?>	
</body>
</html>