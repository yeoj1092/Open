import axios from "axios";

export const getPractices = async () => {
    return axios.get("/api/practices").then((practices) => practices.data);
};
