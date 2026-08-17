import type { ComponentType } from "react";

export type ComponentEntry = {
  slug: string;
  name: string;
  component: ComponentType;
};

// Add an entry here each time a new component is built.
// The sidebar and routing pick it up automatically.
export const components: ComponentEntry[] = [];

export function getComponent(slug: string) {
  return components.find((entry) => entry.slug === slug);
}
