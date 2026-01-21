'use client';

import { useState } from 'react';
import Editor from '@/components/Editor';
import { Send, Image as ImageIcon, Tag } from 'lucide-react';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState(
    '<p>Start writing your bold ideas here...</p>',
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, category, content });
    // Future: API call with Axios
    alert('Post created (check console for data)!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="space-y-4">
        <h1 className="text-5xl font-black">CREATE NEW POST</h1>
        <p className="text-xl font-medium text-slate-600">
          Make it loud, make it bold.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xl font-black flex items-center gap-2">
              TITLE
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your post a punchy title..."
              className="w-full neo-card text-2xl font-bold placeholder:opacity-50 outline-none focus:bg-primary/10 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xl font-black flex items-center gap-2">
                <Tag size={20} /> CATEGORY
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full neo-card font-bold outline-none cursor-pointer"
              >
                <option value="">Select Category</option>
                <option value="design">Design</option>
                <option value="tech">Tech</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xl font-black flex items-center gap-2">
                <ImageIcon size={20} /> BANNER
              </label>
              <button
                type="button"
                className="w-full neo-card font-bold text-slate-500 flex items-center justify-center gap-2 hover:bg-gray-50"
              >
                Upload Image
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xl font-black">CONTENT</label>
            <Editor content={content} onChange={setContent} />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="neo-btn !bg-secondary text-white text-xl px-12 py-4 flex items-center gap-3"
          >
            Publish Post <Send size={24} />
          </button>
        </div>
      </form>
    </div>
  );
}
