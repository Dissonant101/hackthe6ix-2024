'use client';

import { useState } from 'react';
import { BlocklyWorkspace } from 'react-blockly';

export default function Home() {
  const [xml, setXml] = useState();

  return (
    <div className="w-screen h-screen">
      <BlocklyWorkspace
        className="w-full h-full"
        toolboxConfiguration={{
          kind: 'flyoutToolbox',
          contents: [{ kind: 'block', type: 'controls_if' }],
        }}
        initialXml={xml}
        onXmlChange={setXml}
      />
    </div>
  );
}
