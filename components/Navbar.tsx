import { NavbarClient } from "./NavbarClient";
import { NAV_LINKS } from "@/lib/constants";
import { getCurrentUser } from "@/lib/supabase/server";

export async function Navbar() {
  const user = await getCurrentUser();

  return <NavbarClient links={NAV_LINKS} isLoggedIn={Boolean(user)} />;
}
