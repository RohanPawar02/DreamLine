import axios from "axios";
const LOGIN_USER_KEY = "PROJECT_LOGIN_USER_KEY";

var baseURL;
if (
  process.env.REACT_APP_ENVIRONMENT &&
  process.env.REACT_APP_ENVIRONMENT === "PRODUCTION"
) {
  baseURL = process.env.REACT_APP_API_BASE_URL;
} else {
  baseURL = "http://127.0.0.1:8000";
}

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (localStorage.getItem(LOGIN_USER_KEY)) {
      config.headers.common["Authorization"] = JSON.parse(
        localStorage.getItem(LOGIN_USER_KEY)
      ).token;
    }

    return config;
  },
  (err) => {
    console.error(err);
  }
);

export default class API {
  getUsers = async () => {
    const users = await api
      .get("/user/")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return users;
  };

  signIn = async (email, password) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const user = await api
      .post("/user/signin/", formData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return user;
  };

  signUp = async (username, email, password) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    const newUser = await api
      .post("/user/signup/", formData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return newUser;
  };

  getBackgroundImg = async () => {
    const bimg = await api
      .get("/backgroundimage/")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return bimg;
  };

  postUserBackground = async (params = {}) => {
    const formData = new FormData();

    for (const key in params) {
      formData.append(key, params[key]);
    }

    return api
      .post("/userbackground/add/", formData)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  getUserbackgrounds = async () => {
    return api
      .get("/userbackground/")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  getUserbackground = async (id) => {
    const response = await api
      .get("/userbackground/images/" + id + "/")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return response;
  };

  // getPosts = async () => {
  //     const posts = await api
  //         .get("/posts/")
  //         .then((response) => {
  //             return response.data
  //         })
  //         .catch((error) => {
  //             throw new Error(error)
  //         })
  //     return posts
  // }
  // addPost = async (name, body, image) => {
  //     const formData = new FormData();
  //     formData.append("name", name);
  //     formData.append("body", body);
  //     formData.append("image", image);
  //     const savedPost = await api
  //         .post("/posts/add/", formData)
  //         .then((response) => {
  //             return response.data
  //         })
  //         .catch((error) => {
  //             throw new Error(error)
  //         })
  //     return savedPost
  // }
  // deletePost = async (id) => {
  //     const response = await api
  //         .delete("/posts/delete/" + id + "/")
  //         .then((response) => {
  //             return response.data
  //         })
  //         .catch((error) => {
  //             throw new Error(error)
  //         })
  //     return response
  // }
}
