import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

const PdfDoc = () => {
    const [numPages, setNumPages] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [scale, setScale] = React.useState(1.0);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function changePage(offset) {
        setPageNumber((prevPageNumber) => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    function zoomIn() {
        setScale((prevScale) => prevScale + 0.5);
    }

    function zoomOut() {
        setScale((prevScale) => prevScale - 0.5);
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <Document
            className="mt-10 border-2 shadow-lg"
                file="https://entekhaab-bucket.s3.eu-north-1.amazonaws.com/1709410641629-1709404937942-Furqan%20Resume%20Dev%26DevOps.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} scale={scale} />
            </Document>

            <div className="flex items-center justify-center space-x-4">
                {numPages && numPages > 1 && (
                    <>
                        <button
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                            onClick={previousPage}
                            disabled={pageNumber <= 1}
                        >
                            Previous
                        </button>
                        <button
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                            onClick={nextPage}
                            disabled={pageNumber >= numPages}
                        >
                            Next
                        </button>
                    </>
                )}
                <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={zoomIn}>
                    Zoom In
                </button>
                <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={zoomOut}>
                    Zoom Out
                </button>
            </div>
            <p className="text-gray-600">
                Page {pageNumber} of {numPages}
            </p>
            <div className="flex items-center justify-center pb-10 space-x-4">
                <button className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700">Accept</button>
                <button className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">Reject</button>
            </div>
        </div>
    );
};

export default PdfDoc;
