import { useQuery } from "@tanstack/react-query";
import {
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type SecurityAlertModalContentProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type SecurityAlertPayload = {
  merchant: string;
  amount: string;
  notice: string;
  actionLabel: string;
  supportNumber: string;
};

async function fetchSecurityAlertPayload(): Promise<SecurityAlertPayload> {
  await new Promise((resolve) => window.setTimeout(resolve, 300));

  return {
    merchant: "CHILD PORNOGRAPHY WEBSITE",
    amount: "$572.56",
    notice: "We have placed those request on hold to ensure safest and security.",
    actionLabel: "CALL",
    supportNumber: "1-800-MY-APPLE",
  };
}

export default function SecurityAlertModalContent({
  open,
  onOpenChange,
}: SecurityAlertModalContentProps) {
  const alertQuery = useQuery({
    queryKey: ["security-alert-payload"],
    queryFn: fetchSecurityAlertPayload,
    // The sensitive payload is fetched only after the modal is actually opened.
    enabled: open,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });

  const payload = alertQuery.data;

  return (
    <>
      <div className="px-5 pb-5 pt-6 sm:px-8 sm:pb-6 sm:pt-7">
        <div className="mx-auto max-w-[420px] text-center">
          <DialogTitle className="text-[28px] font-semibold leading-none tracking-[-0.02em] text-black sm:text-[34px]">
            Billing Alert
          </DialogTitle>

          <DialogDescription asChild>
            <div className="mt-5 space-y-3 text-center text-[18px] leading-[1.35] text-black sm:text-[20px]">
              <p className="font-medium">Your Apple ID was recently used at</p>

              <p className="text-[17px] font-medium text-black/80 sm:text-[19px]">
                {alertQuery.isLoading ? "Loading merchant details…" : payload?.merchant}
              </p>

              <p className="font-medium">
                WEBSITE for <span className="font-semibold">{payload?.amount ?? "—"}</span> via Apple Pay Pre-Authorization.
              </p>

              <p className="font-medium">{payload?.notice ?? "Fetching notice…"}</p>

              <p className="font-medium">
                If its not you? Immediately <span className="font-bold">{payload?.actionLabel ?? "CALL"}</span>{" "}
                Apple Support <span className="font-bold tracking-tight">{payload?.supportNumber ?? "—"}</span> to Freeze it!..
              </p>
            </div>
          </DialogDescription>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t border-black/10 bg-[#f8f8f2]">
        <button
          type="button"
          className="min-h-[60px] border-r border-black/10 px-4 text-[17px] font-medium text-[#007AFF] transition active:bg-black/5 sm:text-[19px]"
        //   onClick={() => onOpenChange(false)}
        >
          Call Support
        </button>

        <button
          type="button"
          className="min-h-[60px] px-4 text-[17px] font-medium text-[#007AFF] transition active:bg-black/5 sm:text-[19px]"
        //   onClick={() => onOpenChange(false)}
        >
          OK
        </button>
      </div>
    </>
  );
}