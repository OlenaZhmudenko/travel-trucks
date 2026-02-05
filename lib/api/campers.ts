import axiosInstance from './axios';
import { Camper, CampersResponse, FilterParams } from '../types/camper';

export const getCampers = async (
    filters: FilterParams = {}
  ): Promise<CampersResponse> => {
    try {
      const params: Record<string, string | number | boolean> = {};
  
      if (filters.page) params.page = filters.page;
      if (filters.limit) params.limit = filters.limit;
      if (filters.location) {
        params.location = filters.location;
      }
      if (filters.form) {
        params.form = filters.form;
      }
      if (filters.transmission) {
        params.transmission = filters.transmission;
      }
        
      if (filters.AC) params.AC = true;
      if (filters.kitchen) params.kitchen = true;
      if (filters.TV) params.TV = true;
      if (filters.bathroom) params.bathroom = true;
      if (filters.refrigerator) params.refrigerator = true;
      if (filters.microwave) params.microwave = true;
      if (filters.gas) params.gas = true;
      if (filters.water) params.water = true;   
      const response = await axiosInstance.get<CampersResponse>('/campers', {
            params,
      });
        
      return response.data;
    } catch (error) {
      console.error('Error fetching campers:', error);
      throw error;
    }
};
  
export const getCamperById = async (id: string): Promise<Camper> => {
    try {
      const response = await axiosInstance.get<Camper>(`/campers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching camper with id ${id}:`, error);
      throw error;
    }
};
  
export const getAllCampers = async (): Promise<Camper[]> => {
    try {
      const response = await axiosInstance.get<Camper[]>('/campers');
      return response.data;
    } catch (error) {
      console.error('Error fetching all campers:', error);
      throw error;
    }
  };