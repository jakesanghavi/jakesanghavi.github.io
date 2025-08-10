import { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsExport } from '../assets/imports'
import ProjectCard from './ProjectCard';
import Button from '../overrides/Button'

export default function PortfolioSection() {
  const [projects] = useState(projectsExport);
  const [filteredProjects, setFilteredProjects] = useState(projectsExport);
  const [activeFilter, setActiveFilter] = useState('all');
  const isLoading = false;

  // Filter projects by keyword
  // Add more keywords later
  const filterProjects = (filter) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else if (filter === 'featured') {
      setFilteredProjects(projects.filter(project => project.featured));
    } else {
      setFilteredProjects(projects.filter(project =>
        project.technologies.some(tech =>
          tech.toLowerCase().includes(filter.toLowerCase())
        )
      ));
    }
  };

  const filters = ['all', 'featured', 'react', 'node', 'python'];

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-slate-900 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-relaxed">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A collection of my coding projects to showcase my skills.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <Button
              key={filter}
              onClick={() => filterProjects(filter)}
              variant={activeFilter === filter ? "default" : "outline"}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeFilter === filter
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'border-slate-600 text-slate-300 hover:border-blue-400 hover:text-blue-400'
                }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-slate-800/50 rounded-xl p-6 animate-pulse">
                <div className="bg-slate-700 h-48 rounded-lg mb-4"></div>
                <div className="bg-slate-700 h-4 rounded mb-2"></div>
                <div className="bg-slate-700 h-3 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        )}

        {filteredProjects.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-slate-400 text-lg">No projects found for the selected filter.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}