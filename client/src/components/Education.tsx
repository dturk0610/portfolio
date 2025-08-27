import { GraduationCap, Award, Tag } from "lucide-react";

export default function Education() {
  const educationItems = [
    {
      title: "Master of Molecular Sciences and Software Engineering",
      institution: "University of California, Berkeley",
      duration: "2023 - 2025",
      icon: GraduationCap,
      color: "bg-blue-600",
      description: "Graduated with a 3.968 GPA, with a focus on software engineering, AI and their applications in molecular sciences, simulations and drug discovery. Completed capstone project developing a low-level EDL system for deuteration and spectrometry analysis for Merck.",
      coursework: ["Data Structures", "Algorithms", "Database Systems", "Software Engineering"]
    },
    {
      title: "Developing Mobile Apps for iOS",
      institution: "Cloud Academy",
      duration: "2023",
      icon: Tag,
      color: "bg-accent",
      description: "Learn how to build your own mobile apps for iOS with this practical course covering the essentials of iOS as well as SwiftUI! Created by Atil Samancioglu"
    },
    {
      title: ".NET MAUI course with Visual Studio 2022 creating Projects",
      institution: "Udemy",
      duration: "2023",
      icon: Tag,
      color: "bg-accent",
      description: "Learn how to create apps for iOS, Android, Windows and MacOS with the help of .NET MAUI, C# and XAML, creating PROJECTS. Created by Héctor Uriel Pérez."
    },
    {
      title: "Bachelor of Science in Electrical Engineering with distinction",
      institution: "Clarkson University",
      duration: "2020 - 2022",
      icon: GraduationCap,
      color: "bg-yellow-500",
      description: "Graduated with a 3.684 GPA, with a focus in Electrical Engineering and taking courses in software engineering. Completed senior design project researching the impact and use of biometric authentication systems in modern applications. Also worked on a custom game engine using only HTML and JavaScript with a focus on avoiding external libraries.",
      coursework: ["Data Structures", "Algorithms", "Database Systems", "Software Engineering"]
    },
    {
      title: "Associates of Science in Engineering Sciences",
      institution: "Mohawk Valley Community College",
      duration: "2018 - 2020",
      icon: GraduationCap,
      color: "bg-green-600",
      description: "Graduated with a 3.91 GPA, completing foundational courses in mathematics, physics, and introductory engineering principles. Developed strong analytical and problem-solving skills that laid the groundwork for advanced studies in engineering.",
      coursework: ["Data Structures", "Algorithms", "Database Systems", "Software Engineering"]
    },
    {
      title: "Practical Data Structures & Algorithms in Java",
      institution: "Udemy",
      duration: "2020",
      icon: Award,
      color: "bg-orange-500",
      description: "Go from zero to hero in the most important algorithms and data structures using Java. Created by Job Ready Programmer."
    },
  ];

  return (
    <div data-testid="education-section">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8" data-testid="text-education-title">Education & Certifications</h2>
      <div className="relative pl-8">
        {educationItems.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === educationItems.length - 1;
          
          return (
            <div 
              key={index} 
              className={`timeline-item relative mb-12 ${isLast ? '' : 'timeline-item'}`}
              data-testid={`education-item-${index}`}
            >
              <div className={`absolute left-[-27px] w-10 h-10 ${item.color} rounded-full flex items-center justify-center border-4 border-white shadow`}>
                <Icon className="text-white w-4 h-4" />
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white" data-testid={`text-education-title-${index}`}>
                    {item.title}
                  </h3>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    item.color === 'bg-primary' ? 'text-primary bg-blue-50' :
                    item.color === 'bg-accent' ? 'text-accent bg-green-50' :
                    'text-orange-600 bg-orange-50'
                  }`} data-testid={`text-education-duration-${index}`}>
                    {item.duration}
                  </span>
                </div>
                <h4 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-3" data-testid={`text-institution-${index}`}>
                  {item.institution}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-3" data-testid={`text-description-${index}`}>
                  {item.description}
                </p>
                {item.coursework && (
                  <div className="mt-4">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Relevant Coursework:</h5>
                    <div className="flex flex-wrap gap-2" data-testid={`coursework-tags-${index}`}>
                      {item.coursework.map((course, courseIndex) => (
                        <span 
                          key={courseIndex} 
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
