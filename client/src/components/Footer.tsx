import { Mail, Phone, MapPin } from "lucide-react";
import { SiLinkedin, SiGithub } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 mt-20" data-testid="footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div data-testid="footer-connect">
            <h3 className="text-xl font-semibold mb-4">Let's Connect</h3>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              Interested in working together? I'm always open to discussing new opportunities 
              and exciting projects.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/dakota-turk-bb8896166" 
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors" 
                data-testid="link-footer-linkedin"
                aria-label="LinkedIn Profile"
              >
                <SiLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/dturk0610" 
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors" 
                data-testid="link-footer-github"
                aria-label="GitHub Profile"
              >
                <SiGithub className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors" 
                data-testid="link-footer-email"
                aria-label="Email Contact"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div data-testid="footer-contact">
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-300 dark:text-gray-400">
              <p className="flex items-center" data-testid="text-email">
                <Mail className="w-4 h-4 mr-3" />
                <span>turk_dakota.precut041@aleeas.com</span>
              </p>
              <p className="flex items-center" data-testid="text-phone">
                <Phone className="w-4 h-4 mr-3" />
                <span>+1 (315) 570 3561</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
