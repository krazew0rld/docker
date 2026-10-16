<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Interdit l'accès direct au fichier.
}

add_filter(
	'block_categories_all',
	function ( $categories ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'block-custom',
					'title' => __( 'Personnalisés', 'cd50' ),
					'icon'  => null,
				),
			)
		);
	},
	10,
	1
);
