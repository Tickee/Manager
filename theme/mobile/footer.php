
	<footer>
		<ul>
			<li class="blank"></li>
			<?
	
			$icons = array( $type => ($type =='account')? account_url(''): user_url(''), 'support'=> 'http://tickee.zendesk.com', 'tickee'=> 'http://tick.ee', 'features'=> 'http://tick.ee/features', 'developers'=> 'http://dev.tick.ee');	
			$n = 0;
				
			foreach( $icons as $icon=> $url ) : ?>
					
					<li<?=$n? '':" class='active'"?>><a href='<?=$url?>' title='<?=ucfirst( $icon )?>'><img src='<?=THEME?>img/options.icon.<?=$icon?>.png' alt='<?=ucfirst( $icon )?>' /><?=ucfirst( $icon )?></a></li>
				
			 <? $n++; endforeach; ?>
			<li class="blank"></li>
		</ul>
		
		<p>
			<a href="http://tick.ee/tickee/about">&copy; 2011 tickee bvba.</a>
		</p>
		
	</footer>

	
	
	<script type="text/javascript"> 
					
			Public.enable_switches();
			Public.enable_activatable();

	</script>

	<script src="http://www.google-analytics.com/ga.js" type='text/javascript'></script> 
	<script type="text/javascript"> 
		var pageTracker = _gat._getTracker("UA-29867136-6");
		pageTracker._initData();
		pageTracker._trackPageview();

	</script>
	
</body>
</html>