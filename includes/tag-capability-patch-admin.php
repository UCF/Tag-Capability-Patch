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

            $taxonomies = get_taxonomies(
                array(
                    'hierarchical' => false,
                    'meta_box_cb' => 'post_tags_meta_box'
                ),
                'object'
            );

            foreach( $taxonomies as $taxonomy ) {
                $localization_array['taxonomies'][] = array(
                    'taxonomy' => $taxonomy->name,
                    'capability' => $taxonomy->cap->manage_terms,
                    'canManage' => current_user_can( $capability )
                );
            }

            wp_localize_script( 'tcp_script', 'tcpConfig', $localization_array);

            wp_enqueue_script( 'tcp_script' );
        }
    }
}