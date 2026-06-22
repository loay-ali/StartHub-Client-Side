"use client";

import { useMemo, useState } from "react";

import { FiChevronDown, FiChevronUp, FiEdit, FiTrash2 } from "react-icons/fi";

import { CollectionColumn } from "./types";

type Props<T> = {
  columns: CollectionColumn<T>[];
  data: T[];

  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
};

export default function CollectionTable<T extends Record<string, any>>({
  columns,
  data,
  onEdit,
  onDelete,
}: Props<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));

      return;
    }

    setSortKey(key);

    setSortDirection("asc");
  };

  const sortedData = useMemo(() => {
    if (!sortKey) {
      return data;
    }

    return [...data].sort((a, b) => {
      const first = a[sortKey];

      const second = b[sortKey];

      if (typeof first === "string" && typeof second === "string") {
        return sortDirection === "asc"
          ? first.localeCompare(second)
          : second.localeCompare(first);
      }

      if (typeof first === "number" && typeof second === "number") {
        return sortDirection === "asc" ? first - second : second - first;
      }

      return 0;
    });
  }, [data, sortKey, sortDirection]);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-border bg-background">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-5 py-4 text-left text-sm font-semibold"
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(String(column.key))}
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      {column.label}

                      {sortKey === column.key ? (
                        sortDirection === "asc" ? (
                          <FiChevronUp />
                        ) : (
                          <FiChevronDown />
                        )
                      ) : (
                        <FiChevronDown className="opacity-30" />
                      )}
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}

              {(onEdit || onDelete) && (
                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {data.length == 0 ? (<tr><td style = {{textAlign:"center",padding:"8px"}} colSpan = {9}>No Results</td></tr>):sortedData.map((row, index) => (
              <tr
                key={index}
                className="border-b border-border transition hover:bg-background"
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-5 py-4">
                    {column.value && typeof column.value == 'function'
                      ? column.value(row)
                      : String(row[column.key as keyof typeof row] ?? "")}
                  </td>
                ))}

                {(onEdit || onDelete) && (
                  <td className="px-5 py-4">
                    <div className="flex gap-4">
                      {onEdit && (
                        <button
                          type="button"
                          onClick={() => onEdit(row)}
                          className="flex items-center gap-1 text-primary"
                        >
                          <FiEdit />
                          Edit
                        </button>
                      )}

                      {onDelete && (
                        <button
                          type="button"
                          onClick={() => onDelete(row)}
                          className="flex items-center gap-1 text-red-500"
                        >
                          <FiTrash2 />
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
