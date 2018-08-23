<?php
/**
 * All filters and changes should be defined here
 */
if ( ! class_exists( 'TCP_Filters' ) ) {
    class TCP_Filters {
        /**
         * Requires users to have manage_categories capability to insert new terms.
         * @author Jim Barnes
         * @param WP_Term $term The term being inserted.
         * @return WP_Error|WP_Term Returns an error if user lacks capability, the term if they do.
         */
        public static function on_pre_insert_term( $term, $taxonomy ) {
            $taxonomy = get_taxonomy( $taxonomy );

            $capability = $taxonomy->cap->manage_terms;

            // Accommodate any async processes
            if ( $capability && is_user_logged_in() && ! current_user_can( $capability ) ) {
                return new WP_Error( 'insert-term', "Sorry, you can't create new terms" );
            } else {
                return $term;
            }
        }
    }
}