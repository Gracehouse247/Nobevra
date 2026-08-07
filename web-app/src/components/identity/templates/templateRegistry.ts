import React from 'react';
import { LaranaIncCard } from './cards/LaranaIncCard';
import { ClaudiaAlvesCard } from './cards/ClaudiaAlvesCard';
import { ChastainKineticCard } from './cards/ChastainKineticCard';
import { AldenaireExecutiveCard } from './cards/AldenaireExecutiveCard';
import { WilsonDynamicCard } from './cards/WilsonDynamicCard';
import { ThynkAzureCard } from './cards/ThynkAzureCard';
import { RosaDynamicCard } from './cards/RosaDynamicCard';
import { LiceriaCrimsonCard } from './cards/LiceriaCrimsonCard';
import { AveryExecutiveCard } from './cards/AveryExecutiveCard';
import { EliteChevronCard } from './cards/EliteChevronCard';
import { RimberioCard } from './cards/RimberioCard';
import { DynamicWaveCard } from './cards/DynamicWaveCard';
import { IngoudeCard } from './cards/IngoudeCard';
import { AdelineCard } from './cards/AdelineCard';
import { KogaxCard } from './cards/KogaxCard';
import { SalfordCard } from './cards/SalfordCard';
import { LiceriaLiquidCard } from './cards/LiceriaLiquidCard';
import { BorcelleCard } from './cards/BorcelleCard';
import { AndradeCard } from './cards/AndradeCard';
import { GallegoDynamicCard } from './cards/GallegoDynamicCard';

import { EliteChevronBackground } from './EliteChevronBackground';
import { RimberioBackground } from './RimberioBackground';
import { DynamicWaveBackground } from './DynamicWaveBackground';
import { IngoudeBackground } from './IngoudeBackground';
import { AdelineBackground } from './AdelineBackground';
import { KogaxBackground } from './KogaxBackground';
import { SalfordBackground } from './SalfordBackground';
import { LiceriaLiquidBackground } from './LiceriaLiquidBackground';
import { BorcelleBackground } from './BorcelleBackground';
import { AndradeBackground } from './AndradeBackground';
import { RosaCrystalBackground } from './RosaCrystalBackground';
import { RosaDynamicBackground } from './RosaDynamicBackground';
import { LiceriaCrimsonBackground } from './LiceriaCrimsonBackground';
import { GallegoDynamicBackground } from './GallegoDynamicBackground';
import { AveryExecutiveBackground } from './AveryExecutiveBackground';
import { ThynkAzureBackground } from './ThynkAzureBackground';
import { WilsonDynamicBackground } from './WilsonDynamicBackground';
import { AldenaireExecutiveBackground } from './AldenaireExecutiveBackground';
import { ChastainKineticBackground } from './ChastainKineticBackground';

export interface TemplateRegistryEntry {
    CardComponent: React.ComponentType<any> | null;
    BackgroundComponent: React.ComponentType<any> | null;
    theme: 'dark' | 'light';
}

export const CARD_TEMPLATE_REGISTRY: Record<string, TemplateRegistryEntry> = {
    'id-larana-inc': { CardComponent: LaranaIncCard, BackgroundComponent: null, theme: 'light' },
    'id-claudia-alves': { CardComponent: ClaudiaAlvesCard, BackgroundComponent: null, theme: 'light' },
    'id-chastain-kinetic': { CardComponent: ChastainKineticCard, BackgroundComponent: ChastainKineticBackground, theme: 'dark' },
    'id-aldenaire-executive': { CardComponent: AldenaireExecutiveCard, BackgroundComponent: AldenaireExecutiveBackground, theme: 'light' },
    'id-wilson-dynamic': { CardComponent: WilsonDynamicCard, BackgroundComponent: WilsonDynamicBackground, theme: 'light' },
    'id-thynk-azure': { CardComponent: ThynkAzureCard, BackgroundComponent: ThynkAzureBackground, theme: 'light' },
    'id-rosa-dynamic': { CardComponent: RosaDynamicCard, BackgroundComponent: RosaDynamicBackground, theme: 'light' },
    'id-rosa-crystal': { CardComponent: RosaDynamicCard, BackgroundComponent: RosaCrystalBackground, theme: 'light' },
    'id-liceria-crimson': { CardComponent: LiceriaCrimsonCard, BackgroundComponent: LiceriaCrimsonBackground, theme: 'dark' },
    'id-avery-executive': { CardComponent: AveryExecutiveCard, BackgroundComponent: AveryExecutiveBackground, theme: 'light' },
    'id-elite-chevron': { CardComponent: EliteChevronCard, BackgroundComponent: EliteChevronBackground, theme: 'light' },
    'id-rimberio-pro': { CardComponent: RimberioCard, BackgroundComponent: RimberioBackground, theme: 'dark' },
    'id-dynamic-wave-pro': { CardComponent: DynamicWaveCard, BackgroundComponent: DynamicWaveBackground, theme: 'light' },
    'id-ingoude-pro': { CardComponent: IngoudeCard, BackgroundComponent: IngoudeBackground, theme: 'dark' },
    'id-adeline-pro': { CardComponent: AdelineCard, BackgroundComponent: AdelineBackground, theme: 'dark' },
    'id-kogax-pro': { CardComponent: KogaxCard, BackgroundComponent: KogaxBackground, theme: 'dark' },
    'id-salford-pro': { CardComponent: SalfordCard, BackgroundComponent: SalfordBackground, theme: 'dark' },
    'id-liceria-liquid': { CardComponent: LiceriaLiquidCard, BackgroundComponent: LiceriaLiquidBackground, theme: 'dark' },
    'id-borcelle-pro': { CardComponent: BorcelleCard, BackgroundComponent: BorcelleBackground, theme: 'light' },
    'id-andrade-pro': { CardComponent: AndradeCard, BackgroundComponent: AndradeBackground, theme: 'dark' },
    'id-gallego-dynamic': { CardComponent: GallegoDynamicCard, BackgroundComponent: GallegoDynamicBackground, theme: 'dark' }
};
