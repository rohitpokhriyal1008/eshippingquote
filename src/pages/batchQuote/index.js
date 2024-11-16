import React from 'react';
import "./../../components/BatchQuote/batchQuote.css";
import BatchQuoteInfo from "./../../components/BatchQuote/BatchQuoteInfo";

const BatchQuotePage = () => {
  return (
      <div className="batch-quote-container">
          <h2>BATCH QUOTE</h2>
          <BatchQuoteInfo />
      </div>
  )
}

export default BatchQuotePage;