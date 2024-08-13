import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS classes with clsx classes
 * @param inputs - Tailwind CSS classes and/or clsx classes
 * @returns - Merged classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
