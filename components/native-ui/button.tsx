"use client"

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  children: React.ReactNode
}

export function Button({ 
  variant = 'default', 
  size = 'default', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variantClasses = {
    default: "bg-pink-600 text-white hover:bg-pink-700",
    outline: "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100"
  }
  
  const sizeClasses = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-9 px-3 text-sm",
    lg: "h-11 px-8 text-base"
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
} 