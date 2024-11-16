import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ButtonCell from "./Cells/ButtonCell";
import ColorBoxCell from "./Cells/ColorBoxCell";
import LinkCell from "./Cells/LinkCell";
import RoundTextCell from "./Cells/RoundTextCell";
import TextBoldCell from "./Cells/TextBoldCell";
import TextCell from "./Cells/TextCell";
import TransitPathCell from "./Cells/TransitPathCell";
import CostCell from "./Cells/CostCell";
import { useNavigate } from "react-router-dom";
import arrowhead from "../../assets/icons/arrowhead.svg";
import "./table.css";
import ColorBoxCellMobile from "./Cells/ColorBoxCellMobile";
const PaginationTable = ({ tableConfig, extraClasses, hideHighLightRow, msg }) => {
  const platformView = useSelector(
    (state) => state.platformView.renderViewType
  );
  const { data, headers, colWidth, config } = tableConfig;
  const navigate = useNavigate();
  const headerKeysOrdered = headers.map(({ key }) => key);
  const [tableData, setTableData] = useState({});
  const [pageIndex, setPageIndex] = useState(0);
  const [pageData, setPageData] = useState([]);

  const pageSize = 100;
  const paginationCount = data && data[0] ? Math.min(Math.ceil(data[0].length / pageSize), 5) : 0;

  const nextIndex = () => {
    if (pageIndex === paginationCount - 1) return;
    setPageIndex(pageIndex + 1);
  };

  const prevIndex = () => {
    if(pageIndex === 0) return;
    setPageIndex(pageIndex - 1);
  };
  
  useEffect(() => {
    const _pageData = tableData && tableData.length ? tableData.slice(pageIndex * pageSize, (pageIndex * pageSize) + pageSize) : [];
    if (!_pageData) {
      //if data is available in server we will mimic an api call over here to fetch the data for that index
      return;
    }
    setPageData(_pageData);
  }, [pageIndex, tableData]);

  useEffect(() => {
    const indexes = Object.keys(data);
    if (indexes.length === 0) {
      return;
    }
    setTableData(data[0]);
    setPageData(data[indexes[0]]);
  }, [data]);

  return (
    <div
      className={
        "pagination-table " + (extraClasses ? extraClasses.join(" ") : "")
      }
    >
      {/*<div className="table-search">
        <input placeholder="Search" type="text" />
      </div>*/}
      {platformView === "desktop" && (
        <div className="table-header">
          {headers.map((header, i) => {
            const headerVisible =
              header.visible && header.visible === "no" ? "hidden" : "visible";
            if (header.type === "bold") {
              return (
                <div
                  key={"table_header" + i}
                  style={{ width: colWidth[i], visibility: headerVisible }}
                  className="table-header-cell"
                >
                  <span>{header.name}</span>
                </div>
              );
            }
          })}
        </div>
      )}

      <div className="table-rows">
        {!pageData.length && <center><h2>{msg}</h2></center>}
        {pageData && pageData.map((row, i) => {
          return (
            <div
              className={
                "wrapper-table-row " +
                `${
                  (config &&
                    config?.rowSelectionActive &&
                    window.selectedRow && window.selectedRow.includes(i))
                    ? "open"
                    : ""
                }`
              }
              style={{ display: window.selectedBooking?.includes(i) ? 'none' : 'block'}}
            >
              <div key={"table_row" + i} className={`table-row ${hideHighLightRow ? '' : 'highLightRow'}`} onClick={() => row.transitDetails ? row.transitDetails() : row["shipmentId"] ? navigate(`/shipment-details/${row["shipmentId"].value}`) : null}>
                {headerKeysOrdered.map((key, j) => {
                  const cell = row[key];

                  if (cell.cellType === "round-text") {
                    return (
                      <RoundTextCell
                        key={"table_row" + i + cell + j}
                        width={colWidth[j]}
                        value={cell.value}
                      />
                    );
                  } else if (cell.cellType === "text") {
                    return (
                      <TextCell
                        key={"table_row" + i + cell + j}
                        width={colWidth[j]}
                        value={cell.value}
                        header={headers[j].key}
                      />
                    );
                  } else if (cell.cellType === "bold-text") {
                    return (
                      <TextBoldCell
                        key={"table_row" + i + cell + j}
                        width={colWidth[j]}
                        value={cell.value}
                      />
                    );
                  } else if (cell.cellType === "link-text") {
                    return (
                      <LinkCell
                        key={"table_row" + i + cell + j}
                        width={colWidth[j]}
                        value={cell.value}
                        header={headers[j].key}
                      />
                    );
                  } else if (cell.cellType === "buttons") {
                    return (
                      <ButtonCell
                        key={"table_row" + i + cell + j}
                        width={colWidth[j]}
                        buttons={cell.buttons}
                      />
                    );
                  } else if (cell.cellType === "lineItemCharges") {
                    return (
                      <CostCell
                        key={"table_row" + i + cell + j}
                        width={colWidth[j]}
                        path={cell.value}
                      />
                    );
                  } else if (cell.cellType === "transitPath") {
                    return (
                        <TransitPathCell
                            key={"table_row" + i + cell + j}
                            width={colWidth[j]}
                            path={cell.value}
                        />
                    );
                  } else if (cell.cellType === "colorBox") {
                    if (
                      platformView === "mobile" &&
                      headers[j].key === "reliability"
                    )
                      return (
                        <ColorBoxCellMobile
                          key={"table_row" + i + cell + j}
                          width={colWidth[j]}
                          value={cell.value}
                          color={cell.color}
                          textColor={cell.textColor}
                        />
                      );

                    return (
                      <ColorBoxCell
                        key={"table_row" + i + cell + j}
                        width={colWidth[j]}
                        value={cell.value}
                        color={cell.color}
                        textColor={cell.textColor}
                      />
                    );
                  } else {
                    return (
                      <div
                        className="table-cell"
                        key={"table_row" + i + cell + j}
                        style={{ width: colWidth[j] }}
                      ></div>
                    );
                  }
                })}
              </div>
              {config && config?.rowSelectionActive && (
                <div className="dropdown-cell">
                  <div className="dropdown-cell-content">
                    {window.selectedMetaData && window.selectedMetaData[i] && Object.entries(window.selectedMetaData[i]).map(
                      ([key, val], k) => {
                        return (
                          <div
                            key={key + i.toString() + k.toString()}
                            className={`row--${k.toString()} dropdown-row`}
                          >
                            <span className="dropdown-row-left">
                              <strong>
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, function (str) {
                                    return str.toUpperCase();
                                  })}
                                  :
                              </strong>
                              </span>
                              <span className="dropdown-row-right">
                              {val != null ? val : "N/A"}
                            </span>
                            {/* <span>
                    <strong>On Time Pick Up:</strong>90%
                  </span> */}
                          </div>
                        );
                      }
                    )}
                  </div>
                  <div
                    onClick={() => config?.removeRowSelection(i)}
                    className="close-dropdown"
                  >
                    <span></span>
                    <img src={arrowhead}></img>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div
        className={
          "table-pagination-controller " +
          (config?.navigationPosition ? config?.navigationPosition : "")
        }
      >
        <button className="primary-theme-btn" onClick={prevIndex}>
          Previous
        </button>
        {Array(paginationCount).fill(-1).map((_, index) => {
          return (
            <button
              className={
                "primary-theme-btn " +
                (index.toString() === pageIndex.toString()
                  ? "selected"
                  : "")
              }
              key={"page_" + index}
              onClick={() => {
                setPageIndex(index);
              }}
            >
              {parseInt(index) + 1}
            </button>
          );
        })}
        <button className="primary-theme-btn" onClick={nextIndex}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationTable;
