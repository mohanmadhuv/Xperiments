export function WorkArea({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-w-0 flex-1 flex-col overflow-y-auto bg-canvas text-foreground">
      {children}
    </main>
  );
}
