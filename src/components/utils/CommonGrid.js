import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useMemo } from 'react'
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

const CommonGrid = ({ headers, accessorKey, data, allowDelete, allowEdit,
    handleDelete, getedtidata, handleImageReference }) => {
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

                        <span style={{ cursor: "pointer" }} onClick={() => handleImageReference(row.original.image)}>
                            {row.original.image &&
                                <FontAwesomeIcon style={{ color: "blue", fontSize: "20px" }} icon={faEye} title="reference attachment" />}
                        </span>

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
                header: "Action",
                id: "action", // ✅ Give a unique ID, don't rely on "id" from data
                Cell: ({ row }) => {
                    const rowData = row.original; // ✅ Full row object
                    const id = rowData._id || rowData.id; // Adjust depending on your schema
                    console.log("rowData::", rowData);

                    return (
                        <div>
                            {allowEdit !== 0 && (
                                <span
                                    style={{ fontSize: "22px", cursor: "pointer", padding: "5px" }}
                                    onClick={() => getedtidata(id)}
                                >
                                    <FontAwesomeIcon icon={faEdit} title='Edit' />
                                </span>
                            )}
                            {allowDelete !== 0 && (
                                <span
                                    style={{ fontSize: "22px", cursor: "pointer", padding: "5px" }}
                                    onClick={() => handleDelete(id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} title="delete" />
                                </span>
                            )}
                        </div>
                    );
                },
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
        // enableClickToCopy: true,
        enableRowNumbers: true,
        enableRowOrdering: true,
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

export default CommonGrid