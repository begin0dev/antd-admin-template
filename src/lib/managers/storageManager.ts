import { UserInterface } from "../../stores/user";

export class StorageManager {
  private STORAGE = sessionStorage;
  private TOKEN_KEY = "apiToken";
  private CURRENT_USER_KEY = "currentUser";

  get apiToken(): string | null {
    return this.STORAGE.getItem(this.TOKEN_KEY);
  }

  get currentUser(): UserInterface | null {
    const strCurrentUser = this.STORAGE.getItem(this.CURRENT_USER_KEY);
    if (!strCurrentUser) return null;

    return JSON.parse(strCurrentUser);
  }

  setApiToken(token: string) {
    this.STORAGE.setItem(this.TOKEN_KEY, token);
  }

  setCurrentUser(user: UserInterface) {
    this.STORAGE.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  clearCurrentUser() {
    this.STORAGE.removeItem(this.TOKEN_KEY);
    this.STORAGE.removeItem(this.CURRENT_USER_KEY);
  }
}
