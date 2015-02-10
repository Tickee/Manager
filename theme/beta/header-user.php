<? include 'functions.php'; ?>

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
	
</head>
<body>

	<?= $Engine->template_( "html5.check" ); ?>
	
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
	
	
	
	<? foreach( array( 'user', 'mytickets', 'profile' ) as $page )
		if( strpos( PAGE, $page ) !== false ) { $cur = $page;  break; }
	?>	
		
		<ul>
			<a href='<?=user_url('')?>' class='account<?= ( $cur == 'user')? " active'><li>Dashboard":"'><li>" ?></li></a>
			<a href='<?=user_url('mytickets')?>' class='tickets<?= ( $cur == 'mytickets')? " active'><li>Tickets":"'><li>" ?></li></a>
			<a href='<?=user_url('profile')?>' class='people<?= ( $cur == 'profile')? " active'><li>Profile":"'><li>" ?></li></a>
			<a href='<?=user_url('profile-settings')?>' class='settings<?= ( $cur == 'settings')? " active'><li>Settings":"'><li>" ?></li></a>
			<li class='new'>
				<ul class='submenu'>
					<a href='http://tick.ee/signup'><li>New Account</li></a>
				</ul>
			</li>
		</ul>
		
		
	
	<? if( PAGE == 'user' ) : ?>
			
		<div class='tooltip'>
			<ul><li>Tickets</li><li>Profile</li></ul>
			<ul><li>Settings</li></ul>
		</div>
		
	 <? endif; ?>
	
	</header>
<? /* include 'functions.php'; ?>

<!DOCTYPE html> 
<html lang="nl"> 
<head>
	<meta charset="utf-8" /> 
	<meta http-equiv="X-UA-Compatible" content="chrome=1">

	<title>tickee &bullet; <?=$Page->get( "title" )?></title>
	
	<link rel="icon"		href="<?=THEME?>icon.png" />
	<link rel="stylesheet"	href="<?=THEME?>style.css" type="text/css" media="screen,print" />
	<script type='text/javascript' src='/theme/beta/js/public.js'></script>
	<script type='text/javascript' src='/theme/beta/js/dashboard.js'></script>

<?= ( $Page->mods->ids() )? "
	<script src='/script.mod?mods=" . implode( ",", $Page->mods->ids()) . "' type='text/javascript'></script>
	<link rel='stylesheet' href='/style.mod?mods=" . implode( ",", $Page->mods->ids()) . "' type='text/css' media='screen,print' />" : null ?>
	
</head>
<body>

	<?= $Engine->template_( "html5.check" ); ?>
	
	<header>
		<nav>
			
			<div><?= $User->first_name .' '. $User->last_name?></div>

			<ul>
				<a href='<?=user_url('');?>'><li class='user'><?=$User->first_name;?></li></a>
				<a href='http://tickee.zendesk.com' target='_blank'><li class='support'></li></a>
				<a href='<?=user_url('logout');?>'><li class='power'></li></a>
			</ul>
		</nav>
	
	
	
		<ul>
			<li><a href='<?=user_url('') . (( PAGE == 'user')? "' class='active'":'' )?>'>Dashboard</a></li>
			<li><a href='<?=user_url( 'mytickets' ) . (( PAGE == 'mytickets')? "' class='active":'' )?>'>Tickets</a></li>
			<li><a href='<?=user_url( 'profile' ) . (( PAGE == 'profile')? "' class='active":'' )?>'>Profile</a></li>
			<li><a href='<?=user_url( 'logout' )?>'>Log out</a></li>
		</ul>
		
	</header>
*/ ?>