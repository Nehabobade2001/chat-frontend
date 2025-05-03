
// import React, { useState } from "react";
// import { Download, Share2 } from "lucide-react";

// type Props = {
//   selectedChat: number | null;
//   setSelectedChat: (id: number) => void;
// };

// const mockHistory = [
//   { id: 1, title: "Chat with GPT - 1" },
//   { id: 2, title: "Project Q&A" },
//   { id: 3, title: "Design Suggestions" },
// ];

// const Aboute: React.FC<Props> = ({ selectedChat, setSelectedChat }) => {
//   const [search, setSearch] = useState("");

//   const filteredHistory = mockHistory.filter((chat) =>
//     chat.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <aside className="w-72 bg-white border-r p-4 flex flex-col">
//       <input
//         type="text"
//         placeholder="Search chats..."
//         className="mb-4 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <div className="flex-1 overflow-y-auto space-y-2">
//         {filteredHistory.map((chat) => (
//           <div
//             key={chat.id}
//             onClick={() => setSelectedChat(chat.id)}
//             className={`p-2 rounded-md cursor-pointer ${
//               selectedChat === chat.id ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"
//             }`}
//           >
//             {chat.title}
//           </div>
//         ))}
//       </div>

//       {/* Bottom buttons */}
//       <div className="pt-4 mt-auto border-t flex gap-2">
//         <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-500">
//           <Download className="w-4 h-4" /> Download
//         </button>
//         <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-500">
//           <Share2 className="w-4 h-4" /> Share
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Aboute;




import React from 'react';

interface Props {
  item: {
    _id: string;
    prompt: string;
    createdAt: string;
  };
  onDelete: (id: string) => void;
}

const HistoryCard: React.FC<Props> = ({ item, onDelete }) => {
  return (
    <div className="bg-white shadow rounded p-4 mb-4 border border-gray-200">
      <p className="font-medium text-gray-800 mb-2">{item.prompt}</p>
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>{new Date(item.createdAt).toLocaleString()}</span>
        <div className="space-x-2">
          <a
            href={`http://localhost:5000/api/gemini/preview/${item._id}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            Preview
          </a>
          <button
            onClick={() => onDelete(item._id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
