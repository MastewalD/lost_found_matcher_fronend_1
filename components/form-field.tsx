"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Control, Controller, FieldPath } from "react-hook-form";
import { z } from "zod";
import { reportFormSchema } from "@/lib/schemas";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const formSchema = reportFormSchema();

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  id: string;
  isDescription?: Boolean;
  type?: string;
  options?: { value: string; label: string }[];
}

const FormField = ({
  control,
  name,
  label,
  placeholder,
  id,
  isDescription = false,
  type,
  options = [],
}: CustomInput) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const getDateAndTimeValues = (val: any) => {
          if (!val) return { currentDate: undefined, currentTime: "12:00:00" };
          const d = new Date(val);
          if (isNaN(d.getTime())) return { currentDate: undefined, currentTime: "12:00:00" };
          
          const hours = String(d.getHours()).padStart(2, "0");
          const minutes = String(d.getMinutes()).padStart(2, "0");
          const seconds = String(d.getSeconds()).padStart(2, "0");
          return {
            currentDate: d,
            currentTime: `${hours}:${minutes}:${seconds}`,
          };
        };

        const { currentDate, currentTime } = getDateAndTimeValues(field.value);

        const handleDateChange = (selectedDate: Date | undefined) => {
          if (!selectedDate) {
            field.onChange("");
            return;
          }
          const [hours, minutes, seconds] = currentTime.split(":").map(Number);
          selectedDate.setHours(hours || 0, minutes || 0, seconds || 0);
          field.onChange(selectedDate.toISOString());
        };

        const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const timeStr = e.target.value;
          if (!currentDate) {
            const now = new Date();
            const [h, m, s] = timeStr.split(":").map(Number);
            now.setHours(h || 0, m || 0, s || 0);
            field.onChange(now.toISOString());
            return;
          }
          const updatedDate = new Date(currentDate);
          const [h, m, s] = timeStr.split(":").map(Number);
          updatedDate.setHours(h || 0, m || 0, s || 0);
          field.onChange(updatedDate.toISOString());
        };

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            {type === "select" ? (
              <div className="flex w-full flex-col">
                <Select onValueChange={field.onChange} value={field.value ?? ""}>
                  <SelectTrigger className="w-full rounded-sm h-12!">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#030419] rounded-[8px] border-none">
                    {options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : type === "date" ? (
              <div className="flex flex-row gap-4 items-center w-full">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="outline"
                        id={id}
                        className="flex-1 w-full justify-between font-normal rounded-sm h-12 px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                      >
                        {currentDate ? format(currentDate, "PPP") : <span>{placeholder}</span>}
                        <CalendarIcon className="h-4 w-4 opacity-50 shrink-0 ml-2" />
                      </Button>
                    }
                  />
                  <PopoverContent className="w-auto overflow-hidden p-0 bg-white dark:bg-[#030419]" align="start">
                    <Calendar
                      mode="single"
                      selected={currentDate}
                      captionLayout="dropdown"
                      defaultMonth={currentDate}
                      onSelect={(date) => {
                        handleDateChange(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>

                <Input
                  type="time"
                  step="1"
                  value={currentTime}
                  onChange={handleTimeChange}
                  className="w-36 sm:w-40 shrink-0 rounded-sm h-12 appearance-none bg-background px-3 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
            ) : isDescription ? (
              <Textarea
                {...field}
                value={field.value ?? ""}
                id={id}
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                className="w-full rounded-sm h-12"
              />
            ) : (
              <Input
                {...field}
                value={field.value ?? ""}
                id={id}
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                autoComplete="off"
                className="w-full rounded-sm h-12"
              />
            )}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

export default FormField;