import React from 'react';

const Topbar: React.FC = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
      <h1 className="text-xl font-bold">AI Poem Generator</h1>
      <button className="text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
        Upgrade to DeepAI Pro
      </button>
    </div>
  );
};

export default Topbar;
