# ⚙️ API Reference

MoviesVerse uses a modular API architecture built around reusable request handlers and TMDB integration.
This document outlines all API endpoints, helper functions, and their purposes.

---

## 🧠 Overview

All API requests are created via a centralized helper function called `createApiRequest()` from
`/src/services/apiService.js`.

It standardizes:
- Request structure
- Loading state handling
- Success and error callbacks
- Integration with notifications

---

## 📦 API Structure

```js
export const adminApi = {
  auth: { ... },
  movies: { ... },
};
```

### Namespaces
| Namespace | Description |
|------------|--------------|
| `auth` | Handles user login and signup (local & social) |
| `movies` | Handles TMDB movie endpoints (popular, top rated, etc.) |

---

## 🔐 Authentication Endpoints

### `adminApi.auth.sociallogin`
```js
createApiRequest("POST", "/user/auth/sociallogin")
```
Handles OAuth-based login (e.g., Google).
Used after a successful Firebase authentication to link the user with your backend.

---

### `adminApi.auth.createvendor`
```js
createApiRequest("POST", "/user/auth/createvendor")
```
Creates a new user (vendor) record in the backend.
Used when registering a new account manually.

---

### `adminApi.auth.login`
```js
createApiRequest("POST", "/admin/login")
```
Authenticates an existing admin via email and password.

---

## 🎥 Movie Endpoints (TMDB)

All movie-related requests use the **TMDB API** base URL:

```
https://api.themoviedb.org/3
```

Your TMDB API key is read from environment variables:
```
VITE_API_KEY
```

---

### 1️⃣ `adminApi.movies.getPopularMovies`
```js
GET /movie/popular?api_key={VITE_API_KEY}
```
Fetches a list of currently popular movies.

---

### 2️⃣ `adminApi.movies.getNowPlayingMovies`
```js
GET /movie/now_playing?api_key={VITE_API_KEY}
```
Fetches movies that are currently playing in theaters.

---

### 3️⃣ `adminApi.movies.getUpcomingMovies`
```js
GET /movie/upcoming?api_key={VITE_API_KEY}
```
Fetches a list of upcoming movies.

---

### 4️⃣ `adminApi.movies.getTopRatedMovies`
```js
GET /movie/top_rated?api_key={VITE_API_KEY}
```
Fetches top-rated movies as per TMDB ratings.

---

### 5️⃣ `adminApi.movies.searchMovies`
```js
GET /search/movie?api_key={VITE_API_KEY}&query={keyword}
```
Searches movies based on a provided keyword.
Used in the dashboard search bar with debounce optimization.

---

### 6️⃣ `adminApi.movies.getMovieDetails`
```js
GET /movie/{id}?api_key={VITE_API_KEY}
```
Fetches detailed information for a single movie (title, genre, overview, rating, etc.).

---

### 7️⃣ `adminApi.movies.getMovieVideos`
```js
GET /movie/{id}/videos?api_key={VITE_API_KEY}
```
Fetches YouTube trailers, teasers, or clips related to a given movie.
Used for the “Play Trailer” modal in the dashboard.

---

## 💾 Local Authentication Logic

In addition to API calls, the app includes **local authentication utilities**
for mock or offline login scenarios using `localStorage`.

---

### 🧩 `addUser()`

```js
export const addUser = ({ user, setIsLoading, onSuccess })
```

#### Description
Adds a new user to localStorage. Prevents duplicate registration using email check.

#### Logic
1. Checks if user already exists in localStorage.
2. If not, adds the user to the list.
3. Displays success or error notification.
4. Triggers `onSuccess()` callback.

#### Example
```js
addUser({
  user: { email: "test@gmail.com", password: "123456", name: "Ravi" },
  setIsLoading,
  onSuccess: () => navigate("/login")
});
```

#### Notifications
- ✅ Success: *"User added successfully"*
- ❌ Error: *"User with this email already exists"*

---

### 🔐 `loginUser()`

```js
export const loginUser = ({ user, setIsLoading, onSuccess })
```

#### Description
Performs local login by verifying credentials stored in localStorage.

#### Logic
1. Reads all stored users from `localStorage`.
2. Matches user credentials.
3. Displays appropriate notification.
4. Triggers `onSuccess(user)` with matched user data.

#### Example
```js
loginUser({
  user: { email: "test@gmail.com", password: "123456" },
  setIsLoading,
  // onSuccess: (data) => console.log("Logged in user:", data)
});
```

#### Notifications
- ✅ Success: *"Welcome back, {user.name}"*
- ❌ Error: *"Invalid email or password"*

---

## 🔔 Notifications

All success/error feedback is handled using:
```js
import { showNotification } from "../components/common/Notification";
```

This utility displays visual alerts throughout the app.

---

## 🔑 Environment Variables

Below are required API keys and configuration for requests to work properly:

```
VITE_BASE_URL=https://api.themoviedb.org/3
VITE_API_KEY=your_tmdb_api_key
VITE_API_TOKEN=your_tmdb_api_token

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

---

## 🧱 Example Usage

### Fetching Popular Movies
```js
adminApi.movies.getPopularMovies({
  setIsLoading,
  onSuccess: (data) => setMovies(data.results),
  onError: (err) => console.error(err),
});
```

### Fetching a Movie’s Trailer
```js
adminApi.movies.getMovieVideos(movieId)({
  onSuccess: (data) => openTrailerModal(data.results[0]),
});
```

### Adding a User
```js
addUser({
  user: { name: "Ravi", email: "test@gmail.com", password: "123456" },
  setIsLoading,
  onSuccess: () => navigate("/movies"),
});
```

---

## 🧾 Notes
- The **TMDB API** requires a valid `api_key` or `Bearer token`.
- API requests are automatically handled through `createApiRequest` to ensure consistent structure.
- **Notifications** are displayed using the notification component for better UX feedback.

---

