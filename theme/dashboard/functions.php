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


/**
 *	Start with authorisation check.
 *
 */

global $Account, $user;

$MOD = MOD_CONSTRUCT::render((object) array( 'mod'=> 'tickee.su_user' ));
$Tickee = $MOD->construct();


if( !$_SESSION[ 'uid' ] || $_SESSION[ 'ip' ] != $_SERVER[ 'REMOTE_ADDR' ]) 

	if( PAGE == 'password' )
		
		try {	$User = $Tickee->get( '/users/', $id, array( 'token'=> simplestring( $_GET[ 'token' ])));
				$_SESSION[ 'uid' ] = (int) $id;

		} catch( TickeeException $e ) { exit( '<h1>404</h1>' ); }
	
	else exit( '<h1>404</h1>' );

/**
 *	Retreive USER
 *
 */

$User = json_decode( $User? $User : $Tickee->get( '/users/', $_SESSION[ 'uid' ]));


/**
 *	Retreive ACCOUNT
 *
 */
 
if( $type == 'account' ) {
	
	$User->accounts = json_decode( $Tickee->get( '/users/%/accounts', $_SESSION[ 'uid' ]));
	
	
	foreach( $User->accounts as $account )
		if( $account->short_name == $id )
			
			try {	$Account = json_decode( $Tickee->get( '/accounts/', $id )); } catch( TickeeException $e ) { exit( '<h1>404</h1>' ); };


	if( !$Account )	exit( '<h1>404</h1>' );
	else $_SESSION[ 'account' ] = $Account->short_name;
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



?>