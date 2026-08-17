import { notFound } from "next/navigation";
import { components, getComponent } from "@/lib/registry";

export function generateStaticParams() {
  return components.map((entry) => ({ slug: entry.slug }));
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getComponent(slug);

  if (!entry) {
    notFound();
  }

  const Component = entry.component;

  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <Component />
    </div>
  );
}
