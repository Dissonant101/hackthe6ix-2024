'use strict';

import * as Blockly from 'blockly/core';

export const htmlGenerator = new Blockly.Generator('HTML');

htmlGenerator.ORDER_ATOMIC = 0;
htmlGenerator.ORDER_NONE = 0;

htmlGenerator.init = function (workspace) {};
htmlGenerator.finish = function (code) {
  return code;
};

htmlGenerator.scrub_ = function (block, code) {
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = htmlGenerator.blockToCode(nextBlock);
  return code + nextCode;
};

function removeIndentAndTrailingNewline() {}

htmlGenerator.forBlock['frontend-start'] = function (block) {
  // var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = 'frontend!';
  return code;
};
htmlGenerator.forBlock['backend-start'] = function (block) {
  // var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = 'backend!';
  return code;
};
htmlGenerator.forBlock['add-to-db'] = function (block) {
  // var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = 'db!';
  return code;
};
htmlGenerator.forBlock['delete-from-db'] = function (block) {
  // var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = 'db!';
  return code;
};
htmlGenerator.forBlock['create-db'] = function (block) {
  // var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = 'db!';
  return code;
};
htmlGenerator.forBlock['read-db'] = function (block) {
  // var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = 'db!';
  return code;
};

htmlGenerator.forBlock['baseframe'] = function (block) {
  var statements_head = htmlGenerator.statementToCode(block, 'head');
  var statements_body = htmlGenerator.statementToCode(block, 'body');

  var code =
    '<!DOCTYPE HTML>\n<html>\n<head>\n  <meta charset="utf-8">\n' +
    statements_head +
    '</head>\n\n<body>\n' +
    statements_body +
    '</body>\n</html>\n';

  return code;
};

htmlGenerator.forBlock['html'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<!DOCTYPE HTML>\n<html>\n' + statements_content + '</html>\n';
  return code;
};

htmlGenerator.forBlock['body'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<body>\n' + statements_content + '</body>\n';
  return code;
};

htmlGenerator.forBlock['head'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code =
    '<head>\n  <meta charset="utf-8">\n' + statements_content + '</head>\n';
  return code;
};

htmlGenerator.forBlock['title'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');

  if (statements_content != '')
    document.getElementById('title').innerText = statements_content;
  else document.getElementById('title').innerText = 'untitled web page';

  var code = '<title>' + statements_content.trim() + '</title>\n';
  return code;
};

htmlGenerator.forBlock['paragraph'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<p>\n' + statements_content + '</p>\n';
  return code;
};

htmlGenerator.forBlock['plaintext'] = function (block) {
  var text_content = block.getFieldValue('content');
  var code = text_content + '\n';
  return code;
};

htmlGenerator.forBlock['division'] = function (block) {
  var value_name = htmlGenerator.valueToCode(
    block,
    'NAME',
    htmlGenerator.ORDER_ATOMIC,
  );
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<div' + value_name + '>\n' + statements_content + '</div>\n';
  return code;
};

htmlGenerator.forBlock['style'] = function (block) {
  var statements_name = htmlGenerator.statementToCode(block, 'NAME');
  var code = ' style="' + statements_name.trim() + '"';
  return [code, htmlGenerator.ORDER_NONE];
};

htmlGenerator.forBlock['color'] = function (block) {
  var colour_name = block.getFieldValue('NAME');
  var code = 'color: ' + colour_name + ';';
  return code;
};

htmlGenerator.forBlock['bgcolour'] = function (block) {
  var colour_name = block.getFieldValue('NAME');
  var code = 'background-color: ' + colour_name + ';';
  return code;
};

htmlGenerator.forBlock['genericstyle'] = function (block) {
  var text_property = block.getFieldValue('property');
  var text_value = block.getFieldValue('value');
  var code = text_property + ': ' + text_value + ';';
  return code;
};

htmlGenerator.forBlock['generictag'] = function (block) {
  var text_name = block.getFieldValue('NAME');
  var value_name = htmlGenerator.valueToCode(
    block,
    'NAME',
    htmlGenerator.ORDER_ATOMIC,
  );
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code =
    '<' +
    text_name +
    value_name +
    '>\n' +
    statements_content +
    '</' +
    text_name +
    '>\n';
  return code;
};

htmlGenerator.forBlock['more_attributes'] = function (block) {
  var value_name1 = htmlGenerator.valueToCode(
    block,
    'NAME1',
    htmlGenerator.ORDER_ATOMIC,
  );
  var value_name2 = htmlGenerator.valueToCode(
    block,
    'NAME2',
    htmlGenerator.ORDER_ATOMIC,
  );
  var value_name3 = htmlGenerator.valueToCode(
    block,
    'NAME3',
    htmlGenerator.ORDER_ATOMIC,
  );
  var code = value_name1 + value_name2 + value_name3;
  return [code, htmlGenerator.ORDER_NONE];
};

htmlGenerator.forBlock['genericattribute'] = function (block) {
  var text_attribute = block.getFieldValue('attribute');
  var text_value = block.getFieldValue('value');
  var code = ' ' + text_attribute + '="' + text_value + '"';
  return [code, htmlGenerator.ORDER_NONE];
};

htmlGenerator.forBlock['link'] = function (block) {
  var text_name = block.getFieldValue('NAME');
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code =
    '<a href="' + text_name + '">' + statements_content.trim() + '</a>\n';
  return code;
};

htmlGenerator.forBlock['span'] = function (block) {
  var value_name = htmlGenerator.valueToCode(
    block,
    'NAME',
    htmlGenerator.ORDER_ATOMIC,
  );
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code =
    '<span' + value_name + '>' + statements_content.trim() + '</span>\n';
  return code;
};

htmlGenerator.forBlock['image'] = function (block) {
  var text_image = block.getFieldValue('IMAGE');
  var text_alt = block.getFieldValue('ALT');
  var code = '<img src="' + text_image + '" alt="' + text_alt + '">\n';
  return code;
};

htmlGenerator.forBlock['emphasise'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<em>' + statements_content.trim() + '</em>\n';
  return code;
};

htmlGenerator.forBlock['strong'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<strong>' + statements_content.trim() + '</strong>\n';
  return code;
};

htmlGenerator.forBlock['headline'] = function (block) {
  var dropdown_name = block.getFieldValue('NAME');
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code =
    '<' +
    dropdown_name +
    '>' +
    statements_content.trim() +
    '</' +
    dropdown_name +
    '>\n';
  return code;
};

htmlGenerator.forBlock['linebreak'] = function (block) {
  var code = '<br>\n';
  return code;
};

htmlGenerator.forBlock['horizontalbreak'] = function (block) {
  var code = '<hr>\n';
  return code;
};

htmlGenerator.forBlock['unorderedlist'] = function (block) {
  var statements_name = htmlGenerator.statementToCode(block, 'NAME');
  var code = '<ul>\n' + statements_name + '</ul>\n';
  return code;
};

htmlGenerator.forBlock['orderedlist'] = function (block) {
  var statements_name = htmlGenerator.statementToCode(block, 'NAME');
  var code = '<ol>\n' + statements_name + '</ol>\n';
  return code;
};

htmlGenerator.forBlock['listelement'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<li>' + statements_content + '</li>\n';
  return code;
};

htmlGenerator.forBlock['inserted'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<ins>' + statements_content.trim() + '</ins>\n';
  return code;
};

htmlGenerator.forBlock['deleted'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<del>' + statements_content.trim() + '</del>\n';
  return code;
};

htmlGenerator.forBlock['super'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<sup>' + statements_content.trim() + '</sup>\n';
  return code;
};

htmlGenerator.forBlock['sub'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<sub>' + statements_content.trim() + '</sub>\n';
  return code;
};

htmlGenerator.forBlock['code'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<code>\n' + statements_content + '</code>\n';
  return code;
};

htmlGenerator.forBlock['quote'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<q>' + statements_content.trim() + '</q>\n';
  return code;
};

htmlGenerator.forBlock['blockquote'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<blockquote>\n' + statements_content + '</blockquote>\n';
  return code;
};

htmlGenerator.forBlock['sample'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<samp>\n' + statements_content + '</samp>\n';
  return code;
};

htmlGenerator.forBlock['keyboard'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<kbd>\n' + statements_content + '</kbd>\n';
  return code;
};

htmlGenerator.forBlock['variable'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<var>' + statements_content.trim() + '</var>\n';
  return code;
};

htmlGenerator.forBlock['form'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<form>\n' + statements_content + '</form>\n';
  return code;
};

htmlGenerator.forBlock['table'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<table>\n' + statements_content + '</table>\n';
  return code;
};

htmlGenerator.forBlock['tablerow'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<tr>\n' + statements_content + '</tr>\n';
  return code;
};

htmlGenerator.forBlock['tablecell'] = function (block) {
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<td>' + statements_content.trim() + '</td>\n';
  return code;
};

htmlGenerator.forBlock['input_text'] = function (block) {
  var text_default = block.getFieldValue('default');
  var code = '<input value="' + text_default + '">\n';
  return code;
};

htmlGenerator.forBlock['button'] = function (block) {
  var statements_name = htmlGenerator.statementToCode(block, 'NAME');
  var code = '<button>' + statements_name.trim() + '</button>\n';
  return code;
};

htmlGenerator.forBlock['input'] = function (block) {
  var dropdown_type = block.getFieldValue('type');
  var text_value = block.getFieldValue('value');
  var value_text = htmlGenerator.valueToCode(
    block,
    'text',
    htmlGenerator.ORDER_ATOMIC,
  );
  var code =
    '<input type="' +
    dropdown_type +
    '" value="' +
    text_value +
    '"' +
    value_text +
    ' />\n';
  return code;
};

htmlGenerator.forBlock['script'] = function (block) {
  var statements_content = Blockly.JavaScript.statementToCode(block, 'content');
  var code = '<script>\n' + statements_content + '</script>\n';
  return code;
};

htmlGenerator.forBlock['onclick'] = function (block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  var code = ' onclick="' + statements_name.trim() + '"';
  return [code, htmlGenerator.ORDER_NONE];
};

htmlGenerator.forBlock['body_attributes'] = function (block) {
  var value_name = htmlGenerator.valueToCode(
    block,
    'NAME',
    htmlGenerator.ORDER_ATOMIC,
  );
  var statements_content = htmlGenerator.statementToCode(block, 'content');
  var code = '<body' + value_name + '>\n' + statements_content + '</body>\n';
  return code;
};
