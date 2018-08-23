<?php
/*
Plugin Name: Tag Capbility Patch
Description: Ensures users have the taxonomy's `manage_terms` capability in order to create new terms.
Version: 1.0.0
Author: UCF Web Communications
License: GPL3
*/
if ( ! defined( 'WPINC' ) ) {
    die;
}

include_once 'includes/tag-capbility-patch-filters.php';

if ( ! function_exists( 'tag_capability_patch_init' ) ) {
    function tag_capability_patch_init() {
        add_filter( 'pre_insert_term', array( 'TCP_Filters', 'on_pre_insert_term' ), 10, 2 );
    }

    add_action( 'plugins_loaded', 'tag_capability_patch_init', 10, 0 );
}
