import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext,
  useRef,
} from 'react';

import {
  EuiDataGrid,
//   EuiLink,
//   EuiFlexGroup,
//   EuiFlexItem,
//   EuiPopover,
//   EuiPopoverTitle,
  EuiButtonIcon,
//   EuiSpacer,
} from '@elastic/eui';

import _ from 'lodash';

const init_data = require('../data/raw_data.json');


let  raw_data = [];
const DataContext = createContext(raw_data);
for (let i = 0; i< init_data.length; i++){
    const alarmId = init_data[i]._source.alarm_id;
    const title = init_data[i]._source.title;
    const timestamp =  init_data[i]._source.timestamp;
    const updatedTimestamp =  init_data[i]._source.updated_time;    
    const status = init_data[i]._source.status;  
    const risk = init_data[i]._source.risk_class;   
    const tag = init_data[i]._source.tag;
    const sources = init_data[i]._source.src_ips.join(',')
    const destinations  = init_data[i]._source.dst_ips.join(',')
    raw_data.push({
        Alarm_ID: {
            formatted: `${alarmId}`,
            raw: alarmId,
        },
        Title: {
            formatted: `${title}`,
            raw: title,
        },
        Created: {
            formatted: `${timestamp}`,
            raw: timestamp,
        },
        Updated: {
            formatted: `${updatedTimestamp}`,
            raw: updatedTimestamp,
        },
        Status: {
            formatted: `${status}`,
            raw: status,
        },
        Risk: {
            formatted: `${risk}`,
            raw: risk,
        },
        Tag: {
            formatted: `${tag}`,
            raw: tag,
        },
        Sources: {
            formatted: `${sources}`,
            raw: sources,
        },
        Destinations: {
            formatted: `${destinations}`,
            raw: destinations,
        },
    });
}

const columns = [
    {
        id: 'Alarm_ID',
        displayAsText: 'Alarm ID',
        defaulltSortDirection: 'asc',
    },
    {
        id: 'Title',
        displayAsText: 'Title',
        initiaWidth: 130,
    },
    {
        id: 'Created',
        displayAsText: 'Created',
    },
    {
        id: 'Updated',
        displayAsText: 'Updated',
    },
    {
        id: 'Status',
        displayAsText: 'Status',
    },
    {
        id: 'Risk',
        displayAsText: 'Risk',
    },
    {
        id: 'Tag',
        displayAsText: 'Tag',
    },
    {
        id: 'Sources',
        displayAsText: 'Sources',
    },
    {
        id: 'Destinations',
        displayAsText: 'Destinations',
    },
]

const trailingControlColumns = [
    {
        id: 'actions',
        width: 40,
        headerCellRender: () => null,
        rowCellRender: function RowCellRender() {
            return (
                <div>
                    <EuiButtonIcon
                            aria-label="show actions"
                            iconType="eye"
                            color="text"
                            onClick={() => console.log("Open")}
                            /> 
                        <EuiButtonIcon
                            aria-label="show actions"
                            iconType="trash"
                            color="text"
                            onClick={() => console.log("Trash")}
                            /> 
                </div>
            );
        },
    }
]

const AlarmsGrid = () => {
    const [pagination, setPagination] = useState({pageIndex:0 , pageSize: 10});
    const onChangeItemsPerPage = useCallback(
        (pageSize) => setPagination((pagination) => ({ ...pagination, pageSize, pageIndex: 0})),
        [setPagination]
    )
    
    const onChangePage = useCallback(
        (pageIndex) =>
            setPagination((pagination) => ({ ...pagination, pageIndex})),
            [setPagination]
    );

    // Column visibility
    const [visibleColumns, setVisibleColumns] = useState(() =>
        columns.map(({ id }) => id)
    ); // initialize to the full set of columns

    const renderCellValue = useMemo(() => {
        return ({ rowIndex, columnId, setCellProps }) => {
        const data = useContext(DataContext);
        useEffect(() => {
            if (columnId === 'amount') {
            if (data.hasOwnProperty(rowIndex)) {
                const numeric = parseFloat(
                data[rowIndex][columnId].match(/\d+\.\d+/)[0], 10);
                setCellProps({
                style: {
                    backgroundColor: `rgba(0, 255, 0, ${numeric * 0.0002})`,
                },
                });
            }
            }
        }, [rowIndex, columnId, setCellProps, data]);
        function getFormatted(rowIndex : any | undefined, columnId: any | undefined) {
            return data[rowIndex][columnId].formatted
            ? data[rowIndex][columnId].formatted
            : data[rowIndex][columnId];
        }

        return data.hasOwnProperty(rowIndex)
            ? getFormatted(rowIndex, columnId)
            : null;
        };
        }, []);
    
    const onColumnResize = useRef((eventData: any) => {
        console.log(eventData);
    });
    return (
        <DataContext.Provider value={raw_data}>
        <EuiDataGrid
            aria-label="alarmsView"
            columns={columns}
            columnVisibility={{ visibleColumns, setVisibleColumns }}
            trailingControlColumns={trailingControlColumns}
            rowCount={raw_data.length}
            renderCellValue={renderCellValue}
            inMemory={{ level: 'sorting' }}
            pagination={{
            ...pagination,
            pageSizeOptions: [10, 50, 100],
            onChangeItemsPerPage: onChangeItemsPerPage,
            onChangePage: onChangePage,
            }}
            onColumnResize={onColumnResize.current}
        />
        </DataContext.Provider>
    );
}

export default AlarmsGrid;