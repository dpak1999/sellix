import "server-only";
import { cookies as getCookies } from "next/headers";

export const generateCookie = async ({
  prefix,
  value,
}: {
  prefix: string;
  value: string;
}) => {
  const cookies = await getCookies();
  cookies.set({
    name: `${prefix}-token`,
    value: value,
    httpOnly: true,
    path: "/",
  });
};
