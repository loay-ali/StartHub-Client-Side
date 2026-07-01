import { FiSearch } from "react-icons/fi";

export default function SearchBar() {     
  const { open, setOpen, query, setQuery, loading, results, setActiveIndex } = useSearch();
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!debouncedQuery) return;

    GlobalSearchService.search(debouncedQuery)
      .then(setResults)
      .catch(console.error);
  }, [debouncedQuery]);

  return (    
    <>
      <button
        onClick={() => setOpen(true)}   
        className="group relative flex w-full items-center rounded-xl border border-[#14b8a6]/15 bg-white/60 px-4 py-2.5 backdrop-blur transition-all duration-200 hover:border-[#14b8a6]/40 hover:bg-white"
      >
        <FiSearch className="text-slate-400" />

        <span className="ml-3 flex-1 text-left text-sm text-slate-400">
          Search or ask AI...
        </span>

        <div className="flex items-center gap-1 rounded-lg border bg-slate-50 px-2 py-1 text-xs text-slate-500">
          <FiCommand />
          K
        </div>
      </button>
      <AnimatePresence>
  {open && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm"
    >
      {/* Palette */}
    </motion.div>
  )}
</AnimatePresence>

<motion.div
    initial={{
        opacity:0,
        scale:.95,
        y:20
    }}
    animate={{
        opacity:1,
        scale:1,
        y:0
    }}
    exit={{
        opacity:0,
        scale:.95,
        y:20
    }}
    transition={{
        duration:.22,
        ease:"easeOut"     
    }}
> </motion.div>
      {open && (
        <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm">
          <div className="mx-auto mt-24 w-[95%] max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-2xl">
            <div className="border-b border-slate-200 p-5">
              <div className="flex items-center gap-3">
                  <FiSearch className="text-slate-400" />

      <input
        type="text"
        placeholder="Search anything..."
        className="w-full rounded-xl border border-[#14b8a6]/15 bg-white/60 backdrop-blur-sm py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-[#14b8a6]/50 focus:ring-2 focus:ring-[#14b8a6]/10 focus:bg-white/90"
      />
    </div>
  );
}
