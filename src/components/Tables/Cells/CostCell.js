import React, { useState, useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import InfoIcon from "../../../assets/icons/info.svg";

const CostCell = (props) => {
    const { path } = props;
    const platformView = useSelector((state) => state.platformView.renderViewType);
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef(null);

    const handleButtonClick = (event) => {
        event.stopPropagation();
        if(!event.target.closest('.popover-details')){
            setIsOpen(!isOpen);
        }

    };

    const handleClickOutside = (event) => {
        event.stopPropagation();
        if (
            popoverRef.current &&
            !popoverRef.current.contains(event.target) &&
            !event.target.closest('.popover-content')) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div ref={popoverRef} style={{ width: props.width }} onClick={handleButtonClick} className="table-cell table-cell-text">
            <span><strong>{path.total}</strong></span>
            <div style={{ position: 'relative' }}>
                <button
                    type="button"
                    className="btn btn-link no-space indent-card button-no-border"
                    data-e2e-id="price-help-button"
                    aria-describedby="quote-result-breakdown"
                    onClick={handleButtonClick}
                >
                    {/*<img
                        className="space-sides-sm"
                        src={InfoIcon}
                        onClick={handleButtonClick}
                        alt="i"
                    />*/}

                    <span className="button-circle">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.992 0C3.576 0 0 3.584 0 8C0 12.416 3.576 16 7.992 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 7.992 0Z" fill="#00A3E0"/>
                          <path d="M7 7.00002L9 7V13H7V7.00002Z" fill="white"/>
                          <path d="M7 3H9V5H7V3Z" fill="white"/>
                        </svg>
                    </span>
                </button>
                {isOpen && (
                    <div
                        id="quote-result-breakdown"
                        role="tooltip-results"
                        className="popover-details popover bottom"

                    >
                        <div className="arrow"></div>
                        <h3 className="popover-title">Price Breakdown</h3>
                        <div className="close-button" onClick={() => setIsOpen(false)}>
                            <svg className="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm4.2 10.2L10.2 12 8 9.8l-2.2 2.2-1.8-1.8L6.2 8 4 5.8l1.8-1.8L8 6.2l2.2-2.2 1.8 1.8L9.8 8l2.2 2.2z"/>
                            </svg>
                        </div>
                        <div className="popover-content">
                            {path.child.map((lineItem, index) => (
                                <div className="row space-top-xs" key={index}>
                                    <div className="col-8">
                                        {lineItem.description}
                                        {lineItem.type && (
                                            <span>
                                                {" "}
                                                (<i>{lineItem.type.charAt(0).toUpperCase() + lineItem.type.slice(1).toLowerCase()}</i>)
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-4 text-right"><strong>{lineItem.charge}</strong></div>
                                </div>

                            ))}
                            <hr />
                            <span className="text-muted help-text">
                Carrier liability for loss or damage to cargo is $15.00 per pound for new items (or $0.10 per pound for used items) or a maximum of $100,000.00 per shipment (whichever is lower).
              </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CostCell;
