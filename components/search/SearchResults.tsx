"use client";

import Link from "next/link";
import { useSearch } from "../providers/SearchProvider";
import { categoryIcon } from "@/utils/categoryIcon";
import { motion } from "framer-motion";

export default function SearchResults() {
    const {
        results,
        loading,
        activeIndex,
    } = useSearch();

    if (loading) {
        return (
            <div className="p-4">
                <motion.div
                    animate={{
                        opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.2,
                    }}
                    className="space-y-3"
                    whileHover={{
                        scale: 1.01,
                    }}
                >
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-12 rounded-xl bg-slate-200"
                        />
                    ))}
                </motion.div>
            </div>
        );
    }




    if (!results.length)
        return (
            <div className="p-8 text-center text-slate-500">
                No results found.
            </div>
        );

    return (
        <div className="py-2" role="listbox">
            {results.map((item, index) => {
                const Icon = categoryIcon(item.category);

                return (
                    <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        whileHover={{
                            scale: 1.01,
                        }}
                    >
                        <Link
                            href={item.url}
                            className={`flex items-center justify-between px-5 py-3 transition ${activeIndex === index
                                ? "bg-teal-50 border-l-4 border-teal-500"
                                : "hover:bg-slate-100"
                                }`}


                            role="option"
                            aria-selected={activeIndex === index}
                        >
                            <div className="rounded-xl bg-slate-100 p-2">
                                <Icon className="text-teal-600" />
                            </div>

                            <div>
                                <div className="font-medium text-slate-900">{item.title}</div>
                                <div className="text-sm text-slate-500">{item.subtitle}</div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-xs uppercase text-slate-400">
                                    {item.category}
                                </span>

                                <span className="text-xs text-slate-300">
                                    ↵
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
}