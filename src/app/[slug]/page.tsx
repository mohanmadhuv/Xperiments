import { Fragment } from "react";
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
      <div className="flex flex-1 justify-center px-8 pt-[120px] pb-[120px]">
        <div className="flex max-w-[720px] flex-col gap-[32px]">
          <div className="flex flex-col gap-[16px]">
            <h1 className="font-medium text-foreground">{project.title}</h1>
          </div>
          <div className="flex flex-col gap-[16px]">
            <p className="text-muted-foreground">{project.description}</p>
            <div className="mb-[16px] flex flex-col">
              <div className="relative flex min-h-[480px] items-center justify-center rounded-lg border bg-panel">
                {ProjectComponent && <ProjectComponent />}
              </div>
              {project.caption && (
                <p className="mt-[16px] text-center text-muted-foreground">{project.caption}</p>
              )}
            </div>
            {project.sections?.map((section) => (
              <Fragment key={section.heading}>
                <h2 className="mt-[-16px] pt-[32px] font-medium text-foreground">
                  {section.heading}
                </h2>
                <p className="text-muted-foreground">{section.body}</p>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }

  notFound();
}
