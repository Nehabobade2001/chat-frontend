
// import React, { useState } from 'react';
// import { FiMenu, FiHome, FiSettings, FiX } from 'react-icons/fi';

// const Loves: React.FC = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="relative">
//       {/* Sidebar base */}
//       <div className="fixed top-0 left-0 h-screen w-16 bg-gray-900 flex flex-col items-center py-4 shadow-lg z-40">
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="text-white text-2xl hover:text-blue-400 transition"
//         >
//           {menuOpen ? <FiX /> : <FiMenu />}
//         </button>
//       </div>

//       {/* Pop-out Menu */}
//       {menuOpen && (
//         <div className="fixed top-0 left-16 h-screen w-64 bg-gray-800 text-white shadow-xl z-30 transition-transform animate-slide-in">
//           <div className="p-4 space-y-4">
//             <h2 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Recent Chat</h2>

//             <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-700 rounded">
//               <FiHome />
//               Dashboard
//             </button>

//             <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-700 rounded">
//               <FiSettings />
//               Settings
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Loves;







import React, { useEffect, useState } from 'react';
import { FiMenu, FiHome, FiSettings, FiX } from 'react-icons/fi';

interface HistoryItem {
  _id: string;
  prompt: string;
  response: string;
  createdAt: string;
}

const Loves: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Fetch on mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch('https://chat-backend-mimc.onrender.com/api/gemini');
      const result = await res.json();
      setHistory(result.data || []);
      console.log('Fetched history:', result.data);
    } catch (error) {
      console.error('History fetch error:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="relative min-h-screen bg-gray-100 px-4 py-6">
      {/* Sidebar base */}
      <div className="fixed top-0 left-0 h-screen w-16 bg-gray-900 flex flex-col items-center py-4 shadow-lg z-40">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl hover:text-blue-400 transition"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Slide-out menu */}
      {menuOpen && (
        <div className="fixed top-0 left-16 h-screen w-64 bg-gray-800 text-white shadow-xl z-30 transition-transform duration-300">
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-semibold border-b border-gray-600 pb-2">Recent Chat</h2>
            <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-700 rounded">
              <FiHome /> Dashboard
            </button>
            <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-700 rounded">
              <FiSettings /> Settings
            </button>
          </div>
        </div>
      )}

      {/* History Display */}
      {/* {history.length > 0 ? (
        <div className="ml-20 mt-4">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Previous Generations</h2>
          <div className="space-y-6">
            {history.map((item) => {
              const html = item.response.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || '';
              const css = item.response.match(/<style[^>]*>([\s\S]*?)<\/style>/i)?.[1] || '';
              const js = item.response.match(/<script[^>]*>([\s\S]*?)<\/script>/i)?.[1] || '';
              const preview = `
                <!DOCTYPE html>
                <html>
                  <head><style>${css}</style></head>
                  <body>${html}<script>${js}</script></body>
                </html>
              `;
              return (
                <div key={item._id} className="p-4 border rounded shadow bg-white space-y-3">
                  <p className="font-semibold text-gray-700">Prompt: {item.prompt}</p>
                  <iframe
                    title={`Preview-${item._id}`}
                    srcDoc={preview}
                    sandbox="allow-scripts"
                    className="w-full h-64 border rounded"
                  />
                  <div className="flex flex-wrap gap-4 mt-2">
                    <button
                      onClick={() => copyToClipboard(html)}
                      className="text-blue-600 underline text-sm"
                    >
                      Copy HTML
                    </button>
                    <button
                      onClick={() => copyToClipboard(css)}
                      className="text-green-600 underline text-sm"
                    >
                      Copy CSS
                    </button>
                    <button
                      onClick={() => copyToClipboard(js)}
                      className="text-yellow-600 underline text-sm"
                    >
                      Copy JS
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="ml-20 mt-8 text-gray-600">No history found. Try generating some content!</div>
      )} */}
    </div>
  );
};

export default Loves;
