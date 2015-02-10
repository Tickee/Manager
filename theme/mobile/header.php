<? include 'functions.php'; ?>

<!DOCTYPE html> 
<html lang="nl"> 
<head>
	<meta charset="utf-8" /> 
	<meta http-equiv="X-UA-Compatible" content="chrome=2">

	<title>tickee &bullet; <?=$Page->get( "title" )?></title>
	
	<link rel="icon"		href="<?=THEME?>icon.png" />
	<link rel="stylesheet"	href="<?=THEME?>style.css" type="text/css" media="screen,print" />
	<link rel="stylesheet"	href="<?=THEME?>modules.css" type='text/css' media='screen,print' />
	<script type='text/javascript' src='/theme/mobile/js/tickee.js'></script>
	<script type='text/javascript' src='/theme/mobile/js/public.js'></script>
	<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/prototype/1.7.0.0/prototype.js'></script>
	<script type="text/javascript" src="https://www.google.com/jsapi"></script>
	<script type="text/javascript"> 
		google.load('visualization', '1', {packages:['corechart']});
	</script>
	

<?= ( $Page->mods->ids() )? "
	<script src='/script.mod?mods=" . implode( ",", $Page->mods->ids()) . "' type='text/javascript'></script>
	<link rel='stylesheet' href='/style.mod?mods=" . implode( ",", $Page->mods->ids()) . "' type='text/css' media='screen,print' />" : "" ?>
	
</head>
<body>
	
	<header>
		<nav>
			<a href="<?=dashboard_url( '', $id, $type )?>"><img class='logo' src="<?=THEME?>img/logo.account.png" alt="Dashboard" /></a>
			
			<span>Welcome back <?=$User->first_name?></span>
			
			<?
				if( $type == 'account' )
						echo "
						<div class='current'>{$Account->name}</div>
						<img src='" . THEME . "img/nav.account.active.png' /><a href='" . user_url('') . "'><img src='" . THEME . "img/nav.user.png' /></a>";
						
				else	echo "
						<div class='current'>{$User->first_name} {$User->last_name}</div>
						<img src='" . THEME . "img/nav.account.png' /><img src='" . THEME . "img/nav.user.active.png' />";				

			?>

		</nav>
		
	<? if( $type == "account" ) : ?>	
		
		<ul>
			<li><a href='<?=account_url('') . (( PAGE == 'account')? "' class='active'":'' )?>'>Dashboard</a></li>
			<li><a href='<?=account_url('events') . (( PAGE == 'events')? "' class='active'":'' )?>'>Events</a></li>
			<li><a href='<?=account_url('tickets') . (( PAGE == 'tickets')? "' class='active'":'' )?>'>Tickets</a></li>
			<li><a href='<?=account_url('people') . (( PAGE == 'people')? "' class='active'":'' )?>'>People</a></li>
			<li><a href='<?=account_url('locations') . (( PAGE == 'locations')? "' class='active'":'' )?>'>Locations</a></li>
		</ul>
	
	<? elseif( $type == "user" ) : ?>
		
		<ul>
			<li><a href='<?=user_url('') . (( PAGE == 'user')? "' class='active'":'' )?>'>Dashboard</a></li>
			<li><a href='<?=user_url( 'mytickets' ) . (( PAGE == 'mytickets')? "' class='active":'' )?>'>Tickets</a></li>
			<li><a href='<?=user_url( 'profile' ) . (( PAGE == 'profile')? "' class='active":'' )?>'>Profile</a></li>
			<li><a href='<?=user_url( 'logout' )?>'>Log out</a></li>
		</ul>
	
	<? endif; ?>
		
	</header>