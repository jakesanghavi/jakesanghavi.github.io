import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Laptop, Zap, Star, GraduationCap, Building2 } from 'lucide-react';
import SkillCard from './SkillCard';
import { skillsExport, workExperienceExport, educationExport } from '../assets/imports';
import Timeline from './Timeline';


export default function AboutSection() {
  const [skills] = useState(skillsExport);
  const [workExperience] = useState(workExperienceExport)
  const [education] = useState(educationExport);
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <section id="about" className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-slate-900/20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Passionate developer with interests in sports analytics, astrophysics, and investing strategies.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800 to-indigo-900 rounded-2xl p-8"
          >
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              Technical Skills
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {skills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Toggle Buttons (Tabs)
            User can then toggle b/w education and work exp.*/}
            <div className="relative flex justify-center w-full max-w-sm mx-auto p-1 bg-slate-800 rounded-full border border-slate-700/50">
              <div
                className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-transform duration-360 ease-in-out w-1/2 
                  ${activeTab === 'experience' ? 'translate-x-0' : 'translate-x-full'}`}
              ></div>
              <button
                onClick={() => setActiveTab('experience')}
                className={`relative flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-full font-medium transition-colors duration-300 ease-in-out z-10
                  ${activeTab === 'experience' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Building2 />
                Experience
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`relative flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-full font-medium transition-colors duration-300 ease-in-out z-10
                  ${activeTab === 'education' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <GraduationCap />
                Education
              </button>
            </div>

            {/* Idk if i am crazy about timeline style - may need to change later */}
            <div className="mt-8">
              {activeTab === 'experience' ? (
                <Timeline experiences={workExperience} />
              ) : (
                // Education uses different display structure
                <div className="flex flex-col gap-y-8">
                  {education.map((item, index) => (
                    <motion.div
                      key={index}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mt-3 flex-shrink-0"></div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {item.logo && (
                              <img src={item.logo} alt={`${item.company} logo`} className="h-6 w-auto rounded" />
                            )}
                            <h4 className="text-xl font-semibold text-white">{item.title}</h4>
                          </div>
                          <p className="text-blue-400 font-medium mb-2">{item.company} • {item.period}</p>
                          <p className="text-slate-300">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Projects Completed', value: '25+', icon: Code },
            { label: 'Years Experience', value: '2+', icon: Laptop },
            { label: 'Proficient Languages', value: '5+', icon: Star },
            { label: 'Live Service Websites', value: '3+', icon: Zap }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div >
    </section >
  );
}