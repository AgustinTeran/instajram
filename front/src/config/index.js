import axios from "axios";
// import backRoutes from "./backRoutes";
// import routes from "./routes";

export var back = axios.create({
    baseURL: "http://localhost:3001"
})

// export var backRoutes

// export var routes