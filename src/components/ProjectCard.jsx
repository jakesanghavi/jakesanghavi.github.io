import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star } from 'lucide-react';
import Button from './Button';
import { FastAverageColor } from 'fast-average-color';

export default function ProjectCard({ project, index }) {
  const [backgroundColor, setBackgroundColor] = useState('');
  const imageUrl = project.image_url || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&crop=entropy`;

  // Use FastAverageColor for images that don't cover the full card side
  // Most of my logos are square-ish so they don't really fit hte landscape
  // size the card takes on desktop
  useEffect(() => {
    const fac = new FastAverageColor();
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = imageUrl;

    image.onload = () => {
      // Pick a small region in the top-left corner (e.g., 10x10 pixels)
      fac.getColorAsync(image, {
        region: {
          left: 0,
          top: 0,
          width: 10,
          height: 10,
        }
      })
      .then(color => {
        setBackgroundColor(color.hex);
      })
      .catch(e => {
        console.error('Error getting average color:', e);
        // Fallback to a default color if needed
        setBackgroundColor('#434343'); 
      });
    };
  }, [imageUrl]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
    >
      <div className="relative overflow-hidden h-48" style={{ backgroundColor }}>
        <img
          src={imageUrl}
          alt={project.title}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
        {/* The overlay is still useful for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-slate-300 mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {/*PH*/}
        </div>

        <div className="flex gap-3">
          {project.github_url && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 border-slate-600 text-slate-300 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-400/10"
            >
              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
          )}
          
          {project.live_url && project.live_url.length > 1 && (
            <Button
              asChild
              size="sm"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}