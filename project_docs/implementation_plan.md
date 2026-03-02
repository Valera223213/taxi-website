# SEO Route Pages Implementation Plan

**Goal**: Create dedicated, SEO-optimized landing pages for individual taxi routes (e.g., Simferopol - Yalta) based on the provided competitor reference, and update the main routes list page.

## Proposed Changes

### [NEW] `src/data/routesData.js`
- Create a centralized data file containing all specific route information.
- Each route will have: `id`, `slug` (e.g., `simferopol-yalta`), `title`, `description` (SEO text), `distance`, `time`, `image`, and a `prices` object for different car classes (Economy, Standard, Comfort, Business, Minivan).

### [MODIFY] `src/App.jsx`
- Import `RouteDetailPage` and set up dynamic routing: `<Route path="/routes/:slug" element={<RouteDetailPage />} />`.

### [DELETE] `src/pages/RoutesPreview.jsx` (If applicable later)
- The user might want to phase this out, but keeping for now.

***

# Admin Panel & Dynamic Routes (Backend Integration)

**Goal**: Transition from a static `routesData.js` file to a fully dynamic database, allowing an administrator to create, edit, and publish new taxi routes and upload cover images via a protected Admin Panel.

## Proposed Architecture
- **Backend as a Service (BaaS)**: **Supabase** (or Firebase). Supabase provides a PostgreSQL database, an Authentication module, and a Storage bucket for image uploads out-of-the-box, without needing to host a separate Node.js server.
- **Frontend Integration**: Use the `@supabase/supabase-js` client in our React/Vite app to interact with the database.

## Proposed Changes

### [NEW] Component: Admin Panel (`src/pages/AdminPage.jsx`)
- **Authentication**: A login screen restricted to the administrator credentials.
- **Dashboard**: A list of all current routes with "Edit" and "Delete" actions.
- **Route Editor Form**: A comprehensive form containing exactly these 5 fields (as requested):
  1. **Название маршрута** (Route Title, e.g., "Симферополь - Ялта");
  2. **SEO текст (Описание маршрута)** (Primary SEO Text);
  3. **Цены по классам авто** (Prices for Economy, Standard, Comfort, Business, Minivan);
  4. **Дополнительный SEO текст** ("Как заказать и что включено" - rendered below the phone number);
  5. **Изображение маршрута** (Image Upload - saved to Supabase Storage).

### [MODIFY] Data Fetching in UI (`src/pages/RoutesPage.jsx`, `src/pages/RouteDetailPage.jsx`)
- Replace the static `routesData` imports with asynchronous `useEffect` calls that fetch the published routes directly from the Supabase database.
- Add loading states (spinners/skeletons) while data is being fetched.

## User Review Required
> [!IMPORTANT]
> To proceed with a dynamic admin panel for a hired worker to upload images and create routes daily, we need a backend database and storage. **Supabase** is highly recommended for this React stack—it's free, secure, and provides exactly what we need (Database + Auth + Image Storage). 
> 
> My plan is to set up a Supabase project, integrate it into the app, build a secure `/admin` page, and connect the frontend to read from this live database instead of the static file.
>
> **Do you approve using Supabase for this backend, or do you have another preference (like Firebase)? If you approve, I will walk you through creating the free Supabase project to get your keys.**

### [MODIFY] `src/pages/RoutesPage.jsx`
- Replace hardcoded dummy data with imports from `routesData.js`.
- Redesign the route cards to match the competitor screenshot:
  - Full-cover image of the destination with taxi car overlays (if possible via CSS/images or just use high-quality city images).
  - Clean white card background below the image.
  - Title and "Nizkiye Ceny" / "Nadezhno" microcopy.
- Wrap cards in `react-router-dom` `<Link>` tags pointing to `/routes/${route.slug}`.

### [NEW] `src/pages/RouteDetailPage.jsx`
- **Breadcrumbs**: `Главная / Маршруты / [Название маршрута]`
- **Header Section**: H1 Title (e.g., "Такси Симферополь - Ялта").
- **SEO Text Block**: Dynamically populating paragraphs about the route (distance, time, border crossing details if applicable, benefits).
- **Pricing Grid**: 5 interconnected price cards (Economy, Standard, Comfort, Business, Minivan) similar to the competitor's blue/white layout, displaying the exact price for that specific route.
- **Booking Form**: Integrate the existing `CtaForm.jsx` at the bottom of the page.
- **Why Us / Guarantees Block**: A static grid of 4-6 blocks highlighting "Fixed Price", "Clean Cars", "Free Waiting", etc.

***

# Light Theme Implementation Plan (Completed Concept)
The user requested changing the entire website from the current dark theme to a light theme. This will involve comprehensive updates to Tailwind configuration, global styles, and component-level aesthetic choices.

## Proposed Changes

### [MODIFY] `tailwind.config.js`
- Overhaul the `primary` and `surface` color variables. Instead of slate-900/800, we'll shift them to light variants (e.g., slate-50/100 or pure white).
- Ensure the `accent` (amber/yellow) colors still provide adequate contrast, adjusting if necessary.

### [MODIFY] `src/App.jsx`
- Change global background from `bg-primary-dark` to a light background (`bg-slate-50`).
- Change global text default from `text-slate-200` to a dark gray (`text-slate-800`).

### [MODIFY] `src/components/Header.jsx`
- Replace dark backgrounds in the top bar with light equivalents (e.g., white or slate-100).
- Update text colors to dark (slate-800/900).
- Ensure the logo SVG and text adapt seamlessly to the light header.

### [MODIFY] `src/components/Hero.jsx`
- Adjust the background overlay on the hero image (currently a dark gradient) to perhaps a lighter, brighter gradient or adjust opacity to maintain text legibility.
- Convert white text to dark text where appropriate, or ensure it stands out against the background image.
- **Glassmorphism Form:** Transition from a dark tinted glass to a light, frosted glass effect (e.g., `bg-white/70`, `border-white/50`, dark input fields/text).

### [MODIFY] `src/components/Trust.jsx` & `src/components/RoutesPreview.jsx`
- Convert card backgrounds from dark surface to white (`bg-white`).
- Adjust drop shadows to be more prominent on a light background (e.g., `shadow-md` or `shadow-lg`).
- Update icon backgrounds and text colors to match the light theme.

### [MODIFY] `src/components/Services.jsx` (Fleet)
- Update the carousel card styling. Cards will likely become white (`bg-white`) with dark text, retaining the yellow accents.
- Update the spec footer backgrounds inside the cards to a light gray (`bg-slate-50`).

### [MODIFY] `src/components/Masters.jsx` & `src/components/Reviews.jsx`
- Similar to above, swap dark surface backgrounds for white or very light gray sections, ensuring high readability of text and reviews.

### [MODIFY] `src/components/CtaForm.jsx`
- This is currently styled as a dark block (`bg-[#0a0f1d]`). We will update this to a corresponding light design (e.g., a pure white or soft slate-100 block) with standard dark inputs, preserving the accent button.

## Verification Plan
1. Start the Vite dev server.
2. Review all pages and sections (Home, Routes, Header, Footer) to ensure no dark-theme fragments remain and contrast is excellent across both desktop and mobile views.
3. Validate that forms and inputs maintain their styling and hover/focus states in the modern light theme context.
