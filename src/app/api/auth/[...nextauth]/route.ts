import NextAuth from "next-auth"
// before:
// import { authOptions } from "@/lib/authOptions"

// after (4 levels up from [...nextauth] to src/, then into lib/):
import { authOptions } from "../../../../lib/authOptions"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
