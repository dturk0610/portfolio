import { ExternalLink, Play } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { BsJoystick } from "react-icons/bs";
import { GiTestTubes, GiMicroscope } from "react-icons/gi";
import { useState } from "react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      title: "Merck IEC",
      description: `Isotope Enrichment Calculator. This project allows the scientist and researchers 
      over at Merck to streamline their data analysis process. It utilizes Python's modularity to allow
      their team to quickly and easily make changes to data processing steps and instantly view the results.
      This allows for fast cross referencing and cuts their data processing time significantly by removing the
      crutch of legacy analytical systems being used previously.`,
      image: <GiTestTubes className="text-8xl mb-2 mx-auto text-blue-500" />,
      technologies: ["React", "Node.js", "Typescript", "rainbow-api"],
      github: "",
      link: ""
    },
    {
      title: "Visual Inspection Macro (VIM)",
      description: `During my time at Semikron-Danfoss and Danfoss, I has curated and created the failure collection
      tool known as VIM. My lead engineer at the time, and I had noticed an increase in misclassifications of failures.
      To resolve this, together with the production teams and quality teams we came up with a system that would allow
      operators to take images of failures inline at the existing visual inspection stations. This cut down work load
      on the operators by providing them a quick and easy way to fail the product as well as provide them a uniform and
      consitent formatted label. This system connected to IT systems and could be configured to notify a specific group
      of individuals whom was responsible for understanding and tracking failure rates at that point in the line where
      the visual inspection station was at.`,
      image: <GiMicroscope className="text-8xl mb-2 mx-auto text-green-500" />,
      technologies: [".NET", "C#", "SQL", "Global Bartender", "Group Policy", "SMTP Notifications"],
      github: "",
      link: ""
    },
    {
      title: "Water Simulation",
      description: `The aim of this project was to be able to simulate the interaction of water particles as they 
      shift from a high energy, liquid state, into a low-energy crystalized frozen state. This was a final project
      of which I had the honor of working with Mr. Nematullah Waseem, my peer, for this project. Together we were
      able to achieve a base system that has the potential to become a highly modular chemical and quantam interaction
      simulation for any type of particles. With more time we would have moved this project into a standalone
      application, likely utilizing React, Bun.js and Electron so that the application could be run just like a regular
      executable on the desktop. Using Python for the modular switching of quantum calculations for the interactions
      between particles.`,
      image: "./images/water_sim.png",
      technologies: ["Node.js", "Javascript", "C++", "Html"],
      github: "",
      link: ""
    },
    {
      title: "Touch Analytics",
      description: `Desc.`,
      image: "./images/touch_analytics.png",
      technologies: ["Java", "K-Means ML", "Android App"],
      github: "https://github.com/dturk0610/TouchAnalytics",
      live: "",
      link: ""
    },
    {
      title: "Axe Throwing Simulator",
      description: `My final senior project for my graphics course during my time in undergrad. The aim of this project was
      to create any '3D game' of any variety using all of the skills we had learned thusfar in the course. We were allowed
      to use any packages and libraries we wanted (most students chose threejs), but to give myself a challenge, I decided
      I wanted to try my hand at building the game engine entirely myself. Partially due to wanting to work on simulation
      engines and partly just to enjoy getting through a tough challenge of creating a miniature game engine in Javascript,
      I managed to see that goal through, giving me a project I am quite proud of, yet I can clearly see it's limitations
      and I plan to rework some of the gaps this 'game' had. Controls are WASD, click and drag to look, E to interact and
      spacebar to throw the axe along its displayed path.`,
      image: "./images/axe_thrower.png",
      technologies: ["Html 5", "Javascript"],
      github: "https://github.com/dturk0610/axe_thrower",
      live: "./axe_thrower-main/AxeThrower/viewer.html",
      embedSize: { width: 1280, height: 720 },
      link: ""
    },
    {
      title: "HTML Asteroids",
      description: `Made for a project for one of my undergraduate classes, this is an HTML 
      re-creation of the classic arcade game Asteroids. Controls are WASD and spacebar.`,
      image: "./images/asteroids.png",
      technologies: ["Html 5", "Javascript"],
      github: "https://github.com/dturk0610/asteroids",
      live: "./asteroids-main/Asteroids/asteroids.html",
      embedSize: { width: 1242, height: 720 },
      link: ""
    },
    {
      title: "HTML Pacman",
      description: `A basic Html Pacman project I used as a means to introduce a close friend 
      how to program in Javascript.`,
      image: <BsJoystick className="text-8xl mb-2 mx-auto text-yellow-400" />,
      technologies: ["Html 5", "Javascript"],
      github: "https://github.com/dturk0610/HTMLPacman/tree/main",
      live: "",
      link: ""
    },
  ];

  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      'React': 'bg-blue-100 text-blue-800',
      'Node.js': 'bg-green-100 text-green-800',
      'MongoDB': 'bg-purple-100 text-purple-800',
      'Stripe': 'bg-orange-100 text-orange-800',
      'Vue.js': 'bg-green-100 text-green-800',
      'Firebase': 'bg-orange-100 text-orange-800',
      'Vuetify': 'bg-blue-100 text-blue-800',
      'Chart.js': 'bg-yellow-100 text-yellow-800',
      'API Integration': 'bg-green-100 text-green-800',
      'Socket.io': 'bg-green-100 text-green-800',
      'AWS': 'bg-purple-100 text-purple-800'
    };
    return colors[tech] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div data-testid="projects-section">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8" data-testid="text-projects-title">Featured Projects</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="project-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            data-testid={`project-card-${index}`}
          >
            <div className="w-full h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-700" data-testid={`img-project-${index}`}>
              {typeof project.image === 'string' ? (
                <img
                  src={project.image}
                  alt={`${project.title} interface`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-4xl">
                  {project.image}
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white" data-testid={`text-project-title-${index}`}>
                  {project.title}
                </h3>
                <div className="flex space-x-2">
                  {project.github && (
                    <a
                      href={project.github}
                      className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                      data-testid={`link-github-${index}`}
                      aria-label={`GitHub repository for ${project.title}`}
                    >
                      <SiGithub className="w-5 h-5" />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                      data-testid={`link-live-${index}`}
                      aria-label={`Live demo of ${project.title}`}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 overflow-y-auto max-h-40" data-testid={`text-project-description-${index}`}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4" data-testid={`project-tech-tags-${index}`}>
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex} 
                    className={`px-2 py-1 rounded text-xs ${getTechColor(tech)}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {(project.live) && (
                <button
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setSelectedProject(selectedProject === index ? null : index)}
                data-testid={`button-view-project-${index}`}
              >
                {selectedProject === index ? 'Close Demo' : 'View Project'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Embedded Project Demo Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700" data-testid="project-demo-section">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center" data-testid="text-demo-title">
          <Play className="text-primary mr-3 w-6 h-6" />
          Live Project Demo
        </h3>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
          {selectedProject !== null ? (
            <div className="text-center w-full">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4" data-testid="text-selected-project-title">
                  {projects[selectedProject].title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6" data-testid="text-selected-project-description">
                  Some projects may have volume, be sure to turn the volume down if high or in a sensitive environment to loud noises.
                </p>
                <p>
                  {projects[selectedProject].description}
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-sm p-4 mb-2">
                  {(() => {
                    const embed = projects[selectedProject].embedSize;
                    const containerWidth = 900; // Change if you want a different embed height

                    if (embed) {
                      const scale = containerWidth / embed.width;
                      const scaledHeight = embed.height * scale;

                      return (
                        <div
                          style={{
                            width: `${containerWidth}px`,
                            height: `${scaledHeight}px`,
                            overflow: 'hidden',
                            border: "none",
                            display: "block"
                          }}
                        >
                          <iframe
                            src={projects[selectedProject].live}
                            title={`Live demo of ${projects[selectedProject].title}`}
                            style={{
                              transform: `scale(${scale})`,
                              transformOrigin: 'top left',
                              width: `${embed.width}px`,
                              height: `${embed.height}px`,
                              border: 'none',
                              overflow: "hidden",
                              display: "block",
                            }}
                            allowFullScreen
                          />
                        </div>
                      );
                    }

                    // Default fallback if embedSize is missing
                    return (
                      <iframe
                        src={projects[selectedProject].live}
                        title={`Live demo of ${projects[selectedProject].title}`}
                        className="w-full h-full border rounded-lg"
                        allowFullScreen
                        style={{
                          overflow: "hidden",
                          border: "none"
                        }}
                      />
                    );
                  })()}

                </div>
                <div className="flex justify-center space-x-4">
                  <a 
                    href={projects[selectedProject].github}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2"
                    data-testid="button-demo-github"
                  >
                    <SiGithub className="w-4 h-4" />
                    View Code
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center" data-testid="demo-placeholder">
              <Play className="text-6xl text-primary mb-4 mx-auto w-16 h-16" />
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Interactive Project Preview</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Select a project above to view a live interactive demo here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
