
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, query, orderBy, limit, setDoc, addDoc } from 'firebase/firestore';
import type { Room, RoomObject } from './types';

// NOTE: This is a placeholder for seeding data.
// In a real application, you would have a separate script or admin interface to manage this.
const seedData: Room[] = [
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
    items: [
        {
            id: 'item-1',
            type: 'note',
            name: 'Detective\'s Journal',
            description: "The detective's journal has a final, cryptic entry: 'The key is the year the master of suspense was born.'",
            position: { x: 50, y: 50 }
        },
        {
            id: 'item-2',
            type: 'lock',
            name: 'Final Report Lock',
            description: "A 4-digit combination lock secures the detective's final report, which surely names the killer.",
            position: { x: 200, y: 50 }
        }
    ],
    puzzle: {
        description: "Review the items in the room to find the 4-digit code for the detective's final report.",
        solution: "1899"
    }
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
    items: [
        {
            id: 'item-3',
            type: 'note',
            name: 'Encrypted Message',
            description: "An encrypted message on a nearby terminal flickers with text: 'To shut me down, simply find my oldest ancestor.'",
            position: { x: 50, y: 50 }
        },
        {
            id: 'item-4',
            type: 'puzzle-box',
            name: 'AI Core',
            description: "The AI's core is protected by a 3-letter password. A faded post-it note on the side of the machine mentions 'The Enchantress of Numbers'.",
            position: { x: 200, y: 50 }
        }
    ],
    puzzle: {
      description: "Find the 3-letter password to shut down the AI's core.",
      solution: "ada"
    }
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
    items: [
        {
            id: 'item-5',
            type: 'note',
            name: 'Librarian\'s Desk Note',
            description: "A note on the librarian's desk says: 'The Dewey Decimal points the way. Look for the tome on mythical creatures, page 242. The title of the book is the answer.'",
            position: { x: 50, y: 50 }
        },
        {
            id: 'item-6',
            type: 'puzzle-box',
            name: 'Artifact Box',
            description: 'A locked box that holds the artifact. It requires a single word as a password.',
            position: { x: 200, y: 50 }
        }
    ],
    puzzle: {
      description: "Find the name of the book to unlock the artifact box.",
      solution: "grimoire"
    }
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
    items: [
        {
            id: 'item-7',
            type: 'note',
            name: 'Hieroglyphic Tablet',
            description: 'A stone tablet shows four canopic jars and says: "To proceed, arrange them in the order of the sons of Horus: the human-headed one, the baboon-headed one, the jackal-headed one, and the falcon-headed one. Speak their names as one." ',
            position: { x: 50, y: 50 }
        },
        {
            id: 'item-8',
            type: 'lock',
            name: 'Sealed Door',
            description: 'A massive stone door sealed by ancient magic. It requires a long password, seemingly a list of names.',
            position: { x: 200, y: 50 }
        }
    ],
    puzzle: {
      description: 'Find the correct sequence of names to open the sealed door.',
      solution: 'Imsety, Hapi, Duamutef, Qebehsenuef'
    }
  },
];


async function seedFirestore() {
  console.log('No rooms found in Firestore, attempting to seed data...');
  try {
    for (const roomData of seedData) {
      // Use setDoc with a specific ID to prevent creating duplicates on re-seed.
      await setDoc(doc(db, 'rooms', roomData.id), roomData);
    }
    console.log('Firestore seeded successfully.');
    // Return sorted data after seeding
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
      hasSeeded = true; 
      return await seedFirestore();
    }
    
    if (!roomSnapshot.empty) {
      const rooms = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Room));
      return rooms;
    }

    return seedData.sort((a,b) => b.playCount - a.playCount);
  } catch (error) {
    console.error("Error fetching rooms from Firestore, falling back to local data: ", error);
    // This fallback is crucial for offline/dev environments.
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

export async function publishRoom(
  roomData: { title: string; description: string; items: RoomObject[] }
): Promise<{ id: string }> {
  try {
    const roomsCollection = collection(db, 'rooms');
    
    const imageIds = ['room-1', 'room-2', 'room-3', 'room-4'];
    const randomImageId = imageIds[Math.floor(Math.random() * imageIds.length)];

    // Convert items to a plain object format for Firestore
    const itemsForFirestore = roomData.items.map(item => ({...item}));
    
    const newRoom: Omit<Room, 'id'> = {
      title: roomData.title,
      description: roomData.description,
      items: itemsForFirestore,
      creator: 'Community Creator', // Placeholder
      rating: 0,
      playCount: 0,
      imageId: randomImageId,
      comments: [],
      // Add a default puzzle to make it playable instantly
      puzzle: {
        description: "You've entered a new community-created room! The creator hasn't defined a specific puzzle yet. Can you guess the default solution?",
        solution: "solution"
      }
    };

    const docRef = await addDoc(roomsCollection, newRoom);
    return { id: docRef.id };
  } catch (error) {
    console.error("Error publishing room: ", error);
    throw new Error("Failed to publish room to Firestore.");
  }
}
