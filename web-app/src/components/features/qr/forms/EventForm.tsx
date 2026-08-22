import React, { useEffect, useState } from 'react';
import { QrFormProps } from './QrFormTypes';

export default function EventForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [location, setLocation] = useState(initialData?.location || '');
    const [date, setDate] = useState(initialData?.date || '');
    const [time, setTime] = useState(initialData?.time || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [rsvpUrl, setRsvpUrl] = useState(initialData?.rsvpUrl || '');

    useEffect(() => {
        onChange({ eventName: title, location, date, time, description, rsvpUrl });
        
        // Very simplified vEvent format for quick preview
        const formattedStr = `BEGIN:VEVENT\nSUMMARY:${title}\nLOCATION:${location}\nDTSTART:${date.replace(/[-:]/g, '')}T${time.replace(/[-:]/g, '')}00Z\nDESCRIPTION:${description}\nURL:${rsvpUrl}\nEND:VEVENT`;
        
        onPreviewValueChange(title ? formattedStr : 'https://nobevra.noblesworld.com.ng');
    }, [title, location, date, time, description, rsvpUrl]);

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Event Title *</label>
                <input 
                    type="text" 
                    placeholder="Annual Tech Conference" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Location</label>
                <input 
                    type="text" 
                    placeholder="Grand Hotel Convention Center" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Date</label>
                    <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Time</label>
                    <input 
                        type="time" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">RSVP Link (Optional)</label>
                <input 
                    type="url" 
                    placeholder="https://eventbrite.com/my-event" 
                    value={rsvpUrl}
                    onChange={(e) => setRsvpUrl(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Description</label>
                <textarea 
                    placeholder="Event details..." 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors resize-none" 
                />
            </div>
        </div>
    );
}
