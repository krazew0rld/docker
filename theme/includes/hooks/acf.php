<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Interdit l'accès direct au fichier.
}

add_filter( 'acf/settings/save_json', 'my_acf_json_save_point' );
add_filter( 'acf/settings/load_json', 'my_acf_json_load_point' );

/**
 * Configure le dossier pour l'export/import automatique des champs ACF en JSON.
 *
 * @param string $path Le chemin de sauvegarde des champs ACF.
 *
 * @return string Le chemin de sauvegarde des champs ACF.
 */
function my_acf_json_save_point( $path ): string {
	$path = get_stylesheet_directory() . '/acf-json'; // Modifier le chemin de sauvegarde
	return $path;
}

/**
 * Charge les champs ACF en JSON.
 *
 * @param array $paths Les chemins de chargement des champs ACF.
 *
 * @return array Les chemins de chargement des champs ACF.
 */
function my_acf_json_load_point( $paths ): array {
	unset( $paths[0] ); // Supprimer le chemin original
	$paths[] = get_stylesheet_directory() . '/acf-json'; // Ajouter le nouveau chemin
	return $paths;
}
