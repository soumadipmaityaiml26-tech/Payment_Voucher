import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddVendorModal from "@/components/AddVendorModal";
import VendorDetail from "./VendorDetails";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

import type {
  CreateVendorPayload,
  IGetVendorsResponse,
  Vendor,
} from "@/types/vendorTypes";
import { createVendor, getAllVendors, deleteVendor } from "@/api/vendor";

export default function Vendors() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* ================= Load Vendors ================= */

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const data: IGetVendorsResponse = await getAllVendors();
      setVendors(data.vendors);
    } catch {
      toast.error("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  /* ================= Create Vendor ================= */

  const handleCreateVendor = async (data: CreateVendorPayload) => {
    try {
      await createVendor(data);
      toast.success("Vendor created");
      fetchVendors();
    } catch {
      toast.error("Failed to create vendor");
    }
  };

  /* ================= Delete Vendor ================= */

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteVendor(deleteId);

      // Optimistic UI
      setVendors((prev) => prev.filter((v) => v._id !== deleteId));
      toast.success("Vendor deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  /* ================= Search ================= */

  const filteredVendors = vendors.filter((v) =>
    `${v.name} ${v.pan} ${v.gstin || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* ================= Project View ================= */

  if (selectedVendor) {
    return (
      <div className="p-6">
        <VendorDetail
          vendor={selectedVendor}
          onBack={() => setSelectedVendor(null)}
        />
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Vendors</h1>
          <p className="text-sm text-muted-foreground">
            Manage contractors and suppliers
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>Add Vendor</Button>
      </div>

      {/* Search */}
      <Input
        placeholder="Search by name, PAN or GSTIN..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />

      {/* Vendors Table */}
      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-muted sticky top-0 z-10">
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead>PAN</TableHead>
                <TableHead className="hidden sm:table-cell">GSTIN</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    Loading vendors…
                  </TableCell>
                </TableRow>
              ) : filteredVendors.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No vendors found
                  </TableCell>
                </TableRow>
              ) : (
                filteredVendors.map((v) => (
                  <TableRow
                    key={v._id}
                    className="hover:bg-muted/40 transition"
                  >
                    {/* Vendor */}
                    <TableCell className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center">
                        {v.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium leading-tight">{v.name}</p>
                        <p className="text-xs text-muted-foreground md:hidden">
                          {v.phone}
                        </p>
                      </div>
                    </TableCell>

                    {/* Phone */}
                    <TableCell className="hidden md:table-cell">
                      {v.phone}
                    </TableCell>

                    {/* PAN */}
                    <TableCell className="font-mono text-sm">{v.pan}</TableCell>

                    {/* GSTIN */}
                    <TableCell className="hidden sm:table-cell font-mono text-sm">
                      {v.gstin || "—"}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedVendor(v)}
                      >
                        View
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(v._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Vendor?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the vendor and all linked projects,
              bills and payments.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Vendor Modal */}
      <AddVendorModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreateVendor}
      />
    </div>
  );
}
