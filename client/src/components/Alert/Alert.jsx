import { useState } from "react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export function DeleteConfirmDialog({ onConfirm }) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          x: 50,
        },
        visible: { opacity: 1, x: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3, delay: 0.25 }}
      className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6"
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-red-600 font-semibold min-w-full cursor-pointer hover:bg-red-500">
            delete Transactions
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>are you sure ?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>cancle</AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}

export function ExportToComp({ onHandleExport }) {
  const [exportTyp, setExportTyp] = useState("Excel");

  return (
    <AlertDialog>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            x: 50,
          },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: 0.25 }}
        className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6"
      >
        <AlertDialogTrigger asChild>
          <Button className="font-semibold min-w-full cursor-pointer">
            Export Transactions
          </Button>
        </AlertDialogTrigger>
      </motion.div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>are you sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            Selected transactions are exported.
            {/* In shadcn/ui wird der <Select>-Tag selbst nicht gesteuert,
             sondern wird der Wert über ----onValueChange---- setzen, nicht über !!!!onChange!!!!!. */}
            <Select value={exportTyp} onValueChange={setExportTyp}>
              <SelectTrigger className="w-[180px] mt-3">
                <SelectValue placeholder="Select a format" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Formats</SelectLabel>
                  <SelectItem value="Excel" className="text-green-500">
                    Excel
                  </SelectItem>
                  <SelectItem value="CSV" className="text-blue-500">
                    CSV
                  </SelectItem>
                  <SelectItem value="PDF" className="text-red-500">
                    PDF
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>cancle</AlertDialogCancel>
          <AlertDialogAction onClick={() => onHandleExport(exportTyp)}>
            Export to {exportTyp}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function NoteDetailsDialog({ open, onOpenChange, selectedNoteText }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Notiz</AlertDialogTitle>
          <AlertDialogDescription>{selectedNoteText}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
