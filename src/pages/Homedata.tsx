

import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Edit2, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { SendHorizonal } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";


interface PromptItem {
  _id: string;
  prompt: string;
  createdAt: string;
}

 type CodeBlock = {
  type: string;
  content: string;
};


type ItemType = {
  _id: string;
  title: string;
  description: string;
};



type Message = {
  type: "user" | "gemini";
  text?: string;
  codeBlocks?: CodeBlock[];
};


const API_BASE_URL = "http://localhost:5000/api/gemini/generate";

const Homedata: React.FC = () => {
  const [history, setHistory] = useState<PromptItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  const [prompt, setPrompt] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  // const [history, setHistory] = useState<HistoryItem[]>([]);
 
  const [items, setItems] = useState<ItemType[]>([]);
   

  // Fetch chat history
  const fetchHistory = useCallback(async () => {
    try {
      setError(null);
      const response = await axios.get(API_BASE_URL);
      setHistory(response.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch history:", err);
      setError("Unable to load chat history");
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Delete prompt by id
  const handleDelete = async (id: string) => {
    if (!id) {
      setError("No ID provided to delete");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;

    try {
      setLoading(true);
      setError(null);
      await axios.delete(`${API_BASE_URL}/${id}`);
      // Refresh history after delete
      await fetchHistory();
      alert("Item deleted successfully!");
    } catch (err) {
      console.error("Failed to delete item:", err);
      setError("Failed to delete item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update prompt (optional - you had this)
  const handleUpdatePrompt = async (id: string, newPrompt: string) => {
    if (!id) return;

    try {
      setLoading(true);
      await axios.put(`${API_BASE_URL}/${id}`, { prompt: newPrompt });
      setEditingId(null);
      console.log(setEditingId,"chat application give me vailed api")
      await fetchHistory();
    } catch (err) {
      console.error("Error updating prompt:", err);
      setError("Failed to update prompt.");
    } finally {
      setLoading(false);
    }
  };

  // Filter today's prompts only
  const today = dayjs().format("YYYY-MM-DD");
  const todayHistory = history.filter(
    (item) => dayjs(item.createdAt).format("YYYY-MM-DD") === today
  );


   const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const parseCodeBlocks = (text: string): CodeBlock[] => {
    const regex = /```(\w+)?\n([\s\S]*?)```/g;
    const blocks: CodeBlock[] = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      blocks.push({
        type: match[1]?.toUpperCase() || "CODE",
        content: match[2].trim(),
      });
    }
    return blocks;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setChat((prev) => [...prev, { type: "user", text: prompt }]);
    setPrompt("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/gemini/generate",
        { prompt }
      );
      const rawText =
        response.data?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const blocks = parseCodeBlocks(rawText);

      setTimeout(() => {
        setChat((prev) => [
          ...prev,
          {
            type: "gemini",
            codeBlocks: blocks.length ? blocks : undefined,
            text: blocks.length ? undefined : rawText,
          },
        ]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      setChat((prev) => [
        ...prev,
        { type: "gemini", text: "Error generating response." },
      ]);
      setLoading(false);
    }
  };

  const handleCopy = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(id);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0A061D] text-white">
      <aside className="w-64 h-screen bg-[#151026] p-6 sticky top-0 rounded-md border border-white overflow-y-auto hidden md:block shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Chat History</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {todayHistory.length === 0 && (
          <p className="text-center text-gray-400">No chat history for today.</p>
        )}
        

        <div>
          {todayHistory.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center p-2 border-b border-gray-700"
            >
              {editingId === item._id ? (
                <div className="flex flex-col w-full gap-2">
                  <input
                    type="text"
                    className="text-black rounded border px-2 py-1"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdatePrompt(item._id, editingText)}
                      className="text-green-500 hover:text-green-700 font-semibold"
                      disabled={loading}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-400 hover:text-white"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span className="truncate max-w-[70%]">{item.prompt}</span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setEditingId(item._id);
                        setEditingText(item.prompt);
                      }}
                      title="Edit"
                      className="hover:text-yellow-400"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      title="Delete"
                      className="hover:text-red-500"
                      disabled={loading}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Main content placeholder */}
      <main className="flex-1 p-6"> 
         <div className="flex-1 flex flex-col ">
        {/* Top Header */}
        <header className="sticky top-0 z-10 bg-[#151026] bg-opacity-90 p-4 flex justify-between border border-white rounded-md items-center shadow">
          <h1 className="text-xl sm:text-2xl font-bold">🧠 Chat-bot</h1>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#27DFB3] hover:bg-blue-700 rounded-md text-black text-sm sm:text-base transition">
              Sign Up
            </button>
            <button className="px-4 py-2 text-white border border-gray-300 hover:bg-gray-800 rounded-md text-sm sm:text-base transition">
              Sign In
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center py-12 px-6">
          <h1 className="text-5xl font-semibold mb-4">AI Poem Generator</h1>
          <h2 className="text-lg max-w-2xl text-gray-300">
            Introducing the revolutionary AI Poem Generator, an innovative tool
            that combines technology and creativity to turn a few simple words
            into stunning poetic masterpieces!
          </h2>
        </div>

        {/* Chat Content */}
        <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-4xl mx-auto w-full">
          {chat.map((msg, index) => (
            <div key={index}>
              {msg.type === "user" ? (
                <div className="text-right text-white bg-gray-500 p-3 rounded-lg max-w-2xl ml-auto">
                  {msg.text}
                </div>
              ) : msg.codeBlocks ? (
                msg.codeBlocks.map((block, i) => {
                  const key = `${index}-${i}`;
                  return (
                    <div
                      key={key}
                      className="relative mb-4 bg-[#151026] rounded-lg shadow"
                    >
                      <div className="flex justify-between items-center px-4 py-2 bg-[#151026] text-white rounded-t-lg">
                        <span className="font-semibold">
                          {block.type === "JS"
                            ? "⚙️ JavaScript"
                            : block.type === "HTML"
                            ? "📄 HTML"
                            : block.type === "CSS"
                            ? "🎨 CSS"
                            : `📦 ${block.type}`}
                        </span>
                        <button
                          onClick={() => handleCopy(block.content, key)}
                          className="text-xs bg-gray-500 px-2 py-1 rounded hover:bg-gray-800"
                        >
                          {copiedIndex === key ? "✅ Copied" : "📋 Copy"}
                        </button>
                      </div>
                      <SyntaxHighlighter
                        language={block.type.toLowerCase()}
                        style={oneDark}
                        customStyle={{
                          borderRadius: "0 0 8px 8px",
                          margin: 0,
                          backgroundColor: "#151026",
                        }}
                        showLineNumbers
                      >
                        {block.content}
                      </SyntaxHighlighter>
                    </div>
                  );
                })
              ) : (
                <div className="text-left text-gray-800 bg-white p-4 rounded-lg shadow max-w-2xl">
                  <Typewriter
                    words={[msg.text || ""]}
                    loop={1}
                    cursor
                    cursorStyle="_"
                    typeSpeed={30}
                  />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="text-left text-white bg-[#151026] bg-opacity-30 p-4 rounded-lg max-w-2xl">
              <Typewriter
                words={["Generating code..."]}
                loop={0}
                cursor
                cursorStyle="|"
              />
            </div>
          )}
          <div ref={chatEndRef} />
        </main>

        {/* Prompt Input */}
        <form
          onSubmit={handleSubmit}
          className="p-4 w-full flex items-center gap-2 sticky bottom-0 bg-[#0A061D] z-10"
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your prompt here..."
            className="flex-1 px-10  py-8 rounded-lg bg-[#151026] border border-white text-white focus:outline-none focus:ring-2 focus:ring-[#27DFB3]"
          /> 
          <button
            type="submit"
            className="p-3 rounded-full bg-[#27DFB3] text-black disabled:opacity-50"
            disabled={loading}
          >
            <SendHorizonal size={20} />
          </button>
        </form>
      </div>
      </main>
    </div>
  );
};

export default Homedata;
