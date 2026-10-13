"use client";

import SmoothScroll from "./SmoothScroll";
import Nav from "./Nav";
import Hero from "./Hero";
import FounderStory from "./FounderStory";
import Timeline from "./Timeline";
import Work from "./Work";
import Interlude from "./Interlude";
import Pipeline from "./Pipeline";
import Services from "./Services";
import Engagement from "./Engagement";
import Founder from "./Founder";
import Contact from "./Contact";
import Footer from "./Footer";
import FloatingChat from "./FloatingChat";

/** The whole website — renders straight away, no loading gate. */
export default function Homepage() {
  return (
    <>
      <SmoothScroll />
      <Nav />

      <main className="relative z-10">
        <Hero />
        <FounderStory />
        <Timeline />

        <Interlude lead="Ideas don't scale." emphasis="Execution does." />

        <Work />

        <Interlude lead="Software. AI." emphasis="Research." />

        <Services />
        <Pipeline />
        <Engagement />
        <Founder />
        <Contact />
      </main>

      <Footer className="relative z-10" />
      <FloatingChat />
    </>
  );
}
