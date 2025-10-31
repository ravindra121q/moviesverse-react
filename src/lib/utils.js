import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const formatTipsDate = (createdAt, readTime = 2) => {
  const date = new Date(createdAt);
  const day = date.getDate().toString().padStart(2, "0");

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];

  const year = date.getFullYear().toString().slice(-2); // last 2 digits

  return `${readTime} min read • ${day} ${month} ${year}`;

  
};

