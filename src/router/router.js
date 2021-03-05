import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from "./views/Login";
// import Register from "./views/Register";
// import Home from "./views/Home";
// import PageNotFound from "./views/PageNotFound";
// import RoomList from "./views/RoomList";
import {tokenManager} from "@/main";
// import Room from "./views/Room";
// import UserNotFound from "./views/UserNotFound";
// import UserAlreadyExists from "./views/UserAlreadyExists";
// import Profile from "./views/Profile";


Vue.use(VueRouter)

const routes = [
    // {path: "", component: Home, name: "home"},
    // {path: "/login", component: Login, name: "login"},
    // {path: "/register", component: Register, name: "register"},
    // {path: "/rooms", component: RoomList, name: "rooms", meta: {requiresAuth: true}},
    // {path: "/rooms/:id", component: Room, name: "room", meta: {requiresAuth: true}},
    // {path: "/profile/:id", component: Profile, name: "profile",  meta:{requiresAuth: true}},
    // {path: "*", component: PageNotFound, name: "notFound"},
    // {path: "*", component: UserNotFound, name: "userNotFound"},
    // {path: "*", component: UserAlreadyExists, name: "userAlreadyExists"}
]

const router = new VueRouter({
    routes,
    mode: "history"
})

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.requiresAuth) {
        if (tokenManager.isUserLogged()) {
            next()
        } else {
            next({name: "login"})
        }
    } else {
        next()
    }
})

export default router
