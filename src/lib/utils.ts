// src/lib/utils.ts

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Conditionally merge class names (Tailwind + clsx)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Ticket status values and colors
 */
export const STATUS_VALUES = ["open", "in_progress", "closed"] as const
export type Status = typeof STATUS_VALUES[number]

export const STATUS_COLORS: Record<Status, string> = {
  open: "bg-green-500",
  in_progress: "bg-amber-500",
  closed: "bg-gray-500",
}

/**
 * Simple validation helpers for forms
 */
export function validateTitle(title: string): string | true {
  if (!title || title.trim().length === 0) return "Title is required"
  if (title.length < 3) return "Title must be at least 3 characters"
  return true
}

export function validateStatus(status: string): string | true {
  if (!STATUS_VALUES.includes(status as Status)) return "Invalid status"
  return true
}
