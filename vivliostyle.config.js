module.exports = {
    title: 'タイトル名',
    author: '著者名',
    language: 'ja',
    size: 'A4',
    theme: [
      '@vivliostyle/theme-techbook',
      'theme/custom_theme.css',
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
  