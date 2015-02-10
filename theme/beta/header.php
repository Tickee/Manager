<? include 'functions.php'; ?>

<!DOCTYPE html> 
<html lang="en"> 
<head>
	<meta charset="utf-8" /> 
	<meta http-equiv="X-UA-Compatible" content="chrome=1">

	<title>tickee &bullet; <?=$Page->get( "title" )?></title>
	
	<link rel="icon" href="/icon.png" />
	<link rel="stylesheet" href="<?=THEME?>style.css" type="text/css" media="screen,print" />
	<link rel="stylesheet" href="<?=THEME?>modules.css" type="text/css" media="screen,print" />
	<link href='http://fonts.googleapis.com/css?family=Droid+Sans:400,700' rel='stylesheet' type='text/css' />
	<script type='text/javascript' src='/theme/beta/js/public.js'></script>
	<script type='text/javascript' src='/theme/beta/js/dashboard.js'></script>
	<script type="text/javascript" src="https://www.google.com/jsapi"></script>
	<script type="text/javascript"> 
		google.load('visualization', '1', {packages:['corechart']});
	</script>

<?= ( $Page->mods->ids() )? "
	<script src='/script.mod?mods=" . implode( ",", $Page->mods->ids()) . "' type='text/javascript'></script>
	<link rel='stylesheet' href='/style.mod?mods=" . implode( ",", $Page->mods->ids()) . "' type='text/css' media='screen,print' />" : null ?>
	
</head>
<body <?= MOBILE? "id='mobile'": null ?>>

	<?= $Engine->template_( "html5.check" ); ?>
	
	<header>
		<nav>
			
		<?	if( count( $_SESSION['tickee']['user']->accounts ) > 1 ) {
				
				foreach( $_SESSION['tickee']['user']->accounts as $acc )
					$accounts[] = "<option" . (($acc->short_name == $Account->short_name)? " selected='selected'": null ) . " value='/account/{$acc->short_name}/dashboard'>{$acc->name}</option>";
				
				echo "<select>" . implode( "\n", $accounts ) . "</select>";
				
			} else echo "<div>{$Account->name}</div>";
		?>

			<ul>
				<a href='<?=user_url('');?>'><li class='user'><?=$User->first_name;?></li></a>
				<a href='http://tickee.zendesk.com' target='_blank'><li class='support'></li></a>
				<a href='<?=user_url('logout');?>'><li class='power'></li></a>
			</ul>
		</nav>
	
	
	
	<? foreach( array( 'account', 'event', 'ticket', 'people', 'location', 'settings', 'new' ) as $page )
		if( strpos( PAGE, $page ) !== false ) { $cur = $page;  break; }
	?>	
		
		<ul>
			<a href='<?=account_url('')?>' class='account<?= ( $cur == 'account')? " active'><li>Dashboard":"'><li>" ?></li></a>
			<a href='<?=account_url('events')?>' class='events<?= ( $cur == 'event')? " active'><li>Events":"'><li>" ?></li></a>
			<a href='<?=account_url('tickets')?>' class='tickets<?= ( $cur == 'ticket')? " active'><li>Tickets":"'><li>" ?></li></a>
			<a href='<?=account_url('people')?>' class='people<?= ( $cur == 'people')? " active'><li>People":"'><li>" ?></li></a>
			<a href='<?=account_url('locations')?>' class='locations<?= ( $cur == 'location')? " active'><li>Locations":"'><li>" ?></li></a>
			<a href='<?=account_url('settings')?>' class='settings<?= ( $cur == 'settings')? " active'><li>Settings":"'><li>" ?></li></a>
			<li class='new'>
				<ul class='submenu'>
					<a href='<?=account_url('event-new')?>'><li>Add Event</li></a>
					<a href='<?=account_url('location-new')?>'><li>Add Location</li></a>
				</ul>
			</li>
		</ul>
	
	<? if( PAGE == 'account' ) : ?>
			
		<div class='tooltip'>
			<ul><li>Events</li><li>Tickets</li><li>People</li><li>Locations</li></ul>
			<ul><li>New</li><li>Settings</li></ul>
		</div>
		
	 <? endif; ?>
	
	</header>