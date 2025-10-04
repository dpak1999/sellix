import z from "zod";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
  username: z
    .string()
    .min(3, { error: "Username must be atleat 3 characters" })
    .max(50, { error: "Username cannot be more than 50 characters" })
    .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, {
      error:
        "Username can only contain lowercase letters, numbers and hyphens. It must start and end with a letter.",
    })
    .refine((val) => !val.includes("--"), {
      error: "Username cannot contain consecutive hyphens",
    })
    .transform((val) => val.toLowerCase()),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
