<? include 'functions.php'; ?>


<!DOCTYPE html> 
<html lang="nl"> 
<head>

	<title>tickee &bullet; <?=$Page->get( "title" )?></title>
	
	<?=$Engine->template_( "html5.header", $Page->mods->ids() ) ?>
	<link rel="stylesheet"	href="<?=THEME?>dashboard.css" type='text/css' media='screen,print' />

	<header>

	<nav>
		<ul>
			<li><?=$id?></li>
			<li><a href='http://tickee.zendesk.com'>Support</a></li>
			<li><a href='<?=dashboard_url( 'logout', $_SESSION['uid'], 'user' )?>'>Log out</a></li>
		</ul>
		
		<ul>
			<li><a href='<?=dashboard_url( '', $_SESSION['uid'], $type ) . (( PAGE == 'user')? "' class='active":'' )?>'>Dashboard</a></li>
			<li><a href='<?=dashboard_url( 'mytickets', $_SESSION['uid'], $type ) . (( PAGE == 'mytickets')? "' class='active":'' )?>'>Tickets</a></li>
			<li><a href='<?=dashboard_url( 'social', $_SESSION['uid'], $type )?>'<?=(( PAGE == 'social')? " class='active'":'' )?>>Social</a></li><? /**/ ?>
			<li><a href='/user/<?=$id?>/dashboard/password<? /*=dashboard_url( 'profile', $_SESSION['uid'], $type )?>'<?=(( PAGE == 'profile')? " class='active'":'' )*/ ?>'>Profile</a></li>
		</ul>
	</nav>

	<a href="<?=dashboard_url( '', $_SESSION['uid'], $type )?>" class='shield'><img src="<?=THEME?>img/logo.user.png" alt="tickee Dashboard" /></a>

</header>