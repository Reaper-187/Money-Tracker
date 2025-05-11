"use client";

import React, { useContext, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  NotebookPen,
} from "lucide-react";

import {
  DeleteConfirmDialog,
  ExportToComp,
  NoteDetailsDialog,
} from "@c/Alert/Alert";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { AddTransBtn } from "@c/ButtonComp/AddTransBtn/AddTransBtn";
import { toast } from "sonner";
import { motion } from "motion/react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

import { FetchTransactionsContext } from "@c/Context/Context";

axios.defaults.withCredentials = true; // damit erlaube ich das senden von cookies
const transactions = import.meta.env.VITE_API_TRANSACTIONS;

export function createColumns(
  deleteSelectedTransactions,
  showNote,
  handleExport
) {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const rawDate = row.getValue("date");
        const formattedDate = new Date(rawDate).toLocaleDateString("de-DE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        return <div>{formattedDate}</div>;
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("category")}</div>
      ),
    },
    {
      accessorKey: "payment",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Payment
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("payment")}</div>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = row.getValue("amount");
        const formatted = new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(amount);

        return (
          <div
            className={`${amount >= 0 ? "text-green-500" : "text-red-500"} text-left font-medium`}
          >
            {formatted}
          </div>
        );
      },
    },
    {
      accessorKey: "notes",
      header: () => <div className="text-left">notes</div>,
      cell: ({ row }) => {
        return (
          <div
            className="cursor-pointer"
            onClick={() => {
              showNote(row.getValue("notes"));
            }}
          >
            <NotebookPen />
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const transaction = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-18 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DeleteConfirmDialog
                onConfirm={() => deleteSelectedTransactions([transaction._id])}
              ></DeleteConfirmDialog>

              <DropdownMenuSeparator />
              <ExportToComp
                onHandleExport={(exportTyp) => {
                  handleExport([transaction], exportTyp);
                }}
              ></ExportToComp>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

export function Transactions() {
  const { selectTransactions, setSelectTransactions } = useContext(
    FetchTransactionsContext
  );

  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [selectedNoteText, setSelectedNoteText] = useState("");

  function deleteSelectedTransactions(idsToDelete) {
    axios
      // wenn über delete ein body ans BE gegeben wird dann ist das nur mit data: möglich weil das der key ist
      .delete(transactions, { data: { idsToDelete } })
      .then((res) => {
        toast("Transaktion erfolgreich gelöscht!");
        const updatedList = selectTransactions.filter(
          (trans) => !idsToDelete.includes(trans._id)
        );
        setSelectTransactions(updatedList);
      })
      .catch((err) => {
        console.error("Fehler beim Löschen:", err);
      });
  }

  function showNote(note) {
    if (selectedNoteText.length > 0) {
      setSelectedNoteText(note);
      setIsNoteDialogOpen(true);
    } else {
      setSelectedNoteText("You did not note something");
      setIsNoteDialogOpen(true);
    }
  }

  function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  }

  function formatAmount(amount) {
    return `${amount.toFixed(2)} €`;
  }

  const handleExport = (data, format) => {
    if (format === "Excel") {
      exportToXlsx(data);
    } else if (format === "CSV") {
      exportToCSV(data);
    } else if (format === "PDF") {
      exportToPDF(data);
    }
  };

  function exportToXlsx(data) {
    const formattedData = data.map((entry) => ({
      ...entry,
      date: formatDate(entry.date),
      amount: formatAmount(entry.amount),
    }));

    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(formattedData);

    XLSX.utils.book_append_sheet(
      workBook,
      workSheet,
      "Transactions-Money-Tracker"
    );
    XLSX.writeFile(workBook, "MyExcel.xlsx");
  }

  function exportToCSV(data) {
    const formattedData = data.map((entry) => ({
      ...entry,
      date: formatDate(entry.date),
      amount: formatAmount(entry.amount),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "transactions.csv", { bookType: "csv" });
  }

  function exportToPDF(data) {
    const head = [["ID", "Date", "Category", "Amount", "Notes"]];

    const body = data.map((item) => [
      item._id,
      formatDate(item.date),
      item.category,
      formatAmount(item.amount),
      item.note,
    ]);

    const pdf = new jsPDF();

    autoTable(pdf, {
      head: head,
      body: body,
    });

    pdf.save("Transactions.pdf");
  }

  const columns = createColumns(
    deleteSelectedTransactions,
    showNote,
    handleExport
  );

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: selectTransactions,
    columns,
    getRowId: (row) => row._id,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
  });

  const rowVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.4 },
    }),
  };

  return (
    <div className="w-full px-2 pt-5 md:pt-0">
      <div className="flex flex-wrap gap-4 justify-center items-center py-10 md:py-5">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20, x: 10 },
            visible: { opacity: 1, x: 0, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.45 }}
          className="w-full flex flex-wrap justify-center items-center gap-4"
        >
          <Input
            className="max-w-xl md:w-44"
            placeholder="Search for categories, amounts, etc..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          {/* Prüft ob min. eine TX (row) ausgewählt wurde */}
          <AddTransBtn />

          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <>
              <DeleteConfirmDialog
                fullWidth={true}
                onConfirm={() => {
                  deleteSelectedTransactions(
                    table
                      .getFilteredSelectedRowModel()
                      .rows.map((row) => row.original._id)
                  );
                }}
              >
                ({table.getFilteredSelectedRowModel().rows.length})
              </DeleteConfirmDialog>
              <ExportToComp
                fullWidth={true}
                onHandleExport={(exportTyp) => {
                  handleExport(
                    table
                      .getFilteredSelectedRowModel()
                      .rows.map((row) => row.original),
                    exportTyp
                  );
                }}
              ></ExportToComp>
            </>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-1/2 lg:w-1/6">
                Filter <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>
      <div className="rounded-md border">
        <NoteDetailsDialog
          open={isNoteDialogOpen}
          onOpenChange={setIsNoteDialogOpen}
          selectedNoteText={selectedNoteText}
        />

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, i) => (
                <motion.tr
                  key={row.id}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={rowVariants}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
