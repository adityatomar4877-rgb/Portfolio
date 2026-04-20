import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Connect } from "@/components/Connect";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aditya Tomar — Full Stack Developer" },
      { name: "description", content: "Portfolio of Aditya Pratap Singh Tomar — CS student building scalable web platforms and AI-powered automation tools." },
      { property: "og:title", content: "Aditya Tomar — Full Stack Developer" },
      { property: "og:description", content: "Full Stack Developer crafting scalable web platforms and AI-powered tools." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar name="Aditya" />
      <Hero name="Aditya" role="Full Stack Developer" />
      <Skills />
      <Projects />
      <Experience />
      <Connect />
    </main>
  );
}