import { create } from 'zustand';
import { Camper, FilterParams } from '../types/camper';
import { getCampers } from '../api/campers';

interface CampersState {
    campers: Camper[];           
    total: number;            
    isLoading: boolean;         
    error: string | null;    
   
    filters: FilterParams;    
    
    currentPage: number;        
    itemsPerPage: number;    
    hasMore: boolean;            
  
    setFilters: (filters: FilterParams) => void;          
    fetchCampers: (append?: boolean) => Promise<void>;    
    loadMore: () => Promise<void>;                      
    resetCampers: () => void;                            
    clearFilters: () => void;                           
  }
  
  export const useCampersStore = create<CampersState>((set, get) => ({
    campers: [],
    total: 0,
    isLoading: false,
    error: null,
 
    filters: {},

    currentPage: 1,
    itemsPerPage: 4, 
    hasMore: true,

    setFilters: (newFilters: FilterParams) => {
      set({ 
        filters: newFilters,
        currentPage: 1,  
      });
    },

    fetchCampers: async (append = false) => {
      const { filters, currentPage, itemsPerPage, campers } = get();
      
      set({ isLoading: true, error: null });
      
      try {

        const response = await getCampers({
          ...filters,
          page: currentPage,
          limit: itemsPerPage,
        });
        
        set({
          campers: append ? [...campers, ...response.items] : response.items,
          total: response.total,
          isLoading: false,
          hasMore: campers.length + response.items.length < response.total,
        });
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'Failed to fetch campers',
          isLoading: false,
        });
      }
    },

    loadMore: async () => {
      const { hasMore, isLoading, currentPage } = get();
      
      if (isLoading || !hasMore) return;
      
      set({ currentPage: currentPage + 1 });

      await get().fetchCampers(true);
    },

    resetCampers: () => {
      set({
        campers: [],
        currentPage: 1,
        hasMore: true,
        error: null,
      });
    },
 
    clearFilters: () => {
      set({
        filters: {},
        currentPage: 1,
      });
    },
  }));
