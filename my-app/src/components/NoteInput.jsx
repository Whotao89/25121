import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useFirestore from '../hooks/useFirestore';

const COLORS = [
  { label: 'Yellow', value: '#FCE38A' },
  { label: 'Pink', value: '#FFD1E8' },
  { label: 'Green', value: '#D6F5E9' },
  { label: 'White', value: '#FFFFFF' },
];

export default function NoteInput() {
  const { addNote } = useFirestore();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const CHAR_LIMIT = 280;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setLoading(true);
    setError(null);

    try {
      await addNote({ content: content.trim(), author: name.trim(), color });
      setName('');
      setContent('');
      setColor(null);
    } catch (err) {
      setError('Failed to post note');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-white/60 backdrop-blur-md p-4 rounded-lg shadow-md w-full max-w-3xl mx-auto"
    >
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 sm:items-center sm:flex-row flex-col">
          <input
            className="flex-1 p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            placeholder="Tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="flex items-center gap-2">
            {COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setColor(c.value)}
                title={c.label}
                className={`w-8 h-8 rounded-full border-2 transition-transform transform ${color === c.value ? 'ring-2 ring-offset-1 ring-emerald-400 scale-110' : 'border-slate-200 hover:scale-110'}`}
                style={{ backgroundColor: c.value }}
              />
            ))}
          </div>
        </div>

        <textarea
          className="w-full p-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 font-hand"
          placeholder="Viết lời chúc Giáng sinh..."
          value={content}
          onChange={(e) => { if (e.target.value.length <= CHAR_LIMIT) setContent(e.target.value); }}
          rows={4}
          required
        />

        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">{content.length}/{CHAR_LIMIT}</div>
          <div className="flex items-center gap-3">
            {error && <div className="text-sm text-red-600">{error}</div>}
            <button
              type="submit"
              className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-emerald-300' : 'bg-emerald-500 hover:bg-emerald-600'} transform-gpu active:scale-95 transition`}
              disabled={loading}
            >
              {loading ? 'Đang gửi...' : 'Gửi lời chúc'}
            </button>
          </div>
        </div>
      </div>
    </motion.form>
  );
}
