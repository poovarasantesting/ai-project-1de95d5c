import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, Calendar, Clock, Search, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import NavBar from '@/components/NavBar';
import { getStories, type Story } from '@/lib/utils';

export default function StoryLibraryPage() {
  const { toast } = useToast();
  const [stories, setStories] = useState<Story[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  useEffect(() => {
    // Load stories from localStorage
    const loadedStories = getStories();
    setStories(loadedStories);
  }, []);
  
  const deleteStory = (id: string) => {
    if (confirm('Are you sure you want to delete this story?')) {
      const updatedStories = stories.filter(story => story.id !== id);
      localStorage.setItem('stories', JSON.stringify(updatedStories));
      setStories(updatedStories);
      
      toast({
        title: 'Story deleted',
        description: 'The story has been removed from your library',
      });
    }
  };
  
  // Filter and sort stories
  const filteredStories = stories
    .filter(story => 
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (genreFilter === 'all' || story.genre === genreFilter) &&
      (ageFilter === 'all' || story.ageGroup === ageFilter)
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return b.createdAt - a.createdAt;
      if (sortBy === 'oldest') return a.createdAt - b.createdAt;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  
  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">Your Story Library</h1>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Link to="/create">
                <PlusCircle className="h-5 w-5 mr-2" />
                Create New Story
              </Link>
            </Button>
          </div>
          
          {/* Filters and Search */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search stories..."
                  className="pl-10"
                />
              </div>
              
              <div>
                <Select value={genreFilter} onValueChange={setGenreFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="animals">Animals</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="fairytale">Fairy Tale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={ageFilter} onValueChange={setAgeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="toddler">Toddler (0-3)</SelectItem>
                    <SelectItem value="preschool">Preschool (3-5)</SelectItem>
                    <SelectItem value="children">Children (6-8)</SelectItem>
                    <SelectItem value="preteen">Preteen (9-12)</SelectItem>
                    <SelectItem value="teen">Teen (13+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="title">Title (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Stories Grid */}
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((story) => (
                <div 
                  key={story.id} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Story Cover */}
                  <div className="h-48 bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    {story.pages[0]?.imageUrl ? (
                      <img 
                        src={story.pages[0].imageUrl} 
                        alt={story.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Book className="h-16 w-16 text-indigo-500 dark:text-indigo-400" />
                    )}
                  </div>
                  
                  {/* Story Info */}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {story.title}
                    </h3>
                    
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(story.createdAt)}</span>
                      <div className="mx-2">•</div>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{story.pages.length} {story.pages.length === 1 ? 'page' : 'pages'}</span>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300">
                        {story.genre.charAt(0).toUpperCase() + story.genre.slice(1)}
                      </span>
                      <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                        {story.ageGroup.charAt(0).toUpperCase() + story.ageGroup.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button asChild variant="outline" className="flex-1 mr-2">
                        <Link to={`/read/${story.id}`}>
                          Read Story
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950"
                        onClick={() => deleteStory(story.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <Book className="h-16 w-16 mx-auto text-gray-400" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                {stories.length === 0 ? "Your library is empty" : "No stories match your filters"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {stories.length === 0 
                  ? "Create your first story to get started" 
                  : "Try changing your search or filter settings"}
              </p>
              
              {stories.length === 0 && (
                <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Link to="/create">
                    <PlusCircle className="h-5 w-5 mr-2" />
                    Create New Story
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}