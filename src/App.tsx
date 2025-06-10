import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/HomePage";
import CreateStoryPage from "@/pages/CreateStoryPage";
import ReadStoryPage from "@/pages/ReadStoryPage";
import StoryLibraryPage from "@/pages/StoryLibraryPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateStoryPage />} />
          <Route path="/library" element={<StoryLibraryPage />} />
          <Route path="/read/:storyId" element={<ReadStoryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;