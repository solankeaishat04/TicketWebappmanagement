export type MockUser = {
  id: string;
  email: string;
  name?: string;
  password: string;
};

const DELAY_MS = 700;
const USERS_KEY = "ticketapp_mock_users";

const wait = (ms = DELAY_MS) => new Promise((r) => setTimeout(r, ms));

function loadUsers(): MockUser[] {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users: MockUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function makeToken(email: string) {
  return btoa(JSON.stringify({ email, iat: Date.now() }));
}

export const mockAuthAPI = {
  async signup(email: string, password: string, name?: string) {
    await wait();
    const users = loadUsers();
    if (!email || !password || !name) throw new Error("All fields required");
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("User already exists");
    }
    const newUser = { id: String(Date.now()), email, name, password };
    users.push(newUser);
    saveUsers(users);
    return { user: { ...newUser }, token: makeToken(email) };
  },

  async login(email: string, password: string) {
    await wait();
    const users = loadUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) throw new Error("Invalid credentials");
    return { user: { ...user }, token: makeToken(email) };
  },

  ensureSeeded() {
    const users = loadUsers();
    if (!users.length) {
      const sample = { id: "1", email: "admin@ticketmaster.local", password: "admin123", name: "Admin User" };
      users.push(sample);
      saveUsers(users);
    }
  },
};
