// src/data/heroData.js
import {
  Compass,
  Users,
  MessageSquare,
  Map,
  ArrowRight,
  Code,
  Brain,
  Target,
} from "lucide-react";

export const features = [
  {
    icon: <Compass />,
    title: "Interactive Roadmaps",
    description: "Follow structured learning paths curated by experts",
  },
  {
    icon: <Users />,
    title: "Community Driven",
    description: "Learn and grow with fellow developers",
  },
  {
    icon: <MessageSquare />,
    title: "Discussion Forums",
    description: "Get help and share knowledge with others",
  },
  {
    icon: <Brain />,
    title: "AI Assisted",
    description: "Personalized learning recommendations",
  },
  {
    icon: <Code />,
    title: "Project-Based Learning",
    description: "Build real-world projects as you progress",
  },
  {
    icon: <ArrowRight />,
    title: "Updated Content",
    description: "Stay ahead with frequently updated material",
  },
];

export const roadmaps = [
  {
    icon: <Code />,
    title: "Web Development",
    description: "Frontend, Backend, and Full‑Stack paths",
  },
  {
    icon: <Target />,
    title: "DevOps",
    description: "Master CI/CD and infrastructure management",
  },
  {
    icon: <Map />,
    title: "Data Science",
    description: "Data analysis, ML models, and visualization",
  },
];

export const testimonials = [
  {
    name: "Alice Johnson",
    title: "Frontend Developer @ Shopify",
    feedback:
      "This platform helped me transition from beginner to job-ready with clear and structured roadmaps.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Lee",
    title: "DevOps Engineer @ AWS",
    feedback:
      "The DevOps roadmap and community support made learning fun and very practical.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Sara Patel",
    title: "AI/ML Researcher",
    feedback:
      "I loved the AI-assisted learning experience. It actually tailored recommendations to my pace.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];
