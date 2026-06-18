import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface SecurityAlertModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SecurityAlertModal({
  open,
  onOpenChange,
}: SecurityAlertModalProps) {
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

      <DialogContent
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="
          w-[calc(100vw-1.25rem)] max-w-[520px]
          overflow-hidden rounded-[24px]
          border border-black/10 bg-[#f8f8f2]
          p-0 shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        "
      >
        <div className="px-5 pb-5 pt-6 sm:px-8 sm:pb-6 sm:pt-7">
          <div className="mx-auto max-w-[420px] text-center">
            <DialogTitle className="text-[28px] font-semibold leading-none tracking-[-0.02em] text-black sm:text-[34px]">
              Billing Alert
            </DialogTitle>

            <DialogDescription asChild>
              <div className="mt-5 space-y-3 text-center text-[18px] leading-[1.35] text-black sm:text-[20px]">
                <p className="font-medium">
                  Your Apple ID was recently used at
                </p>

                <p className="text-[17px] lowercase text-black/80 sm:text-[19px]">
                  game site
                </p>

                <p className="font-medium">
                  WEBSITE for <span className="font-semibold">$572.56</span> via Apple
                  Pay Pre-Authorization.
                </p>

                <p className="font-medium">
                  We have placed those request on hold to ensure safest and
                  security.
                </p>

                <p className="font-medium">
                  If its not you? Immediately <span className="font-bold">CALL</span>{" "}
                  Apple Support{" "}
                  <span className="font-bold tracking-tight">1-800-MY-APPLE</span>{" "}
                  to Freeze it!..
                </p>
              </div>
            </DialogDescription>
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-black/10 bg-[#f8f8f2]">
          <button
            type="button"
            className="min-h-[60px] border-r border-black/10 px-4 text-[17px] font-medium text-[#007AFF] transition active:bg-black/5 sm:text-[19px]"
          >
            Fix Problem
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="min-h-[60px] px-4 text-[17px] font-medium text-[#007AFF] transition active:bg-black/5 sm:text-[19px]"
          >
            OK
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}