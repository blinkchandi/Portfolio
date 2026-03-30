import { Navbar } from "@/src/components/layout/Navbar";
import { Hero } from "@/src/components/sections/Hero";
import { About } from "@/src/components/sections/About";
import { Projects } from "@/src/components/sections/Projects";
import { Services } from "@/src/components/sections/Services";
import { Contact } from "@/src/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Services />
      <Contact />
    </main>
  );
}
