import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import AboutMe from "@/components/AboutMe";
import Career from "@/components/Career";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState("about");

  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return <AboutMe />;
      case "career":
        return <Career />;
      case "education":
        return <Education />;
      case "skills":
        return <Skills />;
      case "projects":
        return <Projects />;
      default:
        return <AboutMe />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 font-sans transition-colors">
      <script>
        alert("Hello from inline JavaScript!");
      </script>
      <Header />
      <Hero />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`tab-content ${activeTab ? 'active' : ''}`} data-testid="tab-content">
          {renderTabContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
}
