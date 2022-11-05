/* DOCS https://prettier.io/docs/en/options.html */
module.exports = {
  printWidth: 200, // 一行最多 120 字符
  tabWidth: 2, //指定每个缩进级别的空格数。
  useTabs: false, //是否使用制表符来缩进
  singleQuote: true, // 使用单引号
  semi: true, // 行尾需要有分号
  trailingComma: "none", // 末尾不需要逗号
  bracketSpacing: true, // 大括号内的首尾需要空格
  jsxBracketSameLine: false, // jsx 标签的反尖括号需要换行
  arrowParens: "avoid", //箭头函数参数周围可以不用括号
  endOfLine: "auto", //换行符的使用
  quoteProps: "as-needed", // 对象的 key 仅在必要时用引号
  jsxSingleQuote: false, // jsx 不使用单引号，而使用双引号
  rangeStart: 0, // 每个文件格式化的范围是文件的全部内容
  requirePragma: false, // 不需要写文件开头的 @prettier
  insertPragma: false, // 不需要自动在文件开头插入 @prettier
  // proseWrap: 'always', // 根据打印宽度决定是否折行 printWidth
  htmlWhitespaceSensitivity: "css" // 根据显示样式决定 html 要不要折行
};
