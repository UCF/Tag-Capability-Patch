(($) => {
  const disableTagsReturn = (tax) => {
    const $parent = $(`#${tax.taxonomy}`);
    const $newTag = $parent.find('.newtag');
    const $addTag = $parent.find('.tagadd');

    // If these two selectors don't return anything, return.
    if ($newTag.length === 0 || $addTag.length === 0) {
      return;
    }

    $newTag.on('keypress', (event) => {
      if (event.keyCode === 13) {
        onTagAdd();
      }
    });

    $addTag.on('click', () => {
      onTagAdd();
    });

    const onTagAdd = () => {
      const inputArray = $(`#new-tag-${tax.taxonomy}`).val().split(',');
      const $tagInput = $(`#tax-input-${tax.taxonomy}`);
      const disallowedTags = [];
      let inputChecks = 0;

      // The funcion called when the get function is done.
      const onExecutionDone = () => {
        inputChecks++;

        if (inputArray.length > inputChecks) {
          return;
        }

        if (disallowedTags.length > 0) {
          $newTag.pointer({
            content: `<p>The following tags have been removed: <span style="color: red">${disallowedTags.join(', ')}</span>. You do not have permission to publish new tags.</p>`,
            position: 'bottom'
          }).pointer('open');
        }
      };

      // Loop through inputs and check to see if they exist
      inputArray.forEach((input) => {
        const data = {
          action: 'ajax-tag-search',
          tax: tax.taxonomy,
          q: input.trim()
        };

        $.get(ajaxurl, data, (response) => {
          if (response === '') {
            disallowedTags.push(input);

            // Remove tag list item
            $(`li:contains('${input}')`).remove();

            // Get current value of tag input and remove the tag.
            const $tags = $tagInput.val().split(',');
            $tags.splice($.inArray(input, $tags), 1);
            $tagInput.val($tags.join(','));
          }
        }).done(onExecutionDone);
      });
    };
  };

  if (tcpConfig) {
    tcpConfig.taxonomies.forEach((tax) => {
      disableTagsReturn(tax);
    });
  }
})(jQuery);
