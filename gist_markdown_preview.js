const d = document;
const qs = d.querySelector.bind(d);
const byId = d.getElementById.bind(d);
let placeHolder;

const togglePreview = holder => {
  const cqs = qs.bind(holder);
  debugger;
  const article = cqs('#js-gist-preview');
  console.log(article);
  const editor  = cqs('.cm-s-github');
  const previewBtn = cqs('#js-gist-preview-btn');

  if (editor.style.display === 'none') {
    editor.style.display = "block";
    article.style.display = "none";
    previewBtn.innerHTML = "Preview";
  } else {
    editor.style.display = "none";
    article.style.display = "inline-block";
    previewBtn.innerHTML = "Edit";
  }
  article.innerHTML = marked(qs(".commit-create > textarea").value, { sanitize: true });
};

const showPreviewButton = (e) => {
  const isMarkdown = /.*(\.md|\.markdown)$/.test(e.target.value);

  if(!isMarkdown){
    const previewArea = byId('js-gist-preview');
    const previewBtn = byId('js-gist-preview-btn');

    previewArea && previewArea.remove();
    previewBtn && previewBtn.remove();

    placeHolder.style.display = "visible";
    return;
  }

  const previewArea = d.createElement('div');
  previewArea.id = "js-gist-preview";
  placeHolder.appendChild(previewArea);

  if(qs('#gist-preview')) {
    return;
  }

  const previewBtn = d.createElement('button');
  previewBtn.type = "button";
  previewBtn.innerHTML = "Preview";
  previewBtn.classList.add('btn');
  previewBtn.id = "js-gist-preview-btn";

  qs(".form-actions").appendChild(previewBtn);
  previewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    d.querySelectorAll(".commit-create").forEach(holder => {
      console.log(holder);
      togglePreview(holder);
    });
  });
}

d.addEventListener('DOMContentLoaded', evt => {
  placeHolder = qs(".commit-create");
  qs(".js-gist-filename")
    .addEventListener('change', showPreviewButton);
});
