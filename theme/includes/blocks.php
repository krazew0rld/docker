<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Interdit l'accès direct au fichier.
}

/**
 * Enregistre les blocs personnalisés
 *
 * @return void
 */
wp_register_block_types_from_metadata_collection(
	get_template_directory() . '/build/blocks',
	get_template_directory() . '/build/blocks-manifest.php'
);

add_filter(
	'allowed_block_types_all',
	function ( $allowed_block_types, $block_editor_context ) {
		/*
		 * Si l'utilisateur est administrateur, autoriser tous les blocs
		 */
		if ( current_user_can( 'manage_options' ) ) {
			return $allowed_block_types;
		}

		/*
		 * Récupérer le type de post depuis le contexte
		 */
		$post = $block_editor_context->post;

		if ( ! $post ) {
			return $allowed_block_types;
		}

		/*
		 * Exemple: filtrer les blocs selon le type de contenu
		 */
		switch ( $post->post_type ) {
			case 'page':
				return array(
					'core/paragraph',
					'core/heading',
					'core/list',
					'core/image',
					'core/columns',
					'core/spacer',
				);

			default:
				return $allowed_block_types;
		}
	},
	10,
	2
);
