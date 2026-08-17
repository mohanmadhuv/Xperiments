# Xperiments

Design engineering practice: animations, transitions, and components, built one at a time and posted along the way.

## Structure

- `src/lib/registry.tsx` — every built component gets an entry here (`slug`, `name`, `component`). The sidebar and routes are generated from this list.
- `src/app/[slug]/page.tsx` — renders whichever component the sidebar item points to.
- `src/components/sidebar.tsx` — the left panel listing components.

To add a new one: build the component, add it to `registry.tsx`, done — it shows up in the sidebar and gets its own route automatically.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
