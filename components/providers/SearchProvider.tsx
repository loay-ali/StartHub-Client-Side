"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import GlobalSearchService, {
    SearchResult,
} from "@/src/services/GlobalSearchServie";

import { usePathname } from "next/navigation";

import useDebounce from "@/src/hooks/useDebounce";
import SuggestionService from "@/src/services/SuggestionService";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface SearchContextType {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;

    query: string;
    setQuery: Dispatch<SetStateAction<string>>;

    loading: boolean;

    results: SearchResult[];

    recent: SearchResult[];

    suggestions: SearchResult[];

    activeIndex: number;

    setActiveIndex: Dispatch<SetStateAction<number>>;
}

const SearchContext =
    createContext<SearchContextType | null>(null);

export function SearchProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    const [query, setQuery] = useState("");

    const [results, setResults] = useState<SearchResult[]>([]);

    const [recent, setRecent] = useState<SearchResult[]>([]);

    const [loading, setLoading] = useState(false);

    const [activeIndex, setActiveIndex] = useState(0);

    const debounced = useDebounce(query);

    const pathname = usePathname();

    const router = useRouter();

const suggestions = useMemo(
    () => SuggestionService.getSuggestions(pathname),
    [pathname]
);

    useEffect(() => {
        if (!debounced) {
            const timeout = window.setTimeout(
                () => setResults([]),
                0
            );

            return () => window.clearTimeout(timeout);
        }

        let active = true;
        const loadingTimeout = window.setTimeout(
            () => {
                if (active) setLoading(true);
            },
            0
        );

        GlobalSearchService.search(debounced)
            .then((data) => {
                if (!active) return;
                setResults(data);
                setActiveIndex(0);
            })
            .catch((err) => {
                if (!active) return;
                console.error(err);
                setResults([]);
            })
            .finally(() => {
                if (!active) return;
                window.clearTimeout(loadingTimeout);
                setLoading(false);
            });

        return () => {
            active = false;
            window.clearTimeout(loadingTimeout);
        };
    }, [debounced]);


    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (!open) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((i) =>
                    Math.min(i + 1, results.length - 1)
                );
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((i) =>
                    Math.max(i - 1, 0)
                );
            }

            if (e.key === "Escape") {
                setOpen(false);
            }

            if (e.key === "Enter") {
                const selected = results[activeIndex];

                if (!selected) return;

                GlobalSearchService.saveRecent(selected);

                setRecent(GlobalSearchService.recent());

                setOpen(false);

                router.push(selected.url);
            }
        };

        window.addEventListener("keydown", handler);

        return () =>
            window.removeEventListener("keydown", handler);
    }, [results, activeIndex, open, router]);

    useEffect(() => {
        if (!open) {
            const timeout = window.setTimeout(() => {
                setQuery("");
                setResults([]);
                setActiveIndex(0);
            }, 0);

            return () => window.clearTimeout(timeout);
        }
    }, [open]);

    const value = useMemo(
        () => ({
            open,
            setOpen,

            query,
            setQuery,

            loading,

            results,

            recent,

            suggestions,

            activeIndex,

            setActiveIndex,
        }),
        [
            open,
            query,
            loading,
            results,
            recent,
            suggestions,
            activeIndex,
        ]
    );

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const ctx = useContext(SearchContext);

    if (!ctx)
        throw new Error(
            "useSearch must be inside SearchProvider"
        );

    return ctx;
}