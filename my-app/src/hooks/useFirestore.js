import { useEffect, useState, useRef } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

/**
 * useFirestore - custom hook for real-time 'notes' collection
 * - subscribes to collection (default 'notes') ordered by createdAt desc
 * - exposes `docs`, `loading`, `error`, and `addNote` function
 */
export default function useFirestore(collectionName = 'notes') {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));

    unsubscribeRef.current = onSnapshot(
      q,
      (snapshot) => {
        const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setDocs(results);
        setLoading(false);
      },
      (err) => {
        console.error('useFirestore onSnapshot error', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => {
      if (unsubscribeRef.current) unsubscribeRef.current();
    };
  }, [collectionName]);

  /**
   * addNote - add a new note to collection
   * payload: { content, author, color, rotation }
   * createdAt will be set to serverTimestamp()
   */
  const addNote = async ({ content, author, color, rotation } = {}) => {
    if (!content || !author) {
      throw new Error('`content` and `author` are required to add a note');
    }

    // Default color pick (if user didn't pick one)
    const COLORS = ['#FCE38A', '#FFD1E8', '#D6F5E9', '#FFFFFF']; // yellow, pink, green, white
    const finalColor = color || COLORS[Math.floor(Math.random() * COLORS.length)];

    // Rotation randomized between -5 and 5 degrees if not provided
    const finalRotation = typeof rotation === 'number' ? rotation : (Math.random() * 10 - 5);

    const payload = {
      content,
      author,
      color: finalColor,
      rotation: finalRotation,
      createdAt: serverTimestamp(),
    };

    try {
      const ref = await addDoc(collection(db, collectionName), payload);
      return ref;
    } catch (err) {
      console.error('addNote error', err);
      throw err;
    }
  };

  return { docs, loading, error, addNote };
}
