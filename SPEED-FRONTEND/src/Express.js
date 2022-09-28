import axios from "axios";

export async function ModerateArticle(articleData) {
  let data = {"title":articleData}
  try {
      let response = await axios.get("http://localhost:4000/articles/view", data, { timeout: 10000 });
      if (response.status === 201) {
          return 0;
      } 
  } catch (error) { //500 or other error
      console.error(error);
      console.error("Network or server error");
      return 1;
  }
}