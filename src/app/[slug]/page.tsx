import { notFound } from "next/navigation";
import { components, getComponent } from "@/lib/registry";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return [
    ...components.map((entry) => ({ slug: entry.slug })),
    ...projects.map((entry) => ({ slug: entry.slug })),
  ];
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const component = getComponent(slug);
  if (component) {
    const Component = component.component;
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <Component />
      </div>
    );
  }

  const project = getProject(slug);
  if (project) {
    const ProjectComponent = project.component;
    return (
      <div className="flex flex-1 justify-center px-8 pt-32">
        <div className="max-w-[720px]">
          <h1 className="font-medium text-foreground">{project.title}</h1>
          <p className="mt-4 text-muted-foreground">{project.description}</p>
          <div className="mt-4 flex min-h-[480px] items-center justify-center rounded-lg border bg-panel">
            {ProjectComponent && <ProjectComponent />}
          </div>
          {project.caption && (
            <p className="mt-4 text-center text-muted-foreground">{project.caption}</p>
          )}
          {project.sections?.map((section) => (
            <div key={section.heading} className="mt-4">
              <h2 className="font-medium text-foreground">{section.heading}</h2>
              <p className="mt-4 text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  notFound();
}
