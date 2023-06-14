import { createRouter, createWebHistory } from "vue-router";
import TemplateOneView from "../views/TemplateOneView.vue";
import TemplateTwoView from "../views/TemplateTwoView.vue";
import TemplateThreeView from "../views/TemplateTwoView.vue";

const routes = [
  {
    path: "/one",
    name: "TemplateOneView",
    component: () => import("../views/TemplateOneView.vue"),
  },
  {
    path: "/two",
    name: "TemplateTwoView",
    component: () => import("../views/TemplateTwoView.vue"),
  },
  {
    path: "/three",
    name: "TemplateThreeView",
    component: () => import("../views/TemplateThreeView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
