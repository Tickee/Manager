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
		
		