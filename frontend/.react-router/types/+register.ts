import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/login": {};
  "/signup": {};
  "/team": {};
  "/about": {};
  "/alt_about": {};
  "/contact": {};
  "/home": {};
  "/pets": {};
  "/account": {};
};