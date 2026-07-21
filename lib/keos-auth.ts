export type KeosRole =
  | "FOUNDER"
  | "HR"
  | "FINANCE"
  | "SUPPORT"
  | "PRODUCT"
  | "ORDERS"
  | "WAREHOUSE"
  | "MARKETING"
  | "AI";

export type KeosModule =
  | "dashboard"
  | "hr"
  | "finance"
  | "support"
  | "products"
  | "orders"
  | "warehouse"
  | "marketing"
  | "ai"
  | "security"
  | "settings"
  | "audit";

export type KeosUser = {
  id: string;
  name: string;
  username: string;
  password: string;
  role: KeosRole;
  department: string;
  designation: string;
  initials: string;
  permissions: KeosModule[];
};

export const KEOS_SESSION_KEY = "keos_session";

export const demoUsers: KeosUser[] = [
  {
    id: "USR-FOUNDER-001",
    name: "Badal Kumar",
    username: "founder",
    password: "Founder@123",
    role: "FOUNDER",
    department: "Founder Office",
    designation: "Founder & Chief Executive",
    initials: "BK",
    permissions: [
      "dashboard",
      "hr",
      "finance",
      "support",
      "products",
      "orders",
      "warehouse",
      "marketing",
      "ai",
      "security",
      "settings",
      "audit",
    ],
  },
  {
    id: "USR-HR-001",
    name: "HR Manager",
    username: "hr",
    password: "Hr@123",
    role: "HR",
    department: "Human Resources",
    designation: "HR Manager",
    initials: "HR",
    permissions: ["dashboard", "hr"],
  },
  {
    id: "USR-FIN-001",
    name: "Finance Manager",
    username: "finance",
    password: "Finance@123",
    role: "FINANCE",
    department: "Finance",
    designation: "Finance Manager",
    initials: "FM",
    permissions: ["dashboard", "finance"],
  },
  {
    id: "USR-SUPPORT-001",
    name: "Support Executive",
    username: "support",
    password: "Support@123",
    role: "SUPPORT",
    department: "Customer Support",
    designation: "Customer Support Executive",
    initials: "CS",
    permissions: ["dashboard", "support", "orders"],
  },
  {
    id: "USR-PRODUCT-001",
    name: "Product Manager",
    username: "product",
    password: "Product@123",
    role: "PRODUCT",
    department: "Product Management",
    designation: "Product Manager",
    initials: "PM",
    permissions: ["dashboard", "products"],
  },
  {
    id: "USR-ORDERS-001",
    name: "Orders Manager",
    username: "orders",
    password: "Orders@123",
    role: "ORDERS",
    department: "Order Operations",
    designation: "Orders Manager",
    initials: "OM",
    permissions: ["dashboard", "orders"],
  },
  {
    id: "USR-WAREHOUSE-001",
    name: "Warehouse Manager",
    username: "warehouse",
    password: "Warehouse@123",
    role: "WAREHOUSE",
    department: "Warehouse",
    designation: "Warehouse Manager",
    initials: "WM",
    permissions: ["dashboard", "warehouse", "orders"],
  },
  {
    id: "USR-MARKETING-001",
    name: "Marketing Manager",
    username: "marketing",
    password: "Marketing@123",
    role: "MARKETING",
    department: "Marketing",
    designation: "Marketing Manager",
    initials: "MM",
    permissions: ["dashboard", "marketing"],
  },
  {
    id: "USR-AI-001",
    name: "AI Operations Manager",
    username: "ai",
    password: "Ai@123",
    role: "AI",
    department: "AI Intelligence",
    designation: "AI Operations Manager",
    initials: "AI",
    permissions: ["dashboard", "ai"],
  },
];

export type SafeKeosUser = Omit<KeosUser, "password">;

export function authenticateDemoUser(
  username: string,
  password: string
): SafeKeosUser | null {
  const user = demoUsers.find(
    (item) =>
      item.username === username.trim().toLowerCase() &&
      item.password === password
  );

  if (!user) {
    return null;
  }

  const { password: _password, ...safeUser } = user;
  return safeUser;
}

export function saveKeosSession(user: SafeKeosUser) {
  if (typeof window === "undefined") return;

  localStorage.setItem(KEOS_SESSION_KEY, JSON.stringify(user));
}

export function getKeosSession(): SafeKeosUser | null {
  if (typeof window === "undefined") return null;

  try {
    const session = localStorage.getItem(KEOS_SESSION_KEY);

    if (!session) return null;

    return JSON.parse(session) as SafeKeosUser;
  } catch {
    localStorage.removeItem(KEOS_SESSION_KEY);
    return null;
  }
}

export function clearKeosSession() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(KEOS_SESSION_KEY);
}

export function canAccessModule(
  user: SafeKeosUser,
  module: KeosModule
): boolean {
  return user.role === "FOUNDER" || user.permissions.includes(module);
}

export function getRoleHome(role: KeosRole): string {
  switch (role) {
    case "FOUNDER":
      return "/dashboard";

    case "HR":
      return "/hr";

    case "FINANCE":
      return "/finance";

    case "SUPPORT":
      return "/support";

    case "PRODUCT":
      return "/products";

    case "ORDERS":
      return "/orders";

    case "WAREHOUSE":
      return "/warehouse";

    case "MARKETING":
      return "/marketing";

    case "AI":
      return "/ai";

    default:
      return "/dashboard";
  }
}