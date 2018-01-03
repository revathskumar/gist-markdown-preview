const d = document;
const qs = d.querySelector.bind(d);
const qsa = d.querySelectorAll.bind(d);
const byId = d.getElementById.bind(d);

const togglePreview = cqs => {
  const article = cqs('.js-gist-preview');
  const editor  = cqs('.CodeMirror');
  const previewBtn = cqs('.js-gist-preview-btn');

  if (editor.style.display === 'none') {
    editor.style.display = "block";
    article.style.display = "none";
    previewBtn.innerHTML = "Preview";
  } else {
    editor.style.display = "none";
    article.style.display = "inline-block";
    previewBtn.innerHTML = "Edit";
  }
  article.innerHTML = marked(cqs(".commit-create > textarea").value, { sanitize: true });
};

const renderPreviewArea = (value, cqs) => {
  const placeHolder = cqs(".commit-create");
  if (!isMarkdown(value)) {
    const previewArea = cqs('.js-gist-preview');
    previewArea && previewArea.remove();
    placeHolder.style.display = "visible";
    return;
  }

  if(cqs('.js-gist-preview')) {
    return;
  }

  const previewArea = d.createElement('div');
  previewArea.classList.add('js-gist-preview', 'markdown-body', 'entry-content');
  previewArea.setAttribute("style", "padding: 45px;width: 100%;min-height: 362px;display:none");
  placeHolder.appendChild(previewArea);
}

const isMarkdown = filename => {
  return /.*(\.md|\.markdown)$/.test(filename);
}

const renderPreviewButton = (value, cqs) => {
  if (!isMarkdown(value)) {
    const previewBtn = cqs('.js-gist-preview-btn');
    previewBtn && previewBtn.remove();
    return;
  }

  if(cqs('.js-gist-preview-btn')) {
    return;
  }
  const previewBtn = createPreviewBtn();
  cqs('.file-actions').appendChild(previewBtn);

  previewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    togglePreview(cqs);
  });
}

const createPreviewBtn = () => {
  const previewBtn = d.createElement('button');
  previewBtn.type = "button";
  previewBtn.innerHTML = "Preview";
  previewBtn.classList.add('btn', 'js-gist-preview-btn');
  return previewBtn;
}

const setup = gistHolder => {
  const cqs = gistHolder.querySelector.bind(gistHolder);
  const fileNameInput = cqs('.js-gist-filename')
  fileNameInput.addEventListener('change', e => {
    renderPreviewButton(e.target.value, cqs);
    renderPreviewArea(e.target.value, cqs);
  });
  if(isMarkdown(fileNameInput.value)) {
    const event = d.createEvent("HTMLEvents");
    event.initEvent("change", false, true);
    event.synthetic = true;
    fileNameInput.dispatchEvent(event, true);
  }
}

d.addEventListener('DOMContentLoaded', evt => {
  qsa(".js-gist-file").forEach(setup);
  qs('.js-add-gist-file')
    .addEventListener('click', e => {
      setTimeout(() => {
        const fileList = qsa(".js-gist-file");
        setup(fileList[fileList.length -1]);
      }, 100);
    });
});
