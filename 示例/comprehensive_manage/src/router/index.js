import { createRouter, createWebHashHistory } from "vue-router";
import HomePageView from "../views/HomePageView.vue";
import ToolClassView from "../views/ToolClassView.vue";
import BigDataClassView from "../views/BigDataClassView.vue";
import EntertainmentClassView from "../views/EntertainmentClassView.vue";

const routes = [
  {
    path: "/",
    name: "HomePageView",
    component: HomePageView,
  },
  {
    path: "/ToolClassView",
    name: "ToolClassView",
    component: ToolClassView,
  },
  {
    path: "/BigDataClassView",
    name: "BigDataClassView",
    component: BigDataClassView,
  },
  {
    path: "/EntertainmentClassView",
    name: "EntertainmentClassView",
    component: EntertainmentClassView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
