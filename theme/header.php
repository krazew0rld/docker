<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Interdit l'accès direct au fichier.
}

?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>

	<div id="page" class="site">
		<a class="skip-link screen-reader-text" href="#primary"><?php esc_html( 'Aller au contenu' ); ?></a>
		<header role="banner"></header>
		<main id="primary" role="main">
