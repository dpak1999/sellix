"use client";

import { trpc } from "@/trpc/client";

export default function Home() {
  const { data } = trpc.auth.session.useQuery();

  return <div>Home page - {JSON.stringify(data?.user, null, 2)}</div>;
}
