<?php
/**
 * Handles admin assets
 */
if ( ! class_exists( 'TCP_Admin' ) ) {
    class TCP_Admin {
        /**
         * Enqueues necessary admin scripts
         * @author Jim Barnes
         * @param string $hook The page that is being loaded
         */
        public static function enqueue_admin_scripts( $hook ) {
            if ( $hook !== 'post.php' && $hook !== 'post-new.php' ) {
                return;
            }

            wp_enqueue_style('wp-pointer');
            wp_enqueue_script('wp-pointer');

            wp_register_script( 'tcp_script', TCP_PLUGIN__JS_PATH . '/script.min.js', array( 'jquery', 'wp-pointer' ), null, true );

            $localization_array = array(
                'taxonomies' => array()
			);
			$taxonomies = array();

			// Determine if this is an admin screen where a post is being
			// added/edited
			$screen = get_current_screen();
			if ( $screen && isset( $screen->post_type ) ) {
				$object_type = $screen->post_type;
				$object_taxonomies = get_object_taxonomies( $object_type, 'objects' );
				// If this post type has registered taxonomies, filter only the
				// taxonomies we care about (non-hierarchical, using the post
				// tag metabox)
				if ( $object_taxonomies ) {
					$taxonomies = wp_filter_object_list( $object_taxonomies, array(
						'hierarchical' => false,
                    	'meta_box_cb' => 'post_tags_meta_box'
					) );
				}
			}

            foreach( $taxonomies as $taxonomy ) {
				// Don't have a better means of excluding post_format tax in
				// queries/filters above, so do it here
				if ( $taxonomy->name !== 'post_format' ) {
					$localization_array['taxonomies'][] = array(
						'taxonomy' => $taxonomy->name,
						'capability' => $taxonomy->cap->manage_terms,
						'canManage' => current_user_can( $capability ) // TODO $capability is not defined here
					);
				}
			}

            wp_localize_script( 'tcp_script', 'tcpConfig', $localization_array);

            wp_enqueue_script( 'tcp_script' );
        }
    }
}
