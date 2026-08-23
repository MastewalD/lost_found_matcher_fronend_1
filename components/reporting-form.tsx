
"use client";

import React from "react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormField from "./form-field";
import { Loader2 } from "lucide-react";
import { reportFormSchema } from "@/lib/schemas";
import { FieldDescription, FieldGroup } from "./ui/field";

interface ReportingFormProps {
  submitHandler: (arg: ReportPaylod) => void;
  isLoading: boolean;
}

const ReportingForm: React.FC<ReportingFormProps> = ({
  submitHandler,
  isLoading,
}) => {
  const formSchema: z.ZodSchema = reportFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      itemName: "",
      description: "",
      category: "",
      color: "",
      location: "",
      reportedAt: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      submitHandler({
        type: data.type!,
        itemName: data.itemName!,
        description: data.description!,
        category: data.category!,
        color: data.color!,
        location: data.location!,
        reportedAt: data.reportedAt!,
      });
      form.reset();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
      <FieldGroup>
        <div className="flex flex-col gap-1 mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome!</h1>
          <FieldDescription className="text-muted-foreground text-sm text-balance">
            Are you here to find a lost item?{" "}
            <Link
              href="/"
              className="text-blue-700 no-underline! hover:text-blue-800!"
            >
              Go find your items
            </Link>
          </FieldDescription>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
          <FormField
            control={form.control}
            name="itemName"
            label="Item Name"
            placeholder="Item name"
            id="itemName"
          />

          <FormField
            control={form.control}
            name="category"
            label="Category"
            placeholder="Item category"
            id="category"
            type="select"
            options={[
              { value: "BAG", label: "Bag" },
              { value: "CLOTHING", label: "Clothing" },
              { value: "ELECTRONICS", label: "Electronics" },
              { value: "ACCESSORY", label: "Accessory" },
              { value: "DOCUMENT", label: "Document" },
              { value: "OTHER", label: "Other" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
          <FormField
            control={form.control}
            name="color"
            label="Color"
            placeholder="Item color"
            id="color"
          />

          <FormField
            control={form.control}
            name="type"
            label="Type"
            placeholder="Item type"
            id="type"
            type="select"
            options={[
              { value: "LOST", label: "Lost" },
              { value: "FOUND", label: "Found" },
            ]}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          label="Location"
          placeholder="Where did you find the item?"
          id="location"
        />

        <FormField
          control={form.control}
          name="reportedAt"
          label="When did you find or lose it?"
          placeholder="Pick the date"
          id="reportedAt"
          type="date"
        />

        <FormField
          control={form.control}
          name="description"
          label="Description"
          placeholder="Item description"
          id="description"
          isDescription={true}
        />


        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full rounded-sm h-12 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
              </>
            ) : (
              "Report Item"
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default ReportingForm;
