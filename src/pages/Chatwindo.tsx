
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiArrowLeft, FiCopy } from 'react-icons/fi';

// const Preview: React.FC = () => {
//   const [code, setCode] = useState('');
//   const [copied, setCopied] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedCode = localStorage.getItem('generatedLandingPage');
//     if (!storedCode) {
//       navigate('/');
//     } else {
//       setCode(storedCode);
//     }
//   }, [navigate]);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <div className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow">
//         <button
//           onClick={() => navigate('/')}
//           className="flex items-center gap-2 text-sm hover:underline"
//         >
//           <FiArrowLeft />
//           Back
//         </button>

//         <button
//           onClick={handleCopy}
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
//         >
//           <FiCopy />
//           {copied ? 'Copied!' : 'Copy Code'}
//         </button>
//       </div>


// <iframe
//   srcDoc={`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Preview</title></head><body>${code}</body></html>`}
//   className="flex-1 w-full border-none"
//   title="Landing Page Preview"
// />

//     </div>
//   );
// };

// export default Preview;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCopy } from 'react-icons/fi';

const Preview: React.FC = () => {
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCode = localStorage.getItem('generatedLandingPage');
    if (!storedCode) navigate('/');
    else setCode(storedCode);
  }, [navigate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm hover:underline"
        >
          <FiArrowLeft />
          Back
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
        >
          <FiCopy />
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>

      <iframe
        srcDoc={`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Preview</title></head><body>${code}</body></html>`}
        className="flex-1 w-full border-none"
        title="Landing Page Preview"
      />
    </div>
  );
};

export default Preview;
