
<section>

<?
	
#	Account Interface
	if( $type == "account" ) :
	
		$evt_list = array();
?>	
	<aside>
		<ul>
			<? 
				if( $Account->events ) : 
					foreach( $Account->events as $Evt )

						if( strtotime( $Evt->dates[0] ) >= time())
							$evt_list[] = "<li><a href='" . account_url('event', $Evt->id ) . "'>{$Evt->name}</a></li>";
			
			?>
			<li activatable>
				Events <span class='count'><?=count( $evt_list )?></span>
				<ul hidable>
					<li class='additional'><a href='<?=account_url('events')?>'>Show all events</a></li>
					<li class='additional'><a href='<?=account_url('event-new')?>'>Create new event</a></li>
					<?= implode("\n", $evt_list ) ?>
				</ul>
			</li>
			<?	else :	?>
			<li>
				<span class='postit'>
					<strong>Hello new user</strong><br />
					Are you ready to create your first event?<br /><br />
					<a href='event-new' class='button add'>Add Event</a>
				</span>
			</li>
			
			<? endif; ?>
			<li activatable>
				Mini-Site
				<ul hidable>
					<li><a href='http://tick.ee/a/<?=$Account->short_name?>' target='_blank'>Show mini-site</a></li>
					<li><a href='<?=account_url('settings-styling')?>'>Edit style</a></li>
				</ul>
			</li>
			<li activatable>
				Settings
				<ul hidable>
					<li><a href='<?=account_url('settings')?>'>Account overview</a></li>
					<li><a href='<?=account_url('settings-social')?>'>Social options</a></li>
					<li><a href='<?=account_url('settings-psp')?>'>Payment Provider</a></li>
					<li><a href='<?=user_url('')?>'>Personal Settings</a></li>				
				</ul>
			</li>
			<li></li>
		</ul>		
	</aside>

	
	
	<? endif;
	

#	User Interface
	if( $type == "user" && $User->accounts ) :
		
		foreach( $User->accounts as $Act )
		
			$act_list[] = "<li><a href='/account/{$Act->short_name}/dashboard'>{$Act->name}</a></li>";
			
	?>
	
	<aside>
		<ul>
			<li activatable>
				Accounts <span class='count'><?=count( $act_list )?></span>
				<ul hidable>
					<li class='additional'><a href='http://tick.ee/signup'>Create an Instant tickee Account!</a></li>
					<?= implode("\n", $act_list ) ?>
				</ul>
			</li>
			<li activatable>
				Settings
				<ul hidable>
					<li><a href='<?=user_url('profile')?>'>Personal Settings</a></li>
					<li><a href='<?=user_url('password')?>'>Change Password</a></li>
				</ul>
			</li>
			<li></li>
		</ul>		
	</aside>

	<? endif; ?>

	<div>

		<h1><?=$Page->get( 'title' )?></h1>
		
		<div>

		<? if( $sections = $Page->filter_sections())
			foreach( $sections as $section ) : ?>
	
			<section<? if($section->class): ?> class="<?=$section->class?>"<? endif; ?>>
				<div>
			
				<?= implode( "\n", $section->mods ) ?>
			
				</div>
			</section>
	
		<? 	endforeach; ?>
		
		</div>

	</div>

</section>