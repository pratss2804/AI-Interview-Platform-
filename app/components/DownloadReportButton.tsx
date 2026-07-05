"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";

interface Props {
  score: number;
  feedback: string;
}

export default function DownloadReportButton({
  score,
  feedback,
}: Props) {
  const [loading, setLoading] = useState(false);

  const downloadPDF = async () => {
    try {
      setLoading(true);

      const report = document.getElementById("report-content");

      if (!report) {
        toast.error("Report not found.");
        setLoading(false);
        return;
      }

      const canvas = await html2canvas(report, {
        scale: 2,
        backgroundColor: "#111827",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();

      const pdfHeight =
        (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
      );

      pdf.save("Interview_Report.pdf");

      toast.success("PDF Downloaded Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate PDF");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={downloadPDF}
      disabled={loading}
      className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center min-w-[220px] transition-all duration-300"
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        "📄 Download Report PDF"
      )}
    </button>
  );
}