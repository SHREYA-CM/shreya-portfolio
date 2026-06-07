"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Linkedin,
  Github,
  ArrowUp,
  Briefcase,
  Building,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Send,
  Star,
  GitFork,
  Code,
  Instagram,
  Loader2,
  Trophy,
} from "lucide-react";

/* ================================
   Types
=================================== */
type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

interface TimelineItemProps {
  icon: React.ReactNode;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  isLast: boolean;
  index: number;
}

interface SkillItemProps {
  icon: React.ReactNode;
  name: string;
}

interface Project {
  title: string;
  tech: string[];
  description: string;
  code: string;
  liveDemo?: string;
  github?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

type HeaderProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeSection: string;
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

type FloatingNavProps = {
  showTopBtn: boolean;
  handleScrollToTop: () => void;
};

type NotificationProps = {
  message: string;
  isError: boolean;
};

type ContactProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
  isSending: boolean;
};

/* ================================
   Data
=================================== */
const skills: SkillItemProps[] = [
  { icon: "⚛️", name: "React.js" },
  { icon: "N", name: "Next.js" },
  { icon: "💨", name: "Tailwind CSS" },
  { icon: "🌐", name: "HTML5" },
  { icon: "🎨", name: "CSS3" },
  { icon: "JS", name: "JavaScript" },
  { icon: "🟢", name: "Node.js" },
  { icon: "E", name: "Express.js" },
  { icon: "🍃", name: "MongoDB" },
  { icon: "🔧", name: "REST APIs" },
  { icon: "🔐", name: "JWT Auth" },
  { icon: "🐙", name: "Git" },
  { icon: "🐈", name: "GitHub" },
  { icon: "📮", name: "Postman" },
  { icon: "💻", name: "VS Code" },
  { icon: "▲", name: "Vercel" },
  { icon: "☁️", name: "Render" },
  { icon: "🖼️", name: "Cloudinary" },
];

const projects: Project[] = [
  {
    title: "AI Study Planner",
    tech: ["MERN", "JWT", "AI APIs"],
    description: "AI-powered study planner with personalized schedules, task prioritization, and productivity analytics.",
    code: `<span class="text-[#f92672]">const</span> <span class="text-[#66d9ef]">project</span> <span class="text-[#f92672]">=</span> {
  <span class="text-[#66d9ef]">name</span>: <span class="text-[#a6e22e]">'AI Study Planner'</span>,
  <span class="text-[#66d9ef]">status</span>: <span class="text-[#a6e22e]">'Ongoing'</span>,
  <span class="text-[#66d9ef]">features</span>: [
    <span class="text-[#a6e22e]">'AI Integration'</span>,
    <span class="text-[#a6e22e]">'Task Tracking'</span>
  ]
}`,
    github: "https://github.com/SHREYA-CM",
  },
  {
    title: "Prescripto – Doctor Booking",
    tech: ["MERN", "JWT", "EmailJS"],
    description: "Full-stack doctor appointment platform featuring role-based access, OTP verification, and management workflows.",
    liveDemo: "https://prescripto-3-ngrx.onrender.com/",
    code: `<span class="text-[#f92672]">const</span> <span class="text-[#66d9ef]">project</span> <span class="text-[#f92672]">=</span> {
  <span class="text-[#66d9ef]">name</span>: <span class="text-[#a6e22e]">'Prescripto'</span>,
  <span class="text-[#66d9ef]">auth</span>: <span class="text-[#a6e22e]">'JWT & OTP'</span>,
  <span class="text-[#66d9ef]">role</span>: <span class="text-[#a6e22e]">'Full Stack Dev'</span>
}`,
    github: "https://github.com/SHREYA-CM",
  },
  {
    title: "Neon Matrix Auth",
    tech: ["React.js", "Tailwind CSS"],
    description: "Cyberpunk-themed authentication platform with modern UI animations, theme switching, and form validation.",
    liveDemo: "https://neon-matrix-x5v2.vercel.app",
    code: `<span class="text-[#f92672]">const</span> <span class="text-[#66d9ef]">project</span> <span class="text-[#f92672]">=</span> {
  <span class="text-[#66d9ef]">name</span>: <span class="text-[#a6e22e]">'Neon Matrix'</span>,
  <span class="text-[#66d9ef]">theme</span>: <span class="text-[#a6e22e]">'Cyberpunk'</span>,
  <span class="text-[#66d9ef]">ui</span>: <span class="text-[#a6e22e]">'Framer Motion'</span>
}`,
    github: "https://github.com/SHREYA-CM",
  },
];

/* ================================
   Small UI Components
=================================== */
const NavLink: React.FC<NavLinkProps> = ({ href, children, isActive, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className={`px-3 py-2 rounded-md text-sm font-bold tracking-wider transition-all duration-300 ${
      isActive ? "text-[#da70d6] drop-shadow-[0_0_8px_rgba(218,112,214,0.8)]" : "text-gray-300 hover:text-[#64ffda] hover:drop-shadow-[0_0_8px_rgba(100,255,218,0.5)]"
    }`}
  >
    {children}
  </a>
);

// Enhanced Timeline Item
const TimelineItem: React.FC<TimelineItemProps> = ({ icon, date, title, subtitle, description, isLast, index }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ type: "spring", stiffness: 200, damping: 15, delay: index * 0.1 }}
    className="relative pl-12 pb-10 group"
  >
    {!isLast && <div className="absolute left-[18px] top-5 w-0.5 h-full bg-[#3a3a5a] -translate-x-1/2 group-hover:bg-gradient-to-b from-[#da70d6] to-[#9370db] group-hover:shadow-[0_0_10px_#da70d6] transition-all duration-500"></div>}
    <motion.div 
      whileHover={{ scale: 1.3, rotate: 360 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="absolute left-0 top-2 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#9370db] to-[#da70d6] text-white z-10 shadow-[0_0_15px_#9370db]"
    >
      {icon}
    </motion.div>
    <span className="text-sm font-semibold text-[#64ffda] drop-shadow-[0_0_5px_rgba(100,255,218,0.3)]">{date}</span>
    <h3 className="text-2xl font-black text-white mt-1 group-hover:text-[#da70d6] transition-colors">{title}</h3>
    <h4 className="text-lg font-bold text-[#9370db] mb-2">{subtitle}</h4>
    <p className="text-gray-300 font-medium leading-relaxed">{description}</p>
  </motion.div>
);

// Enhanced Skills
const SkillCard: React.FC<SkillItemProps & { index: number }> = ({ icon, name, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ type: "spring", stiffness: 300, damping: 15, delay: index * 0.05 }}
    whileHover={{ 
      y: -10, 
      scale: 1.05, 
      borderColor: "#da70d6",
      boxShadow: "0px 10px 20px rgba(218,112,214,0.3), inset 0px 0px 15px rgba(218,112,214,0.1)" 
    }}
    className="bg-[#050b14]/60 backdrop-blur-md border border-gray-700/50 rounded-xl p-5 text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center"
  >
    <span className="text-4xl inline-block drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" role="img" aria-label={name}>
      {icon}
    </span>
    <h3 className="mt-4 font-bold text-gray-200 tracking-wide text-sm uppercase">{name}</h3>
  </motion.div>
);

// Enhanced Project Cards
const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.1 }}
    whileHover={{ 
      y: -15, 
      scale: 1.02,
      boxShadow: "0px 20px 40px rgba(147,112,219,0.3), 0px 0px 20px rgba(218,112,214,0.2)",
      borderColor: "rgba(218,112,214,0.5)"
    }}
    className="relative bg-[#050b14]/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50 flex flex-col p-6 transition-all duration-300 group z-10"
  >
    <div className="flex-grow">
      <h3 className="text-2xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#9370db] group-hover:to-[#da70d6] transition-all duration-300">
        {project.title}
      </h3>

      <div className="flex flex-wrap gap-2 mb-5">
        {project.tech.map((t, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs font-bold rounded-full bg-[#9370db]/10 text-[#da70d6] border border-[#9370db]/30 group-hover:bg-[#da70d6]/20 group-hover:border-[#da70d6]/50 transition-colors shadow-[0_0_5px_rgba(147,112,219,0.2)]"
          >
            {t}
          </span>
        ))}
      </div>

      <p className="text-gray-300 text-sm mb-6 leading-relaxed font-medium">
        {project.description}
      </p>

      {/* Cyberpunk Code Panel */}
      <div className="font-mono text-xs bg-[#03060a] rounded-xl p-4 mb-6 h-40 overflow-y-auto border border-gray-800 group-hover:border-[#9370db]/60 transition-colors relative shadow-inner scrollbar-thin scrollbar-thumb-[#9370db] scrollbar-track-transparent">
        <div className="flex space-x-2 mb-3 border-b border-gray-800/50 pb-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_red]"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_yellow]"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_green]"></div>
        </div>
        <pre>
          <code
            className="language-js leading-loose tracking-wide"
            dangerouslySetInnerHTML={{ __html: project.code }}
          />
        </pre>
      </div>
    </div>

    {/* Actions */}
    <div className="mt-auto flex space-x-4">
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="relative overflow-hidden bg-gradient-to-r from-[#9370db] to-[#da70d6] hover:from-[#da70d6] hover:to-[#9370db] transition-all duration-500 text-white text-sm text-center font-bold py-3 px-5 rounded-xl w-full shadow-[0_0_15px_rgba(147,112,219,0.4)] hover:shadow-[0_0_25px_rgba(218,112,214,0.6)]"
      >
        View Code
      </a>
      {project.liveDemo ? (
        <a
          href={project.liveDemo}
          target="_blank"
          rel="noopener noreferrer"
          className="border-2 border-[#da70d6]/50 text-[#da70d6] hover:border-[#da70d6] hover:bg-[#da70d6]/10 transition-all duration-500 text-sm font-bold py-3 px-5 rounded-xl w-full text-center hover:shadow-[0_0_20px_rgba(218,112,214,0.3)]"
        >
          Live Demo
        </a>
      ) : (
        <button
          disabled
          className="border-2 border-gray-700 text-gray-500 cursor-not-allowed text-sm font-bold py-3 px-5 rounded-xl w-full text-center bg-gray-800/20"
        >
          Live Demo
        </button>
      )}
    </div>
  </motion.div>
);

/* ================================
   Header
=================================== */
const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen, activeSection, handleNavClick }) => (
  <header className="sticky top-0 z-50 w-full bg-[#0a192f]/70 backdrop-blur-xl border-b border-gray-700/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <a href="#home" onClick={handleNavClick} className="text-2xl font-black text-white tracking-widest hover:text-[#da70d6] hover:drop-shadow-[0_0_10px_rgba(218,112,214,0.5)] transition-all">
          SHREYA<span className="text-[#9370db]">_</span>PANDEY
        </a>

        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-6">
            <NavLink href="#about" isActive={activeSection === "about"} onClick={handleNavClick}>ABOUT</NavLink>
            <NavLink href="#experience" isActive={activeSection === "experience"} onClick={handleNavClick}>EXPERIENCE</NavLink>
            <NavLink href="#skills" isActive={activeSection === "skills"} onClick={handleNavClick}>SKILLS</NavLink>
            <NavLink href="#projects" isActive={activeSection === "projects"} onClick={handleNavClick}>PROJECTS</NavLink>
            <NavLink href="#education" isActive={activeSection === "education"} onClick={handleNavClick}>EDUCATION</NavLink>
            <NavLink href="#achievements" isActive={activeSection === "achievements"} onClick={handleNavClick}>ACHIEVEMENTS</NavLink>
            <NavLink href="#contact" isActive={activeSection === "contact"} onClick={handleNavClick}>CONTACT</NavLink>
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-[#da70d6] focus:outline-none transition-colors">
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>
    </nav>

    {isMenuOpen && (
      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden bg-[#050b14]/95 backdrop-blur-xl border-t border-gray-800 overflow-hidden shadow-2xl">
        {["about", "experience", "skills", "projects", "education", "achievements", "contact"].map((item) => (
          <a 
            key={item} 
            href={`#${item}`} 
            onClick={handleNavClick} 
            className={`block px-6 py-4 text-sm font-black uppercase tracking-widest border-b border-gray-800/50 ${activeSection === item ? "text-[#da70d6] bg-gradient-to-r from-[#9370db]/10 to-transparent border-l-4 border-l-[#da70d6]" : "text-gray-400 hover:text-white hover:bg-gray-800/30"}`}
          >
            {item}
          </a>
        ))}
      </motion.div>
    )}
  </header>
);

/* ================================
   Sections
=================================== */
const HomeSection = React.forwardRef<HTMLElement, {}>((_props, ref) => (
  <section id="home" ref={ref} className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    {/* Subtle animated background glow */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9370db]/20 rounded-full blur-[120px] pointer-events-none"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#da70d6]/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
        className="text-center md:text-left"
      >
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg text-[#64ffda] tracking-[0.2em] uppercase font-bold drop-shadow-[0_0_8px_rgba(100,255,218,0.4)]">
          Hello, This is
        </motion.span>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mt-4 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] tracking-tight">
          Shreya Pandey.
        </h1>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-300 mt-4 tracking-tight">
          Full Stack Developer
        </h2>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#9370db] via-[#da70d6] to-[#ff8c00] bg-clip-text text-transparent mt-4 drop-shadow-[0_0_20px_rgba(218,112,214,0.3)]">
          React.js • Next.js • Node.js
        </h2>
        <p className="text-lg text-gray-400 mt-6 max-w-lg font-medium leading-relaxed">
          Building scalable web applications, secure backend architectures, and immersive modern user experiences.
        </p>

        <div className="mt-10 flex justify-center md:justify-start space-x-6">
          {[
            { icon: Linkedin, link: "https://linkedin.com/in/shreya-pandey-a8459a276", color: "hover:text-[#0a66c2]" },
            { icon: Github, link: "https://github.com/SHREYA-CM", color: "hover:text-white" },
            { icon: Code, link: "https://leetcode.com/u/Shreyaaaa_pandey/", color: "hover:text-[#ffa116]" },
            { icon: Instagram, link: "https://www.instagram.com/s_hreya_p_andey/", color: "hover:text-[#E1306C]" }
          ].map((social, i) => (
            <motion.a 
              key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + (i * 0.1) }}
              whileHover={{ y: -5, scale: 1.2 }} 
              href={social.link} target="_blank" rel="noopener noreferrer" 
              className={`text-gray-400 ${social.color} transition-all duration-300 drop-shadow-lg`}
            >
              <social.icon size={32} />
            </motion.a>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-12 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
          <motion.a 
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(218,112,214,0.6)" }} 
            whileTap={{ scale: 0.95 }} 
            href="#contact" 
            className="bg-gradient-to-r from-[#9370db] to-[#da70d6] text-white font-black py-4 px-10 rounded-xl shadow-[0_0_15px_rgba(147,112,219,0.4)] text-center tracking-widest uppercase"
          >
            CONTACT ME
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(218,112,214,0.1)", boxShadow: "0px 0px 15px rgba(218,112,214,0.3)" }} 
            whileTap={{ scale: 0.95 }} 
            href="Shreya_Pandey_Resume.pdf" 
            target="_blank" 
            className="border-2 border-[#da70d6]/70 text-[#da70d6] font-black py-4 px-10 rounded-xl text-center tracking-widest uppercase transition-all"
          >
            GET RESUME
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: 2 }} 
        animate={{ opacity: 1, scale: 1, rotate: 0 }} 
        transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.3 }}
        className="hidden md:block"
      >
        <div className="bg-[#03060a]/90 backdrop-blur-2xl border border-gray-700/60 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(147,112,219,0.1)] font-mono text-sm overflow-hidden hover:border-[#da70d6]/50 transition-colors duration-500 group">
          <div className="flex space-x-2 mb-4 border-b border-gray-800/80 pb-3">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500/80 group-hover:shadow-[0_0_10px_red] transition-shadow"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-400/80 group-hover:shadow-[0_0_10px_yellow] transition-shadow"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-green-500/80 group-hover:shadow-[0_0_10px_green] transition-shadow"></div>
          </div>
          <pre>
            <code className="language-js leading-loose text-[15px]">
              <span className="text-[#f92672] font-bold">const</span> <span className="text-[#66d9ef] font-bold">developer</span> <span className="text-[#f92672] font-bold">=</span> {"{\n"}
              {"  "}<span className="text-[#66d9ef]">name</span>: <span className="text-[#a6e22e]">'Shreya Pandey'</span>,{"\n"}
              {"  "}<span className="text-[#66d9ef]">skills</span>: [<span className="text-[#a6e22e]">'React'</span>, <span className="text-[#a6e22e]">'Next.js'</span>, <span className="text-[#a6e22e]">'Node'</span>, <span className="text-[#a6e22e]">'Mongo'</span>],{"\n"}
              {"  "}<span className="text-[#66d9ef]">hardWorker</span>: <span className="text-[#f92672]">true</span>,{"\n"}
              {"  "}<span className="text-[#66d9ef]">hireable</span>: <span className="text-[#e6db74]">function</span>() {"{\n"}
              {"    "}<span className="text-[#f92672]">return</span> <span className="text-[#f92672]">this</span>.hardWorker && <span className="text-[#f92672]">this</span>.skills.length {">="} <span className="text-[#a6e22e]">4</span>{"\n"}
              {"  "}{"}\n"}
              {"}"};
            </code>
          </pre>
        </div>
      </motion.div>
    </div>
  </section>
));

const About = React.forwardRef<HTMLElement, {}>((_props, ref) => (
  <section id="about" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
    <div className="max-w-7xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] to-[#9370db] text-center mb-20 uppercase tracking-[0.15em]">
        WHO I AM?
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100 }} className="flex justify-center md:order-last">
          <div className="bg-[#03060a]/80 backdrop-blur-xl border border-[#da70d6]/20 hover:border-[#da70d6]/60 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(218,112,214,0.2)] font-mono text-sm overflow-hidden w-full max-w-md transition-all duration-500">
            <div className="flex space-x-2 mb-4 border-b border-gray-800 pb-3">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <pre>
              <code className="language-js leading-loose text-gray-300">
                <span className="text-[#75715e]">/* Professional Philosophy */</span>{"\n\n"}
                <span className="text-[#f92672]">class</span> <span className="text-[#e6db74]">Creator</span> {"{\n"}
                {"  "}<span className="text-[#66d9ef]">constructor</span>() {"{\n"}
                {"    "}<span className="text-[#f92672]">this</span>.<span className="text-[#66d9ef]">name</span> <span className="text-[#f92672]">=</span> <span className="text-[#a6e22e]">'Shreya Pandey'</span>;{"\n"}
                {"    "}<span className="text-[#f92672]">this</span>.<span className="text-[#66d9ef]">passion</span> <span className="text-[#f92672]">=</span> [<span className="text-[#a6e22e]">'Problem-Solving'</span>, <span className="text-[#a6e22e]">'Web'</span>];{"\n"}
                {"  "}{"}\n"}
                {"}"}
              </code>
            </pre>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100 }} className="text-lg text-gray-300 space-y-6 text-center md:text-left font-medium">
          <p className="leading-relaxed">Full Stack Developer with hands-on experience in <span className="text-[#da70d6] font-bold">React.js, Next.js, Node.js, Express.js, and MongoDB</span>.</p>
          <p className="leading-relaxed">Passionate about building scalable web applications, secure authentication systems, and modern user experiences.</p>
          <div className="p-4 bg-[#9370db]/10 border-l-4 border-[#da70d6] rounded-r-xl">
            <p className="text-white italic">Currently working as a Frontend Developer Intern at RD Group of Industries and recognized as the <span className="text-[#64ffda] font-black">#1 Performer</span> in the Web Development Division.</p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
));

const Experience = React.forwardRef<HTMLElement, {}>((_props, ref) => (
  <section id="experience" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] to-[#9370db] text-center mb-20 uppercase tracking-[0.15em]">
        Experiences
      </motion.h2>
      <div className="max-w-3xl mx-auto relative mt-4">
        <TimelineItem
          icon={<Briefcase size={20} />}
          date="Nov 2025 – Present"
          title="Frontend Developer Intern"
          subtitle="RD Group of Industries"
          description="Developed responsive web interfaces using React.js and JavaScript. Collaborated with backend developers and designers to deliver scalable solutions. Improved application performance through reusable component architecture. Recognized as the #1 Performer in the Web Development Division."
          isLast={false}
          index={0}
        />
        <TimelineItem
          icon={<Building size={20} />}
          date="July 2025 – August 2025"
          title="Summer Intern"
          subtitle="Banaras Locomotive Works (BLW), Indian Railways"
          description="Studied industrial electrical systems and maintenance workflows. Gained exposure to quality control, safety practices, and large-scale industrial operations."
          isLast={true}
          index={1}
        />
      </div>
    </div>
  </section>
));

const Skills = React.forwardRef<HTMLElement, {}>((_props, ref) => (
  <section id="skills" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] to-[#9370db] text-center mb-20 uppercase tracking-[0.15em]">
        Skills
      </motion.h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} icon={skill.icon} name={skill.name} index={index} />
        ))}
      </div>
    </div>
  </section>
));

const Projects = React.forwardRef<HTMLElement, {}>((_props, ref) => (
  <section id="projects" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#050b14]/50 border-y border-gray-800/50">
    <div className="max-w-7xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] to-[#9370db] text-center mb-20 uppercase tracking-[0.15em]">
        Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
));

const Education = React.forwardRef<HTMLElement, {}>((_props, ref) => (
  <section id="education" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] to-[#9370db] text-center mb-20 uppercase tracking-[0.15em]">
        Education
      </motion.h2>
      <div className="max-w-3xl mx-auto relative mt-4">
        <TimelineItem
          icon={<GraduationCap size={20} />}
          date="2022 - 2026"
          title="Bachelor of Technology, Electrical Engineering"
          subtitle="Rajkiya Engineering College, Sonbhadra"
          description="SGPA: 7.4"
          isLast={false}
          index={0}
        />
        <TimelineItem
          icon={<GraduationCap size={20} />}
          date="2021 - 2022"
          title="Class 12th (Higher Secondary)"
          subtitle="Jay Jyoti Inter College, Sonbhadra"
          description="Percentage: 76.4%"
          isLast={false}
          index={1}
        />
        <TimelineItem
          icon={<GraduationCap size={20} />}
          date="2019 - 2020"
          title="Class 10th (Secondary)"
          subtitle="Jay Jyoti Inter College, Sonbhadra"
          description="Percentage: 82.5%"
          isLast={true}
          index={2}
        />
      </div>
    </div>
  </section>
));

const Achievements = React.forwardRef<HTMLElement, {}>((_props, ref) => (
  <section id="achievements" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#050b14]/50 border-y border-gray-800/50">
    <div className="max-w-7xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] to-[#9370db] text-center mb-20 uppercase tracking-[0.15em]">
        Achievements
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {[
          "#1 Performer – Web Development Division, RD Group of Industries",
          "Smart India Hackathon Participant",
          "NCRAET Conference Coordinator",
          "Volunteer Teacher at Umeed Initiative",
        ].map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5, boxShadow: "0px 10px 25px rgba(218,112,214,0.25)", borderColor: "rgba(218,112,214,0.5)" }}
            className="flex items-center space-x-5 bg-[#0a192f]/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className="p-3 bg-[#9370db]/10 rounded-xl group-hover:bg-[#da70d6]/20 transition-colors">
              <Trophy className="text-[#da70d6] flex-shrink-0" size={28} />
            </div>
            <span className="text-gray-200 group-hover:text-white text-lg font-bold leading-snug">{achievement}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

const Contact = React.forwardRef<HTMLElement, ContactProps>(
  ({ handleSubmit, isSending }, ref) => (
    <section id="contact" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] to-[#9370db] text-center mb-8 uppercase tracking-[0.15em]">
          CONTACT WITH ME
        </motion.h2>
        <p className="text-lg text-gray-400 text-center mb-16 max-w-2xl mx-auto font-medium">
          Open to <span className="text-[#d844d4]">Full Stack,Frontend</span> & <span className="text-[#64ffda]">Backend Developer</span> opportunities. Let's build something amazing together.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* Enhanced Glassmorphism Form */}
          <motion.form 
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100 }}
            onSubmit={handleSubmit} 
            className="space-y-6 bg-[#050b14]/60 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-gray-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.02)] relative overflow-hidden"
          >
            {/* API KEY HIDDEN INPUT */}
            <input type="hidden" name="access_key" value="a580eac0-663e-4ff8-85de-88c86fcf8cc0" />

            <div className="relative z-10">
              <label htmlFor="name" className="block text-xs font-black text-[#9370db] mb-2 uppercase tracking-widest">Your Name</label>
              <input type="text" id="name" name="name" required className="w-full bg-[#0a192f]/50 border border-gray-600/50 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#da70d6] focus:ring-2 focus:ring-[#da70d6]/30 focus:shadow-[0_0_20px_rgba(218,112,214,0.15)] transition-all duration-300 font-medium" placeholder="John Doe" />
            </div>
            <div className="relative z-10">
              <label htmlFor="email" className="block text-xs font-black text-[#9370db] mb-2 uppercase tracking-widest">Your Email</label>
              <input type="email" id="email" name="email" required className="w-full bg-[#0a192f]/50 border border-gray-600/50 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#da70d6] focus:ring-2 focus:ring-[#da70d6]/30 focus:shadow-[0_0_20px_rgba(218,112,214,0.15)] transition-all duration-300 font-medium" placeholder="john@example.com" />
            </div>
            <div className="relative z-10">
              <label htmlFor="message" className="block text-xs font-black text-[#9370db] mb-2 uppercase tracking-widest">Your Message</label>
              <textarea id="message" name="message" rows={5} required className="w-full bg-[#0a192f]/50 border border-gray-600/50 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#da70d6] focus:ring-2 focus:ring-[#da70d6]/30 focus:shadow-[0_0_20px_rgba(218,112,214,0.15)] transition-all duration-300 font-medium resize-none" placeholder="Hello Shreya, I would like to talk about..."></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0px 0px 30px rgba(218,112,214,0.6)" }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isSending}
              className="relative z-10 w-full flex items-center justify-center bg-gradient-to-r from-[#9370db] to-[#da70d6] text-white font-black py-4 px-8 rounded-xl shadow-[0_10px_20px_rgba(147,112,219,0.4)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.2em] transition-all"
            >
              {isSending ? (
                <><Loader2 size={20} className="mr-3 animate-spin" /> Transmitting...</>
              ) : (
                <><Send size={20} className="mr-3" /> Initialize Contact</>
              )}
            </motion.button>
          </motion.form>

          {/* Contact Info Side */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100 }} className="space-y-6 text-lg flex flex-col justify-center h-full">
            
            <motion.div whileHover={{ x: 10 }} className="flex items-center space-x-6 p-5 bg-[#050b14]/60 backdrop-blur-md rounded-2xl border border-gray-700/30 hover:border-[#da70d6]/50 transition-all duration-300 shadow-lg group">
              <div className="p-4 bg-gradient-to-br from-[#9370db]/20 to-[#da70d6]/20 rounded-xl text-[#da70d6] group-hover:scale-110 transition-transform shadow-inner"><Mail size={24} /></div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email</p>
                <a href="mailto:shreyap6307@gmail.com" className="text-white hover:text-[#da70d6] font-bold tracking-wide transition-colors">shreyap6307@gmail.com</a>
              </div>
            </motion.div>

            <motion.div whileHover={{ x: 10 }} className="flex items-center space-x-6 p-5 bg-[#050b14]/60 backdrop-blur-md rounded-2xl border border-gray-700/30 hover:border-[#da70d6]/50 transition-all duration-300 shadow-lg group">
              <div className="p-4 bg-gradient-to-br from-[#9370db]/20 to-[#da70d6]/20 rounded-xl text-[#da70d6] group-hover:scale-110 transition-transform shadow-inner"><Phone size={24} /></div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Phone</p>
                <span className="text-white font-bold tracking-wide">+91 70077 58523</span>
              </div>
            </motion.div>

            <motion.div whileHover={{ x: 10 }} className="flex items-center space-x-6 p-5 bg-[#050b14]/60 backdrop-blur-md rounded-2xl border border-gray-700/30 hover:border-[#da70d6]/50 transition-all duration-300 shadow-lg group">
              <div className="p-4 bg-gradient-to-br from-[#9370db]/20 to-[#da70d6]/20 rounded-xl text-[#da70d6] group-hover:scale-110 transition-transform shadow-inner"><MapPin size={24} /></div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Location</p>
                <span className="text-white font-bold tracking-wide">Varanasi, UP, India</span>
              </div>
            </motion.div>

            <div className="flex space-x-4 pt-6 px-2">
              {[
                { icon: Linkedin, link: "https://linkedin.com/in/shreya-pandey-a8459a276" },
                { icon: Github, link: "https://github.com/SHREYA-CM" },
                { icon: Code, link: "https://leetcode.com/u/Shreyaaaa_pandey/" },
                { icon: Instagram, link: "https://www.instagram.com/s_hreya_p_andey/" }
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  whileHover={{ y: -8, scale: 1.15, color: "#da70d6", filter: "drop-shadow(0 0 10px rgba(218,112,214,0.8))" }} 
                  href={social.link} target="_blank" rel="noopener noreferrer" 
                  className="p-4 bg-[#050b14] border border-gray-700/50 rounded-xl text-gray-400 transition-all duration-300 shadow-lg"
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
);

/* ================================
   Footer & Floating UI
=================================== */
const Footer: React.FC = () => (
  <footer className="py-12 border-t border-gray-800/80 bg-[#03060a]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="mb-8 text-gray-400 font-bold tracking-widest uppercase text-sm">Engineered by Shreya Pandey</p>
      <div className="flex justify-center space-x-6">
        <motion.a whileHover={{ scale: 1.05, y: -5, borderColor: "#da70d6" }} href="https://github.com/SHREYA-CM/Portfolio" target="_blank" className="flex items-center space-x-3 bg-[#0a192f] border border-gray-700 px-6 py-3 rounded-xl hover:text-white transition-all shadow-lg text-gray-300 font-bold">
          <Star size={18} className="text-[#9370db]" /><span>Star</span>
        </motion.a>
        <motion.a whileHover={{ scale: 1.05, y: -5, borderColor: "#da70d6" }} href="https://github.com/SHREYA-CM/Portfolio/fork" target="_blank" className="flex items-center space-x-3 bg-[#0a192f] border border-gray-700 px-6 py-3 rounded-xl hover:text-white transition-all shadow-lg text-gray-300 font-bold">
          <GitFork size={18} className="text-[#da70d6]" /><span>Fork</span>
        </motion.a>
      </div>
    </div>
  </footer>
);

const FloatingNav: React.FC<FloatingNavProps> = ({ showTopBtn, handleScrollToTop }) => (
  <>
    {showTopBtn && (
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.15, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleScrollToTop}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-[#9370db] to-[#da70d6] text-white p-4 rounded-2xl shadow-[0_10px_30px_rgba(218,112,214,0.5)] border border-white/20"
      >
        <ArrowUp size={24} className="drop-shadow-md" />
      </motion.button>
    )}
  </>
);

const Notification: React.FC<NotificationProps> = ({ message, isError }) => {
  if (!message) return null;
  return (
    <motion.div 
      initial={{ opacity: 0, y: -50, scale: 0.9 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }} 
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`fixed top-8 right-8 px-8 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[1000] font-black tracking-wide flex items-center space-x-3 border ${isError ? "bg-red-900/90 text-white border-red-500 backdrop-blur-md" : "bg-[#0a192f]/90 text-[#64ffda] border-[#64ffda]/50 backdrop-blur-md"}`}
    >
      {isError ? <X size={20} className="text-red-400" /> : <Send size={20} className="text-[#64ffda]" />}
      <span>{message}</span>
    </motion.div>
  );
};

/* ================================
   Main Page Component
=================================== */
export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showTopBtn, setShowTopBtn] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const homeRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const skillsRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const educationRef = useRef<HTMLElement | null>(null);
  const achievementsRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute("href")?.replace("#", "");
    if (!id) return;
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setNotificationMessage("");
    setIsError(false);

    const form = e.currentTarget;
    const formData = {
      access_key: (form.elements.namedItem("access_key") as HTMLInputElement).value,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setNotificationMessage("Transmission Successful!");
        form.reset();
      } else {
        setNotificationMessage(data.message || "Transmission Failed.");
        setIsError(true);
      }
    } catch {
      setNotificationMessage("Network Error. Try Again.");
      setIsError(true);
    } finally {
      setIsSending(false);
      setTimeout(() => setNotificationMessage(""), 4000);
    }
  };

  useEffect(() => {
    document.title = "Shreya Pandey | Full Stack Developer";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Full Stack Developer specializing in React.js, Next.js, Node.js, Express.js, MongoDB, and MERN Stack applications."
    );

    const refs = [homeRef, aboutRef, experienceRef, skillsRef, projectsRef, educationRef, achievementsRef, contactRef];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id) {
            setActiveSection(e.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );
    refs.forEach((r) => r.current && observer.observe(r.current));
    const onScroll = () => setShowTopBtn(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => {
      refs.forEach((r) => r.current && observer.unobserve(r.current));
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="bg-[#0a192f] text-[#ccd6f6] overflow-x-hidden selection:bg-[#da70d6] selection:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} activeSection={activeSection} handleNavClick={handleNavClick} />
      <main>
        <HomeSection ref={homeRef} />
        <About ref={aboutRef} />
        <Experience ref={experienceRef} />
        <Skills ref={skillsRef} />
        <Projects ref={projectsRef} />
        <Education ref={educationRef} />
        <Achievements ref={achievementsRef} />
        <Contact ref={contactRef} handleSubmit={handleSubmit} isSending={isSending} />
      </main>
      <Footer />
      <FloatingNav showTopBtn={showTopBtn} handleScrollToTop={handleScrollToTop} />
      <Notification message={notificationMessage} isError={isError} />
    </div>
  );
}