import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Story = {
  id: string;
  title: string;
  genre: string;
  ageGroup: string;
  pages: StoryPage[];
  createdAt: number;
}

export type StoryPage = {
  id: string;
  text: string;
  imageUrl?: string;
}

// Helper to save stories to localStorage
export function saveStory(story: Story) {
  const stories = getStories();
  stories.push(story);
  localStorage.setItem('stories', JSON.stringify(stories));
}

// Helper to get all stories from localStorage
export function getStories(): Story[] {
  const storiesJson = localStorage.getItem('stories');
  return storiesJson ? JSON.parse(storiesJson) : [];
}

// Helper to get a single story by ID
export function getStoryById(id: string): Story | undefined {
  const stories = getStories();
  return stories.find(story => story.id === id);
}