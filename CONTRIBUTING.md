# Contributing

## Workflow

Work on `marketplace-mvp` for marketplace features. Do not commit marketplace work to `main`.

Before each commit:

```bash
npm run lint
npm run build
```

## Code Standards

- Keep features small and server-validated.
- Prefer Server Actions for mutations.
- Never trust client input.
- Add database changes as migrations only.
- Keep UI consistent with the landing page brand colours and typography.

## Security

Every new table must enable RLS before use. Every protected mutation must verify the current user on the server.
