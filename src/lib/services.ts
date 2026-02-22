/**
 * SPT Solutions – Service definitions for dropdown, carousel, and dynamic pages
 */
export interface ServiceItem {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  howItWorks: string[];
  benefits: string[];
  useCases: string[];
  icon: string;
}

export const SERVICES: ServiceItem[] = [
  {
    slug: "ai-chatbots",
    name: "AI Chatbots",
    shortDescription: "Conversational AI that understands and assists your customers 24/7.",
    description: "Deploy intelligent chatbots that handle support, sales, and engagement with natural language. Our AI chatbots are trained on your data and integrate with your existing tools.",
    howItWorks: ["We analyze your use case and data", "Custom model fine-tuning or prompt design", "Integration with your channels (web, Slack, etc.)", "Ongoing optimization and monitoring"],
    benefits: ["24/7 availability", "Instant responses", "Scalable support", "Consistent quality"],
    useCases: ["Customer support", "Lead qualification", "FAQ automation", "Internal knowledge base"],
    icon: "MessageCircle",
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    shortDescription: "Automate workflows and decisions with AI-driven pipelines.",
    description: "Replace repetitive tasks and manual decisions with AI automation. From document processing to approval workflows, we build systems that learn and improve.",
    howItWorks: ["Discovery of automatable workflows", "Design of AI agents and pipelines", "Integration with your stack", "Deployment and monitoring"],
    benefits: ["Faster throughput", "Fewer errors", "Lower operational cost", "Audit trails"],
    useCases: ["Document classification", "Data entry automation", "Approval workflows", "Report generation"],
    icon: "Workflow",
  },
  {
    slug: "ai-web-app-development",
    name: "AI Web & App Development",
    shortDescription: "Build web and mobile apps infused with AI capabilities.",
    description: "We develop custom web and mobile applications that leverage AI for personalization, search, recommendations, and intelligent features.",
    howItWorks: ["Requirements and UX discovery", "Architecture and AI feature design", "Agile development with AI components", "Launch and iteration"],
    benefits: ["Differentiated product", "Better UX", "Data-driven features", "Future-proof stack"],
    useCases: ["Personalized dashboards", "Smart search", "Recommendation engines", "AI-powered forms"],
    icon: "Code",
  },
  {
    slug: "ai-image-generation",
    name: "AI Image Generation",
    shortDescription: "Generate and edit images at scale with AI.",
    description: "Create marketing assets, product visuals, and creative content using state-of-the-art image models. We integrate generation into your workflows.",
    howItWorks: ["Define style and brand guidelines", "Model selection and fine-tuning", "API or UI integration", "Quality and safety guardrails"],
    benefits: ["Faster content creation", "Brand consistency", "Cost-effective at scale", "A/B testing visuals"],
    useCases: ["Ad creatives", "Product images", "Social content", "Illustrations"],
    icon: "Image",
  },
  {
    slug: "ai-video-generation",
    name: "AI Video Generation",
    shortDescription: "Produce and edit video content with AI.",
    description: "From short clips to explainers and ads, we use AI to script, generate, and edit video—reducing production time and cost.",
    howItWorks: ["Script and storyboard", "AI generation or editing pipeline", "Review and refinement", "Delivery in your format"],
    benefits: ["Faster production", "Lower cost per video", "Consistent tone", "Easy localization"],
    useCases: ["Product demos", "Social ads", "Training videos", "Personalized video"],
    icon: "Video",
  },
  {
    slug: "ai-voice-speech",
    name: "AI Voice & Speech",
    shortDescription: "Voice interfaces, TTS, and speech analytics.",
    description: "Add voice to your products with text-to-speech, speech-to-text, and conversational voice agents. We build for clarity, low latency, and brand voice.",
    howItWorks: ["Use case and language requirements", "Voice selection or cloning", "Integration (API, IVR, app)", "Testing and tuning"],
    benefits: ["Hands-free UX", "Accessibility", "Multilingual", "Consistent voice"],
    useCases: ["IVR and call centers", "Voice assistants", "Audiobooks and narration", "Real-time transcription"],
    icon: "Mic",
  },
  {
    slug: "ai-data-analytics",
    name: "AI Data Analytics",
    shortDescription: "Turn data into decisions with AI-powered analytics.",
    description: "Go beyond dashboards with predictive models, anomaly detection, and natural language queries over your data.",
    howItWorks: ["Data assessment and pipeline", "Feature engineering and modeling", "Dashboards and NL interface", "Ongoing retraining"],
    benefits: ["Predictive insights", "Anomaly detection", "Ask questions in plain English", "Automated reporting"],
    useCases: ["Forecasting", "Fraud detection", "Churn prediction", "Operational analytics"],
    icon: "BarChart3",
  },
  {
    slug: "ai-marketing",
    name: "AI Marketing",
    shortDescription: "Optimize campaigns and content with AI.",
    description: "Improve ROI with AI-driven targeting, creative optimization, and content generation for your marketing channels.",
    howItWorks: ["Audience and channel analysis", "Model training on your data", "Campaign integration", "Optimization loops"],
    benefits: ["Higher conversion", "Better targeting", "Personalized messaging", "Efficient spend"],
    useCases: ["Ad optimization", "Email personalization", "Landing page variants", "SEO content"],
    icon: "Megaphone",
  },
  {
    slug: "ai-customer-support",
    name: "AI Customer Support",
    shortDescription: "Scale support with AI-powered ticketing and resolution.",
    description: "Combine chatbots, triage, and agent assist to resolve more tickets faster and improve CSAT.",
    howItWorks: ["Support process mapping", "Triage and routing AI", "Bot and agent-assist deployment", "Metrics and tuning"],
    benefits: ["Faster resolution", "Higher CSAT", "Agent productivity", "Proactive support"],
    useCases: ["Ticket routing", "Deflection and self-service", "Agent suggestions", "Sentiment analysis"],
    icon: "Headphones",
  },
  {
    slug: "custom-ai-solutions",
    name: "Custom AI Solutions",
    shortDescription: "Bespoke AI systems for your unique challenges.",
    description: "When off-the-shelf isn’t enough, we design and build custom AI solutions—from RAG systems to proprietary models—tailored to your domain.",
    howItWorks: ["Discovery and feasibility", "Architecture and POC", "Development and integration", "Deployment and support"],
    benefits: ["Competitive advantage", "Full ownership", "Domain-specific accuracy", "Scalable design"],
    useCases: ["Custom RAG", "Proprietary models", "Domain-specific NLP", "Complex decision systems"],
    icon: "Sparkles",
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** Image filename in /images/services/ for hover reveal (slug → filename) */
const SERVICE_IMAGE_MAP: Record<string, string> = {
  "ai-web-app-development": "ai-web-app.jpg",
};
export function getServiceImagePath(slug: string): string {
  const filename = SERVICE_IMAGE_MAP[slug] ?? `${slug}.jpg`;
  return `/images/services/${filename}`;
}
