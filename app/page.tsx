"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Spotify } from "react-spotify-embed";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Instagram,
  Download,
  ArrowRight,
  Play,
  Pause,
  Star,
  Music,
  Code,
  Heart,
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
  Repeat
} from "lucide-react";
import { cn } from "@/lib/utils";

function useTypewriter() {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing1" | "deleting" | "typing2">(
    "typing1"
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const firstName = "Hong Anh Nguyen";
  const secondName = "Amie Nguyen";

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === "typing1") {
      if (currentIndex < firstName.length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev + firstName[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, 150);
      } else {
        timeout = setTimeout(() => {
          setPhase("deleting");
          setCurrentIndex(firstName.length - 1);
        }, 2000);
      }
    } else if (phase === "deleting") {
      if (currentIndex >= 0) {
        timeout = setTimeout(() => {
          setDisplayText(firstName.substring(0, currentIndex));
          setCurrentIndex((prev) => prev - 1);
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setPhase("typing2");
          setCurrentIndex(0);
          setDisplayText("");
        }, 500);
      }
    } else if (phase === "typing2") {
      if (currentIndex < secondName.length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev + secondName[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, 150);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, phase, firstName, secondName]);

  return displayText;
}

function DreamBlock({
  children,
  className,
  gradient = "from-white/80 to-white/60"
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}) {
  const [hit, setHit] = useState(false);

  const handleHit = () => {
    setHit(true);
    setTimeout(() => setHit(false), 300);
  };

  return (
    <motion.div
      className={cn(
        `relative cursor-pointer bg-gradient-to-br ${gradient} backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-xl`,
        className
      )}
      whileHover={{ scale: 1.02, y: -5 }}
      animate={{ y: hit ? -10 : 0 }}
      onClick={handleHit}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

function SpotifyPlaylist() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const tracks = [
    { title: "On Time", artist: "John Legend", duration: "3:24" },
    { title: "Superhero", artist: "Future", duration: "2:58" },
    { title: "Too Many Nights", artist: "Don Toliver", duration: "3:12" },
    { title: "Raindrops", artist: "Travis Scott", duration: "4:01" }
  ];

  const handleShuffle = () => {
    const randomTrack = Math.floor(Math.random() * tracks.length);
    setCurrentTrack(randomTrack);
  };

  return (
    <div className="backdrop-blur-sm rounded-xl p-4 border border-white/20">
      <div className="flex items-center gap-3 mb-4">
        <Spotify link="https://open.spotify.com/album/1NAmidJlEaVgA3MpcPFYGq" />
      </div>
    </div>
  );
}

function FloatingElement({
  delay = 0,
  children
}: {
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="absolute z-10"
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [-20, -60, -20],
        opacity: [0, 1, 0],
        scale: [0.8, 1, 0.8]
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        delay: delay,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

function DreamCloud({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("absolute opacity-30", className)}
      animate={{
        x: [0, 30, 0],
        y: [0, -10, 0]
      }}
      transition={{
        duration: 12,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut"
      }}
    >
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-blue-200 rounded-full blur-sm" />
        <div className="absolute -top-4 left-8 w-12 h-12 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-sm" />
        <div className="absolute -top-6 left-16 w-14 h-14 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-sm" />
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const typedName = useTypewriter();
  const [showElements, setShowElements] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleBlockClick = (id: string) => {
    setShowElements((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setShowElements((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-blue-100 to-pink-100 text-gray-800 pb-20 relative overflow-hidden">
      {/* Dreamy Background Elements */}
      <DreamCloud className="top-20 left-[5%]" />
      <DreamCloud className="top-40 right-[10%]" />
      <DreamCloud className="bottom-60 left-[15%]" />

      {/* Floating Stars */}
      <div className="absolute top-32 left-[20%] text-pink-300 text-2xl animate-pulse">
        ✨
      </div>
      <div className="absolute top-64 right-[25%] text-blue-300 text-xl animate-pulse">
        ⭐
      </div>
      <div className="absolute bottom-80 left-[70%] text-purple-300 text-lg animate-pulse">
        💫
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center justify-between p-8 max-w-7xl mx-auto"
      >
        <motion.div
          className="flex items-center gap-4 mb-6 md:mb-0"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="relative w-14 h-14 rounded-full overflow-hidden border-3 border-gradient-to-r from-pink-300 to-blue-300 shadow-lg"
            whileHover={{ rotate: 10 }}
          >
            <Image
              src="/girl-coder-logo.png"
              alt="Girl Coder Logo"
              width={56}
              height={56}
              className="object-cover"
            />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              {typedName}
              <span className="animate-pulse ml-1 text-pink-400">|</span>
            </h1>
            <p className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-medium">
              Coding with playfulness ✨
            </p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white font-semibold shadow-lg border-0">
            <Download className="w-4 h-4 mr-2" />
            Resume
          </Button>
        </motion.div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-8">
        {/* Main Grid - 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: About Me with Spotify */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {showElements["about"] && (
              <FloatingElement>
                <div className="text-2xl">💖</div>
              </FloatingElement>
            )}
            <DreamBlock
              className="h-full"
              gradient="from-pink-100/80 to-blue-100/60"
              onClick={() => handleBlockClick("about")}
            >
              <div className="flex flex-col h-full">
                {/* Logo and Spotify Row */}
                <div className="flex-1 gap-6 mb-6">
                  <div className="flex justify-between items-center pt-4 border-t border-gradient-to-r from-pink-200 to-blue-200">
                    <div className="flex flex-col">
                      <div className="flex relative w-20 h-20 rounded-full overflow-hidden border-2 border-pink-300/50 shadow-lg mb-3">
                        <Image
                          src="/girl-coder-logo.png"
                          alt="Girl Coder Logo"
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className="text-pink-400 fill-pink-400"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {[Instagram, Linkedin, Github].map((Icon, index) => (
                        <Button
                          key={index}
                          size="icon"
                          variant="ghost"
                          className="h-10 w-10 text-gray-600 hover:text-pink-500 hover:bg-pink-100/50 rounded-full"
                        >
                          <Icon size={18} />
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* About Me Content */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent mb-4">
                    About Me
                  </h2>

                  <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                    <p>
                      I'm currently a master student at{" "}
                      <span className="font-semibold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                        Arizona State University
                      </span>
                      , major in Software Engineering.
                    </p>
                    <p>
                      I hope to create better{" "}
                      <span className="font-semibold text-pink-500">
                        interactive software
                      </span>{" "}
                      that helps people cultivate and share ideas, expressing
                      what brings them joy in meaningful ways.
                    </p>
                    <p>
                      To that end, I take a generalist's approach, driven by a
                      deep care for both{" "}
                      <span className="font-semibold text-blue-500">
                        systems
                      </span>{" "}
                      and{" "}
                      <span className="font-semibold text-purple-500">
                        interaction design
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </DreamBlock>
          </motion.div>

          {/* <div className="flex-1 mt-12">
            <SpotifyPlaylist />
          </div> */}

          {/* Column 2: Experience & Skills */}
          <div className="space-y-8">
            {/* Experience */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {showElements["exp"] && (
                <FloatingElement>
                  <div className="text-2xl">🌟</div>
                </FloatingElement>
              )}
              <DreamBlock
                gradient="from-blue-100/80 to-purple-100/60"
                onClick={() => handleBlockClick("exp")}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    <Code size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                      Experience
                    </h2>
                    <p className="text-xs text-gray-600">🏆 1208 XP gained</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      company: "Zen8labs",
                      role: "Software Engineer",
                      period: "Oct 2022 - Aug 2024",
                      icon: "🌟"
                    },
                    {
                      company: "Zen8labs",
                      role: "Software Engineer Intern",
                      period: "Oct 2021 - Oct 2022",
                      icon: "🤖"
                    },
                    {
                      company: "Opentechiz",
                      role: "PHP Developer Intern",
                      period: "March 2021 - Oct 2021",
                      icon: "🚀"
                    }
                  ].map((exp, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-3 p-3 rounded-xl hover:bg-white/40 transition-all duration-300"
                      whileHover={{ x: 8, scale: 1.02 }}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-blue-200 rounded-full flex items-center justify-center text-lg shadow-sm">
                        {exp.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {exp.role}
                        </h4>
                        <p className="text-sm text-blue-600 font-medium">
                          {exp.company}
                        </p>
                        <p className="text-xs text-gray-500">{exp.period}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-blue-200/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-600">
                      Experience Points
                    </span>
                    <span className="text-xs font-medium text-blue-600">
                      1208/2000
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                </div>
              </DreamBlock>
            </motion.div>

            {/* Skills */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {showElements["skills"] && (
                <FloatingElement delay={0.5}>
                  <div className="text-2xl">⭐</div>
                </FloatingElement>
              )}
              <DreamBlock
                gradient="from-purple-100/80 to-pink-100/60"
                onClick={() => handleBlockClick("skills")}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    <Star size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                      Skills
                    </h2>
                    <p className="text-xs text-gray-600">Collected power-ups</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { name: "JS", gradient: "from-yellow-300 to-yellow-400" },
                    { name: "TS", gradient: "from-blue-400 to-blue-500" },
                    { name: "React", gradient: "from-cyan-400 to-cyan-500" },
                    { name: "Node", gradient: "from-green-400 to-green-500" },
                    {
                      name: "Python",
                      gradient: "from-purple-400 to-purple-500"
                    },
                    { name: "SQL", gradient: "from-orange-400 to-orange-500" },
                    { name: "C++", gradient: "from-indigo-400 to-indigo-500" },
                    { name: "HTML", gradient: "from-red-400 to-red-500" },
                    { name: "CSS", gradient: "from-pink-400 to-pink-500" }
                  ].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className={`bg-gradient-to-br ${skill.gradient} text-white rounded-xl p-3 flex items-center justify-center font-bold text-sm shadow-lg`}
                      whileHover={{ scale: 1.1, y: -5, rotate: 5 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.1 * index,
                        type: "spring",
                        stiffness: 300
                      }}
                    >
                      {skill.name}
                    </motion.div>
                  ))}
                </div>
              </DreamBlock>
            </motion.div>
          </div>

          {/* Column 3: Projects */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {showElements["projects"] && (
              <FloatingElement delay={1}>
                <div className="text-2xl">🎮</div>
              </FloatingElement>
            )}
            <DreamBlock
              className="h-full"
              gradient="from-cyan-100/80 to-blue-100/60"
              onClick={() => handleBlockClick("projects")}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
                      <ArrowRight size={20} />
                    </div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                      Projects
                    </h2>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-600 hover:text-blue-500 hover:bg-blue-100/50"
                  >
                    <Shuffle size={16} className="mr-2" />
                    Shuffle
                  </Button>
                </div>

                <div className="space-y-6 flex-1">
                  {/* Featured Project */}
                  <div className="bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-xl p-4 border border-white/30">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">🥤</span>
                      <h3 className="font-bold text-gray-800">
                        Sip n Play Café Website
                      </h3>
                    </div>
                    <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white text-xs inline-block px-3 py-1 rounded-full mb-3">
                      Hackathon Winner 🏆
                    </div>
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                      Website revamp for Sip & Play Boardgame Cafe, featuring
                      500+ games and a modern, interactive design.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["React", "Next.js", "Tailwind", "Framer Motion"].map(
                        (tech) => (
                          <span
                            key={tech}
                            className="bg-white/60 text-gray-700 text-xs px-2 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-pink-400 to-purple-500 text-white border-0 shadow-lg"
                    >
                      View Project
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  {/* Other Projects */}
                  <div className="space-y-3">
                    {[
                      {
                        name: "Mine Alliance Platform",
                        tech: "AWS, ChatGPT-4",
                        icon: "🔗"
                      },
                      {
                        name: "Portfolio Website",
                        tech: "Next.js, Framer Motion",
                        icon: "💼"
                      },
                      {
                        name: "Task Management App",
                        tech: "React, Node.js",
                        icon: "📝"
                      }
                    ].map((project, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 transition-all duration-300 cursor-pointer"
                        whileHover={{ x: 5, scale: 1.02 }}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full flex items-center justify-center text-lg">
                          {project.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm">
                            {project.name}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {project.tech}
                          </p>
                        </div>
                        <ArrowRight size={16} className="text-gray-400" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-cyan-200/50">
                  <Button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white border-0 shadow-lg">
                    View All Projects
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </DreamBlock>
          </motion.div>
        </div>
      </div>

      {/* Dreamy Footer */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-sm border-t border-white/30">
        <div className="max-w-7xl w-full mx-auto px-8 h-full flex justify-between items-center">
          <div className="text-xs text-gray-600">© 2025 Made with 💖</div>
          <div className="text-xs bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent font-medium">
            Sky Dreamer Portfolio
          </div>
        </div>
      </div>
    </div>
  );
}
