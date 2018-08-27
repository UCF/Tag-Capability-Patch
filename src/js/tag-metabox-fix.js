(($) => {
  const disableTagsReturn = () => {
    const $newTag = $('.newtag');
    const $addTag = $('.tagadd');

    $newTag.on('keypress', (event) => {
      if (event.keyCode === 13) {
        onTagAdd();
      }
    });

    $addTag.on('click', () => {
      onTagAdd();
    });

    const onTagAdd = () => {
      const inputArray = $('#new-tag-post_tag').val().split(',');
      const $tagInput = $('#tax-input-post_tag');
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
          tax: 'post_tag',
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

  if (!tcpConfig.canManage) {
    disableTagsReturn();
  }
})(jQuery);
