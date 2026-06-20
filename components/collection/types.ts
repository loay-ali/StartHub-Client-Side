import { ReactNode } from "react";

export type CollectionColumn<T> = {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  value?: ((row: T) => ReactNode)|string;
};
