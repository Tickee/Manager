<?

require_once("engine/www/combustion.php");

if( file_exists( $path = ENGINE_CORE . "public/". $DB->simplestring( $_GET[ 'dir' ]) ."/". $DB->simplestring( $_GET[ 'reloc' ]) .".php" ))
	include $path;

?>