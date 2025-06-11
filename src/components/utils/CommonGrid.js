import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useMemo } from 'react'
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

const CommonGrid = ({ headers, accessorKey, data,allowDelete, allowEdit,
    handleDelete, getedtidata, }) => {
    console.log("from common grid:: headers", headers);
    console.log("from common grid:: accessorKey", accessorKey);
    console.log("from common grid:: data", data);

    const columns = useMemo(() => {
        let actionColumn = null;
        // Create dynamic columns based on the headers and accessorKey arrays
        const dynamicColumns = headers.map((header, index) => {
            const accessor = accessorKey[index]; // Get the 
            if (header == "Reference") {
                return {
                    accessorKey: accessor,
                    header,
                    Cell: ({ cell, row }) => (
                        // <div style={{backgroundColor:"yellow"}}>
                        <FontAwesomeIcon style={{ color: "blue", fontSize: "20px" }} icon={faEye} />
                        // </div>

                    )
                };
            }

            return {
                accessorKey: accessor, // Use the 
                header,
            };
        });

        // Add the "Action" column statically at the end
        // const actionColumn = {

        if (allowEdit !== 0 || allowDelete !== 0) {
            actionColumn = {
                accessorKey: "id",
                header: "Action",
                Cell: ({ cell }) => (
                    <div>
                        {allowEdit != 0 ? (
                            <span style={{ fontSize: "22px", cursor: "pointer",padding:"5px" }}
                                onClick={() => getedtidata(cell.getValue())}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                        ) : null}

                        {allowDelete != 0 ? (
                            <span style={{ fontSize: "22px", cursor: "pointer",padding:"5px" }}
                                onClick={() => handleDelete(cell)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </span>

                        ) : null}
                    </div>
                ), // Handle action buttons
            };
        }

        // grid not display

        if (actionColumn) {
            dynamicColumns.push(actionColumn);
        }

        return dynamicColumns;
        // return [...dynamicColumns, actionColumn];
        // return [...dynamicColumns];
    }, [headers, accessorKey]);
    const table = useMaterialReactTable({
        columns,
        data,
        enablePagination: "true",
        paginationPosition: "bottom",
        paginationDisplayMode: "pages",
        enableClickToCopy: true,
        enableRowNumbers: true,
        enableRowOrdering: true,
        enableEditing: true,
        editDisplayMode: 'cell',
        enableCellActions: true,
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

export default CommonGrid