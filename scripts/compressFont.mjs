import Fontmin from 'fontmin';
import * as glob from 'glob';
import matter from 'gray-matter'

// 读取 content 下的所有 markdown 文件（包含子目录）
// 使用 'gray-matter' 解析 markdown 文件，提取出 front matter
// 将 front matter 中的 title 和 description 字段提取出来
const markdownFiles = glob.sync('content/**/*.md');
const frontMatters = markdownFiles.map(file => matter.read(file).data);
const textSubset = frontMatters.map(({ title, description }) => `${title}${description}`).join('');

const fontmin = new Fontmin()
  .src('public/fonts/MiSans-Regular.ttf')
  .use(Fontmin.glyph({
    text: textSubset,
    hinting: false,
  }))
  .dest('public/fonts/dynamic');

fontmin.run((err, files) => {
  if (err) throw err;
  console.log('compress font success\n');
})