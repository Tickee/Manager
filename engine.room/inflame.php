<?
/* / / / / / ENGINE  ROOM / / / / / / /
|	           INFLAME                |
|            (aka. init)              |
|                                     |
| version:     0.2.0                  |
| last edit:   20101219               |
| package:     beta.2.000             |
/ / / / / / / / / / / / / / / / / / /*/

$Engine->page_private_control();
$Page->mods->construct_check();

if( $template = $Page->get('template'))
	$template = "-$template";


include $Engine->theme_("header$template.php", "header.php");
include $Engine->theme_(PAGE . ".php", "index.php");
include $Engine->theme_("footer$template.php", "footer.php");

?>