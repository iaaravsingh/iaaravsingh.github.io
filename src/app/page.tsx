import { headers } from "next/headers";
import ClientHome from "./ClientHome";

export default async function MainPortfolioPage() {
  // Vercel se IP/Location nikalna (Default 'IN' agar pata na chale)
  const headersList = await headers();
  const country = headersList.get("x-vercel-ip-country") || "IN";

  // Tera design load karna aur country bhej dena
  return <ClientHome countryCode={country} />;
}