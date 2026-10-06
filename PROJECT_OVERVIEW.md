# Digital Forestry Information Hub (DFIH) Frontend

## Project Overview
This project is the frontend interface for the **Digital Forestry Information Hub (DFIH)**, built to facilitate access to forestry data, datasets, research, and collaborative networking. 

The application was built entirely using **Next.js 15, React 19, and Tailwind CSS v4**, creating a highly performant and static-ready web application hosted on Cloudflare Pages.

## Design Philosophy & Styling
The core aesthetic of the application relies heavily on modern **Glassmorphism**:
- **Palette**: Deep Sage Green (`#698765`), vibrant Lime accents (`#84cc16`), and warm Cream text (`#f5f0e6`).
- **Glass Effects**: All cards, navigations, and dialogs use a bright, frosted glass style (`bg-white/15 backdrop-blur-xl border-white/20`) that pops elegantly against the dark forest background themes.
- **Hero Video**: The homepage features a continuous, un-tinted green background video (`forest-vid.mp4`) that establishes the environmental theme immediately.
- **Rounded Dashboards**: All inner pages abandon sharp corners in favor of highly rounded (`rounded-3xl`) modern dashboard card layouts.

## Key Features & Pages Built

### 1. Public Facing Pages
- **Homepage (`/`)**: Features the glass-logo, environmental background video, search bar, structured theme cards (Datasets, AI & Imagery, Policy, Climate), and a dynamic gallery of "Moments From The Field".
- **Resources & Search (`/resources`)**: A comprehensive search interface with a frosted glass sidebar for filtering (by category, region, format) and grid results for datasets/articles.
- **Partner Organizations (`/partners`)**: A directory of NGOs, Governments, and Academic institutions contributing to the hub.
- **Submit Resource Wizard (`/submit`)**: A multi-step form guiding users through submitting new forestry datasets.
- **About (`/about`) & Contact (`/contact`)**: Informational pages with integrated interactive forms.

### 2. User Authentication
- **Login (`/login`) & Register (`/register`)**: Standard authentication flows enclosed in heavily stylized frosted glass containers.

### 3. Private Dashboards (Portals)
- **Contributor Dashboard (`/dashboard`)**: Interface for standard users displaying submission statistics, recent uploads, and pending reviews.
- **Reviewer Portal (`/reviewer`)**: Specialized view for moderators to approve, reject, or request changes on submitted forestry datasets.
- **Admin Dashboard (`/admin`)**: A master control panel with sidebar navigation, system health metrics, and user management tables.

## Deployment
This project is configured for seamless deployment to **Cloudflare Pages** using the `@cloudflare/next-on-pages` integration, ensuring fast edge delivery globally.
