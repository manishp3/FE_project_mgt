import axios from "axios"

export const GetApiCall = async (endPoint, payload) => {
  try {
    const response = axios.get(`${import.meta.env.VITE_API_URL}${endPoint}`, {
      params: payload,
      withCredentials: true
    },)
    return response;
  }
  catch (err) {
    console.log("get erro ::", err);
  }
}
export const PostApiCall = async (endPoint, payload = {}, headers = {}) => {
  try {
    console.log("log of postadata::", payload);
    console.log("log of postadata::1", import.meta.env.VITE_API_URL + endPoint);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}${endPoint}`,
      payload,
      { headers, withCredentials: true }
      // { headers }
    );
    return response.data; // Return only the data (optional)
  } catch (error) {
    console.error("POST API Error:", error);
    throw error; // Let caller handle it
  }
};
// export const DeletepiCall = async (endPoint, payload = {}, headers = {}) => {
//   try {
//     console.log("log of postadata::", payload);
//     console.log("log of postadata::1", import.meta.env.VITE_API_URL + endPoint);

//     const response = await axios.delete(
//       `${import.meta.env.VITE_API_URL}${endPoint}`,
//       {
//         data: payload,
//         headers, withCredentials: true
//       }
//       // { headers }
//     );
//     return response.data; // Return only the data (optional)
//   } catch (error) {
//     console.error("POST API Error:", error);
//     throw error; // Let caller handle it
//   }
// };

// export const PatchApiCall = async (endPoint, payload = {}, headers = {}) => {
//   try {
//     const response = await axios.patch(endPoint, payload, { headers });
//     return response.data;
//   } catch (err) {
//     console.error("PATCH request failed:", err);
//     throw err; // rethrow so calling code can handle the error
//   }
// }


export const PatchApiCall = async (endPoint, payload = {}, headers = {}) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}${endPoint}`,
      payload,
      {
        headers,
        withCredentials: true, // ✅ Required if token is in cookies
      }
    );
    return response.data;
  } catch (err) {
    console.error("PATCH request failed:", err);
    throw err; // Let caller handle it
  }
};

export const DeleteApiCall = async (endPoint, payload = {}, headers = {}) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}${endPoint}`, {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error("DELETE request failed:", err);
    throw err; // rethrow so calling code can handle the error
  }
};
