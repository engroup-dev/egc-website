import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";

  const iosUrl = "https://apps.apple.com/us/app/egc-builder/id6757635369";
  const androidUrl = "https://play.google.com/store/apps/details?id=com.egc.builder";
  const fallbackUrl = "https://engroup.ly/#apps";

  // Check device OS from User-Agent
  const isIOS = /iPad|iPhone|iPod/i.test(userAgent) || (userAgent.includes("Mac") && "ontouchend" in {});
  const isAndroid = /Android/i.test(userAgent);

  if (isIOS) {
    return NextResponse.redirect(iosUrl, { status: 302 });
  }

  if (isAndroid) {
    return NextResponse.redirect(androidUrl, { status: 302 });
  }

  // Fallback for desktop or non-mobile
  return NextResponse.redirect(fallbackUrl, { status: 302 });
}

