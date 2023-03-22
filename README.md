# Tag Capability Patch #

Ensures tag-like terms cannot be created without the user having the appropriate manage_terms capability.


## Description ##

The Tag-Capability-Patch is a work around for a bug related to the Tag Widget used in the Edit Post screen in WordPress. Currently, the Tag Widget allows users to add new terms (specifically tags and tag-like taxonomies) in the Edit Post screen even if that user does not have the specific manage_terms capability assigned to that taxonomy. An example of how roles are mapped can be read in this [plugin's wiki](https://github.com/UCF/Tag-Capability-Patch/wiki).


## Installation ##

### Manual Installation ###
1. Upload the plugin files (unzipped) to the `/wp-content/plugins` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the "Plugins" screen in WordPress]

### WP CLI Installation ###
1. `$ wp plugin install --activate https://github.com/UCF/Tag-Capability-Fix/archive/master.zip`.  See [WP-CLI Docs](http://wp-cli.org/commands/plugin/install/) for more command options.


## Changelog ##

### 1.0.2 ###
Enhancements:
* Added composer file.

### 1.0.1 ###
Bug Fixes:
* Corrected bug where an empty string in the array causes all tags to be removed. For example, if the input reads "Existing Tag, " the `inputArray` would be `["Existing Tag", " "], which then causes the error to appear and for some reason all the tags to be removed.

### 1.0.0 ###
* Initial release


## Upgrade Notice ##

n/a


## Installation Requirements ##

None


## Development & Contributing ##

NOTE: this plugin's readme.md file is automatically generated.  Please only make modifications to the readme.txt file, and make sure the `gulp readme` command has been run before committing readme changes.
