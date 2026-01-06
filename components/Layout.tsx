
import React from 'react';
import { Calendar, CheckSquare, Users, Sparkles } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              WorkPlan AI
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Schedule
            </a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 flex items-center gap-2">
              <Users className="w-4 h-4" /> Team
            </a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 flex items-center gap-2">
              <CheckSquare className="w-4 h-4" /> Tasks
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} WorkPlan AI Agent. Powered by Gemini.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
