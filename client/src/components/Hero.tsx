import { Mail, Eye } from "lucide-react";
import React, { useState } from "react";
import ContactModal from "./ContactModal";


export default function Hero() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-20 transition-colors" data-testid="hero-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <img 
            src="images/profile.jpg" 
            alt="Professional headshot" 
            className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
            data-testid="img-profile"
          />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6" data-testid="text-hero-name">Dakota Turk</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto" data-testid="text-hero-description">
          Passionate Full Stack Developer with 5+ years of experience designing and building solutions
          for industry, the Air Force and personal projects. Skilled in C#, C++, Python, Javascript,
          and more. Dedicated to continuous learning and creating impactful applications.
        </p>

        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        <div className="flex justify-center space-x-4">
          <button 
            className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2" 
            data-testid="button-contact"
            onClick={() => setIsContactOpen(true)}>
            <Mail className="w-4 h-4" />
            Get In Touch
          </button>
          {/* <button 
            className="border border-primary text-primary px-8 py-3 rounded-lg font-medium hover:bg-primary hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white transition-colors flex items-center gap-2" 
            data-testid="button-view-work">
            <Eye className="w-4 h-4" />
            View My Work
          </button> */}
        </div>
      </div>
    </section>
  );
}
