import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Connect } from "@/components/Connect";
import { LoadingScreen } from "@/components/LoadingScreen";

export const Route = createFileRoute("/")(
  {
    head: () => ({
      meta: [
        { title: "Aditya Tomar — Upcoming Developer" },
        { name: "description", content: "Portfolio of Aditya Pratap Singh Tomar — CS student building scalable web platforms and AI-powered automation tools." },
        { property: "og:title", content: "Aditya Tomar — Upcoming Developer" },
        { property: "og:description", content: "Upcoming Developer crafting scalable web platforms and AI-powered tools." },
      ],
    }),
    component: Index,
  }
);

function Index() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <main
        className="min-h-screen bg-background text-foreground"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}
      >
        <Navbar name="Aditya" />
        <Hero name="Aditya" role="Upcoming Developer" />
        <Skills />
        <Projects />
        <Experience />
        <Connect />
      </main>
    </>
  );
}