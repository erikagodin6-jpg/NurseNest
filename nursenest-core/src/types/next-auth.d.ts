import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: "LEARNER" | "ADMIN";
      country: "CA" | "US";
      tier: "RPN" | "LVN_LPN" | "RN" | "NP" | "ALLIED";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "LEARNER" | "ADMIN";
    country?: "CA" | "US";
    tier?: "RPN" | "LVN_LPN" | "RN" | "NP" | "ALLIED";
  }
}
