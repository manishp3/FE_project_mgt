import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom';



const DashboardGrid = ({ headers, accessorKey, data, allowDelete, allowEdit,
  handleDelete, getedtidata, handleImageReference, handleTimeTrackingModal }) => {
  const navigate = useNavigate()
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
      if (header == "Name") {
        return {
          accessorKey: accessor,
          header,
          Cell: ({ cell, row }) => {
            console.log("log of row", row.original);

            return (
              // <div style={{ display: "flex", gap: "10px", flexDirection: "row" }}>

              // </div>
              // <span style={{ cursor: "pointer" }} onClick={() => navigate("project", { state: { project_id: row.original._id } })}>{row.original.label}</span>
              <span style={{ cursor: "pointer" }}>{row.original.label}</span>
            )
          }
        };
      }
      if (header == "Expiry Date") {
        return {
          accessorKey: accessor,
          header,
          Cell: ({ cell, row }) => {
            const due_str = new Date(row?.original?.due_date)
            const options = {
              timeZone: "Asia/Kolkata",
              day: "2-digit",
              month: "long", // gives full month name like "July"
              year: "numeric"
            };
            return (
              // <div style={{ display: "flex", gap: "10px", flexDirection: "row" }}>

              // </div>
              <span>{due_str ? due_str.toLocaleDateString("en-IN", options) : "-"}</span>
            )
          }
        };
      }
      if (header == "Status") {
        return {
          accessorKey: accessor,
          header,
          Cell: ({ cell, row }) => {
            const today = new Date()
            const todayUTC = new Date(Date.UTC(
              today.getUTCFullYear(),
              today.getUTCMonth(),
              today.getUTCDate()
            ))
            const dueDateStr = row?.original?.due_date;
            if (!dueDateStr) return <span>-</span>;
            const dueDate = new Date(dueDateStr);
            const dueDateUTC = new Date(Date.UTC(
              dueDate.getUTCFullYear(),
              dueDate.getUTCMonth(),
              dueDate.getUTCDate()
            ));
            const diffTime = dueDateUTC - todayUTC;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert ms to days

            let displayText = "";
            if (diffDays > 0) {
              displayText = `Expires in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
            } else if (diffDays === 0) {
              displayText = "Expires today";
            } else {
              displayText = `Expired ${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : ""} ago`;
            }

            return <span style={{ color: "red", backgroundColor: "#fff6e4", padding: "5px", borderRadius: "5px" }}>{displayText}</span>;
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