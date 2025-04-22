"use client";
import React, { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";

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

import {
  Home,
  ShoppingBasket,
  Car,
  Ticket,
  PiggyBank,
  Wallet,
  CreditCard,
} from "lucide-react";

import "./SelectScreen.css";
import { DatePickerNoRange } from "@/components/Datepicker/DatePicker";
import { AmountBtn } from "@/components/ButtonComp/AmountBtn/AmountBtn";

import { FetchTransactionsContext } from "@c/Context/Context";

const transactions = import.meta.env.VITE_API_TRANSACTIONS;

const formSchema = z.object({
  date: z.date(),
  category: z.string(),
  payment: z.string(),
  amount: z.string(),
  notes: z.string().max(50, { message: "Maximal 50 Zeichen erlaubt." }),
});

export function SelectScreen({
  toggleSelectScreen,
  closeSelectScreen,
  disabled,
}) {
  const { fetchTransactions } = useContext(FetchTransactionsContext);

  async function onSubmit(data) {
    const cleanedData = {
      ...data,
      date: data.date.toISOString(),
    };
    try {
      const response = await axios.post(transactions, cleanedData);
      toast("You saved the transaction:", {
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(cleanedData, null, 2)}
            </code>
          </pre>
        ),
      });
      await fetchTransactions();
    } catch (err) {
      console.error("POST-Data not found", err);
    }
  }

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

  const categories = [
    { label: "Housing", value: "housing", icon: Home },
    { label: "Living Expenses", value: "living", icon: ShoppingBasket },
    { label: "Transportation", value: "transportation", icon: Car },
    { label: "Entertainment", value: "entertainment", icon: Ticket },
    { label: "Finance", value: "finance", icon: PiggyBank },
  ];

  return (
    <div
      className={
        toggleSelectScreen ? "select-container active" : "select-container"
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-15 h-full sm:space-y-20"
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
                  <FormLabel className="text-(--foreground)">Date</FormLabel>
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
                  <FormLabel className="text-(--foreground)">
                    Category
                  </FormLabel>
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
                          {categories.map(({ label, value, icon: Icon }) => (
                            <SelectItem key={value} value={value}>
                              <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4" />
                                {label}
                              </div>
                            </SelectItem>
                          ))}
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
                  <FormLabel className="text-(--foreground)">Payment</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => form.setValue("payment", value)}
                    >
                      <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Select a Payment" />
                      </SelectTrigger>
                      <SelectContent
                        className="w-auto p-0 popover-content"
                        style={{ zIndex: 999 }}
                      >
                        <SelectGroup>
                          <SelectLabel>Payment</SelectLabel>
                          <SelectItem value="cash">
                            <div className="flex items-center gap-2">
                              <Wallet className="w-4 h-4" />
                              Cash
                            </div>
                          </SelectItem>

                          <SelectItem value="creditcard">
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4" />
                              Credit Card
                            </div>
                          </SelectItem>
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
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-(--foreground)">Amount</FormLabel>
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
                  <FormLabel className="text-(--foreground)">Notes</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Optional..."
                      maxLength={50}
                    />
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
