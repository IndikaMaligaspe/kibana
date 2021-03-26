import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext,
} from 'react';

import {
  EuiDataGrid,
  EuiButtonIcon,
} from '@elastic/eui';


import _ from 'lodash';

import { CoreStart } from '../../../../src/core/public';


interface AlarmsGridDProps {
  http: CoreStart['http'];
  isAutoRefresh: boolean;
  setAlarmsData: Function;
  setDeleteAlarmId: Function;
  setShowModal: Function;
  setShowConfirmModal: Function;
}

interface Row {
    Alarm_ID: {
        formatted: string,
        raw: string,
    },
    Title: {
        formatted: string,
        raw: string,
    },
    Created: {
        formatted: string,
        raw: string,    
    },
    Updated: {
        formatted: string,
        raw: string,    
    },
    Status: {
        formatted: string,
        raw: string,    
    },
    Risk: {
        formatted: string,
        raw: string,    
    },
    Tag: {
        formatted: string,
        raw: string,    
    },
    Sources: {
        formatted: string,
        raw: string,    
    },
    Destinations: {
        formatted: string,
        raw: string,    
    },
}
const columns = [
    {
        id: 'Alarm_ID',
        displayAsText: 'Alarm ID',
        
    },
    {
        id: 'Title',
        displayAsText: 'Title',
        initiaWidth: 130,
    },
    {
        id: 'Created',
        displayAsText: 'Created',
        defaulltSortDirection: 'dsc',
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



const AlarmsGrid = ({http, isAutoRefresh,  setAlarmsData, setDeleteAlarmId, setShowModal, setShowConfirmModal} : AlarmsGridDProps) => {
    const [pagination, setPagination] = useState({pageIndex:0 , pageSize: 10});
    const [raw_data, setRawData] = useState<Row[]>([]);
    const [rowIndex, setRowIndex] = useState<number>(0)


    const [visibleColumns, setVisibleColumns] = useState(() =>
        columns.map(({ id }) => id)
    ); 
    // initialize to the full set of columns


    useEffect( () => {
        const id = setInterval(() =>{
            if(isAutoRefresh){
                loadData();
            }
        },10000);
        return () => clearInterval(id); 
    },[isAutoRefresh])  
    const DataContext = createContext(raw_data);
    const loadData = async () =>{
         const _raw_data:Row[] = [];     
         await http.get('/api/alarmsview/alarms').then(async (res) => {
                const init_data = await res.data.hits.hits;

                for (let i = 0; i< init_data.length; i++){
                    const _source = init_data[i]._source 
                    const alarmId = _source.alarm_id;
                    const title = _source.title;
                    const timestamp =  _source.timestamp;
                    const updatedTimestamp =  _source.updated_time;    
                    const status = _source.status;  
                    const risk = _source.risk_class;   
                    const tag = _source.tag;
                    const sources = _source.src_ips.join(',')
                    const destinations  = _source.dst_ips
                    _raw_data.push({
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
         });
         setRawData(_raw_data)
    }


    const trailingControlColumns = [
    {
        id: 'actions',
        name: 'Actoions',
        width: 40,
        headerCellRender: () => null,
        rowCellRender: function RowCellRender({ rowIndex}) {
            return (
                <div>
                    <EuiButtonIcon
                            aria-label="show actions"
                            iconType="eye"
                            color="text"
                            onClick={() => {onShowAlarmDetail(rowIndex)}}
                            /> 
                        <EuiButtonIcon
                            aria-label="show actions"
                            iconType="trash"
                            color="text"
                            onClick={() => {onDeleteAlarm(rowIndex)}}
                            /> 
                </div>
            );
        },
    }
    ]

    const onDeleteAlarm = async (rowIndex: number) => {
        setRowIndex(rowIndex);
        setDeleteAlarmId(raw_data[rowIndex].Alarm_ID.formatted);
        setShowConfirmModal(true);
    }


    const onShowAlarmDetail = (rowIndex: number) => {
        setAlarmsData(raw_data[rowIndex]);
        setShowModal(true);
    }
    const onChangeItemsPerPage = useCallback(
        (pageSize) => setPagination((pagination) => ({ ...pagination, pageSize, pageIndex: 0})),
        [setPagination]
    )
    
    const onChangePage = useCallback(
        (pageIndex) =>
            setPagination((pagination) => ({ ...pagination, pageIndex})),
            [setPagination]
    );


    const renderCellValue = useMemo(() => {
        return ({ rowIndex , columnId }) => {
        const data = useContext(DataContext);
        function getFormatted(rowIndex : number, columnId: string) : string{
            // console.log(`rowIndex - ${rowIndex} / columnId - ${columnId} / data - ${data[rowIndex][columnId].formatted}`)
            return data[rowIndex][columnId].formatted;
        }

        return data.hasOwnProperty(rowIndex)
            ? getFormatted(rowIndex, columnId)
            : null;
        };
        }, [raw_data]);
    
    
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
                />
            </DataContext.Provider>

    );
}

export default AlarmsGrid;