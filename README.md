# Cheat Sheet Manager

A personal notes app for storing and organizing reference material — code snippets, tables, and images — accessible from any device.

**Live:** https://narangi-design.github.io/cheat-sheet-manager/

---

## 1. Features

- **Three note types** — rich text, table, and image
- **Rich text editing** — bold, italic, code blocks, blockquotes, links (Mod+K)
- **Table editor** — up to 4 columns, header row, keyboard navigation
- **Tags** — autocomplete from existing tags; canonical form preserved from first use; tag is removed when no notes reference it
- **Pinned notes**
- **Responsive masonry layout** — column count adapts to viewport width
- **Authentication** — sign in with email/password or OAuth (Google); account settings for email and password updates
- **Cloud sync** — notes are stored in Supabase and accessible from any device after signing in

---

## 2. Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project with Auth enabled

### Supabase setup

Create the notes table in your project's SQL Editor:

```sql
CREATE TABLE notes (
  id TEXT PRIMARY KEY,
  user_uuid UUID NOT NULL,
  type TEXT,
  title TEXT,
  tags TEXT[] DEFAULT '{}',
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow by user_uuid" ON notes
  FOR ALL
  USING (user_uuid = auth.uid());
```

### Local setup

```bash
git clone <repo-url>
cd cheat-sheet-manager
npm install
```

Create `.env.local` in the project root:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_...
```

```bash
npm run dev
```

---

## 3. Technical decisions

- **Vue 3 + TypeScript** — component framework with type safety
- **Pinia** — state management; the store is the single source of truth for notes in memory
- **Tiptap** — rich text and table editing, chosen for its Vue 3 integration and extension model
- **Supabase** — PostgreSQL backend with Auth and Storage; no custom server needed
- **Supabase Auth** — email/password and OAuth sign-in; RLS policies use `auth.uid()` to scope data per user
- **Typed columns** — `title`, `type`, and `tags` are stored as dedicated columns alongside the full `data` JSONB, enabling server-side filtering in the future

---

## 4. Trade-offs

- **Optimistic updates** — UI updates immediately, Supabase write happens in the background; errors are silently ignored for now
- **No conflict resolution** — editing the same note from two devices simultaneously will result in one write overwriting the other

---

## 5. Future improvements

### Code
- Error handling for failed Supabase operations
- Loading and saving states in the UI
- Note ordering (drag-and-drop or explicit sort field)

### Structure decisions
- Server-side filtering and search using the typed columns

### UX & interactions
- Tag filtering on the main view
- Search across note content
- Drag-and-drop and paste image upload in the image note editor
- Pinned notes section at the top
