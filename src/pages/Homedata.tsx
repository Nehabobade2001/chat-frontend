
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiCode, FiEye, FiCopy, FiCheck, FiTrash } from 'react-icons/fi';

interface CodeEntry {
  _id: string;
  prompt: string;
  response: string;
  createdAt: string;
  code?: string;
}

const cleanCode = (raw: string): string => {
  let cleaned = raw.trim();
  cleaned = cleaned.replace(/```(?:html|css|js)?/gi, '').replace(/```/g, '').trim();

  if (!cleaned.includes('<html')) {
    cleaned = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Generated Page</title>
          <style>
            body { margin: 0; padding: 0; font-family: sans-serif; }
          </style>
        </head>
        <body>
          ${cleaned}
        </body>
      </html>
    `;
  }

  return cleaned;
};

const LandingPageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState<CodeEntry[]>([]);
  const [selectedChat, setSelectedChat] = useState<CodeEntry | null>(null);
  const [view, setView] = useState<'code' | 'preview'>('code');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get<{ data: CodeEntry[] }>('http://localhost:5000/api/gemini');
      const sorted = res.data.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const cleaned = sorted.map(item => ({ ...item, code: cleanCode(item.response) }));
      setHistory(cleaned);
      if (cleaned.length > 0) setSelectedChat(cleaned[0]);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch history.');
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Prompt is required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const finalPrompt = `Generate a complete, responsive, professional landing page with embedded HTML, CSS (inside <style>), and JavaScript (inside <script>) all in one file. Include interactivity using JS. Prompt: ${prompt}`;
      const res = await axios.post('http://localhost:5000/api/gemini', { prompt: finalPrompt });
      const response = res.data?.data?.response || '';
      const code = cleanCode(response);

      const newEntry: CodeEntry = {
        _id: Date.now().toString(),
        prompt,
        response,
        createdAt: new Date().toISOString(),
        code,
      };

      setHistory([newEntry, ...history]);
      setSelectedChat(newEntry);
      setPrompt('');
    } catch (err) {
      console.error(err);
      setError('Failed to generate code.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!selectedChat?.code) return;
    navigator.clipboard.writeText(selectedChat.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/gemini/${id}`);
      const updated = history.filter(chat => chat._id !== id);
      setHistory(updated);
      if (selectedChat?._id === id) {
        setSelectedChat(updated.length ? updated[0] : null);
      }
    } catch (err) {
      console.error('Failed to delete chat', err);
      setError('Failed to delete chat.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-800 p-4 border-r border-gray-700 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">💬 Recent Chats</h2>
        <div className="space-y-2">
          {history.map(chat => (
            <div
              key={chat._id}
              className={`flex justify-between items-center p-2 rounded-md hover:bg-gray-700 ${
                selectedChat?._id === chat._id ? 'bg-gray-700' : ''
              }`}
            >
              <button
                onClick={() => {
                  setSelectedChat(chat);
                  setView('code');
                }}
                className="text-left text-sm flex-1 truncate"
              >
                {chat.prompt.slice(0, 40)}...
              </button>
              <button
                onClick={() => handleDelete(chat._id)}
                className="text-white hover:text-red-600 ml-2"
                title="Delete chat"
              >
                <FiTrash />
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-2">⚡ AI Landing Page Generator</h1>
        <p className="text-gray-400 mb-4 text-sm">Enter a prompt to generate a landing page</p>

        {/* Prompt Input */}
        <div className="max-w-2xl mb-6">
          <input
            type="text"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleGenerate()}
            placeholder="e.g. Modern SaaS landing page with features and contact form"
            className="w-full bg-gray-800 border border-gray-600 text-white px-4 py-3 rounded-md placeholder-gray-400"
            disabled={loading}
          />
          <div className="flex justify-between items-center mt-2">
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm"
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>

        {/* Code or Preview Output */}
        {selectedChat && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm text-gray-300">Prompt: {selectedChat.prompt}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setView(view === 'code' ? 'preview' : 'code')}
                  className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                >
                  {view === 'code' ? <FiEye /> : <FiCode />}
                  {view === 'code' ? 'Preview' : 'Code'}
                </button>
                {view === 'code' && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                  >
                    {copied ? <FiCheck /> : <FiCopy />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                )}
              </div>
            </div>

            {view === 'code' ? (
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-auto h-[500px] whitespace-pre-wrap">
                <code>{selectedChat.code}</code>
              </pre>
            ) : (
              <iframe
                title="Preview"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                srcDoc={selectedChat.code}
                className="w-full h-[500px] rounded-md border"
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default LandingPageGenerator;
