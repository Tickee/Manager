<?

	if( PAGE == "login"
	&&	$_SESSION[ 'uid' ] && $_SESSION[ 'ip' ] == $_SERVER[ 'REMOTE_ADDR' ])
			
		return header( "Location: " . ( $_SESSION[ 'account' ]? "/account/" . $_SESSION[ 'account' ]: "/user/" . $_SESSION[ 'uid' ]) . "/dashboard" );

	else if( PAGE == "ticket" ) {
		
		$MOD = MOD_CONSTRUCT::render((object) array( 'mod'=> 'tickee.su_ticket' ));
		if( !$Ticket = $MOD->validateTicket())
		
			header( "Location: /404" );
	
	}
	
#	EXTENSION SENSITIVE PAGES
	if( in_array( PAGE, array( 'w-checkout' ))) {

#		IS THERE AN ACCOUNT?		
		if(!$Account )
			$Account = new ACCOUNT( $_GET['id']);
	}

?>
<!DOCTYPE html> 
<html lang="nl"> 
<head>

	<title>tickee <?=$Page->get( "title" )?></title>
	
	<? /*=$Engine->template_( "html5.header", $Page->mods->ids() )*/
	
		$mods = "?mods=" . implode( ",", $Page->mods->ids() );
	?>
	
	<meta charset="utf-8" /> 
	<meta http-equiv="X-UA-Compatible" content="chrome=2">
	<link rel="icon"		href="<?=THEME?>icon.png" />
	<link rel="stylesheet"	href="<?=THEME?>style.css" type="text/css" media="screen,print" />
	<link rel="stylesheet"	href="<?=THEME?>modules.css" type='text/css' media='screen,print' />

	<script src='/script.mod<?=$mods?>' type='text/javascript'></script>
	<link rel='stylesheet' href='/style.mod<?=$mods?>' type='text/css' media='screen,print' />

	<script type='text/javascript' src='<?=THEME?>js/prototype.js'></script>
	<script type='text/javascript' src='<?=THEME?>js/tickee.js?fresh=1'></script>
	<script type='text/javascript' src='<?=THEME?>js/public.js?fresh=1'></script>

</head>
<body id="<?=PAGE?>">

	<? if(!IE) : ?>
	<nav>

		<a href="http://tick.ee">Home</a>
		<a href="http://tickee.zendesk.com">Support</a>
		<?= ( PAGE == "login" )? "<a href='http://dev.tick.ee'>Developers</a>" : "<a href='/'>Log In</a>" ?>

	</nav>
	<? endif; ?>