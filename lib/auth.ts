import type { User, AuthResponse, LoginFormData, RegisterFormData } from './types'
import { users as mockUsers, getUserByEmail } from './data'

const AUTH_STORAGE_KEY = 'propconnect_auth'
const USERS_STORAGE_KEY = 'propconnect_users'

// Initialize localStorage with mock users if not exists
function initializeUsers(): User[] {
  if (typeof window === 'undefined') return mockUsers
  
  const stored = localStorage.getItem(USERS_STORAGE_KEY)
  if (!stored) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(mockUsers))
    return mockUsers
  }
  return JSON.parse(stored)
}

// Get all users from localStorage
function getUsers(): User[] {
  if (typeof window === 'undefined') return mockUsers
  return initializeUsers()
}

// Save users to localStorage
function saveUsers(users: User[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

// Get current authenticated user from localStorage
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  
  const stored = localStorage.getItem(AUTH_STORAGE_KEY)
  if (!stored) return null
  
  try {
    const user = JSON.parse(stored) as User
    // Refresh user data from storage
    const users = getUsers()
    const freshUser = users.find((u) => u.id === user.id)
    return freshUser || null
  } catch {
    return null
  }
}

// Save authenticated user to localStorage
function setCurrentUser(user: User | null): void {
  if (typeof window === 'undefined') return
  
  if (user) {
    // Don't store password in session
    const { password, ...userWithoutPassword } = user
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userWithoutPassword))
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }
}

// Login function
export async function login(data: LoginFormData): Promise<AuthResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  const users = getUsers()
  const user = users.find((u) => u.email === data.email)
  
  if (!user) {
    return { success: false, error: 'No account found with this email' }
  }
  
  if (user.password !== data.password) {
    return { success: false, error: 'Incorrect password' }
  }
  
  setCurrentUser(user)
  
  // Return user without password
  const { password, ...userWithoutPassword } = user
  return { success: true, user: userWithoutPassword as User }
}

// Register function
export async function register(data: RegisterFormData): Promise<AuthResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  const users = getUsers()
  
  // Check if email already exists
  if (users.find((u) => u.email === data.email)) {
    return { success: false, error: 'An account with this email already exists' }
  }
  
  // Create new user
  const newUser: User = {
    id: `user-${Date.now()}`,
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
    favorites: [],
    listings: [],
    createdAt: new Date().toISOString(),
  }
  
  // Save to storage
  users.push(newUser)
  saveUsers(users)
  setCurrentUser(newUser)
  
  // Return user without password
  const { password, ...userWithoutPassword } = newUser
  return { success: true, user: userWithoutPassword as User }
}

// Logout function
export function logout(): void {
  setCurrentUser(null)
}

// Update user function
export async function updateUser(userId: string, updates: Partial<User>): Promise<AuthResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  
  const users = getUsers()
  const userIndex = users.findIndex((u) => u.id === userId)
  
  if (userIndex === -1) {
    return { success: false, error: 'User not found' }
  }
  
  // Update user
  users[userIndex] = { ...users[userIndex], ...updates }
  saveUsers(users)
  
  // Update session if it's the current user
  const currentUser = getCurrentUser()
  if (currentUser && currentUser.id === userId) {
    setCurrentUser(users[userIndex])
  }
  
  const { password, ...userWithoutPassword } = users[userIndex]
  return { success: true, user: userWithoutPassword as User }
}

// Add to favorites
export async function addToFavorites(userId: string, propertyId: string): Promise<AuthResponse> {
  const users = getUsers()
  const user = users.find((u) => u.id === userId)
  
  if (!user) {
    return { success: false, error: 'User not found' }
  }
  
  if (!user.favorites.includes(propertyId)) {
    user.favorites.push(propertyId)
    saveUsers(users)
    setCurrentUser(user)
  }
  
  const { password, ...userWithoutPassword } = user
  return { success: true, user: userWithoutPassword as User }
}

// Remove from favorites
export async function removeFromFavorites(userId: string, propertyId: string): Promise<AuthResponse> {
  const users = getUsers()
  const user = users.find((u) => u.id === userId)
  
  if (!user) {
    return { success: false, error: 'User not found' }
  }
  
  user.favorites = user.favorites.filter((id) => id !== propertyId)
  saveUsers(users)
  setCurrentUser(user)
  
  const { password, ...userWithoutPassword } = user
  return { success: true, user: userWithoutPassword as User }
}

// Check if property is favorited
export function isFavorited(userId: string, propertyId: string): boolean {
  const users = getUsers()
  const user = users.find((u) => u.id === userId)
  return user ? user.favorites.includes(propertyId) : false
}
