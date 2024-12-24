
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">My Portfolio</h1>
          <nav>
            <ul className="flex gap-6">
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#projects" className="hover:underline">Projects</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 bg-white">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-4">Hi, I'm <span className="text-blue-600">John Doe</span></h2>
        <p className="text-gray-600 text-lg mb-6">A passionate Web Developer with a love for modern UI/UX design.</p>
        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition">
          View My Work
        </button>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto py-16 px-6">
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-700">My Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition">
            <h4 className="text-xl font-semibold mb-2 text-gray-800">Project 1</h4>
            <p className="text-gray-600 mb-4">A description of this amazing project with awesome details.</p>
            <a href="#" className="text-blue-500 font-semibold hover:underline">View Project →</a>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition">
            <h4 className="text-xl font-semibold mb-2 text-gray-800">Project 2</h4>
            <p className="text-gray-600 mb-4">Another stunning project showcasing my skills and creativity.</p>
            <a href="#" className="text-blue-500 font-semibold hover:underline">View Project →</a>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition">
            <h4 className="text-xl font-semibold mb-2 text-gray-800">Project 3</h4>
            <p className="text-gray-600 mb-4">This project demonstrates innovative ideas and coding mastery.</p>
            <a href="#" className="text-blue-500 font-semibold hover:underline">View Project →</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-200 py-16">
        <div className="container mx-auto text-center px-6">
          <h3 className="text-3xl font-bold text-gray-700 mb-6">Contact Me</h3>
          <p className="text-gray-600 mb-4">Interested in collaborating? Reach out to me below:</p>
          <button className="bg-indigo-500 text-white py-3 px-8 rounded-lg shadow hover:bg-indigo-600 transition">
            Say Hello
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} John Doe. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
