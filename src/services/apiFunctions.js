import { showNotification } from "../components/common/Notification";
import { createApiRequest } from "./apiService";


export const adminApi = {
  auth: {
    sociallogin: createApiRequest("POST", '/user/auth/sociallogin'),
    createvendor: createApiRequest("POST", '/user/auth/createvendor'),
    login: createApiRequest(
      "POST",
      '/admin/login'
    ),
  },
  movies: {
    getPopularMovies: createApiRequest("GET", `/movie/popular?api_key=${import.meta.env.VITE_API_KEY}`),
    getNowPlayingMovies: createApiRequest("GET", `/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}`),
    getUpcomingMovies: createApiRequest("GET", `/movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}`),
    getTopRatedMovies: createApiRequest("GET", `/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}`),

    searchMovies: createApiRequest("GET", `/search/movie?api_key=${import.meta.env.VITE_API_KEY}`),
    getMovieDetails:(id) => createApiRequest("GET", `/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`),
    getMovieVideos:(id) => createApiRequest("GET", `/movie/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}`),
  },



};
export const addUser = ({ user, setIsLoading,onSuccess }) => {
  setIsLoading(true);
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];


  const userExists = existingUsers.some((u) => u.email === user.email);
  if (userExists) {
    showNotification({type:"error",message:"User with this email already exists"});
    setIsLoading(false);
    return;
  }

  existingUsers.push(user);
  localStorage.setItem("users", JSON.stringify(existingUsers));
  showNotification({type:"success",message:"User added successfully"});
  setIsLoading(false);
  onSuccess();
};
export const loginUser = ({ user, setIsLoading, onSuccess }) => {

  setIsLoading(true);
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const matchedUser = users.find(
    (u) => u.email === user.email && u.password === user.password
  );

  if (!matchedUser) {
    showNotification({type:"error",message:"Invalid email or password"});
    setIsLoading(false);
    return;
  }
  setIsLoading(false);
  showNotification({type:"success",message:`Welcome back, ${matchedUser.name}`});
  onSuccess(matchedUser);

};


