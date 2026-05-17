import Home from "../page";

/**
 * /dashboard route alias — re-exports the root Home Server Component.
 * Suspense streaming from the root page is inherited automatically.
 */
export default function DashboardPage() {
  return <Home />;
}
