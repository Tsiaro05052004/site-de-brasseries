import axios from "axios";

const BASE_URL = "https://api.openbrewerydb.org/v1/breweries";

export const fetchAllBreweries = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const fetchBreweryById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const fetchBreweriesByCity = async (city: string, perPage = 10) => {
  const res = await axios.get(`${BASE_URL}`, {
    params: { by_city: city, per_page: perPage },
  });
  return res.data;
};

export const fetchBreweriesByCountry = async (country: string, perPage = 10) => {
  const res = await axios.get(`${BASE_URL}`, {
    params: { by_country: country, per_page: perPage },
  });
  return res.data;
};

export const fetchBreweriesByState = async (state: string, perPage = 10) => {
  const res = await axios.get(`${BASE_URL}`, {
    params: { by_state: state, per_page: perPage },
  });
  return res.data;
};

export const fetchBreweriesByPostalCode = async (postal: string, perPage = 10) => {
  const res = await axios.get(`${BASE_URL}`, {
    params: { by_postal: postal, per_page: perPage },
  });
  return res.data;
};

export const fetchBreweriesByType = async (type: string, perPage = 10) => {
  const res = await axios.get(`${BASE_URL}`, {
    params: { by_type: type, per_page: perPage },
  });
  return res.data;
};

export const searchBreweries = async (query: string) => {
  const res = await axios.get(`https://api.openbrewerydb.org/v1/breweries/search`, {
    params: { query },
  });
  return res.data;
};