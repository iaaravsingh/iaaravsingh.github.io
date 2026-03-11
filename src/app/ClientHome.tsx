"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GlassmorphismCard from "@/components/glassmorphism-card";
import MouseMoveEffect from "@/components/mouse-move-effect";
import Hero from "@/components/hero";
import { Play, ArrowRight, Loader2 } from "lucide-react";
import {
  getVideoProjectsByCategory,
  getVideoCategoriesWithCountIncludingAll,
} from "@/lib/helper";
import type { VideoProject } from "@/types/videos";

const categories = getVideoCategoriesWithCountIncludingAll();

export default function ClientHome({ countryCode = "IN" }: { countryCode?: string }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayedProjects, setDisplayedProjects] = useState<VideoProject[]>([]);
  const [allProjects, setAllProjects] = useState<VideoProject[]>([]);
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedPage = sessionStorage.getItem('portfolioCurrentPage');
      return savedPage ? parseInt(savedPage) : 1;
    }
    return 1;
  });

  useEffect(() => {
    sessionStorage.setItem('portfolioCurrentPage', currentPage.toString());
  }, [currentPage]);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 14;

  // Load projects for selected category WITH ALTERNATING VIP GRID
  useEffect(() => {
    let projects = getVideoProjectsByCategory(selectedCategory);
    
    // 🔥 VIP Foreign Client + Alternating Grid Logic 🔥
    if (countryCode !== "IN") {
      
      const englishVideos = projects.filter(p => p.language === "english");
      const otherVideos = projects.filter(p => p.language !== "english");

      const makeAlternatingGrid = (videoList: VideoProject[]) => {
        const horizontals = videoList.filter(p => p.orientation !== "vertical");
        const verticals = videoList.filter(p => p.orientation === "vertical");

        let arranged: VideoProject[] = [];

        // 🔄 Alternating Loop: 3 Horizontal -> 4 Vertical -> Repeat!
        while (horizontals.length > 0 || verticals.length > 0) {
          let madePerfectRow = false;

          // Step 1: Ek row Horizontal ki lagao (3 videos)
          if (horizontals.length >= 3) {
            arranged.push(...horizontals.splice(0, 3));
            madePerfectRow = true;
          }

          // Step 2: Ek row Vertical ki lagao (4 videos)
          if (verticals.length >= 4) {
            arranged.push(...verticals.splice(0, 4));
            madePerfectRow = true;
          }

          // Step 3: Agar dono ke perfect sets khatam ho gaye, toh jo bachi-kuchi videos hain unhe aakhiri mein daal do
          if (!madePerfectRow) {
            arranged.push(...horizontals.splice(0, horizontals.length));
            arranged.push(...verticals.splice(0, verticals.length));
          }
        }

        return arranged;
      };

      // Dono ko arrange karke jod do (Pehle English, Phir Hindi)
      projects = [...makeAlternatingGrid(englishVideos), ...makeAlternatingGrid(otherVideos)];
    }

    setAllProjects(projects);
    
    if (selectedCategory === "All") {
      setDisplayedProjects(projects.slice(0, ITEMS_PER_PAGE));
      setHasMore(projects.length > ITEMS_PER_PAGE);
    } else {
      setDisplayedProjects(projects);
      setHasMore(false);
    }
    
    setCurrentPage(1);
  }, [selectedCategory, countryCode]);

  // Load more projects
  const loadMoreProjects = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newProjects = allProjects.slice(startIndex, endIndex);

      setDisplayedProjects((prev) => [...prev, ...newProjects]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < allProjects.length);
      setLoading(false);
    }, 500);
  }, [currentPage, allProjects, loading, hasMore]);

  // Infinite scroll for non-"All" categories
  useEffect(() => {
    if (selectedCategory === "All") return;

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMoreProjects();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedCategory, loadMoreProjects]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MouseMoveEffect />

      <Hero />

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16 relative"
          >
            {/* Spotlight Effect behind title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight relative z-10">
              <span className="bg-gradient-to-r from-white via-blue-100 to-gray-400 bg-clip-text text-transparent">
                My Video Projects
              </span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              From seamless transitions to precise audio sync and dynamic motion — every detail is crafted to make your story
              <span className="text-blue-400 font-medium"> powerful</span>.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map(({ category, count }) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedCategory === category
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"
                  }
                `}
              >
                {category}
                <span className={`
                  ml-2 text-[10px] px-1.5 py-0.5 rounded-full transition-colors
                  ${selectedCategory === category ? "bg-black text-white" : "bg-white/10 text-gray-400"}
                `}>
                  {count}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
          >
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                className={
                  project.orientation === "vertical"
                    ? "col-span-1 md:col-span-1 lg:col-span-3" 
                    : "col-span-1 md:col-span-2 lg:col-span-4" 
                }
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              >
                <Link href={`/project/${project.id}`} scroll={false}>
                  <GlassmorphismCard className="h-full group hover:shadow-2xl hover:shadow-blue-900/10">
                    <div className="flex flex-col h-full p-5">
                      {/* Thumbnail */}
                      <div
                           className={`relative overflow-hidden rounded-2xl mb-5 shadow-lg isolation-isolate w-full ${
              project.orientation === "vertical" ? "aspect-[9/16]" : "aspect-video"
            }`}
                           style={{ maskImage: "linear-gradient(white, white)", WebkitMaskImage: "linear-gradient(white, white)" }}
                          >
                        <Image
                          src={`https://img.youtube.com/vi/${project.cover_image}/maxresdefault.jpg`}
                          onError={(e) => {
                          e.currentTarget.srcset = ""; 
                          e.currentTarget.src = `https://img.youtube.com/vi/${project.cover_image}/hqdefault.jpg`;
                          }}
                          alt={project.video_title}
                          width={600}
                          height={338}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] rounded-2xl overflow-hidden z-10">
                          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <Play className="ml-1 fill-white" size={28} />
                          </div>
                        </div>
                        {project.duration && (
                          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm border border-white/10 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                            {project.duration}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                          {project.video_title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                          {project.video_description}
                        </p>

                        <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-white/5 p-1">
                              <Image
                                src={project.client_image || "/placeholder.svg"}
                                alt={project.client_name}
                                width={32}
                                height={32}
                                className="w-full h-full object-contain rounded-full"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-white">{project.client_name}</span>
                              <span className="text-[10px] text-gray-500">{new Date(project.publish_date).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="flex gap-1">
                            {project.category.slice(0, 2).map((cat) => (
                              <Badge key={cat} variant="secondary" className="bg-white/5 hover:bg-white/10 text-gray-400 text-[10px] font-normal border-none">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassmorphismCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More Button for "All" category */}
          {selectedCategory === "All" && hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-20"
            >
              <Button
                onClick={loadMoreProjects}
                disabled={loading}
                size="lg"
                className="bg-white text-black hover:bg-gray-200 rounded-full px-8 h-12 font-medium transition-all hover:scale-105"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Load More Projects
                    <ArrowRight className="ml-2" size={16} />
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* What I Can Do Section */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              What I Bring To The <span className="text-blue-500">Table</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              If you want more than just edits — but storytelling designed to drive engagement and deliver real results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "YouTube Editing",
                description: "Engaging edits crafted for maximum retention and seamless pacing.",
                icon: "🎬",
              },
              {
                title: "Course Content",
                description: "Transforming complex ideas into clear, engaging visual lessons.",
                icon: "📚",
              },
              {
                title: "Motion Graphics",
                description: "Dynamic animations designed to elevate and strengthen your story.",
                icon: "✨",
              },
              {
                title: "Color Grading",
                description: "Cinematic color that transforms good footage into great visuals.",
                icon: "🎨",
              },
              {
                title: "Sound Design",
                description: "Professional sound design that enhances emotion, clarity, and overall viewing experience.",
                icon: "🎼",
              },
              {
                title: "Caption Animation",
                description: "Stylized, animated captions crafted to match tone, pacing, and brand identity.",
                icon: "📝",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                className="h-full"
              >
                <GlassmorphismCard className="p-8 h-full flex flex-col items-center text-center group hover:bg-white/[0.04]">
                  <div className="text-5xl mb-6 bg-white/5 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 border border-white/5">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </GlassmorphismCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}