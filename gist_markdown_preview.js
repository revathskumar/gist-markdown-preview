function preview(e){
  e.preventDefault();
  e.stopPropagation();
  if($(".ace_editor").is(":visible")){
    $(".ace_editor").hide();
    $("#readme article").show();
    $("#gist-preview span").html("Edit");
  } else {
    $("#readme article").hide();
    $(".ace_editor").show();
    $("#gist-preview span").html("Preview");
  }
  $("#readme article").html($.markdown($(".input > textarea").val()));
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
    $(".ace_editor").show();
    return;
  }

  preview_area = $('<div class="blob instapaper_body" id="readme"><article class="markdown-body entry-content" itemprop="mainContentOfPage"></article>');
  $(".ace_editor").parent().append(preview_area);
  $(".form-actions").append("<button type='button' class='classy' id='gist-preview'><span>Preview</span></button>");
}

jQuery(function($){
  $("#gist-preview").live("click",preview);
  $(".gist-name-textbox").live("change", appendHtml);
});
