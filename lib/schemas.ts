import { z } from "zod";

export const reportFormSchema = () =>
  z.object({
    type: z.enum(["LOST", "FOUND"], {
      required_error: "Type is required",
      invalid_type_error: "Type must be either LOST or FOUND",
    }),

    itemName: z
      .string()
      .min(3, { message: "Item name must be at least 3 characters" })
      .max(50, { message: "Item name can't exceed 50 characters" }),

    description: z
      .string()
      .min(3, { message: "Description must be at least 3 characters" })
      .max(200, { message: "Description can't exceed 200 characters" }),

    category: z.enum(
      ["ELECTRONICS", "BAG", "CLOTHING", "ACCESSORY", "DOCUMENT", "OTHER"],
      {
        required_error: "Category is required",
        invalid_type_error: "Category is invalid",
      },
    ),

    color: z.string().nonempty({ message: "Color is required" }),

    location: z.string().nonempty({ message: "Location is required" }),

    reportedAt: z.string().datetime({ message: "Date and time are required" }),
  });

export type ReportFormInput = z.infer<ReturnType<typeof reportFormSchema>>;
