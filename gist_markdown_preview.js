function preview(e){
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
}

function appendHtml(e){
  ele = e.currentTarget;
  selected_item = $(ele).html().replace(/<(?:.|\n)*?>/gm, '');
  var isMarkdown = false;
  if(selected_item == "Markdown" && e.type == "click"){
    isMarkdown = true;
  }

  if(e.type == "change"){
    selected_item = $(ele).val();
    $.each([".md",".markdown"],function(k,v){
      if(selected_item.indexOf(v, selected_item.length - v.length) !== -1){
        isMarkdown = true;
      }
    });
  }

  if(!isMarkdown){
    $("#readme").remove();
    if($preview_button){
      $preview_button.parent().remove();
    }
    $textarea.show();
    $preview_button = $preview = null;
    return;
  }

  if(!$preview){
    $preview = $('<div class="blob instapaper_body" id="readme"><article class="markdown-body entry-content" itemprop="mainContentOfPage"></article>');
    $textarea.parent().append($preview);
    $(".form-actions").append("<button type='button' class='classy' id='gist-preview'><span>Preview</span></button>");
  }
  $preview_button = $("#gist-preview span");
  $preview_container = $("#readme article");
}

jQuery(function($){
  $textarea = $("div.input textarea");
  $preview_button = $preview = null;
  $(".chzn-results li").live("click",appendHtml);
  $("#gist-preview").live("click",preview);
  $(".gist-name-textbox").live("change", appendHtml);
});
