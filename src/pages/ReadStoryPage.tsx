import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getStoryById } from '@/lib/utils';
import NavBar from '@/components/NavBar';

export default function ReadStoryPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentPage, setCurrentPage] = useState(0);
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (storyId) {
      const foundStory = getStoryById(storyId);
      if (foundStory) {
        setStory(foundStory);
      } else {
        toast({
          title: "Story not found",
          description: "The requested story could not be found",
          variant: "destructive",
        });
        navigate('/library');
      }
    }
    setLoading(false);
  }, [storyId, navigate, toast]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Loading story...</p>
        </div>
      </div>
    );
  }
  
  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Story Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The story you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/library">
              <Home className="mr-2 h-5 w-5" />
              Go to Library
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const nextPage = () => {
    if (currentPage < story.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Story Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{story.title}</h1>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link to="/library">
                  <Home className="h-5 w-5 mr-1" />
                  Library
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Page Counter */}
          <div className="text-center mb-4">
            <span className="text-gray-600 dark:text-gray-400">
              Page {currentPage + 1} of {story.pages.length}
            </span>
          </div>
          
          {/* Story Display */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="grid md:grid-cols-2 min-h-[400px]">
              {/* Page Image */}
              <div className="bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4">
                {story.pages[currentPage].imageUrl ? (
                  <img 
                    src={story.pages[currentPage].imageUrl} 
                    alt={`Page ${currentPage + 1}`}
                    className="max-h-[350px] max-w-full object-contain rounded shadow-md"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">No image for this page</span>
                  </div>
                )}
              </div>
              
              {/* Page Text */}
              <div className="p-6 flex flex-col justify-center">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed">
                    {story.pages[currentPage].text}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <Button 
              onClick={prevPage} 
              disabled={currentPage === 0}
              className="flex items-center"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Previous Page
            </Button>
            
            <div className="flex space-x-1">
              {story.pages.map((_, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentPage === index 
                      ? 'bg-indigo-600' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
            
            <Button 
              onClick={nextPage} 
              disabled={currentPage === story.pages.length - 1}
              className="flex items-center"
            >
              Next Page
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}