# Listing image storage

The marketplace MVP expects a public Supabase Storage bucket named `listing-images`.

The migration `003_marketplace_listings.sql` creates or updates that bucket. The later migration `004_auth_profiles_and_listing_ownership.sql` replaces anonymous uploads with authenticated user-folder uploads. If you manage storage manually in the Supabase dashboard, mirror these settings:

- Bucket name: `listing-images`
- Public bucket: enabled
- File size limit: 5 MB
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`
- Authenticated users can upload objects under their own user-id folder
- Anonymous users can read objects from this bucket

Before production, add moderation and image scanning if listing uploads become high volume.
