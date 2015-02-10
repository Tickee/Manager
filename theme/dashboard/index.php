
<? if( $sections = $Page->filter_sections())
		foreach( $sections as $section ) : ?>
	
		<section<? if($section->class): ?> class="<?=$section->class?>"<? endif; ?>>
			<div>
			
			<?= implode( "\n", $section->mods ) ?>
			
			</div>
		</section>
	
<? 	endforeach; ?>