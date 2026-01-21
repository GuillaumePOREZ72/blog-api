'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
} from 'lucide-react';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4 p-2 bg-gray-50 neo-border-b">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 neo-border hover:bg-primary transition-colors ${editor.isActive('bold') ? 'bg-primary' : 'bg-white'}`}
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 neo-border hover:bg-primary transition-colors ${editor.isActive('italic') ? 'bg-primary' : 'bg-white'}`}
      >
        <Italic size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 neo-border hover:bg-primary transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-primary' : 'bg-white'}`}
      >
        <Heading1 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 neo-border hover:bg-primary transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-primary' : 'bg-white'}`}
      >
        <Heading2 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 neo-border hover:bg-primary transition-colors ${editor.isActive('bulletList') ? 'bg-primary' : 'bg-white'}`}
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 neo-border hover:bg-primary transition-colors ${editor.isActive('orderedList') ? 'bg-primary' : 'bg-white'}`}
      >
        <ListOrdered size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 neo-border hover:bg-primary transition-colors ${editor.isActive('blockquote') ? 'bg-primary' : 'bg-white'}`}
      >
        <Quote size={18} />
      </button>
    </div>
  );
};

export default function Editor({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-slate max-w-none focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  return (
    <div className="neo-border bg-white overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
