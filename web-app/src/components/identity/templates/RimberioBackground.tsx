import React from 'react';

const NoiseOverlay = () => (
    <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" 
        style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
    />
);

interface RimberioBackgroundProps {
  accentColor?: string;
  side: 'front' | 'back';
}

export const RimberioBackground: React.FC<RimberioBackgroundProps> = ({ accentColor, side }) => {
    const getDarkColor = (color: string) => {
      if (!color) return '#333333';
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2) || '0', 16);
      const g = parseInt(hex.substring(2, 4) || '0', 16);
      const b = parseInt(hex.substring(4, 6) || '0', 16);
      const rDark = Math.max(20, Math.round(r * 0.2));
      const gDark = Math.max(20, Math.round(g * 0.2));
      const bDark = Math.max(20, Math.round(b * 0.2));
      return `#${rDark.toString(16).padStart(2, '0')}${gDark.toString(16).padStart(2, '0')}${bDark.toString(16).padStart(2, '0')}`;
    };

    const Red = accentColor || "#E31E24";
    const Grey = accentColor ? getDarkColor(accentColor) : "#333333";

    return (
        <div className="absolute inset-0 bg-noble-surface overflow-hidden">
            {side === 'front' ? (
                <>
                    {/* Front Bottom Left - The Large Ribbon Fold */}
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none">
                        {/* Red Main Base */}
                        <div 
                            className="absolute bottom-0 left-0 w-full h-full"
                            style={{ 
                                backgroundColor: Red,
                                clipPath: 'polygon(0 0, 100% 100%, 0 100%)'
                            }}
                        />
                        {/* Grey Stripe 1 */}
                        <div 
                            className="absolute bottom-0 left-0 w-full h-full"
                            style={{ 
                                backgroundColor: Grey,
                                clipPath: 'polygon(0 15%, 85% 100%, 65% 100%, 0 35%)'
                            }}
                        />
                        {/* Shadow Fold Detail */}
                        <div 
                            className="absolute bottom-0 left-0 w-full h-full opacity-20"
                            style={{ 
                                background: 'linear-gradient(45deg, transparent, black)',
                                clipPath: 'polygon(0 35%, 15% 50%, 0 65%)'
                            }}
                        />
                    </div>

                    {/* Front Bottom Right - The Detailed Footer Notch */}
                    <div className="absolute bottom-0 right-0 w-1/2 h-[80px] pointer-events-none">
                        {/* Grey Footer Bar */}
                        <div 
                            className="absolute bottom-0 right-0 w-full h-full"
                            style={{ 
                                backgroundColor: Grey,
                                clipPath: 'polygon(15% 100%, 100% 100%, 100% 0, 35% 0)'
                            }}
                        />
                        {/* Red Folded Ribbon Overlay */}
                        <div 
                            className="absolute top-0 right-0 w-1/2 h-full"
                            style={{ 
                                backgroundColor: Red,
                                clipPath: 'polygon(100% 0, 40% 0, 55% 40%, 100% 40%)'
                            }}
                        />
                        {/* Bottom edge shadow */}
                        <div className="absolute bottom-0 right-0 w-full h-[4px] bg-black/10" />
                    </div>
                </>
            ) : (
                <>
                    {/* Back Side - Symmetrical Corner Frames */}
                    
                    {/* Top Left Frame */}
                    <div className="absolute top-0 left-0 w-1/3 h-[100px]">
                        <div className="absolute inset-0" style={{ backgroundColor: Red, clipPath: 'polygon(0 0, 100% 0, 75% 35%, 0 35%)' }} />
                        <div className="absolute inset-0" style={{ backgroundColor: Grey, clipPath: 'polygon(0 0, 75% 0, 50% 35%, 0 35%)' }} />
                    </div>

                    {/* Top Right Frame */}
                    <div className="absolute top-0 right-0 w-1/3 h-[100px]">
                        <div className="absolute inset-0" style={{ backgroundColor: Grey, clipPath: 'polygon(0 0, 100% 0, 100% 45%, 25% 0)' }} />
                        <div className="absolute inset-0" style={{ backgroundColor: Red, clipPath: 'polygon(75% 0, 100% 0, 100% 25%)' }} />
                    </div>

                    {/* Bottom Left Frame */}
                    <div className="absolute bottom-0 left-0 w-1/3 h-[100px]">
                        <div className="absolute inset-0" style={{ backgroundColor: Grey, clipPath: 'polygon(0 55%, 35% 100%, 0 100%)' }} />
                        <div className="absolute inset-0" style={{ backgroundColor: Red, clipPath: 'polygon(0 75%, 15% 100%, 0 100%)' }} />
                    </div>

                    {/* Bottom Right Frame - The Most Complex One */}
                    <div className="absolute bottom-0 right-0 w-1/2 h-[100px]">
                        {/* Main Grey Footer */}
                        <div 
                            className="absolute bottom-0 right-0 w-full h-full"
                            style={{ 
                                backgroundColor: Grey,
                                clipPath: 'polygon(25% 100%, 100% 100%, 100% 0, 50% 0)'
                            }}
                        />
                        {/* Red Folded Ribbon Detail */}
                        <div 
                            className="absolute bottom-0 right-0 w-[180px] h-full"
                            style={{ 
                                backgroundColor: Red,
                                clipPath: 'polygon(100% 0, 30% 0, 50% 50%, 100% 50%)'
                            }}
                        />
                        {/* Shadow Fold */}
                        <div 
                            className="absolute bottom-0 right-0 w-[180px] h-full opacity-30"
                            style={{ 
                                background: 'linear-gradient(to top, black, transparent)',
                                clipPath: 'polygon(50% 50%, 100% 50%, 100% 60%, 60% 60%)'
                            }}
                        />
                    </div>
                </>
            )}

            <NoiseOverlay />
        </div>
    );
};
