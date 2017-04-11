function preview(e){
  e.preventDefault();
  e.stopPropagation();
  if($(".commit-create").is(":visible")){
    $(".commit-create").hide();
    $("#readme article").show();
    $("#gist-preview span").html("Edit");
  } else {
    $("#readme article").hide();
    $(".commit-create").show();
    $("#gist-preview span").html("Preview");
  }
  $("#readme article").html($.markdown($(".commit-create > textarea").val()));
  return false;
}

function appendHtml(e){
  ele = e.currentTarget;
  selected_item = $(ele).html().replace(/<(?:.|\n)*?>/gm, '');
  var isMarkdown = false;
  if($("input.gist-language").val() == "Markdown"){
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
    $("#gist-preview span").parent().remove();
    $(".commit-create").show();
    return;
  }

  preview_area = $('<div class="blob instapaper_body" id="readme"><article class="markdown-body entry-content" itemprop="mainContentOfPage"></article>');
  $(".commit-create").parent().append(preview_area);
  if($('#gist-preview').length === 0) {
    $(".form-actions").append("<button type='button' class='btn' id='gist-preview'><span>Preview</span></button>");
  }
}

jQuery(function($){
  $("#gist-preview").live("click",preview);
  $(".js-gist-filename").live("change", appendHtml);
});
