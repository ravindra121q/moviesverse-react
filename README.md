# 🎬 Movies Verse – Modern Movie

A responsive, high-performance movie  web application built with **React (Vite)**, **Tailwind CSS**, and **Firebase Authentication**, powered by **The Movie Database (TMDB)** API.

This project replicates a IMDB-like experience — allowing users to explore movies, view details and trailers, manage favourites, and toggle between light/dark themes.

📘 **Read Full Documentation:**
👉 [https://moviesverse-docs.vercel.app/#/](https://moviesverse-docs.vercel.app/#/)

---

## 🚀 Features

### 🔐 Authentication
- Firebase **Google Authentication**
- Email/password login and registration
- Persistent session via `localStorage`

### 🎥 Movie Management
- View categories: **Popular**, **Now Playing**, **Upcoming**, **Top Rated**
- **Search movies** by keyword (debounced)
- **Add/remove favourites** (stored locally)
- **View trailers** (YouTube embeds)
- Responsive **pagination**

### 🎨 UI/UX
- Built with **Tailwind CSS**
- **Dark & Light themes** with persistent theme state
- Fully responsive (mobile-first)
- Reusable, modular components
- Accessible focus states and hover transitions

### ⚙️ Technical Highlights
- React Hooks + Context API
- Optimized re-renders using `useCallback`, `useMemo`, and `useDebounce`
- Local storage persistence for favourites and theme
- Clean folder structure and reusable logic patterns
- Hosted on **Vercel** (can also be deployed to Firebase Hosting)

---

## 🛠️ Tech Stack

| Layer | Technology |
|:------|:------------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Authentication | Firebase Auth (Google + Email/Password) |
| API | TMDB (The Movie Database) |
| State Management | React Context API |
| Hosting | Vercel |
| Dev Tools | ESLint, Prettier |

---

## 🧩 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI elements (SearchBar, PaginationBar, etc.)
│   ├── movies/          # Movie-specific components (MovieCard, TrailerModal, etc.)
│
├── context/
│   └── AuthContext.jsx  # Manages user auth + theme
│
├── hooks/
│   └── useDebounce.js   # Debounced search handler
│
├── pages/
│   └── Dashboard.jsx    # Core movie listing + trailer modal
│   └── Auth/            # Login / Register views
│
├── services/
│   └── apiFunctions.js  # Centralized TMDB API logic
│
├── assets/              # Icons, images, etc.
└── main.jsx             # App root + providers
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ravindra121q/moviesverse-react.git
cd moviesverse-react
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root:
```
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

> 🔑 You can get your TMDB API key from [https://www.themoviedb.org/](https://www.themoviedb.org/)
> and Firebase credentials from your [Firebase Console](https://console.firebase.google.com/).

### 4️⃣ Run the App
```bash
npm run dev
```

### 5️⃣ Build for Production
```bash
npm run build
```

### 6️⃣ Preview Production Build
```bash
npm run preview
```

---

## 🌈 Theming

- Default theme: **Light**
- User can toggle to **Dark mode**
- Theme persists across sessions using `localStorage`
- Tailwind config uses `darkMode: 'class'`

---

## 🧠 Code Quality & Best Practices

- Followed **clean code principles**
- All UI elements are **modular and reusable**
- **Single-responsibility** component design
- **Error and loading states** handled gracefully
- **Debounced input** for optimized search
- **Local storage persistence** for theme, favourites, and auth

---

## 🧪 Optional Enhancements Implemented

✅ Dark/Light Mode
✅ Google Auth via Firebase
✅ Responsive layout
✅ Optimized rendering and API calls
✅ Local storage for persistent favourites
✅ Trailer playback via TMDB video API

---

## 🌍 Deployment

Deployed on **Vercel**
👉 [https://movieverse-demo.vercel.app](https://movieverse-demo.vercel.app)

To deploy yourself:
```bash
npm run build
# then drag the 'dist' folder into Vercel or deploy via CLI
```

Or via Firebase:
```bash
firebase deploy
```

---

## 📈 Future Improvements

- Integrate **Firebase Firestore** for persistent favourites
- Add **Analytics (Firebase Analytics)** 
- Convert to **PWA** or **Electron** for desktop experience

---

## 👨‍💻 Author

**Ravindra**
Frontend React.js Developer
💼 Focus: Scalable, performant, and user-friendly web applications
🔗 [LinkedIn](https://www.linkedin.com/in/ravindra-react-developer/) | [GitHub](https://github.com/ravindra121q)

---

## 📝 License

This project is licensed under the **MIT License** — feel free to fork, improve, and use responsibly.
