# Listing image storage

The marketplace MVP expects a public Supabase Storage bucket named `listing-images`.

The migration `003_marketplace_listings.sql` creates or updates that bucket and adds anonymous upload/read policies for MVP testing. If you manage storage manually in the Supabase dashboard, mirror these settings:

- Bucket name: `listing-images`
- Public bucket: enabled
- File size limit: 5 MB
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`
- Anonymous users can upload objects to this bucket
- Anonymous users can read objects from this bucket

This is intentionally permissive for the no-auth MVP. Before production, replace anonymous uploads with authenticated seller ownership and moderation rules.
