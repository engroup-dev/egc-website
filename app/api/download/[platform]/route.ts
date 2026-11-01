import { NextRequest, NextResponse } from "next/server";

interface GitHubReleaseAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubRelease {
  tag_name: string;
  html_url: string;
  assets: GitHubReleaseAsset[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform } = await params;
  const targetPlatform = platform.toLowerCase();

  const repo = "engroup-dev/egc-management";
  const defaultFallback = `https://github.com/${repo}/releases/latest`;

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      next: { revalidate: 60 }, // cache for 1 minute
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "egc-website-downloader",
      },
    });

    if (!res.ok) {
      return NextResponse.redirect(defaultFallback, { status: 302 });
    }

    const release: GitHubRelease = await res.json();
    const assets = release.assets || [];

    if (targetPlatform === "windows" || targetPlatform === "win" || targetPlatform === "exe") {
      const winAsset = assets.find(
        (a) => a.name.endsWith(".Setup.exe") || a.name.endsWith(".exe")
      );
      if (winAsset?.browser_download_url) {
        return NextResponse.redirect(winAsset.browser_download_url, { status: 302 });
      }
    }

    if (targetPlatform === "mac" || targetPlatform === "dmg" || targetPlatform === "macos") {
      const macAsset = assets.find(
        (a) => a.name.endsWith(".dmg") || a.name.endsWith(".zip")
      );
      if (macAsset?.browser_download_url) {
        return NextResponse.redirect(macAsset.browser_download_url, { status: 302 });
      }
    }

    // Default: redirect to the release page
    return NextResponse.redirect(release.html_url || defaultFallback, { status: 302 });
  } catch (err) {
    console.error("Failed to resolve latest release asset:", err);
    return NextResponse.redirect(defaultFallback, { status: 302 });
  }
}

