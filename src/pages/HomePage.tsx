import { Link } from 'react-router-dom';
import { Book, BookOpen, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 md:py-24 px-4 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Create Magical Stories
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
              Unleash your imagination and craft beautiful storybooks for children of all ages
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Link to="/create">
                  <Pencil className="mr-2 h-5 w-5" />
                  Start Creating
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                <Link to="/library">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse Library
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Unleash Your Creativity
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Pencil className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Easy Creation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Write your story with our intuitive page-by-page editor
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Book className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Beautiful Stories</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Add images to bring your stories to life visually
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Share Stories</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Build your personal library of stories to share and enjoy
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-indigo-600 dark:bg-indigo-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Create Your First Story?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of storytellers who are creating magical worlds every day
            </p>
            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
              <Link to="/create">
                Get Started Now
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 px-4 text-center text-gray-600 dark:text-gray-400">
        <p>© 2024 StoryMaker. All rights reserved.</p>
      </footer>
    </div>
  );
}