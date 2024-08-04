'use client';

import { useRef, useState, useEffect } from 'react';
import { useBlocklyWorkspace } from 'react-blockly';
import * as Blockly from 'blockly/core';
import { htmlGenerator } from '../../blockly/CodeGenerators';
import { blocks } from '../../blockly/BlockDefinitions';
import { toolbox } from '../../blockly/ToolboxConfig';

Blockly.defineBlocksWithJsonArray(blocks);

const BlocklyDiv = ({
  setXml,
  initialXml = "<xml xmlns='http://www.w3.org/1999/xhtml'></xml>",
  setGeneratedHtml, // add this prop
}) => {
  const blocklyRef = useRef(null);
  const { workspace, xml } = useBlocklyWorkspace({
    ref: blocklyRef,
    toolboxConfiguration: toolbox,
    initialXml,
    onWorkspaceChange: (workspace) => {
      const code = htmlGenerator.workspaceToCode(workspace);
      setGeneratedHtml(code); // set generated HTML
    },
  });

  useEffect(() => {
    setXml(xml);
  }, [xml]);

  return (
    <div
      className="relative z-0 flex-1 w-full h-screen text-black"
      ref={blocklyRef}
    ></div>
  );
};

export default function Home() {
  const fileInputRef = useRef();

  const [isRendering, setIsRendering] = useState(false);
  const [initialXml, setInitialXml] = useState(
    "<xml xmlns='http://www.w3.org/1999/xhtml'></xml>",
  );
  const [xml, setXml] = useState(initialXml);
  const [forceRemount, setForceRemount] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState(''); // add state for generated HTML

  const handleButtonClick = () => {
    setIsRendering(!isRendering);
  };

  const handleLoad = (e) => {
    console.log('Loading workspace');

    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onloadend = function (e) {
      setForceRemount(true);
      setXml(reader.result);
      setInitialXml(reader.result);
    };
    reader.readAsText(file);
  };
  useEffect(() => {
    if (forceRemount) setForceRemount(false);
  }, [forceRemount]);

  const handleSave = () => {
    console.log('Saving workspace');
    window.open(
      'data:application/octet-stream,' + encodeURIComponent(xml),
      'blockly.xml',
    );
  };

  return (
    <>
      <div className="flex w-screen h-screen text-black">
        {!forceRemount && (
          <BlocklyDiv 
            initialXml={initialXml} 
            setXml={setXml} 
            setGeneratedHtml={setGeneratedHtml} // pass the setter as prop
          />
        )}
        <div className="absolute z-20 flex space-x-1 transform -translate-x-1/2 bottom-4 left-1/4">
          <button
            onClick={handleButtonClick}
            className="px-4 py-2 text-black rounded bg-emerald-500"
          >
            Toggle Rendering
          </button>
          <button
            onClick={() => fileInputRef.current.click()}
            className="px-4 py-2 text-black rounded bg-emerald-500"
          >
            Load
            <input
              type="file"
              onChange={handleLoad}
              ref={fileInputRef}
              multiple={false}
              hidden={true}
            />
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-black rounded bg-emerald-500"
          >
            Save
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
