import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Book, Save, X, Image } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import NavBar from '@/components/NavBar';
import { saveStory, type StoryPage } from '@/lib/utils';

export default function CreateStoryPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('fantasy');
  const [ageGroup, setAgeGroup] = useState('children');
  const [pages, setPages] = useState<StoryPage[]>([
    { id: uuidv4(), text: '', imageUrl: '' }
  ]);
  const [currentPage, setCurrentPage] = useState(0);

  const addPage = () => {
    setPages([...pages, { id: uuidv4(), text: '', imageUrl: '' }]);
    setCurrentPage(pages.length);
  };

  const removePage = (index: number) => {
    if (pages.length <= 1) {
      toast({
        title: "Cannot remove page",
        description: "A story must have at least one page",
        variant: "destructive",
      });
      return;
    }

    const newPages = [...pages];
    newPages.splice(index, 1);
    setPages(newPages);
    
    if (currentPage >= index && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const updatePageText = (text: string) => {
    const newPages = [...pages];
    newPages[currentPage].text = text;
    setPages(newPages);
  };

  const updatePageImage = (imageUrl: string) => {
    const newPages = [...pages];
    newPages[currentPage].imageUrl = imageUrl;
    setPages(newPages);
  };

  const saveStoryToLibrary = () => {
    if (!title) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your story",
        variant: "destructive",
      });
      return;
    }

    if (pages.some(page => !page.text.trim())) {
      toast({
        title: "Empty pages",
        description: "Please fill in text for all pages",
        variant: "destructive",
      });
      return;
    }

    const storyId = uuidv4();
    const story = {
      id: storyId,
      title,
      genre,
      ageGroup,
      pages,
      createdAt: Date.now(),
    };

    saveStory(story);
    
    toast({
      title: "Story saved!",
      description: "Your story has been added to your library",
    });
    
    navigate(`/read/${storyId}`);
  };
  
  // Sample image URLs for demonstration
  const sampleImageUrls = [
    "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520766607608-f3da5efd989f?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511029029301-60680e65f7c7?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1633621412960-6df85eff8c5a?q=80&w=500&auto=format&fit=crop",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Create Your Story</h1>
          
          {/* Story Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Story Details</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter story title"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Genre
                </label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="animals">Animals</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="fairytale">Fairy Tale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Age Group
                </label>
                <Select value={ageGroup} onValueChange={setAgeGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toddler">Toddler (0-3)</SelectItem>
                    <SelectItem value="preschool">Preschool (3-5)</SelectItem>
                    <SelectItem value="children">Children (6-8)</SelectItem>
                    <SelectItem value="preteen">Preteen (9-12)</SelectItem>
                    <SelectItem value="teen">Teen (13+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Story Pages */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Page {currentPage + 1} of {pages.length}</h2>
              <div className="flex space-x-2">
                <Button
                  onClick={addPage}
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Page
                </Button>
                <Button
                  onClick={() => removePage(currentPage)}
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove Page
                </Button>
              </div>
            </div>
            
            {/* Page Navigation */}
            <div className="flex mb-4 overflow-x-auto pb-2">
              {pages.map((_, index) => (
                <Button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  variant={currentPage === index ? "default" : "outline"}
                  size="sm"
                  className="mr-2"
                >
                  {index + 1}
                </Button>
              ))}
            </div>
            
            {/* Page Content */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Page Text
                </label>
                <Textarea
                  value={pages[currentPage].text}
                  onChange={(e) => updatePageText(e.target.value)}
                  placeholder="Write your story text here..."
                  className="min-h-[200px]"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <Image className="h-4 w-4 mr-1" />
                  Page Image
                </label>
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 min-h-[200px] flex items-center justify-center">
                  {pages[currentPage].imageUrl ? (
                    <div className="relative w-full">
                      <img 
                        src={pages[currentPage].imageUrl} 
                        alt={`Page ${currentPage + 1}`}
                        className="max-h-[180px] mx-auto object-contain rounded"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-0 right-0 bg-white dark:bg-gray-800"
                        onClick={() => updatePageImage('')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">Select an image for this page</p>
                      <div className="grid grid-cols-2 gap-2">
                        {sampleImageUrls.map((url, index) => (
                          <button 
                            key={index}
                            onClick={() => updatePageImage(url)}
                            className="border border-gray-200 dark:border-gray-700 rounded hover:border-indigo-500 transition-colors"
                          >
                            <img 
                              src={url} 
                              alt={`Sample ${index + 1}`}
                              className="h-16 w-full object-cover rounded"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Save Actions */}
          <div className="flex justify-end">
            <Button
              onClick={saveStoryToLibrary}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Story
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}