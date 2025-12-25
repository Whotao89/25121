import React from 'react';
import { motion } from 'framer-motion';

/**
 * NoteCard
 * Props: { content, author, color, rotation }
 * Visual: a "sticky note" with handwriting font, slight shadow, subtle rotation
 */
export default function NoteCard({ content, author, color = '#FFF9C4', rotation = 0 }) {
  const hoverRotate = rotation >= 0 ? rotation + 3 : rotation - 3;

  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0, y: -8, rotate: rotation }}
      animate={{ scale: 1, opacity: 1, y: 0, rotate: rotation }}
      whileHover={{ scale: 1.04, rotate: hoverRotate, y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative p-4 rounded-lg shadow-md transform-gpu hover:shadow-2xl"
      style={{ originX: 0.5 }}
    >
      <div
        className="rounded-lg p-4 shadow-inner border border-black/5"
        style={{ backgroundColor: color }}
      >
        <p className="font-hand text-lg leading-6 text-slate-900 whitespace-pre-wrap">{content}</p>
        <div className="mt-3 text-right">
          <span className="block text-sm font-semibold text-slate-700">— {author}</span>
        </div>
      </div>

      {/* decorative tape */}
      <div className="pointer-events-none absolute -top-2 left-6 w-8 h-3 rounded-sm bg-black/10 rotate-2" />
    </motion.div>
  );
}
