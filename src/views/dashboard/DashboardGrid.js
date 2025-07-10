import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useMemo } from 'react'



const DashboardGrid = ({ headers, accessorKey, data, allowDelete, allowEdit,
  handleDelete, getedtidata, handleImageReference, handleTimeTrackingModal }) => {
  console.log("from common grid:: headers", headers);
  console.log("from common grid:: accessorKey", accessorKey);
  console.log("from common grid:: data", data);

  const columns = useMemo(() => {
    let actionColumn = null;
    // Create dynamic columns based on the headers and accessorKey arrays
    const dynamicColumns = headers.map((header, index) => {
      const accessor = accessorKey[index]; // Get the 

      if (header == "Member") {
        return {
          accessorKey: accessor,
          header,
          Cell: ({ cell, row }) => {
            console.log("log of row in members::", row.original);

            return (
              // <span style={{ display: "flex", cursor: "pointer", alignItems: "center" }}>
              <div style={{ display: "flex", gap: "10px", flexDirection: "row" }}>
                <div >
                  <img src={import.meta.env.VITE_API_URL_USER + row.original?.image} height="40px" width="40px" style={{ borderRadius: "10px", }} />
                </div>
                <div style={{
                  display: "flex",
                  lineHeight: "8px",
                  justifyContent: "center",
                  flexDirection: "column",
                }}>
                  <p className='fw-bold'>{row.original?.name}</p>
                  <p className='text-muted'>{row.original?.role || "dummy role"}</p>
                </div>
              </div>
              // </span>
            )
          }
        };
      }



      return {
        accessorKey: accessor, // Use the 
        header,
      };
    });



    // grid not display

    if (actionColumn) {
      dynamicColumns.push(actionColumn);
    }

    return dynamicColumns;

  }, [headers, accessorKey]);
  const table = useMaterialReactTable({
    columns,
    data,
    // enablePagination: "true",
    // paginationPosition: "bottom",
    // paginationDisplayMode: "pages",
    // enableClickToCopy: true,
    enableRowNumbers: true,
    // enableRowOrdering: true,
    // enableEditing: true,
    // editDisplayMode: 'cell',
    // enableCellActions: true,
    renderBottomToolbarCustomActions: ({ table }) => (
      <div style={{ padding: "10px", fontWeight: "bold" }}>
        Total Records: {table.getPrePaginationRowModel().rows.length}
      </div>
    ),
  });

  return (
    <>
      <MaterialReactTable
        table={table}
        muiTableBodyProps={{
          className: "mrt-horizontal-scrollbar", // Apply the custom scrollbar class
        }}
        muiTableContainerProps={{
          className: "mrt-horizontal-scrollbar", // Apply the custom scrollbar class to the container
        }}
      />
    </>
  )
}

export default DashboardGrid