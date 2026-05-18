import type { Project } from "./project-card";
import { PROJECT_IMAGE_LAYOUTS } from "./project-card-layouts";

export const projects: Project[] = [
  {
    name: "DAOSquare Incubator",
    tags: "web3, blockchain, Venture DAO Infrastructure,collective investing,governance,decentralized fund management",
    // Decentralized Investment & Governance Platform
    description:
      "Corti is a healthcare AI company that builds specialized language models to support medical professionals in real time.",
    image: "/daosquare.png",
    link: "https://app.daosquare.fi",
    link2: "https://www.daosquare.fi",
    color: "hsla(230, 100%, 67%, 1)",
    imageLayout: PROJECT_IMAGE_LAYOUTS[0],
  },
  {
    name: "MuseX",
    tags: "web3, blockchain, creator economy, DAO collaboration, decentralized governance",
    description:
      "MuseX is a Web3 creator and DAO collaboration platform that enables communities to co-create, fund, and manage creative projects through decentralized governance and tokenized participation.",
    image: "/musex.png",
    link: "https://app.musex.io/",
    link2: "https://www.musex.io/",
    color: "#e3f255",
    imageLayout: PROJECT_IMAGE_LAYOUTS[1],
  },
  {
    name: "Palingen",
    tags: "Fintech",
    description: "Option Visualizer.",
    image: "/palingen.png",
    link: "https://palingen.effy.me",
    link2: "https://palingen.effy.me",
    color: "#84DEF9",
    imageLayout: PROJECT_IMAGE_LAYOUTS[4],
  },
  {
    name: "CognitiveView",
    tags: "AI Governance Platform",
    description:
      "AI Governance & Compliance SaaS Platform focused on enterprise AI risk management, audit automation, and regulatory compliance workflows.",
    // Enterprise AI Governance & Compliance Platform (RegTech SaaS)
    image: "/cog.png",
    link: "https://app.cognitiveview.com",
    link2: "https://www.cognitiveview.com",
    color: "#8f5efa",
    imageLayout: PROJECT_IMAGE_LAYOUTS[2],
  },
  {
    name: "css-gradients",
    tags: "Showcase",
    description:
      "A bunch of css-gradient examples.",
    image: "/gradient.png",
    link: "https://css-gradients.effy.me",
    link2: "https://css-gradients.effy.me",
    color: "#ff9a9e",
    imageLayout: PROJECT_IMAGE_LAYOUTS[3],
  },
];
