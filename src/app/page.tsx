"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading…</p>;
  }

  // Not signed in? Show a plain Sign In button
  if (!session) {
    return (
      <div style={{ padding: 40, fontFamily: "sans-serif" }}>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }

  // Signed in: show user info + link to the blocker page
  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <p>✅ Signed in as {session.user?.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
      <hr style={{ margin: "2rem 0" }} />
      <Link href="/blocker">
        <button>Create a Calendar Block →</button>
      </Link>
    </div>
  );
}
