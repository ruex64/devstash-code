import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import { User, Tag, Terminal, Clipboard, Check, FileText, Edit, Trash2, GitFork, Code, Eye } from 'lucide-react';

// Import Sandpack for live previews
import { Sandpack } from "@codesandbox/sandpack-react";

// Import the syntax highlighter for the code view
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


const ComponentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: loggedInUser } = useAuth();
  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCommands, setCopiedCommands] = useState(false);
  const [activeTab, setActiveTab] = useState('code'); // 'code' or 'preview'

  useEffect(() => {
    const fetchComponent = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/components/${id}`);
        setComponent(data);
      } catch (error) {
        toast.error('Failed to fetch component details.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComponent();
  }, [id]);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
    if (type === 'Code') setCopiedCode(true), setTimeout(() => setCopiedCode(false), 2000);
    else setCopiedCommands(true), setTimeout(() => setCopiedCommands(false), 2000);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this component? This action cannot be undone.')) {
        try {
            await api.delete(`/components/${id}`);
            toast.success('Component deleted successfully.');
            navigate('/');
        } catch (error) {
            toast.error('Failed to delete component.');
        }
    }
  };
  
  const handleRemix = () => {
    navigate('/create', { state: { componentToRemix: component } });
  };

  const isOwnerOrAdmin = loggedInUser && (loggedInUser._id === component?.user._id || loggedInUser.role === 'admin');
  const canRemix = loggedInUser && (loggedInUser.role === 'collaborator' || loggedInUser.role === 'admin');
  const isPreviewable = component && ['javascript', 'jsx', 'tsx'].includes(component.filetype);

  if (loading) return <div className="flex justify-center items-center h-96"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>;
  if (!component) return <div className="text-center py-16"><h2 className="text-2xl font-bold">Component not found</h2></div>;

  // --- Sandpack Configuration ---
  const sandpackFiles = {
    // Sandpack expects the entry file to be App.js or App.tsx
    [`/App.${component.filetype}`]: component.code
  };

  // Custom renderer for code blocks to apply syntax highlighting
  const markdownComponents = {
    code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
            <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        )
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <img src={component.image} alt={component.name} className="w-full h-auto object-cover rounded-xl border border-border-color" />
          <div className="p-6 glass-card space-y-4">
            <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-text-primary">{component.name}</h1>
                <div className="flex gap-2">
                    {isOwnerOrAdmin && (
                        <>
                            <Link to={`/edit-component/${id}`}><Button variant="secondary" icon={<Edit size={16}/>} /></Link>
                            <Button variant="danger" onClick={handleDelete} icon={<Trash2 size={16}/>} />
                        </>
                    )}
                    {canRemix && !isOwnerOrAdmin && (
                        <Button variant="secondary" onClick={handleRemix} icon={<GitFork size={16}/>}>Remix</Button>
                    )}
                </div>
            </div>
            {component.remixedFrom && (
                <Link to={`/component/${component.remixedFrom._id}`} className="flex items-center gap-2 text-sm text-accent hover:underline"><GitFork size={14} /><span>Remixed from {component.remixedFrom.name}</span></Link>
            )}
            <Link to={`/profile/${component.user._id}`} className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors"><User size={16} /><span>{component.user.name}</span></Link>
            <div className="flex flex-wrap gap-2">{component.tags.map(tag => <span key={tag} className="flex items-center gap-1 text-xs bg-secondary px-2 py-1 rounded-full text-text-secondary"><Tag size={12} />{tag}</span>)}</div>
            {component.filename && <div className="flex items-center gap-2 text-sm text-text-secondary"><FileText size={16} /><span>{component.filename}</span></div>}
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          {component.commands && (
            <div className="p-6 glass-card">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><Terminal size={20} /> Installation</h3>
              <div className="relative group">
                <SyntaxHighlighter style={vscDarkPlus} language="sh" PreTag="div">{component.commands}</SyntaxHighlighter>
                <button onClick={() => handleCopy(component.commands, 'Commands')} className="absolute top-3 right-3 p-1.5 text-white hover:text-accent bg-secondary rounded-md transition-all duration-200">{copiedCommands ? <Check size={16} className="text-green-400" /> : <Clipboard size={16} />}</button>
              </div>
            </div>
          )}
          <div className="p-6 glass-card">
            <div className="flex border-b border-border-color mb-4">
                <button onClick={() => setActiveTab('code')} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${activeTab === 'code' ? 'text-accent border-b-2 border-accent' : 'text-text-secondary hover:text-text-primary'}`}><Code size={16}/> Code</button>
                {isPreviewable && (
                    <button onClick={() => setActiveTab('preview')} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${activeTab === 'preview' ? 'text-accent border-b-2 border-accent' : 'text-text-secondary hover:text-text-primary'}`}><Eye size={16}/> Live Preview</button>
                )}
            </div>
            
            {activeTab === 'code' ? (
                <div className="relative group">
                    <SyntaxHighlighter style={vscDarkPlus} language={component.filetype} PreTag="div">{component.code}</SyntaxHighlighter>
                    <button onClick={() => handleCopy(component.code, 'Code')} className="absolute top-3 right-3 p-1.5 text-white hover:text-accent bg-secondary rounded-md transition-all duration-200">{copiedCode ? <Check size={16} className="text-green-400" /> : <Clipboard size={16} />}</button>
                </div>
            ) : (
                <div className="h-[500px] w-full">
                    <Sandpack
                        template="react"
                        theme="dark"
                        files={sandpackFiles}
                        options={{
                            showNavigator: true,
                            showLineNumbers: true,
                            editorHeight: '500px',
                        }}
                    />
                </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComponentDetailPage;
