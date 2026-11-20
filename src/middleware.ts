import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or contain a dot (static files like llms.txt, robots.txt, sitemap.xml)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
