<? include 'functions.php'; ?>


<!DOCTYPE html> 
<html lang="nl"> 
<head>

	<title>tickee &bullet; <?=$Page->get( "title" )?></title>
	
	<?=$Engine->template_( "html5.header", $Page->mods->ids() ) ?>
	<script type='text/javascript' src='https://www.google.com/jsapi'></script>
	<link rel="stylesheet"	href="<?=THEME?>dashboard.css" type='text/css' media='screen,print' />

</head>
<body>

	<header>

	<nav>
		<ul>
			<li><a href='<?=dashboard_url( '', $_SESSION['uid'], 'user' )?>'>Me</a></li>
			<li><a href='http://tickee.zendesk.com'>Support</a></li>
			<li><a href='<?=dashboard_url( 'logout', $_SESSION['uid'], 'user' )?>'>Log out</a></li>
		</ul>
		
		
		<ul>
			<li><a href='<?=dashboard_url( '', $id, $type ) . (( PAGE == 'account')? "' class='active'":'' )?>'>Dashboard</a></li>
			<li><a href='<?=dashboard_url( 'events', $id, $type ) . (( PAGE == 'events')? "' class='active'":'' )?>'>Events</a></li>
			<li><a href='<?=dashboard_url( 'tickets', $id, $type ) . (( PAGE == 'tickets')? "' class='active'":'' )?>'>Tickets</a></li>
			<li><a href='#'>People</a></li>
			<li><a href='<?=dashboard_url( 'settings', $id, $type ) . (( PAGE == 'settings')? "' class='active'":'' )?>'>Account Settings</a></li>
		</ul>

	</nav>

	<a href="<?=dashboard_url( '', $id, $type )?>" class='shield'><img src="<?=THEME?>img/logo.account.png" alt="tickee Dashboard" /></a>

	</header>