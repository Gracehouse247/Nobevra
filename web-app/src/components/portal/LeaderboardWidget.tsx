'use client';

import React, { useEffect, useState } from 'react';
import { gamificationService } from '@/lib/services/gamificationService';
import { UserData } from '@/types';
import { Trophy, Star, ChevronRight, Medal } from 'lucide-react';
import Image from 'next/image';

export default function LeaderboardWidget() {
    const [leaders, setLeaders] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = gamificationService.subscribeToLeaderboard((users) => {
            setLeaders(users);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="bg-noble-card border border-noble-card-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] p-6 animate-pulse">
                <div className="h-6 w-32 bg-slate-200 rounded-full mb-6" />
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-200 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-24 bg-slate-200 rounded" />
                                <div className="h-3 w-16 bg-slate-100 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-noble-card border border-noble-card-border shadow-[0_12px_40px_rgb(0,0,0,0.06)] rounded-[24px] p-6 relative overflow-hidden group">
            {/* Ambient Background */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-amber-400/20 transition-colors duration-500" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-noble-blue/5 blur-[40px] rounded-full pointer-events-none" />

            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-100/50">
                        <Trophy className="w-4 h-4 text-amber-500" />
                    </div>
                    <h3 className="font-inter font-black text-slate-800 text-lg tracking-tight">Top Earners</h3>
                </div>
                <button className="text-xs font-bold text-slate-400 hover:text-noble-blue transition-colors flex items-center gap-1">
                    View All <ChevronRight className="w-3 h-3" />
                </button>
            </div>

            <div className="space-y-1 relative z-10">
                {leaders.slice(0, 5).map((user, index) => {
                    const isTop3 = index < 3;
                    const bgClass = index === 0 ? 'bg-amber-50/50 border-amber-100/50' : 
                                  index === 1 ? 'bg-slate-50 border-slate-100' :
                                  index === 2 ? 'bg-orange-50/30 border-orange-100/30' : 'bg-transparent border-transparent hover:bg-slate-50/50';

                    return (
                        <div key={user.id} className={`flex items-center justify-between p-3 rounded-2xl border transition-colors ${bgClass}`}>
                            <div className="flex items-center gap-4">
                                <div className="relative w-10 h-10">
                                    {user.photoUrl ? (
                                        <Image src={user.photoUrl} alt={user.name} fill className="rounded-full object-cover border-2 border-white shadow-sm" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-slate-500 font-black text-sm shadow-sm">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    {/* Rank Badge */}
                                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shadow-sm border border-white ${
                                        index === 0 ? 'bg-amber-400 text-white' : 
                                        index === 1 ? 'bg-slate-300 text-white' : 
                                        index === 2 ? 'bg-orange-400 text-white' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                        {index + 1}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">{user.name}</p>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <Medal className="w-3 h-3 text-noble-blue opacity-70" />
                                        <span className="text-[11px] font-black text-slate-400">Level {user.gamification?.level || 1}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 justify-end">
                                    <Star className={`w-3.5 h-3.5 ${isTop3 ? 'fill-amber-400 text-amber-400' : 'fill-slate-300 text-slate-300'}`} />
                                    <span className={`font-black text-sm ${isTop3 ? 'text-amber-500' : 'text-slate-500'}`}>
                                        {user.gamification?.xp?.toLocaleString() || 0}
                                    </span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">XP</span>
                            </div>
                        </div>
                    );
                })}

                {leaders.length === 0 && (
                    <div className="py-8 text-center">
                        <p className="text-sm font-bold text-slate-400">No data available yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
