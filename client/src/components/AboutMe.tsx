export default function AboutMe() {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center" data-testid="about-me-section">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6" data-testid="text-about-title">About Me</h2>
        <div className="prose prose-lg text-gray-600 dark:text-gray-300 space-y-4">
          <p data-testid="text-about-paragraph-1">
            I'm a passionate full-stack developer with a love for creating intuitive, 
            efficient, and scalable applications. Whether that be web-based or full scale
            solutions. My journey in tech started all the way back in my highschool years,
            and I've been continuously learning and evolving ever since.
          </p>
          <p data-testid="text-about-paragraph-2">
            When I'm not coding, you can find me exploring new technologies, hiking or camping
            in the great outdoors, or indulging in my love for photography. I take time to share
            my knowledge especially with those just starting out in their careers or hobbies.
            I am often always trying to learn new things and improve my skillset be it technology
            or life skills.
          </p>
          <p data-testid="text-about-paragraph-3">
            I've always approached development and solutions with the end-user in mind.
            Creating easy to use and intuitive applications that anyone could pick up and use.
            Creating detailed and thorough documentation so that the future maintainers of my
            projects can easily understand the codebase and make changes as needed.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3" data-testid="about-traits">
          <span className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm font-medium">Problem Solver</span>
          <span className="bg-green-100 text-accent px-3 py-1 rounded-full text-sm font-medium">Team Player</span>
          <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">Continuous Learner</span>
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">Hard Working</span>
        </div>
      </div>
      <div className="space-y-6">
        <img 
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
          alt="Professional workspace with laptop and code" 
          className="rounded-xl shadow-lg w-full h-auto"
          data-testid="img-workspace"
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700" data-testid="stat-experience">
            <div className="text-2xl font-bold text-primary">7</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Years Experience</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700" data-testid="stat-projects">
            <div className="text-2xl font-bold text-accent">17</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Projects Worked on</div>
          </div>
        </div>
      </div>
    </div>
  );
}
