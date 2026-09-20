import Link from "next/link";

import { GrLinkNext,GrLinkPrevious } from "react-icons/gr";

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function CollectionPagination({
  currentPage=1,
  totalPages=1,
}: Props) {
  return (
    <div className="flex justify-center gap-2 max-w-[300px] mx-auto">
      {currentPage > 1 && <Link
        href={"?p="+ (currentPage - 1)}
        className="button secondary rounded-lg border max-w-[40px] disabled:opacity-50 flex items-center justify-center">
        <GrLinkPrevious />
      </Link>}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={"?p="+ page}
          className={`button rounded-lg! flex justify-center items-center max-w-[40px] w-[40px] h-[40px] p-0  ${
            currentPage === page ? "" : "secondary"
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages - 1 && <Link
        href = {"?p="+ (currentPage + 1)}
        className="button secondary rounded-lg border flex items-center justify-centerdisabled:opacity-50 max-w-[40px]"
      >
        <GrLinkNext />
      </Link>}
    </div>
  );
}
