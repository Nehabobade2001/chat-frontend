import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-950 p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Chat History</h2>
      <div className="space-y-2 text-sm">
        <button className="bg-gray-800 px-3 py-2 rounded text-left w-full">New Chat</button>
        <button className="bg-gray-800 px-3 py-2 rounded text-left w-full">
          Technical Support Chat Session Transcript
        </button>
      </div>

      <div className="mt-auto">
        <button className="bg-purple-600 hover:bg-purple-700 text-white mt-4 w-full py-2 rounded text-sm">
          Upgrade to DeepAI Pro
        </button>
        <button className="mt-2 text-red-400 text-xs underline w-full text-left">Delete Chat History</button>
      </div>
    </div>
  );
};

export default Sidebar;
