import axios from "axios";
// import backRoutes from "./backRoutes";
// import routes from "./routes";

export var back = axios.create({
    baseURL: "https://instajram-production.up.railway.app"
})

// export var backRoutes

// export var routes