<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Interdit l'accès direct au fichier.
}

/**
 * Route les templates en fonction du type de contenu.
 *
 * @param string $template Le template actuel.
 *
 * @return string Le template à utiliser.
 */
add_filter(
	'template_include',
	static function ( $template ): string {

		/** Single posts */
		if ( is_single() ) {
			$post_type = get_post_type();
			if ( locate_template( "templates/single/{$post_type}.php" ) ) {
				return locate_template( "templates/single/{$post_type}.php" );
			}
			if ( locate_template( 'templates/single/single.php' ) ) {
				return locate_template( 'templates/single/single.php' );
			}
		}

		/** Archives */
		if ( is_archive() ) {
			$post_type = get_post_type();
			if ( locate_template( "templates/archive/{$post_type}.php" ) ) {
				return locate_template( "templates/archive/{$post_type}.php" );
			}
			if ( locate_template( 'templates/archive/archive.php' ) ) {
				return locate_template( 'templates/archive/archive.php' );
			}
		}

		/** Search */
		if ( is_search() && locate_template( 'templates/default/search.php' ) ) {
			return locate_template( 'templates/default/search.php' );
		}

		/** Front page */
		if ( is_front_page() && locate_template( 'templates/default/front-page.php' ) ) {
			return locate_template( 'templates/default/front-page.php' );
		}

		/** 404 page */
		if ( is_404() && locate_template( 'templates/default/404.php' ) ) {
			return locate_template( 'templates/default/404.php' );
		}

		/** Home page */
		if ( is_home() && locate_template( 'templates/default/home.php' ) ) {
			return locate_template( 'templates/default/home.php' );
		}

		/** Pages */
		if ( is_page() ) {
			global $post;
			$post_slug = $post->post_name;
			if ( locate_template( "templates/page/{$post_slug}.php" ) ) {
				return locate_template( "templates/page/{$post_slug}.php" );
			}
			if ( locate_template( 'templates/page/page.php' ) ) {
				return locate_template( 'templates/page/page.php' );
			}
		}

		/** Fallback */
		return $template;
	}
);
