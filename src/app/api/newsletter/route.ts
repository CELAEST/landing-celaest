import { NextRequest } from "next/server";
import { handleNewsletterPost } from "@/lib/email/contact-processor";

export async function POST(req: NextRequest) {
  return handleNewsletterPost(req);
}
