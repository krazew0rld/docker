<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Interdit l'accès direct au fichier.
}

if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	include_once __DIR__ . '/vendor/autoload.php';
}

/**
 * Charge les fichiers de configuration du thème.
 */
require_once get_template_directory() . '/includes/setup.php';

/**
 * Charge les fichiers de styles et scripts du thème.
 */
require_once get_template_directory() . '/includes/assets.php';

/**
 * Charge les blocs personnalisés du thème.
 */
require_once get_template_directory() . '/includes/blocks.php';

/**
 * Charge la logique de routage des templates du thème.
 */
require_once get_template_directory() . '/includes/router.php';

/**
 * Charge les hooks ACF du thème.
 */
require_once get_template_directory() . '/includes/hooks/acf.php';

/**
 * Charge les hooks GForm du thème.
 */
require_once get_template_directory() . '/includes/hooks/gform.php';

/**
 * Charge les hooks WordPress du thème.
 */
require_once get_template_directory() . '/includes/hooks/wp.php';

/**
 * Charge les helpers du thème.
 */
require_once get_template_directory() . '/includes/helpers.php';
