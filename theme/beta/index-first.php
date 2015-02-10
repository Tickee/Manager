<section id='first-time'>
	
	<? if( PAGE == 'account' || PAGE == 'events' ) : ?>
	
		<img src='/theme/beta/img/firsttime-event.png' alt='Event' />
		<div>
			<h1>Create your first Event</h1>
			Hello <?=$User->first_name?>. Are you ready to create your first event?<br />
			We prepared a video tutorial to assist you, but don’t be afraid to experiment yourself.
			
			<br /><br /><br /><a href='<?=account_url('event-new')?>' class='button'>Add Event</a>
		</div>
		
	<? elseif( PAGE == 'locations' ) : ?>
		
		<img src='/theme/beta/img/firsttime-location.png' alt='Event' />
		<div>
			<h1>Create your first Location</h1>
			Are you ready to create your first location?<br />
			We prepared a video tutorial to assist you, but don’t be afraid to experiment yourself.
			
			<br /><br /><a href='<?=account_url('location-new')?>' class='button'>Add Location</a>
			<br /><br /><br /><small>We work together with <strong>Foursquare</strong> to share all usable information of your location with your visitors.</small>
		</div>
	
	<? endif; ?>
			
</section>

<ul id='info'>
	
	<li>
		<br />
		<h1><?= $Account->name ?></h1>
		<?= $Account->subscription->type ? 'Premium': 'Free' ?> Account
	</li>

	<li class="video">
		Watch our <a href="http://support.zendesk.com">video tutorial</a>
	</li>


</ul>