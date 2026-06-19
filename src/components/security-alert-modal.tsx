import { lazy, Suspense, useEffect, useRef, useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

const SecurityAlertModalContent = lazy(() => import("./security-alert-modal-content.tsx"));

const HUMAN_FALLBACK_MS = 3800;
const HUMAN_SIGNALS = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"] as const;
type HumanSignal = (typeof HUMAN_SIGNALS)[number];

const BOT_USER_AGENT_RE = /(?:bot|crawler|spider|crawling|headless|playwright|puppeteer|selenium|phantomjs|lighthouse|curl|wget|httpclient|scrapy|monitor|scanner)/i;

function useHumanVerification() {
  const [status, setStatus] = useState<"checking" | "human" | "bot">("checking");
  const signalSetRef = useRef(new Set<HumanSignal>());
  const verifiedRef = useRef(false);

  useEffect(() => {
    const runtime = window as Window & { __nightmare?: unknown; callPhantom?: unknown };

    // Cheap first pass for obvious automated clients before we start listening for real interaction.
    const isBot =
      navigator.webdriver === true ||
      BOT_USER_AGENT_RE.test(navigator.userAgent ?? "") ||
      Boolean(runtime.__nightmare) ||
      Boolean(runtime.callPhantom);

    if (isBot) {
      setStatus("bot");
      return;
    }

    const markSignal = (signal: HumanSignal) => {
      if (verifiedRef.current) {
        return;
      }

      // Require two distinct human signals before revealing the sensitive surface.
      signalSetRef.current.add(signal);

      if (signalSetRef.current.size >= 2) {
        verifiedRef.current = true;
        setStatus("human");
      }
    };

    const eventHandlers: Record<HumanSignal, EventListener> = {
      mousemove: () => markSignal("mousemove"),
      mousedown: () => markSignal("mousedown"),
      keydown: () => markSignal("keydown"),
      scroll: () => markSignal("scroll"),
      touchstart: () => markSignal("touchstart"),
    };

    HUMAN_SIGNALS.forEach((signal) => {
      const target = signal === "scroll" ? window : document;
      const addOptions: AddEventListenerOptions = { capture: signal !== "scroll" };

      if (signal !== "keydown") {
        addOptions.passive = true;
      }

      target.addEventListener(signal, eventHandlers[signal], addOptions);
    });

    const fallbackTimer = window.setTimeout(() => {
      if (!verifiedRef.current && signalSetRef.current.size >= 2) {
        verifiedRef.current = true;
        setStatus("human");
      }
    }, HUMAN_FALLBACK_MS);

    return () => {
      window.clearTimeout(fallbackTimer);

      HUMAN_SIGNALS.forEach((signal) => {
        const target = signal === "scroll" ? window : document;
        target.removeEventListener(signal, eventHandlers[signal], { capture: signal !== "scroll" });
      });
    };
  }, []);

  return {
    isBotLikely: status === "bot",
    isHumanLikely: status === "human",
    signalCount: signalSetRef.current.size,
    status,
  };
}

function VerificationPlaceholder({
  isBotLikely,
  signalCount,
}: {
  isBotLikely: boolean;
  signalCount: number;
}) {
  return (
    <div className="space-y-5 px-5 pb-5 pt-6 sm:px-8 sm:pb-6 sm:pt-7">
      <div className="mx-auto max-w-[420px] text-center">
        <div className="text-[28px] font-semibold leading-none tracking-[-0.02em] text-black sm:text-[34px]">
          {isBotLikely ? "Automated access blocked" : "Checking for human interaction"}
        </div>

        <div className="mt-5 space-y-3 text-[15px] leading-[1.5] text-black/70 sm:text-[16px]">
          <p>
            {isBotLikely
              ? "This panel is hidden from automated clients."
              : "Move the pointer, scroll, tap, or press a key to reveal the alert."}
          </p>

          <p>
            {signalCount > 0
              ? `${signalCount} interaction signal${signalCount === 1 ? "" : "s"} recorded.`
              : "No interaction signals recorded yet."}
          </p>
        </div>
      </div>

      <div className="space-y-3 rounded-[20px] border border-black/10 bg-white/70 p-4">
        <Skeleton className="h-7 w-44 rounded-full" />
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-11/12 rounded-full" />
        <Skeleton className="h-4 w-4/5 rounded-full" />
        <Skeleton className="h-4 w-3/4 rounded-full" />
      </div>
    </div>
  );
}

export interface SecurityAlertModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SecurityAlertModal({ open, onOpenChange }: SecurityAlertModalProps) {
  const { isBotLikely, isHumanLikely, signalCount, status } = useHumanVerification();
  const canRevealSensitiveContent = isHumanLikely && !isBotLikely;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex min-h-11 w-full max-w-sm items-center justify-center rounded-full border border-white/50 bg-white/90 px-5 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white"
        >
          View billing alert
        </button>
      </DialogTrigger>

      {open ? (
        <DialogContent
          onPointerDownOutside={(event) => event.preventDefault()}
          onInteractOutside={(event) => event.preventDefault()}
          onEscapeKeyDown={(event) => event.preventDefault()}
          className="
            w-[calc(100vw-1.25rem)] max-w-[520px]
            overflow-hidden rounded-[24px]
            border border-black/10 bg-[#f8f8f2]
            p-0 shadow-[0_20px_60px_rgba(0,0,0,0.18)]
          "
        >
          {canRevealSensitiveContent ? (
            <Suspense
              fallback={
                <div className="space-y-5 px-5 pb-5 pt-6 sm:px-8 sm:pb-6 sm:pt-7">
                  <div className="mx-auto max-w-[420px] text-center">
                    <div className="text-[28px] font-semibold leading-none tracking-[-0.02em] text-black sm:text-[34px]">
                      Loading alert details
                    </div>
                    <p className="mt-5 text-[15px] leading-[1.5] text-black/70 sm:text-[16px]">
                      The alert body is being fetched now that a human interaction threshold has been met.
                    </p>
                  </div>

                  <div className="space-y-3 rounded-[20px] border border-black/10 bg-white/70 p-4">
                    <Skeleton className="h-7 w-44 rounded-full" />
                    <Skeleton className="h-4 w-full rounded-full" />
                    <Skeleton className="h-4 w-11/12 rounded-full" />
                    <Skeleton className="h-4 w-4/5 rounded-full" />
                    <Skeleton className="h-4 w-3/4 rounded-full" />
                  </div>
                </div>
              }
            >
              <SecurityAlertModalContent open={open} onOpenChange={onOpenChange} />
            </Suspense>
          ) : (
            <VerificationPlaceholder isBotLikely={isBotLikely || status === "bot"} signalCount={signalCount} />
          )}
        </DialogContent>
      ) : null}
    </Dialog>
  );
}