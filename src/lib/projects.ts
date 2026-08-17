import type { ComponentType } from "react";

export type ProjectSection = {
  heading: string;
  body: string;
};

export type ProjectEntry = {
  slug: string;
  name: string;
  title: string;
  description: string;
  // The demo(s) for this project render inside the project's preview block.
  component?: ComponentType;
  // Shown centered beneath the preview block.
  caption?: string;
  // Additional heading + body blocks rendered below the preview.
  sections?: ProjectSection[];
};

// Add an entry here each time a new project case study is built.
// The sidebar and routing pick it up automatically.
export const projects: ProjectEntry[] = [
  {
    slug: "buttons-on-surfaces",
    name: "Buttons on surfaces",
    title: "Buttons on surfaces",
    description:
      "A button's core job never changes, but its feedback has to. Hover, press, and focus states need to stay legible whether the button sits on a flat card, a colored panel, or a translucent overlay. This set explores how the same interaction language holds up — and bends — across those surfaces.",
    caption: "Primary and secondary variants across light, dark, and colored surfaces.",
    sections: [
      {
        heading: "Consistent feedback, different backdrops",
        body: "Each variant carries the same hover, press, and focus treatment, but the surface underneath changes how that feedback reads. A light card can lean on shadow and elevation, while a colored panel needs a shift in overlay opacity to stay visible. Testing them side by side surfaced where the shared language needed to flex.",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((entry) => entry.slug === slug);
}
