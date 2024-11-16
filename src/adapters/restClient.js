import axios from "axios";
import { googleApiKey } from "./apiKeys";

export const apiBaseURL = "https://api.shippingequote.com" || "http://192.168.1.39:8080";

const shippingQuoteApiClient = axios.create({
  baseURL: 'https://api.shippingequote.com',
});
export const getAutoCompleteSuggestionGAPI = async (query) => {
  try {
    query = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURI(
      query
    )}&key=${googleApiKey}`;
    const { data } = await axios.get(query);
    return data;
  } catch (err) {
    console.error("Failed autocomplete api", err);
  }
};

export const getPostalCodeAPI = async (payload) => {
  try {
    const query = apiBaseURL+ `/api/searchUSCity`;
    const { data } = await axios.post(query, payload);
    return data;
  } catch (err) {
    console.error("Failed autocomplete api", err);
  }
};

export const internationalCityAPI = async (payload) => {
  try {
    const query = apiBaseURL+ `/api/searchInternationalCity`;
    const { data } = await axios.post(query, payload);
    return data;
  } catch (err) {
    console.error("Failed autocomplete api", err);
  }
};

export default shippingQuoteApiClient;
