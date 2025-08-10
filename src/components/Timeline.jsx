import { useState } from 'react';
import { motion } from 'framer-motion';

const Timeline = ({ experiences = [] }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  // Dash Regex
  const DASH_CHARS = '[-–—\u2010\u2011\u2012\u2013\u2014\u2015]';
  const dashRegex = new RegExp(DASH_CHARS);

  const normalizePeriodParts = (period = '') => {
    const str = String(period);
    if (dashRegex.test(str)) {
      const parts = str.split(new RegExp(`\\s*${DASH_CHARS}\\s*`)).map(p => p.trim());
      if (parts.length === 2 && period.split(' ').length > 2) {
        return [parts[0], '-', parts[1]];
      }
      return parts.filter(Boolean);
    }
    return [str.trim()];
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute left-6 md:left-1/2 top-0 h-full w-0.5 bg-slate-700 transform md:-translate-x-1/2" />


      {/* Alternating sides (if on desktop) */}
      <div className="space-y-8">
        {experiences.map((exp, index) => {
          const isOdd = index % 2 !== 0;
          const periodParts = normalizePeriodParts(exp.period);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className={`relative flex items-start gap-6 md:gap-0 ${isOdd ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            >
              {/* Card */}
              <motion.div
                className={`md:w-5/12 ml-16 md:ml-0 bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl border transition-all duration-300 shadow-lg cursor-pointer
                  ${hoveredItem === index ? 'border-blue-500/50' : 'border-slate-700'}
                `}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-center gap-3 mb-1">
                  {exp.logo && (
                    <img src={exp.logo} alt={`${exp.company} logo`} className="h-5 w-auto rounded" />
                  )}
                  <div className="flex-1 text-white">
                    <span className="text-lg font-semibold">{exp.company}</span>
                    <span className="text-sm font-normal text-slate-400"> - {exp.title}</span>
                  </div>
                </div>

                {hoveredItem === index ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-2"
                  >
                    {/* If we have at least 3 parts show each on its own line */}
                    {periodParts.length >= 3 ? (
                      <div className="flex flex-col">
                        {periodParts.map((part, i) => (
                          <p key={i} className="text-xs text-blue-400 font-medium">
                            {part}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-blue-400 font-medium">
                        {periodParts.join(' - ')}
                      </p>
                    )}

                    <p className="text-sm text-slate-300 mt-2">{exp.description}</p>
                  </motion.div>
                ) : (
                  <p className="text-blue-400 text-sm italic">(hover for more)</p>
                )}
              </motion.div>

              {/* Spacer on desktop */}
              <div className="hidden md:block md:w-2/12" />

              {/* Bubble */}
              <div className="absolute left-6 md:left-1/2 top-0 -translate-x-1/2 z-10">
                <div className="w-18 h-18 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-slate-900">
                  <span className="text-white font-bold text-sm whitespace-pre-line text-center leading-none">
                    {periodParts.length >= 3
                      ? `${periodParts[0]}\n-\n${periodParts[2]}`
                      : exp.period}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
