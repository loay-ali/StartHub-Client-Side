"use client";

import { useMemo, useState } from "react";

import { FiPlus, FiSearch } from "react-icons/fi";

import CollectionPagination from "./CollectionPagination";
import CollectionTable from "./CollectionTable";
import { CollectionColumn } from "./types";

type Props<T> = {
  title: string;
  data: T[];
  columns: CollectionColumn<T>[];

  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
};

export default function CollectionPage<T extends Record<string, any>>({
  title,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
}: Props<T>) {
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const filteredData = useMemo(() => {
    if (!search.trim()) {
      return data;
    }

    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-text-primary">{title}</h1>

          <div className="flex gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search..."
                className="rounded-xl border border-border py-2 pl-10 pr-4 outline-none focus:border-primary"
              />
            </div>

            {onAdd && (
              <button
                type="button"
                onClick={onAdd}
                className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-white"
              >
                <FiPlus />
                Add New
              </button>
            )}
          </div>
        </div>
      </div>

      <CollectionTable
        columns={columns}
        data={paginatedData}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <CollectionPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
