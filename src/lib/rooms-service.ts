
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, query, orderBy, limit, setDoc } from 'firebase/firestore';
import type { Room, Comment } from './types';

// NOTE: This is a placeholder for seeding data.
// In a real application, you would have a separate script or admin interface to manage this.
const seedData = [
  {
    id: 'the-scarlet-study',
    title: 'The Scarlet Study',
    creator: 'Agatha',
    rating: 4.8,
    playCount: 12500,
    imageId: 'room-4',
    description: 'A classic whodunnit. A renowned detective has been found murdered in his study. You have 60 minutes to solve the case before the trail goes cold. Search for clues, solve puzzles, and uncover the killer.',
    comments: [
      {
        id: '1',
        user: 'PuzzleMaster',
        avatarId: 'avatar-1',
        text: 'Amazing room! The puzzles were challenging but fair. Really felt like a detective.',
        timestamp: '2 days ago',
      },
      {
        id: '2',
        user: 'EscapeArtist',
        avatarId: 'avatar-2',
        text: 'Loved the atmosphere. The ending was a total surprise!',
        timestamp: '5 days ago',
      },
    ],
  },
  {
    id: 'cyberscape-protocol',
    title: 'Cyberscape Protocol',
    creator: 'Glitch',
    rating: 4.9,
    playCount: 23000,
    imageId: 'room-2',
    description: 'In a dystopian future, a rogue AI threatens to plunge the world into chaos. You are a team of elite hackers tasked with infiltrating its server and initiating the Cyberscape Protocol. The clock is ticking.',
    comments: [
      {
        id: '3',
        user: 'CodeNinja',
        avatarId: 'avatar-1',
        text: 'Mind-blowing visuals and some really clever tech-based puzzles. A must-play!',
        timestamp: '1 week ago',
      },
    ],
  },
  {
    id: 'the-librarians-secret',
    title: "The Librarian's Secret",
    creator: 'Bookworm',
    rating: 4.7,
    playCount: 9800,
    imageId: 'room-1',
    description: "A reclusive librarian has hidden a priceless artifact somewhere in his vast collection. The library is scheduled for demolition in one hour. Find the artifact before it's lost forever.",
    comments: [],
  },
  {
    id: 'pharaohs-awakening',
    title: "Pharaoh's Awakening",
    creator: 'ExplorerX',
    rating: 4.6,
    playCount: 7600,
    imageId: 'room-3',
    description: 'You have disturbed the tomb of a long-forgotten pharaoh. The doors have sealed, and an ancient curse is awakening. Can you escape the tomb before you become a permanent resident?',
    comments: [
       {
        id: '4',
        user: 'HistoryBuff',
        avatarId: 'avatar-2',
        text: 'Incredibly immersive. The hieroglyph puzzles were my favorite part.',
        timestamp: '3 weeks ago',
      },
    ],
  },
];


async function seedFirestore() {
  console.log('No rooms found in Firestore, attempting to seed data...');
  try {
    for (const roomData of seedData) {
      await setDoc(doc(db, 'rooms', roomData.id), roomData);
    }
    console.log('Firestore seeded successfully.');
    return seedData.sort((a, b) => b.playCount - a.playCount);
  } catch (seedError) {
    console.error("Error seeding Firestore: ", seedError);
    // If seeding fails, return local data as a fallback
    console.log("Falling back to local data due to seeding error.");
    return seedData.sort((a,b) => b.playCount - a.playCount);
  }
}

let hasSeeded = false;

export async function getRooms(): Promise<Room[]> {
  try {
    const roomsCollection = collection(db, 'rooms');
    const q = query(roomsCollection, orderBy('playCount', 'desc'));
    const roomSnapshot = await getDocs(q);

    if (roomSnapshot.empty && !hasSeeded) {
      hasSeeded = true; // Prevent re-seeding in the same session
      return await seedFirestore();
    }
    
    if (!roomSnapshot.empty) {
      const rooms = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Room));
      return rooms;
    }

    // If snapshot is empty and we have already tried to seed, fall back to local data.
    return seedData.sort((a,b) => b.playCount - a.playCount);
  } catch (error) {
    console.error("Error fetching rooms from Firestore, falling back to local data: ", error);
    return seedData.sort((a,b) => b.playCount - a.playCount);
  }
}

export async function getRoomById(id: string): Promise<Room | null> {
    try {
        const roomRef = doc(db, 'rooms', id);
        const roomSnap = await getDoc(roomRef);

        if (roomSnap.exists()) {
            return { id: roomSnap.id, ...roomSnap.data() } as Room;
        } else {
            console.warn(`Room with id ${id} not found in Firestore. Checking local data.`);
            const localRoom = seedData.find(room => room.id === id);
            return localRoom || null;
        }
    } catch (error) {
        console.error(`Error fetching room ${id} from Firestore, falling back to local data:`, error);
        const localRoom = seedData.find(room => room.id === id);
        return localRoom || null;
    }
}
