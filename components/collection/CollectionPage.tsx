"use client";

import { useMemo, useState } from "react";

import { FiPlus, FiSearch } from "react-icons/fi";

import CollectionPagination from "./CollectionPagination";
import CollectionTable from "./CollectionTable";
import { CollectionColumn } from "./types";
import { useTranslations } from "next-intl";

type Props<T> = {
  title: string;
  data: T[];
  columns: CollectionColumn<T>[];

  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;

  addLink?:string;
  editLink?:Function;

  isDeleting?: boolean;

  currentPage:number;
};

export default function CollectionPage<T extends Record<string, any>>({
  title,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  addLink,
  editLink,
  isDeleting,
  currentPage=1
}: Props<T>) {
  const [search, setSearch] = useState("");

  const pageSize = 10;

  const t = useTranslations();

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

  return (
    <div className="space-y-6 grow">
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
                }}
                placeholder={t('dashboard.common.search')}
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
                {t('dashboard.common.add-new')}
              </button>
            )}
          </div>
        </div>
      </div>

      <CollectionTable
        columns={columns}
        data={data}
        onEdit={onEdit}
        onDelete={onDelete}
        isDeleting={isDeleting}
        editLink={editLink}
      />

      <CollectionPagination
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
