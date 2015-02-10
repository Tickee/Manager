<?
	if((( PAGE == 'account' || PAGE == 'events' ) && !$Account->events ) || ( PAGE == 'locations' && !$Account->locations )) : include( "index-first.php" );
	
	else :
	
?>

	<aside>
		<ul><?
		
	$asides = array(
		'account'=> array('events','minisite','settings'),
		'events'=> array('events', 'event-new'),
		'event'=> array( 'event', 'event-edit', 'event-social', 'event-sales', 'event-people' ),
		'event-new'=> array( 'event-new' ),
		'tickets'=> array('events'),
		'people'=> array( 'events' ),
		'person'=> array( 'people' ),
		'locations'=> array( 'location-new', 'events' ),
		'location'=> array( 'location', 'location-edit', 'location-new' ),
		'location-new'=> array( 'location-new' ),
		'settings'=> array( 'settings', 'minisite', 'extensions' ),
		'extensions'=> array( 'extensions', 'settings'  ),

		'user'=> array( 'user-aside' ),
		'mytickets'=> array( 'user-aside' ),
		'order'=> array( 'user-aside' ),
		'profile'=> array( 'user-settings' ),
		'password'=> array( 'profile', 'profile-social', 'profile-settings', 'password' ),
		'activate'=> array( 'user-aside' ),
		'logout'=> array( 'profile' ),
	);
		
	$aside = $asides[PAGE]? $asides[PAGE]: $asides[$cur];
	
	foreach( $aside as $line )
				
		switch ( $line ) {
			case 'events':
				
				$evt_list = array();
					
				if( $Account->events )
					foreach( $Account->events as $Evt )

						if( strtotime( $Evt->dates[0] ) >= time()) $evt_list[] = "<li><a href='" . account_url('event', $Evt->id ) . "'>{$Evt->name}</a></li>";
			?>
			<li>
				<a href='<?=account_url('events')?>'><strong>Events</strong> <span class='count'><?=count( $evt_list )?></span></a>
				<ul>
					<?= implode("\n", $evt_list ) ?>
				</ul>
			</li>
			<?
				break;
				
			case 'minisite':
				
				$minisite = "http://tick.ee/a/" . $Account->short_name;
			?>
			<li>
				<a href='<?=$minisite?>' target='_blank'><strong>Mini-Site</strong></a>
			</li>
			<?
				break;
				
			case 'settings':
				
			?>
			<li>
				<a href='<?=account_url('settings')?>'><strong>Settings</strong></a>
				<ul>
					<li><a href='<?=account_url('settings')?>'>Account overview</a></li>
					<li><a href='<?=account_url('settings-psp')?>'>Payment options</a></li>
					<li><a href='<?=account_url('settings-social')?>'>Social options</a></li>
					<li><a href='<?=account_url('settings-styling')?>'>Styling options</a></li>
					<li><a href='<?=user_url('')?>'>Personal Settings</a></li>				
				</ul>
			</li>

			<?
				break;
				
			case 'extensions':
				
				$extensions = json_decode( @file_get_contents( "http://tick.ee/ext/overview.json" ));
			?>
			<li>
				<a href='<?=account_url('extensions')?>'><strong>Extensions</strong></a>
				<ul>
					<? if(! $Account->ext->minisite) : ?><li><a href='<?=account_url('extensions', 'minisite')?>'>Mini-site</a></li><? endif; ?>
					
					<? if( $Account->ext )
							foreach( $Account->ext as $key=> $ext )
								echo "<li><a href='" . account_url('extensions', $key ) . "'>{$extensions->{$key}->name}</a></li>";
					?>				
				</ul>
			</li>

			<?
				break;
			
			case 'location':
			case 'location-edit':
				global $Tickee, $Location;
				
				if(!$Location )
					$Location = json_decode( $Tickee->get("/locations/", (int) $_GET['key']));
				
			?>
			<li<?= ( PAGE == $line )? " class='active'": null ?>>
				<a href='<?=account_url( $line, $Location->id )?>'><?= ( $line=='location-edit' )? 'Edit': null ?> Location</a>
			</li>

			<?
				break;
				
			case 'user-aside':
				
				$accounts = array();
				
				if( $User->accounts )
					foreach( $User->accounts as $acc ) $accounts[] = "<li><a href='/account/{$acc->short_name}/dashboard'>{$acc->name}</a></li>";
					
				else {
					
					$orders = array();

					if(!$User->orders )
						$User->orders = json_decode( $Tickee->get("/users/%/orders", $User->id ));
					
					foreach( $User->orders as $order )
						$orders[] = "<li><a href='#'>{$order->events[0]->name}</a></li>";
					
					$orders = array_slice( $orders, -11, 11 );
					if( count( $orders ) == 11 )
						$orders[] = "<li><a href='" . user_url( 'mytickets' ) . "'>...</a></li>"; 
				

				}
			?>
			<li>
				<a href='<?= $accounts? user_url(''): user_url('mytickets')?>'><strong><?= $accounts? 'Accounts': 'Orders'?></strong> <span class='count'><?=count( $accounts? $accounts: $orders )?></span></a>
				<ul>
					<?= implode("\n", $accounts? $accounts: $orders ) ?>
				</ul>
			</li>
			<?
				break;
				
				
			case 'user-settings':
				
				
				foreach( array('profile', 'profile-social', 'profile-settings', 'password') as $pge ) :
					
					$Pg = new PAGE($pge);
				?>
			
			<li<?= ( $Pg->name == PAGE )? " class='active'": null ?>>
				<a href='<?=user_url($pge)?>'><?=$Pg->get('title')?></a>
			</li>
			
			<?	endforeach;
				break;
				
				
				
				


			default:
				$Pg = new PAGE($line);
				
				if( $Event ) $url = account_url($line, $Event->id);
				else if( $Location ) $url = account_url($line, $Location->id);
				else $url = account_url($line);
			?>
			<li<?= ( $Pg->name == PAGE )? " class='active'": null ?>>
				<a href='<?=$url?>'><?=$Pg->get('title')?></a>
			</li>
			<?
		}
	?>

		</ul>		
	</aside>


	<section>

		<h1><?=$Page->get( 'title' )?></h1>
		
		<? if( $sections = $Page->filter_sections())
			foreach( $sections as $section ) : ?>
	
			<section<? if($section->class): ?> class="<?=$section->class?>"<? endif; ?>>
				<div>
			
				<?= implode( "\n", $section->mods ) ?>
			
				</div>
			</section>
	
		<? 	endforeach; ?>
	
	<? if( !MOBILE ) : ?></section><? endif; ?>
		
		<ul id='info'>
			<li>
				<? if( $list = $Page->filter_list('info'))
			
					echo implode( "</li>\n<li>", $list );
		
					/*if( $Event ) echo MODULE::render( json_decode('{"mod":"tickee.su_event", "action":"sidebar"}'))->output();*/ ?>
			</li>
		</ul>
	
	<? if( MOBILE ) : ?></section><? endif; ?>
	

<? 	endif; ?>