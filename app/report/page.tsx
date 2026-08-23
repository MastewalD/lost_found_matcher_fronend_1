"use client";

import ReportingForm from "@/components/reporting-form";
import { toast } from "@/components/ui/toast";
import { useReportLostItemsMutation } from "@/redux/services/matchingApiSlice";

export default function Home() {
  const [reportLostItems, { isLoading }] = useReportLostItemsMutation();

  async function handleReportLostItems(data: Report) {
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
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between p-10 md:p-16 sm:items-start">
        <ReportingForm
          submitHandler={handleReportLostItems}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}
