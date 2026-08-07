import React from 'react';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';
import { SharedQRCode } from '../../SharedQRCode';

export const LaranaIncCard: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {
  const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;
    const qc = brandAccent.replace('#','');
    const panelBg = brandDark;
    if (side === 'front') return (
      <div className="relative w-full h-full flex flex-row z-20">
        <div className="flex-[0.54] bg-white flex flex-col justify-between py-14 px-16">
          <DraggableElement elementKey="logo" className="w-10 h-10 flex-shrink-0">
            <svg viewBox="0 0 80 80" className="w-full h-full fill-current" style={{ color: brandAccent }}>
              {[0,45,90,135,180,225,270,315].map(r=><path key={r} d="M40,12C43,12,46,26,46,36C46,44,43,45,40,45C37,45,34,44,34,36C34,26,37,12,40,12Z" transform={`rotate(${r} 40 40)`}/>)}
            </svg>
          </DraggableElement>
          <DraggableElement elementKey="content" className="w-full">
            <div>
              <h1 className="font-black leading-[0.88] tracking-[-0.03em] uppercase" style={{ color: ON_WHITE, fontFamily: data.fontFamily || undefined, fontSize: fs(72) }}>{data.fullName||'AVERY DAVIS'}</h1>
              <div className="w-12 h-[3px] my-4" style={{ backgroundColor: brandAccent }}/>
              <p className="font-bold tracking-[0.6em] uppercase" style={{ color: ON_WHITE, opacity: 0.5, fontFamily: data.fontTitle || data.fontFamily || undefined, fontSize: fs(15) }}>{data.jobTitle||'CREATIVE DIRECTOR'}</p>
            </div>
          </DraggableElement>
          <p className="font-black tracking-[0.5em] uppercase" style={{ color: ON_WHITE, opacity: 0.2, fontFamily: data.fontFamily || undefined, fontSize: fs(11) }}>{data.companyName||'LARANA, INC.'}</p>
        </div>
        <div className="flex-[0.46] flex flex-col justify-between items-end px-12 py-14" style={{ backgroundColor: panelBg }}>
          {renderAvatar(brandAccent, 110)}
          <div className="flex flex-col gap-6 w-full">
              <p className="font-black tracking-[0.6em] uppercase mb-1" style={{ color: ON_COLOR, opacity: 0.3, fontSize: fs(10) }}>CONTACT</p>
              {[{icon:Phone,value:data.phone||'+1 234 567 8900'},{icon:Mail,value:data.email||'hello@larana.com'},{icon:Globe,value:data.website||'www.larana.com'},{icon:MapPin,value:data.address||'Any City, USA'}].map((item,i)=>(
                <div key={i} className="flex items-center gap-5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: brandAccent }}>
                    <item.icon size={17} style={{ color: '#ffffff' }} />
                  </div>
                  <span className="font-light tracking-wide" style={{ color: ON_COLOR, fontSize: fs(19) }}>{item.value}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-8 z-20" style={{ backgroundColor: panelBg }}>
        <div className="absolute top-8 left-8 w-10 h-[2px]" style={{ backgroundColor: brandAccent }}/>
        <div className="absolute bottom-8 right-8 w-10 h-[2px]" style={{ backgroundColor: brandAccent }}/>
        <DraggableElement elementKey="logo" className="w-16 h-16">
          <svg viewBox="0 0 80 80" className="w-full h-full fill-current" style={{ color: brandAccent }}>
            {[0,45,90,135,180,225,270,315].map(r=><path key={r} d="M40,12C43,12,46,26,46,36C46,44,43,45,40,45C37,45,34,44,34,36C34,26,37,12,40,12Z" transform={`rotate(${r} 40 40)`}/>)}
          </svg>
        </DraggableElement>
        <div className="text-center">
          <h2 className="font-black uppercase tracking-tight" style={{ color: ON_COLOR, fontFamily: data.fontFamily || undefined, fontSize: fs(48) }}>{data.companyName||'LARANA, INC.'}</h2>
          <p className="font-black tracking-[0.6em] uppercase mt-2" style={{ color: ON_COLOR, opacity: 0.3, fontSize: fs(10) }}>PREMIUM DESIGN STUDIO</p>
        </div>
        <DraggableElement elementKey="qr" className="flex flex-col items-center gap-3 mt-2">
          <div className="bg-white p-3 rounded-xl shadow-2xl">
            <SharedQRCode url={data.qrCodeUrl || ''} color={qc} size={200} className="w-20 h-20" />
          </div>
          <p className="font-bold tracking-[0.5em] uppercase" style={{ color: ON_COLOR, opacity: 0.3, fontSize: fs(10) }}>Scan to Connect</p>
        </DraggableElement>
      </div>
    );
  };
