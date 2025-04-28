// at the top of src/lib/authOptions.ts
console.log("🔑 AZURE_AD_CLIENT_SECRET:", process.env.AZURE_AD_CLIENT_SECRET);
import AzureAD from "next-auth/providers/azure-ad"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    AzureAD({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: { params: { scope: "openid profile email" } },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
}
