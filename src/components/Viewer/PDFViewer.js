import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const PDFViewer = ({pdffile}) => {
    const [pdfUrl, setPdfUrl] = useState(null);

    const fetchAndDisplayPdf = async () => {
        try {
            const pdfBlobUrl = pdfBlobToBase64(pdffile);
            setPdfUrl(pdfBlobUrl);
            
        } catch (error) {
            console.error('Failed to fetch PDF:', error);
        }
    };

    // * from binary to pdf display
    function pdfBlobToBase64(data) {
        const pdfData = new Uint8Array(data.data);
        let binaryString = '';
        
        // Process the data in smaller chunks
        const chunkSize = 1024;
        for (let i = 0; i < pdfData.length; i += chunkSize) {
            binaryString += String.fromCharCode.apply(null, pdfData.slice(i, i + chunkSize));
        }
    
        // Convert the binary string to base64
        const base64Pdf = btoa(binaryString);
        const base64String = `data:application/pdf;base64,${base64Pdf}`;
        
        return base64String;
    }

    useEffect(() => {
        fetchAndDisplayPdf();
    }, [])

    return (
        <div className='pdf-viewer'>
            <h2 className="title-deco-user" style={{marginBottom: '20px', marginTop: '20px'}}>เอกสารกรมธรรม์ที่ออก</h2>
            {pdfUrl && (
                <iframe
                    src={pdfUrl}
                    title="PDF Viewer"
                />
            )}
        </div>
    );
};
