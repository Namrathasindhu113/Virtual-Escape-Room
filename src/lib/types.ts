export type Comment = {
  id: string;
  user: string;
  avatarId: string;
  text: string;
  timestamp: string;
};

export type Puzzle = {
  description: string;
  solution: string;
};

export type Room = {
  id: string;
  title: string;
  creator: string;
  rating: number;
  playCount: number;
  imageId: string;
  description: string;
  comments: Comment[];
  puzzle?: Puzzle;
};
