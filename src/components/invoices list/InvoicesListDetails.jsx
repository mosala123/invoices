import React from "react";
import { useParams } from "react-router-dom";

const InvoicesListDetails = () => {
  const { invoiceId } = useParams(); // جلب رقم الفاتورة من الرابط

  return (
    <div className="container mt-4">
      <h3 className="text-center">Invoice Details</h3>
      <div className="card p-4 shadow-sm">
        <h5>Invoice Number: {invoiceId}</h5>
        <p>Here you can display more details about the invoice.</p>
      </div>
    </div>
  );
};

export default InvoicesListDetails;
