"use client";

import { useEffect, type ReactNode } from "react";
import { getCalApi } from "@calcom/embed-react";

const CAL_LINK = "dr-rezwana-rumpa/consultation"; // TODO: replace with real cal.com link
const CAL_NAMESPACE = "consultation";

interface CalTriggerProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function CalTrigger({ children, className, ariaLabel }: CalTriggerProps) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "oklch(0.195 0.021 318.66)",
          },
          dark: {
            "cal-brand": "oklch(0.85 0.075 50)",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <button
      type="button"
      aria-label={ariaLabel ?? "Open booking modal"}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
      className={className}
    >
      {children}
    </button>
  );
}
