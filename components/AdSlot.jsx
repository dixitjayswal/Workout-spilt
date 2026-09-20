"use client";

import { useEffect, useRef } from "react";

import { ADSENSE_CLIENT } from "@/lib/ads";

/* Renders nothing at all until NEXT_PUBLIC_ADSENSE_CLIENT is set, so the site
   ships clean while the AdSense application is pending — no empty boxes, no
   placeholder gaps, no script request.

   The reserved min-height matters: an ad that loads and pushes content down
   costs you Cumulative Layout Shift, which is a ranking signal. The box holds
   its space whether or not a creative fills it. */

export default function AdSlot({ slot, format = "auto", layout, height = 280, label = true, className = "" }) {
  const ref = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT || !slot || pushed.current) return;
    // React 18+ strict mode mounts twice in dev; AdSense throws if the same
    // <ins> is pushed more than once.
    if (ref.current?.dataset.adsbygoogleStatus) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) { /* blocked by an ad blocker, or offline */ }
  }, [slot]);

  if (!ADSENSE_CLIENT || !slot) return null;

  return (
    <aside className={`ad ${className}`} style={{ minHeight: height }} aria-label="Advertisement">
      {label && <span className="ad-label">Advertisement</span>}
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
