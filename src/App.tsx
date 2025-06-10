import { UserRegistration } from "@/components/UserRegistration";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <UserRegistration />
      <Toaster />
    </div>
  );
}

export default App;