(($) => {
  const disableTagsReturn = () => {
    $('.newtag').on('keypress', (event) => {
      if (event.keyCode === 13 && event.tagChecked !== false) {

        const $input = $(event.currentTarget).val();

        const data = {
          action: 'ajax-tag-search',
          tax: 'post_tag',
          q: $input
        };

        $.get(ajaxurl, data, (response) => {
          if (response === '') {
            $('.newtag').pointer({
              content: `<p>The tag "${$input}" has been removed from the tag list. You currently have permission to add existing tags.</p>`,
              position: 'bottom'
            }).pointer('open');

            $(`li:contains('${$input}')`).remove();
          }
        });
      }
    });
  };

  if (!tcpConfig.canManage) {
    disableTagsReturn();
  }
})(jQuery);
