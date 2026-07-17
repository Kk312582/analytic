import { create } from 'zustand'

interface UIState {
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void
  
  isAssistantOpen: boolean
  toggleAssistant: () => void
  
  dashboardData: any
  setDashboardData: (data: any) => void
  
  // Customization chosen by AI
  layoutType: 'grid' | 'flex' | 'masonry'
  setLayoutType: (layout: 'grid' | 'flex' | 'masonry') => void
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'dark',
  setTheme: (theme) => {
    // Update document class for tailwind dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    set({ theme })
  },
  
  isAssistantOpen: false,
  toggleAssistant: () => set((state) => ({ isAssistantOpen: !state.isAssistantOpen })),
  
  dashboardData: null,
  setDashboardData: (data) => set({ dashboardData: data }),
  
  layoutType: 'grid',
  setLayoutType: (layout) => set({ layoutType: layout })
}))
