import { Paintbrush, Server, Wrench, Bot } from "lucide-react";
import { 
  SiReact, SiTypescript, SiTailwindcss, SiJavascript,
  SiNodedotjs, SiPython, SiAnaconda, SiPostgresql, SiExpress,
  SiRider, SiDocker, SiGit, SiLinux, SiBun, SiCplusplus, SiHtml5,
  SiOctave, SiUnity, SiCmake, SiXcode, SiAndroidstudio, SiPytorch,
  SiNvidia, SiBlazor, SiDotnet, SiSwift,
} from "react-icons/si";
import { FaRProject, FaWindows, FaJava } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
import { PiMicrosoftExcelLogo, PiMicrosoftPowerpointLogo, PiMicrosoftWordLogo } from "react-icons/pi";

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Paintbrush,
      color: "text-primary",
      skills: [
        { name: "HTML", level: "Advanced", icon: SiHtml5, color: "text-red-500" },
        { name: "JavaScript", level: "Advanced", icon: SiJavascript, color: "text-yellow-500" },
        { name: "Swift UI", level: "Intermediate", icon: SiSwift, color: "text-blue-500" },
        { name: ".NET MAUI", level: "Intermediate", icon: SiDotnet, color: "text-purple-500" },
        { name: "Windows Forms", level: "Intermediate", icon: FaWindows, color: "text-blue-500" },
        { name: "Blazor", level: "Intermediate", icon: SiBlazor, color: "text-purple-500" },
        { name: "React", level: "Intermediate", icon: SiReact, color: "text-blue-500" },
        { name: "CSS", level: "Intermediate", icon: SiTailwindcss, color: "text-cyan-500" },
        { name: "TypeScript", level: "Intermediate", icon: SiTypescript, color: "text-blue-600" },
      ]
    },
    {
      title: "Backend Development",
      icon: Server,
      color: "text-purple-600",
      skills: [
        { name: "C#", level: "Expert", icon: TbBrandCSharp, color: "text-gray-900" },
        { name: "C++", level: "Expert", icon: SiCplusplus, color: "text-blue-400" },
        { name: "Python", level: "Expert", icon: SiPython, color: "text-blue-600" },
        { name: ".NET", level: "Expert", icon: SiDotnet, color: "text-purple-500" },
        { name: "JavaScript", level: "Advanced", icon: SiJavascript, color: "text-yellow-500" },
        { name: "Java", level: "Advanced", icon: FaJava, color: "text-orange-600" },
        { name: "Node.js", level: "Advanced", icon: SiNodedotjs, color: "text-green-600" },
        { name: "Bun.js", level: "Advanced", icon: SiBun, color: "text-neutral-500 dark:text-neutral-300" },
        { name: "SQL", level: "Advanced", icon: SiPostgresql, color: "text-blue-800 dark:text-blue-400" },
        { name: "Express.js", level: "Advanced", icon: SiExpress, color: "text-gray-600 dark:text-gray-400" },
        { name: "Octave/Matlab", level: "Advanced", icon: SiOctave, color: "text-blue-600" },
        { name: "TypeScript", level: "Intermediate", icon: SiTypescript, color: "text-blue-600" },
      ]
    },
    {
      title: "Machine Learning & Data Science",
      icon: Bot,
      color: "text-accent",
      skills: [
        { name: "Python", level: "Expert", icon: SiPython, color: "text-yellow-400" },
        { name: "Octave/Matlab", level: "Advanced", icon: SiOctave, color: "text-blue-400" },
        { name: "R", level: "Advanced", icon: FaRProject, color: "text-blue-600" },
        { name: "C++", level: "Expert", icon: SiCplusplus, color: "text-blue-400" },
        { name: "Pytorch", level: "Intermediate", icon: SiPytorch, color: "text-red-500" },
        { name: "NVIDIA CUDA", level: "Intermediate", icon: SiNvidia, color: "text-green-500" },
      ]
    },
    {
      title: "Tools & DevOps",
      icon: Wrench,
      color: "text-orange-600",
      skills: [
        { name: "Linux", level: "Expert", icon: SiLinux, color: "text-gray-700 dark:text-gray-200" },
        { name: "VSCode", level: "Expert", icon: VscVscode, color: "text-blue-500" },
        { name: "Unity", level: "Expert", icon: SiUnity, color: "text-gray-900" },
        { name: "Microsoft Excel", level: "Expert", icon: PiMicrosoftExcelLogo, color: "text-green-600" },
        { name: "Microsoft Powerpoint", level: "Expert", icon: PiMicrosoftPowerpointLogo, color: "text-red-500" },
        { name: "Microsoft Word", level: "Expert", icon: PiMicrosoftWordLogo, color: "text-blue-500" },
        { name: "Git", level: "Advanced", icon: SiGit, color: "text-red-600" },
        { name: "Docker", level: "Advanced", icon: SiDocker, color: "text-blue-500" },
        { name: "Rider", level: "Advanced", icon: SiRider, color: "text-gray-900" },
        { name: "Anaconda", level: "Advanced", icon: SiAnaconda, color: "text-green-500" },
        { name: "CMake", level: "Advanced", icon: SiCmake, color: "text-red-500" },
        { name: "XCode", level: "Advanced", icon: SiXcode, color: "text-blue-500" },
        { name: "Android Studio", level: "Advanced", icon: SiAndroidstudio, color: "text-green-500" },
      ]
    }
  ];

  return (
    <div data-testid="skills-section">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8" data-testid="text-skills-title">Technical Skills & Expertise</h2>
      
      <div className="grid gap-8">
        {skillCategories.map((category, categoryIndex) => {
          const CategoryIcon = category.icon;
          
          return (
            <div key={categoryIndex} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700" data-testid={`skill-category-${categoryIndex}`}>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center" data-testid={`text-category-title-${categoryIndex}`}>
                <CategoryIcon className={`${category.color} mr-3 w-5 h-5`} />
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {category.skills.map((skill, skillIndex) => {
                  const SkillIcon = skill.icon;
                  
                  return (
                    <div 
                      key={skillIndex} 
                      className="skill-card bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center transition-transform hover:shadow-md"
                      data-testid={`skill-card-${categoryIndex}-${skillIndex}`}
                    >
                      <SkillIcon className={`text-4xl ${skill.color} mb-2 mx-auto`} />
                      <div className="text-sm font-medium text-gray-900 dark:text-white" data-testid={`text-skill-name-${categoryIndex}-${skillIndex}`}>
                        {skill.name}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300" data-testid={`text-skill-level-${categoryIndex}-${skillIndex}`}>
                        {skill.level}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
