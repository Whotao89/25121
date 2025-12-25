import React, { useRef, useState } from 'react';
import Snowfall from 'react-snowfall';
import NoteInput from './components/NoteInput';
import NoteCard from './components/NoteCard';
import useFirestore from './hooks/useFirestore';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const { docs, loading } = useFirestore('notes');
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch((e) => console.warn('Audio play blocked', e));
      setPlaying(true);
    }
  };

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-sky-100 to-sky-50">
      <Snowfall style={{ position: 'fixed', zIndex: 0 }} />

      <audio ref={audioRef} src="/christmas.mp3" loop />

      <div className="relative z-10 p-6">
        <header className="max-w-4xl mx-auto mb-6 text-center">
          <h1 className="text-4xl font-hand font-bold">Christmas Memory Wall</h1>
          <p className="text-slate-700">Gửi lời chúc và treo lên tường kỷ niệm</p>
        </header>

        <div className="max-w-4xl mx-auto mb-6">
          <NoteInput />
        </div>

        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center text-slate-600">Đang tải...</div>
          ) : (
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" variants={container} initial="hidden" animate="show" layout>
              <AnimatePresence>
                {docs.map((d) => (
                  <motion.div key={d.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                    <NoteCard content={d.content} author={d.author} color={d.color} rotation={d.rotation} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      <button
        onClick={toggleMusic}
        className="fixed right-6 bottom-6 z-20 bg-white/90 p-3 rounded-full shadow-lg"
        title="Toggle Christmas music"
        aria-pressed={playing}
      >
        {playing ? '🔊' : '🔈'}
      </button>
    </div>
  );
}
