module.exports = {
    title: 'タイトル名',
    author: '著者名',
    language: 'ja',
    size: 'A4',
    theme: [
      '@mitsuharu/vivliostyle-theme-iosdc-pamphlet@0.1.5',
      '@mitsuharu/vivliostyle-theme-noto-sans-jp',
      'theme/styles.css',
    ],
    entry: [
      'index.md',
    ],
    entryContext: './manuscripts',
    output: [
      './output/output.pdf',
    ],
    workspaceDir: '.vivliostyle',
    toc: false,
    cover: undefined,
    vfm: {
      hardLineBreaks: false,
      disableFormatHtml: false,
    },
  }
  