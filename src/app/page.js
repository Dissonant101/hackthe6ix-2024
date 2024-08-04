'use client';

import { useRef, useEffect, useState } from 'react';
import { useBlocklyWorkspace } from 'react-blockly';
import * as Blockly from 'blockly/core';
import { htmlGenerator } from '../../blockly/CodeGenerators';
import { javascriptGenerator } from 'blockly/javascript';
import { blocks } from '../../blockly/BlockDefinitions';
import { toolbox } from '../../blockly/ToolboxConfig';

Blockly.defineBlocksWithJsonArray(blocks);

export default function Home() {
  const blocklyRef = useRef(null);
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [isRendering, setIsRendering] = useState(false);
  const { workspace, xml } = useBlocklyWorkspace({
    ref: blocklyRef,
    toolboxConfiguration: toolbox,
    initialXml: "<xml xmlns='http://www.w3.org/1999/xhtml'></xml>",
    onWorkspaceChange: (workspace) => {
      const code = htmlGenerator.workspaceToCode(workspace);
      setGeneratedHtml(code);
    },
  });

  const handleButtonClick = () => {
    setIsRendering(!isRendering);
  };

  return (
    <>
      <div className="flex w-screen h-screen text-black">
        <div
          className="relative z-0 flex-1 w-full h-screen text-black"
          ref={blocklyRef}
        ></div>
        <div className="absolute z-20 transform -translate-x-1/2 bottom-4 left-1/4">
          <button
            onClick={handleButtonClick}
            className="px-4 py-2 text-black rounded bg-emerald-500"
          >
            Toggle Rendering
          </button>
        </div>
        {isRendering ? (
          <div
            className="flex-1 h-screen text-white"
            dangerouslySetInnerHTML={{
              __html: generatedHtml,
            }}
          />
        ) : (
          <iframe
            className="flex-1 h-screen"
            align="right"
            src="https://www.youtube.com/embed/dvjy6V4vLlI?si=CnmoG0gR4KFy8Ers&amp;controls=0&autoplay=1&mute=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        <div className="absolute bottom-0 left-0 m-4">
          <img
            src="https://cdn.discordapp.com/attachments/1266479640747315285/1269534627278753842/my_little_pony__pinkie_pie_2d_by_joshuat1306_dd34mw8-fullview.png?ex=66b069c1&is=66af1841&hm=ec15ce29d0861e6e0c0b1cfa021c78e572653bc494267bb74c568a9bd173f0bd&"
            alt="Description of image"
            className="w-16 h-16"
          />
        </div>
      </div>
    </>
  );
}
