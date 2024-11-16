import React from 'react'

const BatchQuoteInfo = () => {
    return (
        <div className='batch-quote-InfoContainer'>
            <div className='download-batch'>
                <h2 className='excel-type'>Download Excel File</h2>
                <input
                    type="text"
                    placeholder={"ESQ_Batch_Upload.xls"}
                />
                <button
                    className="primary-theme-btn"
                >
                    DOWNLOAD
                </button>
            </div>
            <div className='upload-batch'>
                <h2 className='excel-type'>Upload Excel File</h2>
                <input
                    type="text"
                    placeholder={"Excelsheet.xls"}
                />
                <button
                    className="primary-theme-btn"
                >
                    UPLOAD
                </button>
            </div>
            <div className='note-container'>
                <span>Note</span>
                <span>1.	Download the Excel sheet.</span>
                <span>2.	Select Cost vs. Reliability.</span>
                <span>3.	Complete the attached .xls file and upload.</span>
                <span>4.	<span style={{ color: "#4fa8c2"}}>DO NOT CHANGE</span> tab names and columns.</span>
            </div>
            <center><button
                className="primary-theme-btn get-quote-btn"
            >
                GET QUOTE
            </button></center>
        </div>
    )
}

export default BatchQuoteInfo