'use client';

import { useRef, useEffect, useState } from 'react';
import { useBlocklyWorkspace } from 'react-blockly';
import * as Blockly from 'blockly/core';
import { HtmlGenerator } from '../../blockly/html_generators';

var htmlBlocks = [
  {
    type: 'baseframe',
    message0: 'document %1 header %2 %3 content %4 %5',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'head',
        check: 'header',
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'body',
        check: 'html',
      },
    ],
    colour: 0,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'html',
    message0: 'document %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
        check: 'document',
      },
    ],
    colour: 0,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'body',
    message0: 'content %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
        check: 'html',
      },
    ],
    previousStatement: 'document',
    nextStatement: 'document',
    colour: 0,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'head',
    message0: 'header %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
        check: 'header',
      },
    ],
    previousStatement: 'document',
    nextStatement: 'document',
    colour: 0,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'title',
    message0: 'title %1',
    args0: [
      {
        type: 'input_statement',
        name: 'content',
        check: 'html',
      },
    ],
    previousStatement: 'header',
    nextStatement: 'header',
    colour: 0,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'paragraph',
    message0: 'paragraph %1',
    args0: [
      {
        type: 'input_statement',
        name: 'content',
        check: 'html',
      },
    ],
    previousStatement: 'html',
    nextStatement: 'html',
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'plaintext',
    message0: 'text %1',
    args0: [
      {
        type: 'field_input',
        name: 'content',
        text: '',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'division',
    message0: 'division %1 %2',
    args0: [
      {
        type: 'input_value',
        name: 'NAME',
        check: 'attribute',
      },
      {
        type: 'input_statement',
        name: 'content',
        check: 'html',
      },
    ],
    previousStatement: 'html',
    nextStatement: 'html',
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'style',
    message0: 'style =  %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'NAME',
        check: 'css',
      },
    ],
    inputsInline: true,
    output: 'attribute',
    colour: 230,
    tooltip: '',
    helpUrl: '',
  },
  {
    type: 'color',
    message0: 'text colour :  %1',
    args0: [
      {
        type: 'field_colour',
        name: 'NAME',
        colour: '#ff0000',
      },
    ],
    previousStatement: 'css',
    nextStatement: 'css',
    colour: 230,
    tooltip: '',
    helpUrl: '',
  },
  {
    type: 'bgcolour',
    message0: 'background colour :  %1',
    args0: [
      {
        type: 'field_colour',
        name: 'NAME',
        colour: '#ff0000',
      },
    ],
    previousStatement: 'css',
    nextStatement: 'css',
    colour: 230,
    tooltip: '',
    helpUrl: '',
  },
  {
    type: 'genericstyle',
    message0: '%1 : %2',
    args0: [
      {
        type: 'field_input',
        name: 'property',
        text: 'property',
      },
      {
        type: 'field_input',
        name: 'value',
        text: 'value',
      },
    ],
    previousStatement: 'css',
    nextStatement: 'css',
    colour: 230,
    tooltip: '',
    helpUrl: '',
  },
  {
    type: 'generictag',
    message0: '< %1 > %2 %3',
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        text: 'tag',
      },
      {
        type: 'input_value',
        name: 'NAME',
        check: 'attribute',
      },
      {
        type: 'input_statement',
        name: 'content',
        check: 'html',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'more_attributes',
    message0: '%1 %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'NAME1',
        check: 'attribute',
      },
      {
        type: 'input_value',
        name: 'NAME2',
        check: 'attribute',
      },
      {
        type: 'input_value',
        name: 'NAME3',
        check: 'attribute',
      },
    ],
    output: 'attribute',
    colour: 230,
    tooltip: '',
    helpUrl: '',
  },
  {
    type: 'genericattribute',
    message0: '%1  =  %2',
    args0: [
      {
        type: 'field_input',
        name: 'attribute',
        text: 'attribute',
      },
      {
        type: 'field_input',
        name: 'value',
        text: 'value',
      },
    ],
    inputsInline: true,
    output: 'attribute',
    colour: 230,
    tooltip: '',
    helpUrl: '',
  },
  {
    type: 'link',
    message0: 'link to %1 %2 %3',
    args0: [
      {
        type: 'field_input',
        name: 'NAME',
        text: 'target',
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
        check: 'html',
      },
    ],
    previousStatement: 'html',
    nextStatement: 'html',
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'span',
    message0: 'span %1 %2',
    args0: [
      {
        type: 'input_value',
        name: 'NAME',
        check: 'attribute',
      },
      {
        type: 'input_statement',
        name: 'content',
        check: 'html',
      },
    ],
    previousStatement: 'html',
    nextStatement: 'html',
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'image',
    message0: 'image %1 or %2',
    args0: [
      {
        type: 'field_input',
        name: 'IMAGE',
        text: 'URL',
      },
      {
        type: 'field_input',
        name: 'ALT',
        text: 'alternative text',
      },
    ],
    previousStatement: 'html',
    nextStatement: 'html',
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'emphasise',
    message0: 'emphasise %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'strong',
    message0: 'important %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'headline',
    message0: 'headline %1 %2 %3',
    args0: [
      {
        type: 'field_dropdown',
        name: 'NAME',
        options: [
          ['level 1', 'h1'],
          ['level 2', 'h2'],
          ['level 3', 'h2'],
          ['level 4', 'h4'],
          ['level 5', 'h5'],
          ['level 6', 'h6'],
        ],
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'linebreak',
    message0: 'line break',
    previousStatement: null,
    nextStatement: null,
    colour: 330,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'horizontalbreak',
    message0: 'topic break',
    previousStatement: null,
    nextStatement: null,
    colour: 330,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'unorderedlist',
    message0: 'unordered list %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'NAME',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'orderedlist',
    message0: 'ordered list %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'NAME',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'listelement',
    message0: 'list item %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'inserted',
    message0: 'inserted %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'deleted',
    message0: 'deleted %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'super',
    message0: 'superscript %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'sub',
    message0: 'subscript %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'code',
    message0: 'code %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'quote',
    message0: 'quote %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'blockquote',
    message0: 'blockquote %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'sample',
    message0: 'sample output %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'keyboard',
    message0: 'keyboard input %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'variable',
    message0: 'variable %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'form',
    message0: 'form %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'frontend-start',
    message0: 'frontend-start',
    tooltip: '',
    helpUrl: '',
    nextStatement: 'html',
    colour: 225,
  },
  {
    type: 'backend-start',
    message0: 'backend-start',
    tooltip: '',
    helpUrl: '',
    nextStatement: 'html',
    colour: 225,
  },
  {
    type: 'add-to-db',
    tooltip: '',
    helpUrl: '',
    message0: 'add-to-db %1',
    args0: [
      {
        type: 'input_value',
        name: 'data',
        align: 'CENTRE',
        check: 'String',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 225,
    inputsInline: true,
  },
  {
    type: 'delete-from-db',
    tooltip: '',
    helpUrl: '',
    message0: 'delete-from-db %1',
    args0: [
      {
        type: 'input_value',
        name: 'data',
        align: 'CENTRE',
        check: 'String',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 225,
    inputsInline: true,
  },
  {
    type: 'create-db',
    tooltip: '',
    helpUrl: '',
    message0: 'create-db %1',
    args0: [
      {
        type: 'input_value',
        name: 'data',
        align: 'CENTRE',
        check: 'String',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 225,
    inputsInline: true,
  },
  {
    type: 'read-db',
    tooltip: '',
    helpUrl: '',
    message0: 'read-db %1',
    args0: [
      {
        type: 'input_value',
        name: 'data',
        align: 'CENTRE',
        check: 'String',
      },
    ],
    output: null,
    colour: 225,
    inputsInline: true,
  },
  {
    type: 'table',
    message0: 'table %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
        check: 'table',
      },
    ],
    previousStatement: 'html',
    nextStatement: 'html',
    colour: 180,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'tablerow',
    message0: 'row %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
        check: 'tablerow',
      },
    ],
    previousStatement: 'table',
    nextStatement: 'table',
    colour: 180,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'tablecell',
    message0: 'entry %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
        check: 'html',
      },
    ],
    previousStatement: 'tablerow',
    nextStatement: 'tablerow',
    colour: 180,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'input_text',
    message0: 'text input %1',
    args0: [
      {
        type: 'field_input',
        name: 'default',
        text: '',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'button',
    message0: 'button %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'NAME',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'input',
    message0: '%1 input %2 %3',
    args0: [
      {
        type: 'field_dropdown',
        name: 'type',
        options: [
          ['text', 'text'],
          ['email', 'email'],
          ['number', 'number'],
          ['password', 'password'],
          ['checkbox', 'checkbox'],
          ['radiobutton', 'radio'],
          ['button', 'button'],
          ['colour', 'color'],
          ['date', 'date'],
          ['local time', 'datetime-local'],
          ['file', 'file'],
          ['hidden', 'hidden'],
          ['image', 'image'],
          ['month', 'month'],
          ['range', 'range'],
          ['reset', 'reset'],
          ['search', 'search'],
          ['submit', 'submit'],
          ['telephone number', 'tel'],
          ['time', 'time'],
          ['url', 'url'],
          ['week', 'week'],
        ],
      },
      {
        type: 'field_input',
        name: 'value',
        text: '',
      },
      {
        type: 'input_value',
        name: 'text',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'script',
    message0: 'script %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'content',
        check: 'code',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 90,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
  {
    type: 'onclick',
    message0: 'on click =  %1 %2',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'NAME',
        check: 'code',
      },
    ],
    inputsInline: true,
    output: 'attribute',
    colour: 230,
    tooltip: '',
    helpUrl: '',
  },
  {
    type: 'body_attributes',
    message0: 'content %1 %2',
    args0: [
      {
        type: 'input_value',
        name: 'NAME',
        check: 'attribute',
      },
      {
        type: 'input_statement',
        name: 'content',
        check: 'html',
      },
    ],
    previousStatement: 'document',
    nextStatement: 'document',
    colour: 0,
    tooltip: '',
    helpUrl: 'http://www.w3schools.com/tags/tag_html.asp',
  },
];

Blockly.defineBlocksWithJsonArray(htmlBlocks);

export default function Home() {
  const blocklyRef = useRef(null);
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [isRendering , setIsRendering] = useState(false);
  const { workspace, xml } = useBlocklyWorkspace({
    ref: blocklyRef,
    toolboxConfiguration: {
      kind: 'categoryToolbox',
      contents: [
        {
          kind: 'category',
          name: 'HTML',
          colour: 230,
          contents: [
            { kind: 'block', type: 'baseframe' },
            { kind: 'block', type: 'html' },
            { kind: 'block', type: 'body' },
            { kind: 'block', type: 'head' },
            { kind: 'block', type: 'title' },
            { kind: 'block', type: 'paragraph' },
            { kind: 'block', type: 'plaintext' },
            { kind: 'block', type: 'division' },
            { kind: 'block', type: 'style' },
            { kind: 'block', type: 'color' },
            { kind: 'block', type: 'bgcolour' },
            { kind: 'block', type: 'genericstyle' },
            { kind: 'block', type: 'generictag' },
            { kind: 'block', type: 'more_attributes' },
            { kind: 'block', type: 'genericattribute' },
            { kind: 'block', type: 'link' },
            { kind: 'block', type: 'span' },
            { kind: 'block', type: 'image' },
            { kind: 'block', type: 'emphasise' },
            { kind: 'block', type: 'strong' },
            { kind: 'block', type: 'headline' },
            { kind: 'block', type: 'linebreak' },
            { kind: 'block', type: 'horizontalbreak' },
            { kind: 'block', type: 'unorderedlist' },
            { kind: 'block', type: 'orderedlist' },
            { kind: 'block', type: 'listelement' },
            { kind: 'block', type: 'inserted' },
            { kind: 'block', type: 'deleted' },
            { kind: 'block', type: 'super' },
            { kind: 'block', type: 'sub' },
            { kind: 'block', type: 'code' },
            { kind: 'block', type: 'quote' },
            { kind: 'block', type: 'blockquote' },
            { kind: 'block', type: 'sample' },
            { kind: 'block', type: 'keyboard' },
            { kind: 'block', type: 'variable' },
            { kind: 'block', type: 'form' },
            { kind: 'block', type: 'table' },
            { kind: 'block', type: 'tablerow' },
            { kind: 'block', type: 'tablecell' },
            { kind: 'block', type: 'input_text' },
            { kind: 'block', type: 'button' },
            { kind: 'block', type: 'input' },
            { kind: 'block', type: 'script' },
            { kind: 'block', type: 'onclick' },
            { kind: 'block', type: 'body_attributes' },
          ],
        },
        {
          kind: 'category',
          name: 'Backend',
          colour: 120,
          contents: [
            { kind: 'block', type: 'backend-start' },
            { kind: 'block', type: 'add-to-db' },
            { kind: 'block', type: 'delete-from-db' },
            { kind: 'block', type: 'create-db' },
            { kind: 'block', type: 'read-db' },
          ],
        },
        {
          kind: 'category',
          name: 'Loops',
          categorystyle: 'loop_category',
          contents: [
            {
              kind: 'block',
              type: 'controls_repeat_ext',
              inputs: {
                TIMES: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 10,
                    },
                  },
                },
              },
            },
            {
              kind: 'block',
              type: 'controls_whileUntil',
            },
            {
              kind: 'block',
              type: 'controls_for',
              inputs: {
                FROM: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 1,
                    },
                  },
                },
                TO: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 10,
                    },
                  },
                },
                BY: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 1,
                    },
                  },
                },
              },
            },
            {
              kind: 'block',
              type: 'controls_forEach',
            },
            {
              kind: 'block',
              type: 'controls_flow_statements',
            },
          ],
        },
        {
          kind: 'category',
          name: 'Math',
          categorystyle: 'math_category',
          contents: [
            {
              kind: 'block',
              type: 'math_number',
              fields: {
                NUM: 123,
              },
            },
            {
              kind: 'block',
              type: 'math_arithmetic',
              inputs: {
                A: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 1,
                    },
                  },
                },
                B: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 1,
                    },
                  },
                },
              },
            },
            {
              kind: 'block',
              type: 'math_single',
              inputs: {
                NUM: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 9,
                    },
                  },
                },
              },
            },
            {
              kind: 'block',
              type: 'math_trig',
              inputs: {
                NUM: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 45,
                    },
                  },
                },
              },
            },
            {
              kind: 'block',
              type: 'math_constant',
            },
            {
              kind: 'block',
              type: 'math_number_property',
              inputs: {
                NUMBER_TO_CHECK: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 0,
                    },
                  },
                },
              },
            },
            {
              kind: 'block',
              type: 'math_round',
              fields: {
                OP: 'ROUND',
              },
              inputs: {
                NUM: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 3.1,
                    },
                  },
                },
              },
            },
            {
              kind: 'block',
              type: 'math_on_list',
              fields: {
                OP: 'SUM',
              },
            },
            {
              kind: 'block',
              type: 'math_modulo',
              inputs: {
                DIVIDEND: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 64,
                    },
                  },
                },
                DIVISOR: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 10,
                    },
                  },
                },
              },
            },
            {
              kind: 'block',
              type: 'math_constrain',
              inputs: {
                VALUE: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 50,
                    },
                  },
                },
                LOW: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 1,
                    },
                  },
                },
                HIGH: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 100,
                    },
                  },
                },
              },
            },
            {
              kind: 'block',
              type: 'math_random_int',
              inputs: {
                FROM: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 1,
                    },
                  },
                },
                TO: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 100,
                    },
                  },
                },
              },
            },
            {
              kind: 'block',
              type: 'math_random_float',
            },
            {
              kind: 'block',
              type: 'math_atan2',
              inputs: {
                X: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 1,
                    },
                  },
                },
                Y: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 1,
                    },
                  },
                },
              },
            },
          ],
        },
        {
          kind: 'category',
          name: 'Lists',
          categorystyle: 'list_category',
          contents: [
            {
              kind: 'block',
              type: 'lists_create_with',
            },
            {
              kind: 'block',
              type: 'lists_create_with',
            },
            {
              kind: 'block',
              type: 'lists_repeat',
              inputs: {
                NUM: {
                  shadow: {
                    type: 'math_number',
                    fields: {
                      NUM: 5,
                    },
                  },
                },
              },
            },
            {
              kind: 'block',
              type: 'lists_length',
            },
            {
              kind: 'block',
              type: 'lists_isEmpty',
            },
            {
              kind: 'block',
              type: 'lists_indexOf',
              inputs: {
                VALUE: {
                  block: {
                    type: 'variables_get',
                  },
                },
              },
            },
            {
              kind: 'block',
              type: 'lists_getIndex',
              inputs: {
                VALUE: {
                  block: {
                    type: 'variables_get',
                  },
                },
              },
            },
            {
              kind: 'block',
              type: 'lists_setIndex',
              inputs: {
                LIST: {
                  block: {
                    type: 'variables_get',
                  },
                },
              },
            },
            {
              kind: 'block',
              type: 'lists_getSublist',
              inputs: {
                LIST: {
                  block: {
                    type: 'variables_get',
                  },
                },
              },
            },
            {
              kind: 'block',
              type: 'lists_split',
              inputs: {
                DELIM: {
                  shadow: {
                    type: 'text',
                    fields: {
                      TEXT: ',',
                    },
                  },
                },
              },
            },
            {
              kind: 'block',
              type: 'lists_sort',
            },
          ],
        },
        {
          kind: 'sep',
        },
        {
          kind: 'category',
          name: 'Variables',
          categorystyle: 'variable_category',
          custom: 'VARIABLE',
        },
        {
          kind: 'category',
          name: 'Functions',
          categorystyle: 'procedure_category',
          custom: 'PROCEDURE',
        },
      ],
    },
    initialXml: "<xml xmlns='http://www.w3.org/1999/xhtml'></xml>",
    onWorkspaceChange: (workspace) => {
      const code = HtmlGenerator.workspaceToCode(workspace);
      console.log(code);
      setGeneratedHtml(code);
    },
  });

  const handleButtonClick = () => {
    setIsRendering(!isRendering);
  };
  
  return (
    <>
      <div className="flex text-black">
        <div ref={blocklyRef} className="w-1/2 h-screen" />
        {isRendering ? (
            <div className="w-1/2 h-screen text-white" dangerouslySetInnerHTML={{ __html: generatedHtml }} />  
          ) : 
          <iframe
            className="w-1/2 h-screen"
            align="right"
            src="https://www.youtube.com/embed/i0M4ARe9v0Y?si=ZDiC4woohOx-VKfw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        }
      </div>
      <button onClick={handleButtonClick}>Toggle Rendering</button>
    </>
  );
}
