jQuery(function($){
  $textarea = $("div.input textarea");
  $preview = $('<div class="blob instapaper_body" id="readme"><article class="markdown-body entry-content" itemprop="mainContentOfPage"></article>');
  $textarea.parent().append($preview);
  $(".form-actions").append("<button type='button' class='classy' id='gist-preview'><span>Preview</span></button>");
  $preview_button = $("#gist-preview span");
  $preview_container = $("#readme article");
  $("#gist-preview").live("click",function(e){
    e.preventDefault();
    e.stopPropagation();
    if($textarea.is(":visible")){
      $textarea.hide();
      $preview_container.show();
      $preview_button.html("Edit");
    } else {
      $preview_container.hide();
      $textarea.show();
      $preview_button.html("Preview");
    }
    $preview_container.html($.markdown($textarea.val()));
    return false;
  });
});