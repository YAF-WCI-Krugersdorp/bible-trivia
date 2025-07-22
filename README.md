
# Bible Trivia App

This is a Bible Trivia web application built with [Next.js](https://nextjs.org). The current version provides a login and signup page where users can:

- Create an account by choosing a unique username/nickname and selecting their gender.
- Login using their username.
- User data is securely stored in Firebase Firestore.

## Getting Started

Run the development server:

```bash
npm run dev
# or

# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Features
- Login and signup form (see `src/app/page.tsx`)
- Firebase Firestore integration for user data

### Next Steps
- Add trivia questions and gameplay
- Add authentication and user sessions

## Housekeeping

- The following sections from the default README are not currently relevant and can be deleted:
  - `next/font` usage (not used in this project)
  - Links to Next.js tutorials and deployment documentation (keep only if you want general Next.js info)

## Project Structure
- Main page: `src/app/page.tsx`
- Firebase config: `src/firebase.js`
- Environment variables: `.env.local` (not committed to git)

## Security
- Firebase credentials are stored in `.env.local` and are not tracked by git (see `.gitignore`).

---
Feel free to update this README as new features are added!
