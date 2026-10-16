<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Interdit l'accès direct au fichier.
}

/**
 * Ajoute les fonctionnalités du thème.
 *
 * @return void
 */
add_action(
	'after_setup_theme',
	static function (): void {
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
		add_theme_support( 'editor-styles' );
		add_editor_style( 'build/editor.css' );
	}
);

/**
 * Masque la barre d'administration WordPress pour tous les utilisateurs.
 *
 * @return bool
 */
add_filter( 'show_admin_bar', '__return_false' );

/**
 * Masque les émoticônes de WordPress.
 *
 * @return void
 */
add_action(
	'init',
	static function (): void {
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
	}
);
