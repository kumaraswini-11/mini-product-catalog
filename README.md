# Mini Product Catalog

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&style=for-the-badge)
![ShadCN UI](https://img.shields.io/badge/ShadCN_UI-%F0%9F%92%96-purple?style=for-the-badge)
![Bun](https://img.shields.io/badge/Bun-%F0%9F%A5%9C-lightblue?style=for-the-badge)
![Zustand](https://img.shields.io/badge/Zustand-State_Management-orange?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

A responsive product catalog application built with Next.js 15 and React, featuring product listings, details, filtering, sorting, and analytics.

## Features

- **Product Listing**: Responsive grid layout with product cards
- **Product Details**: Detailed view of individual products
- **Filtering**: Filter products by category
- **Sorting**: Sort products by price (ascending/descending) or title
- **Search**: Search products by title or description
- **Pagination**: Client-side pagination with 10 items per page
- **Cart Functionality**: Add/remove products from cart with quantity control
- **Analytics**: Visual charts showing product distribution by category, price range, and ratings
- **Responsive Design**: Mobile, tablet, and desktop friendly
- **Loading States**: Skeleton loaders for better UX during data fetching
- **Error Handling**: Graceful error handling with user-friendly messages

## Data Fetching Strategy

This application uses a combination of data fetching strategies for optimal performance:

1. **Server-Side Rendering (SSR)** for the product listing page:

   - Initial data is fetched on the server using React Server Components
   - This provides good SEO and initial page load performance
   - Filtering, sorting, and pagination are handled client-side for a responsive UX

2. **Static Site Generation (SSG) with Incremental Static Regeneration (ISR)** for product detail pages:

   - Common product pages are pre-rendered at build time using `generateStaticParams`
   - Less frequently accessed products use ISR with a 1-hour revalidation period
   - This approach provides the best performance while keeping data fresh

3. **Client-Side State Management**:
   - Zustand is used for managing client-side state (filters, sorting, search, cart)
   - This keeps the UI responsive and avoids unnecessary server requests

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mini-product-catalog.git
   cd mini-product-catalog
   ```

2. Install dependencies & un the development server:

   ```bash
   bun install
   bun run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
