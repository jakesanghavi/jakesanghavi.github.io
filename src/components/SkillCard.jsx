import React from 'react';
import { motion } from 'framer-motion';

export default function SkillCard({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      // Simplified styling for a cleaner grid with no backgrounds or borders
      className="flex items-center justify-center p-1"
    >
      <img 
        src={skill.image_url} 
        alt={skill.name} 
        className="w-12 h-12 object-contain"
      />
    </motion.div>
  );
}
