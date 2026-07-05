"use client";

import jsPDF from "jspdf";

export default function DownloadButton({
  report,
}: {
  report: string;
}) {
  const downloadPDF = () => {
    const doc = new jsPDF();

    const lines = doc.splitTextToSize(report, 180);

    doc.setFontSize(16);
    doc.text("AI Interview Report", 15, 20);

    doc.setFontSize(11);
    doc.text(lines, 15, 35);

    doc.save("Interview_Report.pdf");
  };

  return (
    <button
      onClick={downloadPDF}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded"
    >
      Download PDF
    </button>
  );
}