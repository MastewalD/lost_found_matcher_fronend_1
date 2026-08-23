"use client";

import { useState } from "react";
import MatchingForm from "@/components/matching-form";
import {
  useFindMatchingItemsMutation,
  useReportLostItemsMutation,
} from "@/redux/services/matchingApiSlice";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type MatchResult = {
  report: Reports;
  match: {
    score: number;
    confidence: string;
    reasons: {
      signal: string;
      message: string;
    }[];
  };
};

type FindResponse = {
  data?: MatchResult[];
  message?: string;
  [key: string]: unknown;
};

export default function Home() {
  const [reportData, setReportData] = useState<ReportPaylod | null>(null);
  const [findMatchingItems, { isLoading: isMatchingLoading }] =
    useFindMatchingItemsMutation();
  const [result, setResult] = useState<FindResponse | null>(null);
  const [reportLostItems, { isLoading: isReportingLoading }] =
    useReportLostItemsMutation();

  async function handleFindMatching(data: ReportPaylod) {
    setReportData(data);
    const itemData = {
      type: data.type,
      itemName: data.itemName,
      description: data.description,
      category: data.category,
      color: data.color,
      location: data.location,
      reportedAt: data.reportedAt,
    };

    try {
      const response = (await findMatchingItems(
        itemData,
      ).unwrap()) as FindResponse;
      if (response.status === "success") {
        setResult(response);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  }

  async function handleReportLostItems(data: ReportPaylod) {
    const userData = {
      type: data.type,
      itemName: data.itemName,
      description: data.description,
      category: data.category,
      color: data.color,
      location: data.location,
      reportedAt: data.reportedAt,
    };

    try {
      const response = await reportLostItems(userData).unwrap();
      if (response.status === "success") {
        setResult(null);
        toast.add({
          description: "Your report has been submitted successfully.",
          type: "success",
        });
      }
    } catch (err) {
      console.log("Error:", err);
      toast.add({
        description: "An error occurred while submitting your report.",
        type: "error",
      });
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between px-10 md:p-16 sm:items-start">
        <MatchingForm
          submitHandler={handleFindMatching}
          isLoading={isMatchingLoading}
        />
      </main>

      <Sheet
        open={result !== null}
        onOpenChange={(open) => {
          if (!open) {
            setResult(null);
          }
        }}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Matching results</SheetTitle>
            <SheetDescription>
              Here is what we found from the details you provided.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[80vh] w-full">
            <div className="mx-4 space-y-4 overflow-auto">
              {result &&
              Array.isArray(result.data) &&
              result.data.length === 0 ? (
                <p className="rounded-md bg-red-100 text-red-700 p-4 text-sm">
                  {result.message}
                </p>
              ) : (
                result?.data?.map(({ report, match }) => (
                  <article
                    key={report.id}
                    className="space-y-4 rounded-md border p-4 w-full"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-semibold">{report.itemName}</h2>
                        <p className="text-sm text-muted-foreground">
                          {report.description}
                        </p>
                      </div>
                      <Badge variant="secondary">{match.confidence}</Badge>
                    </div>

                    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                      <div>
                        <dt className="text-muted-foreground">Category</dt>
                        <dd>{report.category}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Color</dt>
                        <dd>{report.color}</dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="text-muted-foreground">Location</dt>
                        <dd>{report.location}</dd>
                      </div>
                    </dl>

                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <h3 className="font-medium">Match strength</h3>
                        <span>{Math.round(match.score * 100)}%</span>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {match.reasons.map((reason) => (
                          <li key={reason.signal}>{reason.message}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))
              )}
            </div>
          </ScrollArea>
          {result && Array.isArray(result.data) && result.data.length === 0 && (
            <SheetFooter>
              <Button
                type="submit"
                disabled={isReportingLoading}
                onClick={() => {
                  if (reportData) {
                    handleReportLostItems(reportData);
                  }
                }}
                className="h-12 rounded-sm bg-primary text-white cursor-pointer"
              >
                {isReportingLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                    Loading...
                  </>
                ) : (
                  "Report Item"
                )}
              </Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}


