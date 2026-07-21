import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "../projectsData";
import ProjectDetailClient from "./ProjectDetailClient";

/* ─────────────────────────────────────────────
   STATIC PARAMETERS GENERATOR
   Required for Next.js Build Site Generation
───────────────────────────────────────────── */
export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

/* ─────────────────────────────────────────────
   DYNAMIC METADATA (SEO Best Practices)
───────────────────────────────────────────── */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  
  if (!project) {
    return {
      title: "Project Not Found | BOTMATE",
    };
  }

  return {
    title: `${project.client} Case Study | BOTMATE`,
    description: `Read the case study on how we helped ${project.client} in the ${project.industry} industry achieve ${project.result}.`,
    alternates: {
      canonical: `https://www.botmate.co.in/portfolio/${project.slug}`,
    },
    openGraph: {
      title: `${project.client} Case Study | BOTMATE - Premium AI Agency`,
      description: project.tagline,
      url: `https://www.botmate.co.in/portfolio/${project.slug}`,
    },
  };
}

/* ─────────────────────────────────────────────
   SERVER COMPONENT PAGE
───────────────────────────────────────────── */
export default async function ProjectDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = PROJECTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": `${project.client} Case Study`,
            "description": project.tagline,
            "creator": {
              "@type": "Organization",
              "name": "BotMate"
            }
          }),
        }}
      />
      <ProjectDetailClient project={project} relatedProjects={relatedProjects} />
    </>
  );
}
