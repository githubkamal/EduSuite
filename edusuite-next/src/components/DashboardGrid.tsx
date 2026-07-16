"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridApi, GridReadyEvent, ICellRendererParams } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import Select from "react-select";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import type { Department, Batch, AlumniRecord } from "@/lib/types";
import { DETAIL_FIELDS } from "@/lib/alumniFields";

ModuleRegistry.registerModules([AllCommunityModule]);

interface Option {
  value: number;
  label: string;
}

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

function EditCellRenderer(props: ICellRendererParams<AlumniRecord>) {
  const router = useRouter();
  return (
    <i
      className="fa fa-edit text-primary"
      style={{ cursor: "pointer", fontSize: 18, color: "#007bff" }}
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/alumni/edit/${props.value}`);
      }}
    />
  );
}

export function DashboardGrid({ departments, batches }: { departments: Department[]; batches: Batch[] }) {
  const router = useRouter();
  const [gridApi, setGridApi] = useState<GridApi<AlumniRecord> | null>(null);
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
        headerName: "Actions",
        width: 120,
        field: "alumniId",
        cellRenderer: EditCellRenderer,
      },
    ],
    []
  );

  const defaultColDef: ColDef = { flex: 1, sortable: true, filter: true, resizable: true };

  function onGridReady(event: GridReadyEvent<AlumniRecord>) {
    setGridApi(event.api);
  }

  function exportToExcel() {
    gridApi?.exportDataAsExcel({
      fileName: "Alumni_Records_" + new Date().toISOString().split("T")[0] + ".xlsx",
      sheetName: "Alumni",
    });
  }

  function exportToCSV() {
    gridApi?.exportDataAsCsv({
      fileName: "Alumni_Records_" + new Date().toISOString().split("T")[0] + ".csv",
    });
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
              isMulti
              options={departmentOptions}
              value={selectedDepartments}
              onChange={(v) => setSelectedDepartments(v as Option[])}
              placeholder="Select departments"
            />
          </div>
          <div className="form-group">
            <label>Batch</label>
            <Select
              isMulti
              options={batchOptions}
              value={selectedBatches}
              onChange={(v) => setSelectedBatches(v as Option[])}
              placeholder="Select batches"
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
          <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
            <AgGridReact<AlumniRecord>
              theme="legacy"
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowData={rowData}
              pagination
              paginationPageSize={10}
              rowSelection="single"
              onRowClicked={(e) => setSelectedRow(e.data ?? null)}
              onGridReady={onGridReady}
              overlayNoRowsTemplate='<span style="padding: 20px; font-size: 16px; color: #666;">No records to display</span>'
            />
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
