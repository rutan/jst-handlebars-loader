const path = require('path');
const loaderUtils = require('loader-utils');
const Handlebars = require('handlebars');

module.exports = function (source) {
  this.cacheable && this.cacheable();

  const {
    name,
    basePath: basePath = '.',
    global: globalName = 'global'
  } = loaderUtils.getOptions(this);

  const relativePath = path.relative(basePath, this.resourcePath);

  const templateName = (() => {
    if (name) return name(relativePath, this.resourcePath);

    const dirName = path.dirname(relativePath);
    const fileName = path.basename(relativePath, path.extname(relativePath));
    if (dirName === '.') return fileName;
    return `${dirName}/${fileName}`;
  })().toString().replace('\\', '/');
  const template = Handlebars.precompile(source);

  return `
    import {template} from 'handlebars';

    let compiledTemplate;
    const render = function () {
      if (!compiledTemplate) {
        compiledTemplate = template(${template});
      }
      return compiledTemplate.apply(compiledTemplate, arguments);
    };

    ${globalName}.JST = ${globalName}.JST || {};
    ${globalName}.JST[${JSON.stringify(templateName)}] = render;

    export default render;
  `;
};
