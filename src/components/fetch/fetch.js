import axios from "axios";

import { Notify } from "notiflix/build/notiflix-notify-aio";
async function fetchApi(topic, page) {
  axios.defaults.baseURL = "https://pixabay.com/api/";
  const KEY = "36910570-35daf5d8a5ff9002bcd25fc68";
  const QUANTITY = 12;
  try {
    const response = await axios.get(
      `?q=${topic}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${QUANTITY}`
    );
    return response.data;
  } catch (error) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
export default fetchApi;
