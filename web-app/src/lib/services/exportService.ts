import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * High-Resolution Export Engine for Nobevra Professional Identity
 * Supports high-DPI image exports and print-ready PDFs (3.5" x 2")
 */
export const exportService = {
    /**
     * Exports a business card to high-resolution PNG
     */
    async exportToImage(elementId: string, fileName: string) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error('Export target element not found:', elementId);
            return;
        }
        
        try {
            const canvas = await html2canvas(element, {
                scale: 4, // 4x scale for Retina/High-res output (approx 1200 DPI equivalent)
                useCORS: true,
                backgroundColor: null,
                logging: false,
                onclone: (clonedDoc) => {
                    const clonedElement = clonedDoc.getElementById(elementId);
                    if (clonedElement) {
                        clonedElement.style.transform = 'scale(1)'; // Reset scale in clone for capture
                        clonedElement.style.borderRadius = '0'; // Often better for clean prints
                    }
                }
            });
            
            const link = document.createElement('a');
            link.download = `${fileName.replace(/\s+/g, '_')}_NobleID.png`;
            link.href = canvas.toDataURL('image/png', 1.0);
            link.click();
        } catch (err) {
            console.error('Failed to export image:', err);
        }
    },
    
    /**
     * Exports a business card to a print-ready PDF (standard 3.5" x 2")
     */
    async exportToPDF(elementId: string, fileName: string, orientation: 'horizontal' | 'vertical' = 'horizontal') {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error('Export target element not found:', elementId);
            return;
        }
        
        try {
            const canvas = await html2canvas(element, {
                scale: 5, // Extra high scale for print clarity
                useCORS: true,
                logging: false
            });
            
            const imgData = canvas.toDataURL('image/png', 1.0);
            
            // Business card dimensions in inches: 3.5 x 2
            const pdf = new jsPDF({
                orientation: orientation === 'horizontal' ? 'landscape' : 'portrait',
                unit: 'in',
                format: orientation === 'horizontal' ? [3.5, 2] : [2, 3.5]
            });
            
            pdf.addImage(
                imgData, 
                'PNG', 
                0, 
                0, 
                orientation === 'horizontal' ? 3.5 : 2, 
                orientation === 'horizontal' ? 2 : 3.5,
                undefined,
                'FAST'
            );
            
            pdf.save(`${fileName.replace(/\s+/g, '_')}_PrintReady.pdf`);
        } catch (err) {
            console.error('Failed to export PDF:', err);
        }
    },

    /**
     * Generates and downloads a vCard (.vcf) for instant contact saving
     */
    exportVCard(data: any) {
        const vcard = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `FN:${data.fullName}`,
            `TITLE:${data.jobTitle}`,
            `ORG:${data.companyName || 'Nobevra Identity'}`,
            `EMAIL;TYPE=INTERNET;TYPE=WORK:${data.email}`,
            `TEL;TYPE=CELL:${data.phone}`,
            `URL:${data.website || ''}`,
            `NOTE:${data.bio || ''}`,
            'END:VCARD'
        ].join('\n');

        const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${data.fullName.replace(/\s+/g, '_')}.vcf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
};
