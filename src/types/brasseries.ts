export interface Brewery {
  id: string;
  name?: string;
  brewery_type?: string;
  address_1?: string;
  address_2?: string;
  address_3?: string;
  city?: string;
  state_province?: string;
  postal_code?: string;
  country?: string;
  longitude?: string;
  latitude?: string;
  phone?: string;
  website_url?: string;
  state?: string;
  street?: string;
}

export interface BreweryApiResponse {
  breweries: Brewery[];
  total: number;
}

export type ViewMode = 'list' | 'map';

export interface SearchFilters {
  query: string;
  state?: string;
  city?: string;
  type?: string;
}

export interface PaginationState {
  page: number;
  perPage: number;
  total: number;
}