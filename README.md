# 🏠 PadPair
A trust-first housing and roommate-matching platform built for the Nigerian market. PadPair combines verified-feeling property listings with intelligent, tiered roommate matching — helping users find not just a place to live, but someone compatible to share it with.

---

## 🛠️ Technologies Used

* **React (ES6+):** Component-based UI architecture, declarative state management, and JSX markup.
* **React Router (v7):** Client-side routing with dynamic URL parameters (`useParams`) and programmatic navigation (`useNavigate`).
* **React Context API:** Centralized, app-wide shared state (`createContext`, `useContext`) for listings, user sessions, roommate profiles, and messages — eliminating prop-drilling across unrelated components.
* **Tailwind CSS (v4):** Utility-first CSS framework, with a locked design token system (`@theme`) for brand colors, typography, and spacing, plus reusable component classes via `@layer components`.
* **Vite:** Build tooling and dev server with instant hot-module reload.
* **JavaScript (ES6+):** Immutable array/object operations, higher-order functions (`map`, `filter`, `find`, `some`, `sort`, `reduce`), and the Web Storage API (`localStorage`) for session persistence.

---

## ✨ Features

* **Listings Marketplace:** Browse, search, and filter apartment listings by location, room type, and price range — all combined and live-updating as you type.
* **Listing Detail Pages:** Full property view with image gallery, description, pricing, and landlord contact info, resolved dynamically from the URL.
* **Create Listing:** A full form flow for landlords to publish new listings, which appear instantly across the app via shared state — no reload required.
* **Tiered Roommate Matching:** A three-tier matching algorithm that prioritizes users interested in the *same listing*, then users in the *same location*, and falls back to a computed lifestyle-compatibility score (cleanliness, sleep schedule, social level).
* **Scam Detection:** Listings are automatically flagged as suspicious when priced significantly below the average for their area — computed live, not hardcoded.
* **Simulated Chat:** Threaded conversations between users, grouped dynamically from a flat message log, with a fully responsive mobile view (list ↔ thread navigation).
* **Session Login:** A lightweight login system that persists the active user across page reloads via `localStorage`.
* **Fully Responsive:** Mobile-first design throughout — single-column layouts and compact navigation on mobile, scaling to multi-column grids and expanded navigation on desktop.

---

## 🛠️ Process & Development Story

I built PadPair over a one-week intensive sprint, starting from a full product requirements doc and deliberately scoping it down to a frontend-only build using React and Tailwind — no backend, no database, everything driven by mock data and shared state.

The first real architectural challenge came once multiple pages needed to read *and modify* the same data — a new listing created on one page needed to instantly appear on another, and a user's roommate interests needed to be visible anywhere in the app. Rather than patch around this with local component state, I built a centralized `AppContext` using React's Context API, giving every component access to shared listings, user profiles, and the current session — without manually threading props down through every layer of the component tree.

Roommate matching was the most conceptually demanding feature. Instead of a flat compatibility score, I designed a tiered system: users who expressed interest in the same listing are surfaced first, then users in the same area, with a numeric compatibility score (based on the summed differences across cleanliness, sleep schedule, and social preferences) acting as the tiebreaker within each tier. This meant combining several array methods — `.some()` to detect shared interest, `.sort()` with a layered comparator to order by tier and then score — into one coherent piece of matching logic.

The scam-detection feature works the same way: rather than a static flag baked into the data, a listing's "suspicious" status is computed live, by comparing its price against the average price of every other listing in the same location using `.reduce()`. This meant even listings created fresh through the app's own form get evaluated automatically, with no manual flagging required.

Styling followed a locked design specification defined up front — a fixed color palette, typography hierarchy, and spacing scale — implemented through Tailwind v4's CSS-based theming (`@theme`), with reusable component classes for buttons, inputs, and cards to keep the UI consistent across every page without repeating long utility strings.

---

## 💡 What I Learnt

* **React Context for Shared State:** Learned when and why to lift state above individual pages — `createContext`, building a `Provider` component around `children`, and consuming shared values anywhere in the tree with `useContext`, instead of prop-drilling or duplicating state per component.
* **Immutable State Updates:** Deepened my understanding of why React requires *new* array/object references to detect state changes — using the spread operator (`...`) to add, remove, or update items without mutating the original state directly (critical for `addListing`, `toggleInterest`, and form state updates).
* **Higher-Order Array Methods in Real Scenarios:** Applied `.filter()` and `.map()` for search/filtering, `.find()` for relational lookups between listings, users, and profiles, `.some()` for detecting array overlap in roommate matching, `.sort()` with custom comparator functions for multi-level ordering, and `.reduce()` for aggregate calculations like average pricing.
* **Controlled Forms at Scale:** Went from single-field controlled inputs to a full multi-field form using one state object and computed property names (`[e.target.name]`) to handle every field through a single change handler.
* **Persisting State with localStorage:** Learned to combine lazy `useState` initialization with `useEffect` to read and write session data to `localStorage`, keeping a logged-in user's session alive across page reloads.
* **Dynamic Routing:** Used `useParams()` to read dynamic URL segments and resolve the correct data record, and `useNavigate()` to redirect users programmatically after actions like login or form submission.
* **Component Composition Patterns:** Understood the practical reasoning behind the `children` prop for building reusable layout wrappers (like a page `Container`), separate from data-sharing concerns handled by Context.
* **Designing for Mobile First:** Learned to structure responsive UI — like Chat's list-then-thread mobile navigation — around real constraints rather than just shrinking a desktop layout.

---

## 🚀 How to Run the Project

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Rhodex15/PadPair.git
   ```
2. **Navigate to the Project Folder:**
   ```bash
   cd PadPair
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

Open `http://localhost:5173` (or the port shown in your terminal) in your browser to view the app.

---

## 📸 Preview

*Add a screen recording or screenshots of PadPair here — showing the listings grid, roommate matching, and chat in action.*
