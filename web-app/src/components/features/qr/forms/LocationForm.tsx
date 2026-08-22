import React, { useEffect, useState } from 'react';
import { MapPin, Locate } from 'lucide-react';
import { QrFormProps } from './QrFormTypes';

export default function LocationForm({ onChange, initialData, onPreviewValueChange }: QrFormProps) {
    const [latitude, setLatitude] = useState(initialData?.latitude || '');
    const [longitude, setLongitude] = useState(initialData?.longitude || '');
    const [isLocating, setIsLocating] = useState(false);
    const [geoError, setGeoError] = useState('');

    useEffect(() => {
        onChange({ latitude, longitude });
        
        // Format for Geo URI: geo:lat,lng
        const formattedStr = `geo:${latitude},${longitude}`;
        
        onPreviewValueChange(latitude && longitude ? formattedStr : 'https://nobevra.noblesworld.com.ng');
    }, [latitude, longitude]);

    const handleUseCurrentLocation = () => {
        setIsLocating(true);
        setGeoError('');
        
        if (!navigator.geolocation) {
            setGeoError('Geolocation is not supported by your browser.');
            setIsLocating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude.toFixed(6));
                setLongitude(position.coords.longitude.toFixed(6));
                setIsLocating(false);
            },
            (error) => {
                console.error("Error getting location:", error);
                setGeoError('Failed to get location. Please allow location permissions.');
                setIsLocating(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Latitude *</label>
                    <input 
                        type="number" 
                        placeholder="37.7749" 
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Longitude *</label>
                    <input 
                        type="number" 
                        placeholder="-122.4194" 
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#166FBB] outline-none transition-colors" 
                    />
                </div>
            </div>

            <button 
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={isLocating}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-[#166FBB] text-[#166FBB] font-bold rounded-xl hover:bg-[#166FBB]/5 transition-all disabled:opacity-50"
            >
                <Locate className={`w-5 h-5 ${isLocating ? 'animate-spin' : ''}`} />
                {isLocating ? 'Locating...' : 'Use Current Location'}
            </button>
            {geoError && <p className="text-xs font-bold text-[#EF4444] text-center">{geoError}</p>}
            
            <p className="text-xs text-[#64748B] font-medium text-center">Use decimal degrees format. When scanned, this opens the user's default map application.</p>

            <div className="w-full h-64 rounded-xl border border-[#E2E8F0] overflow-hidden bg-[#F8FAFC] flex flex-col items-center justify-center relative">
                {latitude && longitude ? (
                    <iframe 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        loading="lazy" 
                        allowFullScreen 
                        src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                    ></iframe>
                ) : (
                    <div className="flex flex-col items-center text-[#94A3B8]">
                        <MapPin className="w-10 h-10 mb-2 opacity-50" />
                        <p className="text-sm font-bold">Map Preview</p>
                        <p className="text-xs font-medium">Enter coordinates to see map</p>
                    </div>
                )}
            </div>
        </div>
    );
}
