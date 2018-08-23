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
            if ( $hook !== 'post.php' ) {
                return;
            }

            wp_enqueue_style('wp-pointer');
            wp_enqueue_script('wp-pointer');

            wp_register_script( 'tcp_script', TCP_PLUGIN__JS_PATH . '/script.min.js', array( 'jquery', 'wp-pointer' ), null, true );

            $taxonomy = get_taxonomy( 'post_tag' );
            $capability = $taxonomy->cap->manage_terms;

            $can_manage = true;

            if ( $capability && is_user_logged_in() && ! current_user_can( $capability ) ) {
                $can_manage = false;
            }

            wp_localize_script( 'tcp_script', 'tcpConfig', array(
                'capability' => $capability,
                'canManage'  => $can_manage
            ) );

            wp_enqueue_script( 'tcp_script' );
        }
    }
}