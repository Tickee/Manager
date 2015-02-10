<?	include 'functions.php';
	if( $Account->short_name != 'tickee') header( "Location: /404" );
?>

<!DOCTYPE html> 
<html lang="en"> 
<head>
	<meta charset="utf-8" /> 
	<meta http-equiv="X-UA-Compatible" content="chrome=1">

	<title>tickee &bullet; <?=$Page->get( "title" )?></title>
	
	<link rel="icon" href="<?=THEME?>icon.png" />
	<link rel="stylesheet" href="<?=THEME?>style.css" type="text/css" media="screen,print" />
	<link rel="stylesheet" href="<?=THEME?>modules.css" type="text/css" media="screen,print" />
	<link href='http://fonts.googleapis.com/css?family=Droid+Sans:400,700' rel='stylesheet' type='text/css' />
	<script type='text/javascript' src='/theme/beta/js/public.js'></script>
	<script type='text/javascript' src='/theme/beta/js/dashboard.js'></script>

<?= ( $Page->mods->ids() )? "
	<script src='/script.mod?mods=" . implode( ",", $Page->mods->ids()) . "' type='text/javascript'></script>
	<link rel='stylesheet' href='/style.mod?mods=" . implode( ",", $Page->mods->ids()) . "' type='text/css' media='screen,print' />" : null ?>
	<style>
		
		#info .highlight span	{ display: none; }
		#info .highlight:hover span	{ display: inline; }
		
	</style>
</head>
<body>

	<header>
		<nav>
			
		<?	$accounts[] = "<option selected='selected' value='/user/{$User->id}/dashboard'>{$User->first_name} {$User->last_name}</option>";
				
			if( $User->accounts )
				foreach( $User->accounts as $acc ) $accounts[] = "<option value='/account/{$acc->short_name}/dashboard'>{$acc->name}</option>";
		?>
		
			<select><?= implode( "\n", $accounts ) ?></select>
	
			<ul>
				<a href='<?=user_url('');?>'><li class='user'><?=$User->first_name;?></li></a>
				<a href='http://tickee.zendesk.com' target='_blank'><li class='support'></li></a>
				<a href='<?=user_url('logout');?>'><li class='power'></li></a>
			</ul>
		</nav>

		<ul>
			<a href='<?=user_url('')?>' class='account'><li></li></a>
			<a href='#' class='core active'><li>Core overview</li></a>
			<a href='<?=user_url('profile-settings')?>' class='settings'><li></li></a>
			<li class='new'></li>
		</ul>
	</header>