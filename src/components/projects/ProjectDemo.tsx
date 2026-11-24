"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { ProjectSlug } from "@/src/lib/projects";
import type { DemoComponentProps } from "@/src/features/projects/demos/types";

function DemoSkeleton() {
  return (
    <div
      role="status"
      aria-label="Chargement de la démo interactive"
      className="h-full p-4 bg-slate-50 space-y-3 animate-pulse"
    >
      <div className="h-8 w-44 rounded-lg bg-slate-200" />
      <div className="grid grid-cols-3 gap-2">
        <div className="h-14 rounded-xl bg-slate-200" />
        <div className="h-14 rounded-xl bg-slate-200" />
        <div className="h-14 rounded-xl bg-slate-200" />
      </div>
      <div className="h-44 rounded-xl bg-slate-200" />
    </div>
  );
}

// Open/Closed Registry: adding a new project demo requires registering a single entry here.
const DEMO_REGISTRY: Record<ProjectSlug, ComponentType<DemoComponentProps>> = {
  immodirect: dynamic(
    () => import("@/src/features/projects/demos/ImmoDirectDemo"),
    { loading: DemoSkeleton }
  ),
  "cleanmanager-erp": dynamic(
    () => import("@/src/features/projects/demos/CleanManagerDemo"),
    { loading: DemoSkeleton }
  ),
  expertticketing: dynamic(
    () => import("@/src/features/projects/demos/ExpertTicketingDemo"),
    { loading: DemoSkeleton }
  ),
  "expertresource-erp": dynamic(
    () => import("@/src/features/projects/demos/ExpertResourceDemo"),
    { loading: DemoSkeleton }
  ),
};

interface ProjectDemoProps {
  slug: ProjectSlug;
  viewport: "desktop" | "mobile";
}

export function ProjectDemo({ slug, viewport }: ProjectDemoProps) {
  const DemoComponent = DEMO_REGISTRY[slug];
  return <DemoComponent mobile={viewport === "mobile"} />;
}
