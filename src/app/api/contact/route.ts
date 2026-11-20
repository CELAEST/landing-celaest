import { NextRequest } from "next/server";
import { handleContactPost } from "@/lib/email/contact-processor";

export async function POST(req: NextRequest) {
  return handleContactPost(req);
}
