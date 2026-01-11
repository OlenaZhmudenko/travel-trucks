export const formatPrice = (price: number): string => {
    return `€${price.toFixed(2)}`;
  };
  
  export const formatLocation = (location: string): string => {
    const parts = location.split(', ');
    if (parts.length === 2) {
      return `${parts[1]}, ${parts[0]}`;
    }
    return location;
  };
 
  export const getCityFromLocation = (location: string): string => {
    const parts = location.split(', ');
    return parts[parts.length - 1] || location;
  };
  
  export const getFormLabel = (form: string): string => {
    const labels: Record<string, string> = {
      alcove: 'Alcove',
      fullyIntegrated: 'Fully Integrated',
      panelTruck: 'Van',
    };
    return labels[form] || form;
  };

  export const getTransmissionLabel = (transmission: string): string => {
    const labels: Record<string, string> = {
      automatic: 'Automatic',
      manual: 'Manual',
    };
    return labels[transmission] || transmission;
  };
  
  export const getEngineLabel = (engine: string): string => {
    const labels: Record<string, string> = {
      diesel: 'Diesel',
      petrol: 'Petrol',
      hybrid: 'Hybrid',
    };
    return labels[engine] || engine;
  };
 
  export const formatRating = (rating: number, reviewsCount: number): string => {
    return `${rating.toFixed(1)} (${reviewsCount} ${reviewsCount === 1 ? 'Review' : 'Reviews'})`;
  };
 
  export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };