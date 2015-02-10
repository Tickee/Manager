<?

/**
	 * Define DASHBOARD type
	 *
	 * Types: account, user or ticket.
	 * Get parameterr: "type"
	 *
	 */

	$type = simplestring( $_GET[ 'type' ]);
	$id = simplestring( $_GET[ 'id' ], $regexp = "/[^\w\s\.\-\_\@\&\+\:]/" );
	$event_id = (int) $_GET[ 'key' ];
	
	if( in_array( PAGE, array( "location", "location-edit" ))) $event_id = null;
	
	define( "MOBILE", ( strstr( $hua = strtolower($_SERVER['HTTP_USER_AGENT']), 'mobile') || strstr( $hua, 'android' )), true );
		 


/**
 *	Start with authorisation check.
 *
 */

global $Account, $Event, $User;

$MOD = MOD_CONSTRUCT::render((object) array( 'mod'=> 'tickee.su_user' ));
$Tickee = $MOD->construct();


/*#	ACTIVATION OR PASSWORD / AUTHORIZATION CHECK

if( $token = $_GET[ 'token' ] && ( PAGE == 'password' || PAGE == 'activate' ))

	if( PAGE == 'activate' && $_SESSION['tickee']['user'])
			header( "Location: /404" );

	try {	$_SESSION['tickee']['user'] = json_decode( $Tickee->get( '/users/', $id, array( 'token'=> simplestring( $_GET[ 'token' ]))));
			$_SESSION['tickee']['uid'] = (int) $id;
			$_SESSION['tickee']['ip'] = $_SERVER[ 'REMOTE_ADDR' ];
			
			//$Tickee->put( "/users/", $id, array( 'active'=> true ));


	} catch( TickeeException $e ) { header( "Location: /404" ); }

	
else */
if( !$_SESSION['tickee']['uid'] || $_SESSION['tickee']['ip'] != $_SERVER[ 'REMOTE_ADDR' ]) {
	
	unset( $_SESSION );
	header( "Location: /404" );	
}


/**
 *	Retreive USER
 *
 */

if( !	$_SESSION['tickee']['user'])
		$_SESSION['tickee']['user'] = json_decode( $Tickee->get( '/users/', $_SESSION['tickee']['uid']));

$User = $_SESSION['tickee']['user'];

if( !$User->accounts)
		$_SESSION['tickee']['user']->accounts = json_decode( $Tickee->get( '/users/%/accounts', $_SESSION['tickee']['uid']));

/**
 *	Retreive ACCOUNT
 *
 */
 
if( $type == 'account' ) {
	
	if( !$_SESSION['tickee']['account'] || $_SESSION['tickee']['account']->short_name != $id )
	
		foreach( $User->accounts as $account )
			if ( $account->short_name == $id )
			
				try {	$_SESSION['tickee']['account'] = json_decode( $Tickee->get( '/accounts/', $id )); } catch( TickeeException $e ) { header( "Location: /404" ); };


	if( !$_SESSION['tickee']['account'] ) header( "Location: /404" );
	
	
#	Get Event List
	if(!$_SESSION['tickee']['account']->events )
		$_SESSION['tickee']['account']->events = json_decode( $Tickee->get( '/accounts/%/events', $id, array( 'include_inactive'=> 1, 'include_private'=> 1, 'include_past'=> 1 )));
		
#	Get Locations
	if(!$_SESSION['tickee']['account']->locations )
		$_SESSION['tickee']['account']->locations = json_decode( $Tickee->get( '/accounts/%/locations', $id ));
	
	$Account = $_SESSION['tickee']['account'];


#	Get Correct Event
	if( $event_id && ( $_SESSION['tickee']['event']->id != $event_id || !$_SESSION['tickee']['event'])) {
		
		
		
		foreach( $Account->events as $event )
			if ( $event->id == $event_id )
			
				try {	$_SESSION['tickee']['event'] = json_decode( $Tickee->get( '/events/', $event_id )); } catch( TickeeException $e ) { header( "Location: /404" ); };
		
		if( !$_SESSION['tickee']['event']) header( "Location: /404" );
	
	}
	
	if( $_SESSION['tickee']['event'])
		
		$Event = $_SESSION['tickee']['event']; 	
		
}


/**
 *	DASHBOARD SPECIFIC FUNCTIONS.
 *
 */

function dashboard_url( $page, $id, $type ) {

	return "/$type/$id/dashboard" . ( $page? "/$page": '' );
}

function account_url( $page, $id = false ) {
	global $Account;
	
	return "/account/{$Account->short_name}/dashboard" . ( $page? "/$page": '' ) . ( $id? "/$id": '' );
}

function user_url( $page, $id = false ) {
	global $User;
	
	return "/user/{$User->id}/dashboard" . ( $page? "/$page": '' ) . ( $id? "/$id": '' );
}


/**
 *	DASHBOARD MESSAGES AND FIRST-TIME REDIRECT
 */







?>