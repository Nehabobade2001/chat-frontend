



import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Edit2, Trash2, Save, X } from "lucide-react";
import dayjs from "dayjs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface PromptItem {
  _id: string;
  prompt: string;
  createdAt: string;
}

const API_BASE_URL = "http://localhost:5000/api/gemini/generate";

const ChatWindow: React.FC = () => {
  const [history, setHistory] = useState<PromptItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Editing states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");

  // Fetch chat history from backend
  const fetchHistory = useCallback(async () => {
    try {
      setError(null);
      const res = await axios.get(API_BASE_URL);
      setHistory(res.data?.data || []);
    } catch (err) {
      setError("Failed to load chat history.");
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Delete prompt by id
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/${id}`);
      await fetchHistory();
      alert("Deleted successfully.");
    } catch {
      setError("Failed to delete.");
    } finally {
      setLoading(false);
    }
  };

  // Update prompt code
  const handleUpdate = async () => {
    if (!editingId) return;
    try {
      setLoading(true);
      await axios.put(`${API_BASE_URL}/${editingId}`, { prompt: editingContent });
      setEditingId(null);
      setEditingContent("");
      await fetchHistory();
    } catch {
      setError("Failed to update prompt.");
    } finally {
      setLoading(false);
    }
  };

  // Filter today only
  const today = dayjs().format("YYYY-MM-DD");
  const todayHistory = history.filter(
    (item) => dayjs(item.createdAt).format("YYYY-MM-DD") === today
  );

  return (
    <aside className="w-96 p-4 bg-[#151026] text-white rounded shadow-lg overflow-y-auto max-h-screen sticky top-0">
      <h2 className="text-2xl font-bold mb-4 text-center">Today's Chat History</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {todayHistory.length === 0 && <p className="text-gray-400 text-center">No chats today.</p>}

      <div className="space-y-4">
        {todayHistory.map((item) => (
          <div
            key={item._id}
            className="bg-[#1E1B2E] p-4 rounded-md border border-gray-700 relative"
          >
            {/* Editing Mode */}
            {editingId === item._id ? (
              <>
                <textarea
                  className="w-full h-40 p-2 rounded-md bg-[#121121] text-white font-mono border border-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-[#27DFB3]"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
                <div className="flex justify-end space-x-3 mt-2">
                  <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="px-3 py-1 bg-green-600 rounded hover:bg-green-700 transition"
                    title="Save"
                  >
                    <Save size={18} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    disabled={loading}
                    className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 transition"
                    title="Cancel"
                  >
                    <X size={18} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <SyntaxHighlighter
                  language="typescript"
                  style={oneDark}
                  showLineNumbers
                  customStyle={{ margin: 0, borderRadius: 6, backgroundColor: "#1E1B2E" }}
                >
                  {item.prompt}
                </SyntaxHighlighter>

                <div className="flex justify-end space-x-4 mt-2">
                  <button
                    onClick={() => {
                      setEditingId(item._id);
                      setEditingContent(item.prompt);
                    }}
                    title="Edit"
                    className="hover:text-yellow-400"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    title="Delete"
                    className="hover:text-red-600"
                    disabled={loading}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ChatWindow;
