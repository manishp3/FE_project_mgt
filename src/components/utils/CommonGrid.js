import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useMemo } from 'react'
import { faEdit, faEye, faPen, faTrash, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { MdDeleteOutline, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { FaEquals } from 'react-icons/fa';
import { GoPencil } from "react-icons/go";
// import CreateIcon from '@material-ui/icons/Create';
import { Badge } from 'reactstrap';
import { RxEyeOpen } from "react-icons/rx";
import { convertDecimalHoursToFormat, convertInputedToMainFormat } from '../service/TimeFormat';

const CommonGrid = ({ headers, accessorKey, data, allowDelete, allowEdit,
    handleDelete, getedtidata, handleImageReference, handleTimeTrackingModal }) => {
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
                                <RxEyeOpen style={{ fontSize: "20px" }} title="reference attachment" />
                                // <FontAwesomeIcon style={{ color: "blue", fontSize: "20px" }} icon={faEye}  />
                            }
                        </span>

                    )
                };
            }
            if (header == "Time Tracking") {
                return {
                    accessorKey: accessor,
                    header,
                    Cell: ({ cell, row }) => {
                        const displayTime = convertDecimalHoursToFormat(row?.original?.time_spent);
                        console.log("displayTime::", displayTime);
                        return (
                            <div onClick={() => handleTimeTrackingModal(row.original._id)}>
                                {row.original.time_spent ? <span className='badge border border-info text-info'>{displayTime}</span> : <FontAwesomeIcon size={24} icon={faEllipsis} />}
                            </div>
                        )
                        // <span onClick={()=>handleTimeTrackingModal(row.original._id)}>{}</span>
                    }
                }
            }
            if (header == "Assignee") {
                return {
                    accessorKey: accessor,
                    header,
                    Cell: ({ cell, row }) => (
                        <div style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: "5px" }}>
                            <img src={import.meta.env.VITE_API_URL_USER + row.original?.assign_to?.image} height="30px" width="30px" style={{ borderRadius: "50%", }} />
                            <p className='m-0'>{row.original?.assign_to?.email}</p>
                        </div>

                    )
                };
            }
            if (header == "Status") {
                return {
                    accessorKey: accessor,
                    header,
                    Cell: ({ cell, row }) => (

                        <span style={{ cursor: "pointer" }}>
                            {/* <Badge>{row.original.status}</Badge> */}
                            <span class="badge bg-info-subtle text-info">{row.original.status}</span>
                        </span>

                    )
                };
            }
            if (header == "Priority") {
                return {
                    accessorKey: accessor,
                    header,
                    Cell: ({ cell, row }) => {
                        if (row.original.priority == "Low") {
                            return (
                                <span className='badge bg-success'><MdKeyboardArrowDown style={{ color: "orange" }} />
                                    {' ' + row.original.priority} </span>
                            )
                        }
                        else if (row.original.priority == "Normal") {
                            return (

                                <span className='badge bg-info'><FaEquals style={{ color: "orange" }} />{" " + row.original.priority} </span>
                            )
                        }
                        else {
                            return (
                                <span className='badge bg-danger'><MdKeyboardArrowUp style={{ color: "orange" }} />{" " + row.original.priority} </span>
                            )

                        }
                        // <span style={{ cursor: "pointer" }}>
                        //     {row.original.priority == "Low" ?
                        //     <p>{row.original.priority + ' ' } <MdKeyboardArrowDown style={{ color: "orange" }}/></p>
                        //         : }
                        // </span>

                    }
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
                                    {/* <i class="ri-pencil-fill"></i> */}
                                    <GoPencil title='Edit' />
                                    {/* <FontAwesomeIcon icon={faPen}  /> */}
                                </span>
                            )}
                            {allowDelete !== 0 && (
                                <span
                                    style={{ fontSize: "22px", cursor: "pointer", padding: "5px" }}
                                    onClick={() => handleDelete(id)}
                                >
                                    <MdDeleteOutline title="Delete" />
                                    {/* <FontAwesomeIcon icon={faTrash}  /> */}
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