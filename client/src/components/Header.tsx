import { Download } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { SiLinkedin, SiGithub } from "react-icons/si";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700" data-testid="header">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold" data-testid="user-avatar">
              <span>DT</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white" data-testid="user-name">Dakota Turk</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300" data-testid="user-title">Full Stack Developer</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <a 
              href="https://www.linkedin.com/in/dakota-turk-bb8896166" 
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" 
              data-testid="link-linkedin"
              aria-label="LinkedIn Profile">
              <SiLinkedin className="text-xl w-5 h-5" />
            </a>
            <a 
              href="https://github.com/dturk0610" 
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" 
              data-testid="link-github"
              aria-label="GitHub Profile">
              <SiGithub className="text-xl w-5 h-5" />
            </a>
            <ThemeToggle />
            {/* <button 
              className="bg-primary text-white px-2 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2" 
              data-testid="button-download-resume">
              <Download className="w-4 h-4" />
              Download Resume
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
}
