import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home";
import Main from "../pages/innerPages/Main";

//Signup
import SignUp from "../pages/auth/signup/SignUp";
import FirstForm from "../pages/auth/signup/FirstForm";
import SecondForm from "../pages/auth/signup/SecondForm";
import MailConfirmation from "../pages/auth/signup/MailConfirmation";

//Login
import Login from "../pages/auth/Login";

import Product from "../pages/Product";

import Category from "../pages/innerPages/Categories";

import Test from "../pages/Test";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
    children: [
      {
        name: "Main",
        component: Main,
        path: "",
      },
      {
        name: "Product",
        path: "/product/:pId",
        component: Product,
      },
      {
        name: "Categories",
        path: "/category/:parent/",
        component: Category,
      },
    ],
  },
  {
    name: "SignUp",
    path: "/signup",
    component: SignUp,
    children: [
      {
        component: FirstForm,
        path: "",
        name: "f1",
      },
      {
        component: SecondForm,
        path: "f2",
        name: "f2",
        beforeEnter: (to, from, next) => {
          if (from.name !== "f1") next({ name: "f1" });
          else next();
        },
      },
      {
        component: MailConfirmation,
        path: "cf",
        name: "cf",
        beforeEnter: (to, from, next) => {
          if (from.name !== "f2") next({ name: "f1" });
          else next();
        },
      },
    ],
  },
  {
    name: "LogIn",
    path: "/login",
    component: Login,
  },
  {
    name: "Test",
    path: "/Test",
    component: Test,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.base),
});

export default router;
