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
- **Cloud sync** — notes are stored in Supabase and accessible from any device via a personal UUID

---

## 2. Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### Supabase setup

Create the notes table in your project's SQL Editor:

```sql
CREATE TABLE notes (
  id TEXT PRIMARY KEY,
  user_uuid UUID NOT NULL,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow by user_uuid" ON notes
  FOR ALL
  USING (user_uuid::text = current_setting('request.headers', true)::json->>'x-user-uuid');
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

### Accessing from another device

Your personal UUID is generated on first launch and stored in the browser's localStorage. Multi-device access via a share link is planned — see Future improvements.

---

## 3. Technical decisions

- **Vue 3 + TypeScript** — component framework with type safety
- **Pinia** — state management; the store is the single source of truth for notes in memory
- **Tiptap** — rich text and table editing, chosen for its Vue 3 integration and extension model
- **Supabase** — PostgreSQL backend with a JavaScript SDK; no custom server needed
- **UUID-based access** — no auth system; a randomly generated UUID stored in localStorage acts as the user identifier and is sent with every request via a custom HTTP header
- **Row Level Security** — Supabase RLS policy checks the `x-user-uuid` header against `user_uuid` in the table, so the anon key alone is not enough to read data

---

## 4. Trade-offs

- **UUID in localStorage vs. proper auth** — chosen for simplicity; the downside is that clearing localStorage means losing the key to your notes (the data stays in the database, but recovery requires copying the UUID manually beforehand)
- **JSONB per note** — each note is stored as a JSONB column rather than individual typed columns; this avoids schema changes when note structure evolves, at the cost of no server-side querying of note fields
- **Optimistic updates** — UI updates immediately, Supabase write happens in the background; errors are silently ignored for now
- **No conflict resolution** — editing the same note from two devices simultaneously will result in one write overwriting the other

---

## 5. Future improvements

### Code
- Error handling for failed Supabase operations
- Loading and saving states in the UI
- Note ordering (drag-and-drop or explicit sort field)

### Structure decisions
- Proper authentication (Supabase Auth) to replace UUID-based access
- Separate typed columns for common note fields (title, type, tags) to enable server-side filtering and search

### UX & interactions
- Tag filtering on the main view
- Search across note content
- Share link that encodes the UUID in the URL, so opening it on another device automatically grants access to your notes
- Pinned notes section at the top
