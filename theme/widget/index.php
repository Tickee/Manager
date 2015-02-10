
<div class='container'>

<? if( PAGE == "ticket") : ?>

	
	<? if( $sections = $Page->filter_sections())
		foreach( $sections as $section ) : ?>
	
		<section<? if($section->class): ?> class="<?=$section->class?>"<? endif; ?>>
			<div>
			
			<?= implode( "\n", $section->mods ) ?>
			
			</div>
		</section>
	
	<? 	endforeach; ?>


<? else : ?>

	<div id="widget">
	<? 
		
		if( PAGE == 'login' ) : ?>	<img src='<?=THEME?>img/logo.shield.big.png' alt='tickee' class='big' /> <?
		else : ?>	<img src='<?=THEME?>img/logo.shield.png' alt='tickee' /> <?
		endif;

	
	if( $sections = $Page->filter_sections())
		foreach( $sections as $section ) : ?>
	
		<?= implode( "\n", $section->mods ) ?>

	<? 	endforeach; ?>

	</div>

<? endif; ?>

</div>

<img src='<?=THEME?>img/logo.png' alt='tickee' id='logo' />