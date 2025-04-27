import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/landing.tsx"),
    route("login", "routes/login.tsx"), 
    route("signup", "routes/signup.tsx"),

    route("team", "routes/info_pages/team.tsx"),
    route("about", "routes/info_pages/about.tsx"),
    route("alt_about", "routes/info_pages/alt_about.tsx"),
    route("contact", "routes/info_pages/contact.tsx"),

    route("home", "routes/main_pages/home.tsx"),
    route("pets", "routes/main_pages/pets.tsx"),
    route("account", "routes/main_pages/account.tsx"),
] satisfies RouteConfig;

