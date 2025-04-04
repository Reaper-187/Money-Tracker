"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "./SelectScreen.css";
import { DatePickerNoRange } from "@/components/Datepicker/DatePicker";
import { AmountBtn } from "@/components/ButtonComp/AmountBtn/AmountBtn";

const formSchema = z.object({
  date: z.date(),
  category: z.string(),
  payment: z.string(),
  amount: z.string(),
  notes: z.string(),
});

function onSubmit(data) {
  const cleanedData = {
    ...data,
    date: data.date.toISOString(),
  };

  toast("You saved the transaction:", {
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">
          {JSON.stringify(cleanedData, null, 2)}
        </code>
      </pre>
    ),
  });
}

export function SelectScreen({
  toggleSelectScreen,
  closeSelectScreen,
  disabled,
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      category: "",
      payment: "",
      amount: "",
      notes: "",
    },
  });

  return (
    <div
      className={
        toggleSelectScreen ? "select-container active" : "select-container"
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-20 h-full"
        >
          <Button
            type="button"
            className="hide-select-screen-btn"
            onClick={closeSelectScreen}
          >
            Close
          </Button>

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <DatePickerNoRange field={field} form={form} />
                </FormItem>
              )}
            />
          </div>

          <div className="w-fit">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("category", value)
                      }
                    >
                      <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent
                        className="w-auto p-0 popover-content"
                        style={{ zIndex: 999 }}
                      >
                        <SelectGroup>
                          <SelectLabel>Category</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="payment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment</FormLabel>
                  <FormControl>
                    <Input placeholder="Payment" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <AmountBtn
                      value={field.value}
                      onChange={field.onChange}
                      disabled={disabled}
                      placeholder="0.00"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Optional..." />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormMessage />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
