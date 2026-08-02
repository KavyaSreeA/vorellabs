"use client";

import { motion } from "framer-motion";
import SmoothScroll from "./SmoothScroll";
import Nav from "./Nav";
import Hero from "./Hero";
import FounderStory from "./FounderStory";
import Timeline from "./Timeline";
import Work from "./Work";
import Interlude from "./Interlude";
import Pipeline from "./Pipeline";
import DeepTech from "./DeepTech";
import Engagement from "./Engagement";
import Founder from "./Founder";
import Contact from "./Contact";
import Footer from "./Footer";

/**
 * The whole website. Mounts only AFTER the loading scene has unmounted, and
 * fades in from black — the Hero (top of the page) is what emerges first.
 */
export default function Homepage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <SmoothScroll />
      <Nav />

      <main className="relative z-10">
        <Hero />
        <FounderStory />
        <Timeline />

        <Interlude lead="Ideas don't scale." emphasis="Execution does." />

        <Work />

        <Interlude lead="Software. AI." emphasis="Research." />

        <Pipeline />
        <DeepTech />
        <Engagement />
        <Founder />
        <Contact />
      </main>

      <Footer className="relative z-10" />
    </motion.div>
  );
}
