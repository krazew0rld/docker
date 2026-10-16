<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Interdit l'accès direct au fichier.
}

/**
 * Charge les styles et scripts principaux du thème.
 *
 * @return void
 */
function enqueue_styles(): void {

	$asset_file = include get_template_directory() . '/build/main.asset.php';

	wp_enqueue_style( 'main', get_template_directory_uri() . '/build/main.css', $asset_file['dependencies'], $asset_file['version'] );
	wp_enqueue_script( 'main', get_template_directory_uri() . '/build/main.js', $asset_file['dependencies'], $asset_file['version'], true );
}

add_action( 'wp_enqueue_scripts', 'enqueue_styles' );

/**
 * Charge les styles et scripts de l'éditeur Gutenberg.
 *
 * @return void
 */
function editor_styles(): void {

	$asset_file = include get_template_directory() . '/build/editor.asset.php';

	wp_enqueue_script( 'editor', get_template_directory_uri() . '/build/editor.js', $asset_file['dependencies'], $asset_file['version'], true );
}

add_action( 'admin_enqueue_scripts', 'editor_styles' );
