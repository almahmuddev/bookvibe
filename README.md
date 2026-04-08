# 📚 BookVibe — Modern Book Store UI

A full-featured, dark-themed book store web application built with **React 18**, **Vite**, and **Tailwind CSS**. Designed from a custom Figma file, BookVibe includes everything from a browsable catalog and book detail pages to a shopping cart, wishlist, and an analytics dashboard.


---

## ✨ Features

- 🏠 **Home Page** — Hero section with featured book, platform stats, trending grid, and top-rated shelf
- 🔍 **Browse Page** — Search by title/author, filter by genre, sort by price/rating, and toggle between grid and list view
- 📖 **Book Detail Page** — Full cover display, tabbed content (Description / Reviews / Details), quantity selector, wishlist toggle, and related books
- 🛒 **Cart** — Add/remove items, quantity controls, coupon code support (`BOOKVIBE10`), order summary, and checkout success screen
- ❤️ **Wishlist** — Save books for later, persisted in global state
- 📊 **Dashboard** — Analytics with KPI cards, monthly revenue line chart, sales bar chart, genre pie chart, and a top-selling books table
- 🖼️ **Smart Image Fallback** — Missing book covers automatically display a styled placeholder — no broken images ever

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router DOM 6 |
| Charts | Recharts 2 |

---

## 📁 Project Structure

```
book-vibe/
├── public/
│   └── books/              # Book cover images + placeholder.svg
├── src/
│   ├── components/
│   │   ├── Badge.jsx        # Genre/status badge pill
│   │   ├── BookCard.jsx     # Grid and list card variants
│   │   ├── CartDrawer.jsx   # Slide-over cart panel
│   │   ├── Navbar.jsx       # Top navigation bar
│   │   └── StarRating.jsx   # Star rating display
│   ├── context/
│   │   └── CartContext.jsx  # Global cart + wishlist state
│   ├── data/
│   │   └── books.js         # Book catalog + chart data
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Browse.jsx
│   │   ├── BookDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Wishlist.jsx
│   │   └── Dashboard.jsx
│   ├── App.jsx              # Routes + layout
│   ├── main.jsx
│   └── index.css            # Tailwind directives + custom utilities
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---



## 📄 License

This project is open developed by Mahmud Khan

---

<p align="center">Built with ❤️ using React + Vite + Tailwind CSS</p>
