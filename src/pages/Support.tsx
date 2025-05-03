// import React from 'react'

// const Support = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-800">
//     <header className="bg-white shadow p-6">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Support Center</h1>
//         <a href="/" className="text-blue-600 hover:underline">Back to Home</a>
//       </div>
//     </header>

//     <main className="max-w-5xl mx-auto px-4 py-10">
//       <section className="text-center mb-12">
//         <h2 className="text-3xl font-bold mb-4">We're here to help</h2>
//         <p className="text-lg text-gray-600">Find answers to your questions or contact our support team</p>
//       </section>

//       <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//           <h3 className="text-xl font-semibold mb-2">Account & Billing</h3>
//           <p className="text-gray-600 mb-4">Manage your subscription, billing info, and account settings.</p>
//           <a href="#" className="text-blue-600 font-medium hover:underline">Learn more →</a>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//           <h3 className="text-xl font-semibold mb-2">Technical Support</h3>
//           <p className="text-gray-600 mb-4">Having trouble? Get help from our tech support team.</p>
//           <a href="#" className="text-blue-600 font-medium hover:underline">Get support →</a>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//           <h3 className="text-xl font-semibold mb-2">FAQs</h3>
//           <p className="text-gray-600 mb-4">Browse the most frequently asked questions and answers.</p>
//           <a href="#" className="text-blue-600 font-medium hover:underline">View FAQs →</a>
//         </div>
//       </section>

//       <section className="mt-16 text-center">
//         <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
//         <p className="text-gray-600 mb-6">Contact our support team and we'll get back to you as soon as possible.</p>
//         <a
//           href="mailto:support@example.com"
//           className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
//         >
//           Contact Support
//         </a>
//       </section>
//     </main>

//     <footer className="text-center text-sm text-gray-500 mt-16 pb-6">
//       &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
//     </footer>
//   </div>
//   )
// }

// export default Support



import React, { useEffect, useState } from 'react';

interface HistoryItem {
  _id: string;
  prompt: string;
  response: string;
  createdAt: string;
}

const LandingPageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const parseCode = (response: string) => {
    const htmlBody = response.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || '';
    const cssMatch = response.match(/<style[^>]*>([\s\S]*?)<\/style>/i)?.[1] || '';
    const jsMatch = response.match(/<script[^>]*>([\s\S]*?)<\/script>/i)?.[1] || '';

    setHtmlCode(htmlBody);
    setCssCode(cssMatch);
    setJsCode(jsMatch);
  };

  const generateLandingPage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('https://chat-backend-mimc.onrender.com/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const result = await res.json();
      const response = result?.data?.response || '';
      parseCode(response);
      fetchHistory(); // Refresh history
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch('https://chat-backend-mimc.onrender.com/api/gemini');
      const result = await res.json();
      setHistory(result.data || []);
    } catch (error) {
      console.error('History fetch error:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied!');
  };

  const previewContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
        <script>${jsCode}</script>
      </body>
    </html>
  `;

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center text-blue-700">
        AI Landing Page Generator
      </h1>

      {/* Prompt Input */}
      <div className="flex gap-4 items-center">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your landing page..."
          className="flex-1 p-3 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={generateLandingPage}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {/* Live Preview */}
      {htmlCode && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Live Preview</h2>
            <iframe
              title="Preview"
              srcDoc={previewContent}
              sandbox="allow-scripts"
              className="w-full h-[450px] border rounded shadow"
            />
          </div>

          {/* Code Blocks */}
          {[
            { label: 'HTML', code: htmlCode, color: 'text-blue-600' },
            { label: 'CSS', code: cssCode, color: 'text-green-600' },
            { label: 'JavaScript', code: jsCode, color: 'text-yellow-600' },
          ].map(({ label, code, color }) => (
            <div key={label}>
              <div className="flex justify-between items-center mb-2">
                <h3 className={`text-xl font-medium ${color}`}>{label} Code</h3>
                <button
                  onClick={() => copyToClipboard(code)}
                  className="text-sm underline hover:text-blue-800"
                >
                  Copy {label}
                </button>
              </div>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm whitespace-pre-wrap">
                <code>{code}</code>
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* History Section */}
      {history.length > 0 && (
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Previous Generations</h2>
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
                  <p className="font-semibold text-gray-600">Prompt: {item.prompt}</p>
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
      )}
    </div>
  );
};

export default LandingPageGenerator;
