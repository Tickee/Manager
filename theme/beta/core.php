	<aside>
		<ul>
		</ul>		
	</aside>

	<section>
		
		<h1><?=$Page->get( 'title' )?></h1>

		<section>
			<div>
		
			
		
			</div>
		</section>
			
	</section>
	
	
	<ul id='info'>
		
		<li>
			<h2>Inside Modules</h2>
		
		<?	$pages = $DB->filter_pages();
			foreach( $pages as $Pg ) {
				
				if( $blocks = $Pg->get('mods'))
					foreach( $blocks as $block )
						foreach( $block->mods as $id ){
						
						$mods[$id]->id = $id;
						$mods[$id]->pages[$Pg->get( 'name' )] = $Pg->get( 'name' );
					}
						
				if( $block = $Pg->get('info'))
					foreach( $block as $id ){
						
						$mods[$id]->id = $id;
						$mods[$id]->pages[$Pg->get( 'name' )] = $Pg->get( 'name' );
					}
			}
			
			ksort( $mods );
			foreach( $mods as $mod ) $lines[] = "<span class='highlight'><strong>{$mod->id}</strong><span> " . implode( ', ', $mod->pages ) . "</span></span> "; 
		
			echo implode( "", $lines );
		?>
		
		</li>
		
		<li>
			<h2>Inside Module-actions</h2>
		
		<?	$modules = $DB->filter_objects('module');
			$mods = array();
			
			foreach( $modules as $Mod ) {
				
				$Mod = json_decode( $Mod->get('json'));
				$mods[$Mod->mod][$Mod->action] = $Mod->action; 
			}
			
			ksort( $mods );
			foreach( $mods as $name=> $mod ) echo "<span class='highlight'><strong>{$name}</strong><span> " . implode( ', ', $mod ) . "</span></span> "; 
	
		?>
		
		</li>

		
	</ul>