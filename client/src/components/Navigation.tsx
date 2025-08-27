import { User, Briefcase, GraduationCap, Settings, Laptop } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = [
    { id: 'about', label: 'About Me', icon: User },
    { id: 'career', label: 'My Career', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skillsets', icon: Settings },
    { id: 'projects', label: 'My Projects', icon: Laptop },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-20 z-40 transition-colors" data-testid="navigation">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                className={`py-4 px-2 border-b-2 font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
                onClick={() => setActiveTab(tab.id)}
                data-testid={`tab-${tab.id}`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
