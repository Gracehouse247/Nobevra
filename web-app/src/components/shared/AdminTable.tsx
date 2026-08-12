import React from 'react';

export interface AdminTableColumn<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => React.ReactNode;
    className?: string;
}

interface AdminTableProps<T> {
    data: T[];
    columns: AdminTableColumn<T>[];
    onRowClick?: (item: T) => void;
    emptyMessage?: string;
    loading?: boolean;
}

export function AdminTable<T>({ 
    data, 
    columns, 
    onRowClick, 
    emptyMessage = "No data available",
    loading = false
}: AdminTableProps<T>) {
    return (
        <div className="bg-noble-surface dark:bg-noble-card border border-noble-border rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-[#0D1B2E] border-b border-noble-border">
                            {columns.map((col, i) => (
                                <th 
                                    key={i} 
                                    className={`px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider ${col.className || ''}`}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} className="px-4 py-8 text-center">
                                    <div className="flex justify-center items-center gap-2 text-slate-400 dark:text-slate-500">
                                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-indigo-500 animate-spin" />
                                        <span className="text-sm">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => (
                                <tr 
                                    key={rowIndex} 
                                    onClick={() => onRowClick?.(row)}
                                    className={`bg-noble-surface dark:bg-noble-card transition-colors ${onRowClick ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E]' : 'hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E]/50'}`}
                                >
                                    {columns.map((col, colIndex) => (
                                        <td 
                                            key={colIndex} 
                                            className={`px-4 py-3 text-sm text-slate-600 dark:text-slate-400 dark:text-slate-500 ${col.className || ''}`}
                                        >
                                            {col.cell 
                                                ? col.cell(row) 
                                                : col.accessorKey 
                                                    ? String(row[col.accessorKey] ?? '') 
                                                    : null
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
