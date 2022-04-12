import { makeAutoObservable } from "mobx";
import { Auth } from "../models";
import UserStore from "./user";

class AuthStore {
  values = {
    username: "",
    password: "",
  };
  constructor() {
    makeAutoObservable(this);
  }
  setUsername(username) {
    this.values.username = username;
  }
  setPassword(password) {
    this.values.password = password;
  }
  login() {
    return new Promise((resolve, reject) => {
      Auth.login(this.values.username, this.values.password)
        .then((user) => {
          UserStore.getCurrentUser();
          resolve(user);
        })
        .catch((error) => {
          reject(error);
          console.log(`登录失败：${error}`);
        });
    });
  }
  register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password)
        .then((user) => {
          UserStore.getCurrentUser();
          resolve(user);
        })
        .catch((error) => {
          UserStore.resetCurrentUser();
          reject(error);
        });
    });
  }
  logout() {
    UserStore.resetCurrentUser();
    Auth.logout();
  }
}

export default new AuthStore();
