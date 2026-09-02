"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import Select, { type StylesConfig } from "react-select";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import type { Department, Batch, AlumniRecord } from "@/lib/types";
import { DETAIL_FIELDS, EXPORT_COLUMNS } from "@/lib/alumniFields";

ModuleRegistry.registerModules([AllCommunityModule]);

interface Option {
  value: number;
  label: string;
}

// Matches the rounded/shadowed look of the rest of the form controls.
const selectStyles: StylesConfig<Option, true> = {
  control: (base, state) => ({
    ...base,
    minHeight: 38,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: state.isFocused ? "#111827" : "#e5e7eb",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(17, 24, 39, 0.08)" : "0 1px 2px rgba(17, 24, 39, 0.03)",
    "&:hover": { borderColor: state.isFocused ? "#111827" : "#d1d5db" },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(17, 24, 39, 0.08), 0 12px 32px rgba(17, 24, 39, 0.12)",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#111827" : state.isFocused ? "#f9fafb" : "white",
    color: state.isSelected ? "white" : "#111827",
  }),
  multiValue: (base) => ({
    ...base,
    borderRadius: 6,
    backgroundColor: "#f3f4f6",
  }),
};

function formatDate(dateString?: string | null) {
  if (!dateString) return null;
  try {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

function PhotoCellRenderer(props: ICellRendererParams<AlumniRecord>) {
  const imagePath = props.data?.imagePath;
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        overflow: "hidden",
        background: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
      }}
    >
      {imagePath ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imagePath} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <i className="fas fa-user" style={{ fontSize: 14, color: "#bbb" }} />
      )}
    </div>
  );
}

function makeActionsCellRenderer(
  onView: (record: AlumniRecord) => void,
  onDelete: (id: number, name: string | null) => void,
  isAdmin: boolean
) {
  return function ActionsCellRenderer(props: ICellRendererParams<AlumniRecord>) {
    const router = useRouter();
    const record = props.data;
    const id = record?.alumniId;
    if (id === undefined || !record) return null;
    return (
      <div
        className="actions-cell"
        style={{ display: "flex", gap: 12, alignItems: "center", height: "100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <i
          className="fas fa-eye"
          title="View Details"
          style={{ cursor: "pointer", fontSize: 16, color: "var(--color-text-muted)" }}
          onClick={(e) => {
            e.stopPropagation();
            onView(record);
          }}
        />
        <i
          className="fa fa-edit"
          title="Edit"
          style={{ cursor: "pointer", fontSize: 16, color: "var(--color-accent)" }}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/alumni/edit/${id}`);
          }}
        />
        {isAdmin && (
          <i
            className="fa fa-trash"
            title="Delete"
            style={{ cursor: "pointer", fontSize: 15, color: "#991b1b" }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id, record.name ?? null);
            }}
          />
        )}
      </div>
    );
  };
}

export function DashboardGrid({
  departments,
  batches,
  isAdmin = false,
}: {
  departments: Department[];
  batches: Batch[];
  isAdmin?: boolean;
}) {
  const router = useRouter();
  const [rowData, setRowData] = useState<AlumniRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState<AlumniRecord | null>(null);

  const [rollNumber, setRollNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [generalSearch, setGeneralSearch] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<Option[]>([]);
  const [selectedBatches, setSelectedBatches] = useState<Option[]>([]);

  const departmentOptions: Option[] = departments.map((d) => ({ value: d.departmentId, label: d.departmentName }));
  const batchOptions: Option[] = batches.map((b) => ({ value: b.batchId, label: b.batchName }));

  const loadData = useCallback(
    async (params?: {
      rollNumber?: string;
      fullName?: string;
      departments?: Option[];
      batches?: Option[];
      general?: string;
    }) => {
      setLoading(true);
      try {
        const filters: Record<string, string[]> = {};
        if (params?.rollNumber) filters.rollNumber = [params.rollNumber];
        if (params?.fullName) filters.fullName = [params.fullName];
        if (params?.departments && params.departments.length > 0) {
          filters.departmentId = params.departments.map((d) => String(d.value));
        }
        if (params?.batches && params.batches.length > 0) {
          filters.batchId = params.batches.map((b) => String(b.value));
        }

        const res = await fetch("/api/alumni/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page: 1,
            pageSize: 10000,
            search: params?.general || "",
            sortColumn: null,
            sortDir: null,
            filters,
          }),
        });

        if (!res.ok) {
          alert("Error loading data. Please try again.");
          return;
        }

        const result = await res.json();
        setRowData(result.data || []);
      } catch (err) {
        console.error("Error loading data:", err);
        alert("Error loading data. Please check console for details.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  function searchData() {
    loadData({
      rollNumber: rollNumber.trim(),
      fullName: fullName.trim(),
      departments: selectedDepartments,
      batches: selectedBatches,
      general: generalSearch.trim(),
    });
  }

  function clearSearch() {
    setRollNumber("");
    setFullName("");
    setSelectedDepartments([]);
    setSelectedBatches([]);
    setGeneralSearch("");
    setSelectedRow(null);
    loadData();
  }

  async function handleDelete(id: number, name: string | null) {
    if (!confirm(`Delete alumni record "${name || id}"? This can't be undone.`)) return;
    try {
      const res = await fetch(`/api/alumni/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (!res.ok) {
        alert(result.error || "Failed to delete alumni record.");
        return;
      }
      if (selectedRow?.alumniId === id) setSelectedRow(null);
      searchData();
    } catch {
      alert("Something went wrong while deleting. Please try again.");
    }
  }

  const columnDefs: ColDef<AlumniRecord>[] = useMemo(
    () => [
      { headerName: "ID", field: "alumniId", sortable: true, filter: "agNumberColumnFilter", hide: true },
      { headerName: "Photo", field: "imagePath", width: 80, sortable: false, filter: false, cellRenderer: PhotoCellRenderer },
      { headerName: "Roll Number", field: "regNo", sortable: true, filter: "agTextColumnFilter" },
      { headerName: "Full Name", field: "name", sortable: true, filter: "agTextColumnFilter" },
      { headerName: "Email", field: "mccEmail", sortable: true, filter: "agTextColumnFilter" },
      { headerName: "Department", field: "departmentName", sortable: true, filter: "agTextColumnFilter" },
      { headerName: "Batch", field: "batchName", sortable: true, filter: "agTextColumnFilter" },
      {
        colId: "actions",
        headerName: "Actions",
        width: isAdmin ? 120 : 85,
        sortable: false,
        filter: false,
        cellRenderer: makeActionsCellRenderer(
          (record) => setSelectedRow((prev) => (prev?.alumniId === record.alumniId ? null : record)),
          handleDelete,
          isAdmin
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAdmin]
  );

  const defaultColDef: ColDef = { flex: 1, sortable: true, filter: true, resizable: true };

  // Exports every AlumniRecord field (EXPORT_COLUMNS), not just the handful
  // of columns shown in the grid — built independently of AG Grid's own
  // export APIs, which (a) only export visible grid columns and (b) require
  // an AG Grid Enterprise license for Excel export.
  function buildExportRows(): Record<string, unknown>[] {
    return rowData.map((row) => {
      const record = row as unknown as Record<string, unknown>;
      const out: Record<string, unknown> = {};
      for (const col of EXPORT_COLUMNS) {
        out[col.label] = record[col.key] ?? "";
      }
      return out;
    });
  }

  function downloadBlob(blob: Blob, fileName: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function exportToExcel() {
    const XLSX = await import("xlsx");
    const worksheet = XLSX.utils.json_to_sheet(buildExportRows(), {
      header: EXPORT_COLUMNS.map((c) => c.label),
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Alumni");
    XLSX.writeFile(workbook, "Alumni_Records_" + new Date().toISOString().split("T")[0] + ".xlsx");
  }

  async function exportToCSV() {
    const XLSX = await import("xlsx");
    const worksheet = XLSX.utils.json_to_sheet(buildExportRows(), {
      header: EXPORT_COLUMNS.map((c) => c.label),
    });
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    downloadBlob(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
      "Alumni_Records_" + new Date().toISOString().split("T")[0] + ".csv"
    );
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>Alumni Records</h2>
        <button className="btn" onClick={() => router.push("/alumni/create")}>
          + Add Alumni
        </button>
      </div>

      <div
        className="search-form"
        onKeyDown={(e) => {
          if (e.key === "Enter") searchData();
        }}
      >
        <div className="search-row">
          <div className="form-group">
            <label>Roll Number</label>
            <input
              type="text"
              placeholder="Enter roll number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Department</label>
            <Select
              instanceId="department-filter"
              isMulti
              options={departmentOptions}
              value={selectedDepartments}
              onChange={(v) => setSelectedDepartments(v as Option[])}
              placeholder="Select departments"
              styles={selectStyles}
            />
          </div>
          <div className="form-group">
            <label>Batch</label>
            <Select
              instanceId="batch-filter"
              isMulti
              options={batchOptions}
              value={selectedBatches}
              onChange={(v) => setSelectedBatches(v as Option[])}
              placeholder="Select batches"
              styles={selectStyles}
            />
          </div>
        </div>
        <div className="search-row">
          <div className="form-group search-input">
            <label>General Search</label>
            <input
              type="text"
              placeholder="Search all fields"
              value={generalSearch}
              onChange={(e) => setGeneralSearch(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button className="search-btn" onClick={searchData}>Search</button>
            <button className="clear-btn" onClick={clearSearch}>Clear</button>
            <button className="export-btn" onClick={exportToExcel}>Export Excel</button>
            <button className="export-btn csv" onClick={exportToCSV}>Export CSV</button>
          </div>
        </div>
      </div>

      <div className="grid-detail-container">
        <div className="grid-wrapper">
          <div className="grid-card">
          <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
            <AgGridReact<AlumniRecord>
              theme="legacy"
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowData={rowData}
              pagination
              paginationPageSize={10}
              onCellClicked={(e) => {
                if (e.column?.getColId() === "actions") return;
                if (e.data) {
                  setSelectedRow(e.data);
                }
              }}
              overlayNoRowsTemplate='<span style="padding: 20px; font-size: 16px; color: #666;">No records to display</span>'
            />
          </div>
          </div>
        </div>

        <div className={`detail-card ${selectedRow ? "show" : ""}`}>
          <div className="detail-card-header">
            <h3>Alumni Details</h3>
            <button className="close-detail" onClick={() => setSelectedRow(null)}>&times;</button>
          </div>
          <div className="detail-card-body">
            {selectedRow && (
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "#f0f0f0",
                    border: "2px solid #e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {selectedRow.imagePath ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={selectedRow.imagePath} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <i className="fas fa-user" style={{ fontSize: 36, color: "#bbb" }} />
                  )}
                </div>
              </div>
            )}
            {selectedRow &&
              DETAIL_FIELDS.map((field) => {
                let value = (selectedRow as unknown as Record<string, string | null>)[field.key];
                if (field.date && value) value = formatDate(value);
                const isEmpty = value === null || value === undefined || value === "";
                return (
                  <div className="detail-field" key={field.key}>
                    <div className="detail-field-label">{field.label}</div>
                    <div className={`detail-field-value ${isEmpty ? "empty" : ""}`}>
                      {isEmpty ? "Not provided" : value}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {loading && (
        <div className="loader-overlay show">
          <div className="loader" />
        </div>
      )}
    </>
  );
}
