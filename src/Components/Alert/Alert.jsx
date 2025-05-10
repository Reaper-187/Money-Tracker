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
import { useMediaQuery } from "react-responsive";

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
      className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5"
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-red-500 font-extrabold min-w-full ">
            delete Transactions
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bist du dir sicher?</AlertDialogTitle>
            <AlertDialogDescription>
              Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Löschen
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
        className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5"
      >
        <AlertDialogTrigger asChild>
          <Button className="font-extrabold min-w-full">
            Export Transactions
          </Button>
        </AlertDialogTrigger>
      </motion.div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bist du dir sicher?</AlertDialogTitle>
          <AlertDialogDescription>
            Ausgewählte Transaktionen werden Exportiert
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
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
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
          <Button onClick={() => onOpenChange(false)}>Schließen</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
