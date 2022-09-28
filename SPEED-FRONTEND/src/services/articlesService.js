import axios from "axios";

export const addArticle = async (article) => {
  return axios.post("/api/articles", article);
};

export const getArticle = async () => {
  return axios.get("/api/articles");
};

export const moderateArticle = async (id) => {
  return axios.put(`/api/articles/moderate/${id}`);
};

export const deleteArticle = async (id) => {
  return axios.delete(`/api/articles/${id}`);
};
