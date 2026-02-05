export interface Gallery {
    thumb: string;
    original: string;
  }
  
  export interface Review {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
  }
  
  export interface Camper {
    id: string;
    name: string;
    price: number;
    rating: number;
    location: string;
    description: string;
    form: 'alcove' | 'fullyIntegrated' | 'panelTruck';
    length: string;
    width: string;
    height: string;
    tank: string;
    consumption: string;
    transmission: 'automatic' | 'manual';
    engine: 'diesel' | 'petrol' | 'hybrid';
    AC: boolean;
    bathroom: boolean;
    kitchen: boolean;
    TV: boolean;
    radio: boolean;
    refrigerator: boolean;
    microwave: boolean;
    gas: boolean;
    water: boolean;
    gallery: Gallery[];
    reviews: Review[];
  }
  
  export interface CampersResponse {
    total: number; 
    items: Camper[];   
  }
  
  export interface FilterParams {
    location?: string;      
    form?: string;   
    transmission?: string;
    AC?: boolean;          
    kitchen?: boolean;      
    TV?: boolean;          
    bathroom?: boolean;    
    refrigerator?: boolean;
    microwave?: boolean;    
    gas?: boolean;        
    water?: boolean;      
    page?: number;         
    limit?: number;         
  }
  
  export interface BookingFormData {
    name: string;
    email: string;
    bookingDate: string;
    comment?: string; 
  }