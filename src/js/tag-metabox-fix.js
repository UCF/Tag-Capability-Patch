(($) => {
  const disableTagsButton = () => {
    $('.tagadd').attr('disabled', true);
  };

  const disableTagsReturn = () => {
    $('.newtag').on('keypress', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();

        $('.newtag').pointer({
          content: '<p>You do not have permission to add new tags.</p>',
          position: 'bottom'
        }).pointer('open');

        event.stopImmediatePropagation();
      }
    });
  };

  if (!tcpConfig.canManage) {
    disableTagsButton();
    disableTagsReturn();
  }
})(jQuery);
