import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
    favoriteIds: string[];
   
    isFavorite: (id: string) => boolean;
   
    addFavorite: (id: string) => void;
    
    removeFavorite: (id: string) => void;

    toggleFavorite: (id: string) => void;
   
    clearFavorites: () => void;
  }

  export const useFavoritesStore = create<FavoritesState>()(
    persist(
      (set, get) => ({

        favoriteIds: [],

        isFavorite: (id: string) => {
          return get().favoriteIds.includes(id);
        },

        addFavorite: (id: string) => {
          set((state) => {
    
            if (state.favoriteIds.includes(id)) {
              return state;
            }
         
            return {
              favoriteIds: [...state.favoriteIds, id],
            };
          });
        },
  
        removeFavorite: (id: string) => {
          set((state) => ({
            favoriteIds: state.favoriteIds.filter((favId) => favId !== id),
          }));
        },
  
        toggleFavorite: (id: string) => {
          const { isFavorite, addFavorite, removeFavorite } = get();
          
          if (isFavorite(id)) {
            removeFavorite(id);
          } else {
            addFavorite(id);
          }
        },
  
        clearFavorites: () => {
          set({ favoriteIds: [] });
        },
      }),
      {
        name: 'favorites-storage', 
      }
    )
  );