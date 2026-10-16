<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Interdit l'accès direct au fichier.
}

get_header();

?>

<h1>Page d'accueil</h1>

<?php the_content(); ?>

<?php

get_footer();

?>
