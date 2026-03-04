import {
  Award,
  Camera,
  Film,
  Palette,
  Scissors,
  Sparkles,
  Users,
  Volume2,
  Zap,
} from "lucide-react";

export const videoEditingSkills = [
  {
    name: "Adobe Premiere Pro",
    image_link: "/tools/Adobe_Premiere_Pro_CC.png",
    icon: Scissors,
    description:
      "Advanced editing, seamless transitions, color grading, and sound design",
    color: "text-purple-400",
  },
  {
    name: "Adobe After Effects",
    image_link: "/tools/Adobe_After_Effects_CC.png",
    icon: Sparkles,
    description: "Smooth motion graphics, refined visual effects, and dynamic animations",
    color: "text-blue-400",
  },
  {
    name: "Adobe Photoshop",
    image_link: "/tools/Adobe_Photoshop_CC.png",
    icon: Palette,
    description: "Asset creation for animation, graphic design, and image refinement",
    color: "text-cyan-400",
  },
  {
    name: "AI Video Creation",
    image_link: "/tools/aivideogen.png",
    icon: Film,
    description:
      "AI-powered video generation, creative automation, and cinematic storytelling",
    color: "text-orange-400",
  },
  {
    name: "AI Visual Design",
    image_link: "/tools/aivisual.png",
    icon: Volume2,
    description: "AI-powered visual creation, concept development, and dynamic graphic design",
    color: "text-green-400",
  },
];

export const specializations = [
  {
    title: "YouTube Video Editing",
    skills: [
      "Hook-Driven Editing",
      "Story-Driven Editing",
      "Motion Graphics",
      "Complete Sound Design",
    ],
    icon: "🎬",
    description:
      "Expertise in producing compelling YouTube videos that maximize audience retention",
  },
  {
    title: "Social Media Videos",
    skills: [
      "Scroll-Stopping Hooks",
      "Dynamic Captions",
      "Motion Graphics Integration",
      "Fast-Paced Editing",
    ],
    icon: "📱",
    description:
      "Editing short-form videos tailored for Instagram, TikTok, and other platforms",
  },
  {
    title: "Corporate Videos",
    skills: [
      "Professional Presentation",
      "Brand Consistency",
      "Clean Aesthetics",
      "Message Clarity",
    ],
    icon: "🏢",
    description:
      "Delivering high-quality corporate videos that communicate with purpose",
  },
  {
    title: "Educational Content",
    skills: [
      "Screen Recording",
      "Tutorial Structure",
      "Clear Explanations",
      "Interactive Elements",
    ],
    icon: "📚",
    description:
      "Simplifying complex ideas through engaging video content",
  },
  {
    title: "Motion Graphics",
    skills: [
      "2D Animation",
      "Logo Animation",
      "Lower Thirds",
      "Kinetic Typography",
    ],
    icon: "✨",
    description: "Designing engaging animations that elevate visual storytelling",
  },
  {
    title: "Color Grading",
    skills: [
      "Cinematic Looks",
      "Color Matching",
      "Mood Creation",
      "Technical Correction",
    ],
    icon: "🎨",
    description:
      "Cinematic color grading crafted for depth and emotion",
  },
];

export const achievements = [
  {
    title: "50+ Projects Completed",
    description:
      "Delivered 100+ successful video projects across diverse industries",
    icon: Award,
    color: "text-yellow-400",
  },
  {
    title: "Happy Clients",
    description:
      "Built long-term client relationships grounded in trust and results",
    icon: Users,
    color: "text-green-400",
  },
  {
    title: "3+ Years Experience",
    description:
      "Experienced video editor committed to continuous growth and improvement",
    icon: Camera,
    color: "text-blue-400",
  },
  {
    title: "On-Time, Every Time",
    description:
      "Recognized for delivering premium-quality work under tight deadlines",
    icon: Zap,
    color: "text-purple-400",
  },
];

export const workflow = [
  {
    step: "01",
    title: "Project Analysis",
    description:
      "Understanding client requirements, target audience, and project goals",
  },
  {
    step: "02",
    title: "Content Review",
    description:
      "Analyzing raw footage, identifying key moments, and planning the edit",
  },
  {
    step: "03",
    title: "Rough Cut",
    description:
      "Creating initial edit with basic cuts, transitions, and structure",
  },
  {
    step: "04",
    title: "Fine Tuning",
    description:
      "Adding graphics, color grading, audio enhancement, and effects",
  },
  {
    step: "05",
    title: "Client Review",
    description: "Presenting the work for feedback and implementing revisions",
  },
  {
    step: "06",
    title: "Final Delivery",
    description:
      "Exporting in required formats and delivering the completed project",
  },
];
