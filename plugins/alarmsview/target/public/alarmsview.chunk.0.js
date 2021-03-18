(window["alarmsview_bundle_jsonpfunction"] = window["alarmsview_bundle_jsonpfunction"] || []).push([[0],{

/***/ "./public/application.tsx":
/*!********************************!*\
  !*** ./public/application.tsx ***!
  \********************************/
/*! exports provided: renderApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderApp", function() { return renderApp; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/app */ "./public/components/app.tsx");



const renderApp = ({
  notifications,
  http
}, {
  navigation
}, {
  appBasePath,
  element
}) => {
  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_app__WEBPACK_IMPORTED_MODULE_2__["AlarmsviewApp"], {
    basename: appBasePath,
    notifications: notifications,
    http: http,
    navigation: navigation
  }), element);
  return () => react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.unmountComponentAtNode(element);
};

/***/ }),

/***/ "./public/components/alarmsgrid.tsx":
/*!******************************************!*\
  !*** ./public/components/alarmsgrid.tsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__);



const init_data = __webpack_require__(/*! ../data/rawData.json */ "./public/data/rawData.json");

let raw_data = [];
const DataContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])(raw_data);

for (let i = 0; i < init_data.length; i++) {
  const alarmId = init_data[i]._source.alarm_id;
  const title = init_data[i]._source.title;
  const timestamp = init_data[i]._source.timestamp;
  const updatedTimestamp = init_data[i]._source.updated_time;
  const status = init_data[i]._source.status;
  const risk = init_data[i]._source.risk_class;
  const tag = init_data[i]._source.tag;

  const sources = init_data[i]._source.src_ips.join(',');

  const destinations = init_data[i]._source.dst_ips.join(',');

  raw_data.push({
    Alarm_ID: {
      formatted: `${alarmId}`,
      raw: alarmId
    },
    Title: {
      formatted: `${title}`,
      raw: title
    },
    Created: {
      formatted: `${timestamp}`,
      raw: timestamp
    },
    Updated: {
      formatted: `${updatedTimestamp}`,
      raw: updatedTimestamp
    },
    Status: {
      formatted: `${status}`,
      raw: status
    },
    Risk: {
      formatted: `${risk}`,
      raw: risk
    },
    Tag: {
      formatted: `${tag}`,
      raw: tag
    },
    Sources: {
      formatted: `${sources}`,
      raw: sources
    },
    Destinations: {
      formatted: `${destinations}`,
      raw: destinations
    }
  });
}

const columns = [{
  id: 'Alarm_ID',
  displayAsText: 'Alarm ID',
  defaulltSortDirection: 'asc'
}, {
  id: 'Title',
  displayAsText: 'Title',
  initiaWidth: 130
}, {
  id: 'Created',
  displayAsText: 'Created'
}, {
  id: 'Updated',
  displayAsText: 'Updated'
}, {
  id: 'Status',
  displayAsText: 'Status'
}, {
  id: 'Risk',
  displayAsText: 'Risk'
}, {
  id: 'Tag',
  displayAsText: 'Tag'
}, {
  id: 'Sources',
  displayAsText: 'Sources'
}, {
  id: 'Destinations',
  displayAsText: 'Destinations'
}];
const trailingControlColumns = [{
  id: 'actions',
  width: 40,
  headerCellRender: () => null,
  rowCellRender: function RowCellRender() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButtonIcon"], {
      "aria-label": "show actions",
      iconType: "eye",
      color: "text",
      onClick: () => console.log("Open")
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButtonIcon"], {
      "aria-label": "show actions",
      iconType: "trash",
      color: "text",
      onClick: () => console.log("Trash")
    }));
  }
}];

const AlarmsGrid = () => {
  const [pagination, setPagination] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    pageIndex: 0,
    pageSize: 10
  });
  const onChangeItemsPerPage = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(pageSize => setPagination(pagination => ({ ...pagination,
    pageSize,
    pageIndex: 0
  })), [setPagination]);
  const onChangePage = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(pageIndex => setPagination(pagination => ({ ...pagination,
    pageIndex
  })), [setPagination]); // Column visibility

  const [visibleColumns, setVisibleColumns] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(() => columns.map(({
    id
  }) => id)); // initialize to the full set of columns

  const renderCellValue = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    return ({
      rowIndex,
      columnId,
      setCellProps
    }) => {
      const data = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(DataContext);
      Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
        if (columnId === 'amount') {
          if (data.hasOwnProperty(rowIndex)) {
            const numeric = parseFloat(data[rowIndex][columnId].match(/\d+\.\d+/)[0], 10);
            setCellProps({
              style: {
                backgroundColor: `rgba(0, 255, 0, ${numeric * 0.0002})`
              }
            });
          }
        }
      }, [rowIndex, columnId, setCellProps, data]);

      function getFormatted(rowIndex, columnId) {
        return data[rowIndex][columnId].formatted ? data[rowIndex][columnId].formatted : data[rowIndex][columnId];
      }

      return data.hasOwnProperty(rowIndex) ? getFormatted(rowIndex, columnId) : null;
    };
  }, []);
  const onColumnResize = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(eventData => {
    console.log(eventData);
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DataContext.Provider, {
    value: raw_data
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiDataGrid"], {
    "aria-label": "alarmsView",
    columns: columns,
    columnVisibility: {
      visibleColumns,
      setVisibleColumns
    },
    trailingControlColumns: trailingControlColumns,
    rowCount: raw_data.length,
    renderCellValue: renderCellValue,
    inMemory: {
      level: 'sorting'
    },
    pagination: { ...pagination,
      pageSizeOptions: [10, 50, 100],
      onChangeItemsPerPage: onChangeItemsPerPage,
      onChangePage: onChangePage
    },
    onColumnResize: onColumnResize.current
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (AlarmsGrid);

/***/ }),

/***/ "./public/components/app.tsx":
/*!***********************************!*\
  !*** ./public/components/app.tsx ***!
  \***********************************/
/*! exports provided: AlarmsviewApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlarmsviewApp", function() { return AlarmsviewApp; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @kbn/i18n */ "@kbn/i18n");
/* harmony import */ var _kbn_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_kbn_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @kbn/i18n/react */ "@kbn/i18n/react");
/* harmony import */ var _kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _alarmsgrid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./alarmsgrid */ "./public/components/alarmsgrid.tsx");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common */ "./common/index.ts");







const AlarmsviewApp = ({
  basename,
  notifications,
  http,
  navigation
}) => {
  // Use React hooks to manage state.
  const [timestamp, setTimestamp] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();

  const onClickHandler = () => {
    // Use the core http service to make a response to the server API.
    http.get('/api/alarmsview/example').then(res => {
      setTimestamp(res.time); // Use the core notifications service to display a success message.

      notifications.toasts.addSuccess(_kbn_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].translate('alarmsview.dataUpdated', {
        defaultMessage: 'Data updated'
      }));
    });
  }; // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.


  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["BrowserRouter"], {
    basename: basename
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__["I18nProvider"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(navigation.ui.TopNavMenu, {
    appName: _common__WEBPACK_IMPORTED_MODULE_6__["PLUGIN_ID"],
    showSearchBar: true,
    useDefaultBehaviors: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_5__["EuiPage"], {
    restrictWidth: "1000px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_5__["EuiPageBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_5__["EuiPageHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_5__["EuiTitle"], {
    size: "l"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
    id: "alarmsview.helloWorldText",
    defaultMessage: "{name}",
    values: {
      name: _common__WEBPACK_IMPORTED_MODULE_6__["PLUGIN_NAME"]
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_5__["EuiPageContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_5__["EuiPageContentHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_5__["EuiTitle"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
    id: "alarmsview.congratulationsTitle",
    defaultMessage: "Testing things out!"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_5__["EuiPageContentBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_5__["EuiText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
    id: "alarmsview.content",
    defaultMessage: "Look through the generated code and check out the plugin development documentation."
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_5__["EuiHorizontalRule"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
    id: "alarmsview.timestampText",
    defaultMessage: "Last timestamp: {time}",
    values: {
      time: timestamp ? timestamp : 'Unknown'
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_5__["EuiButton"], {
    type: "primary",
    size: "s",
    onClick: onClickHandler
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
    id: "alarmsview.buttonText",
    defaultMessage: "Get data"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_alarmsgrid__WEBPACK_IMPORTED_MODULE_4__["default"], null)))))))));
};

/***/ }),

/***/ "./public/data/rawData.json":
/*!**********************************!*\
  !*** ./public/data/rawData.json ***!
  \**********************************/
/*! exports provided: 0, 1, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"_index\":\"siem_alarms_debug\",\"_type\":\"_doc\",\"_id\":\"zS_xQngBOYiStdjiGNZN\",\"_version\":1,\"_score\":null,\"_source\":{\"dst_ips\":[\"192.168.8.100\"],\"src_ips\":[\"192.168.8.1\"],\"updated_time\":\"2021-03-18T01:26:32.000Z\",\"alarm_id\":\"jUlczYJDM\",\"kingdom\":\"Reconnaissance & Probing\",\"perm_index\":\"siem_alarms-2021.03.18\",\"tag\":\"Identified Threat\",\"@timestamp\":\"2021-03-18T01:26:38.803Z\",\"status\":\"Open\",\"title\":\"Ping Flood to 192.168.8.100\",\"timestamp\":\"2021-03-18T01:26:09.000Z\",\"rules\":[{\"port_from\":\"ANY\",\"to\":\"HOME_NET\",\"port_to\":\"ANY\",\"end_time\":1616030761,\"protocol\":\"ICMP\",\"start_time\":1616030761,\"status\":\"finished\",\"plugin_sid\":[2100384],\"occurrence\":1,\"plugin_id\":1001,\"type\":\"PluginRule\",\"rcvd_time\":1616030769,\"from\":\"ANY\",\"reliability\":1,\"stage\":1,\"timeout\":0,\"name\":\"ICMP Ping\"},{\"port_from\":\"ANY\",\"to\":\"192.168.8.100\",\"port_to\":\"ANY\",\"end_time\":1616030791,\"protocol\":\"ICMP\",\"status\":\"finished\",\"start_time\":1616030761,\"plugin_sid\":[2100384],\"occurrence\":3,\"plugin_id\":1001,\"type\":\"PluginRule\",\"from\":\"ANY\",\"reliability\":6,\"stage\":2,\"timeout\":3600,\"name\":\"ICMP Ping\"},{\"port_from\":\"ANY\",\"to\":\"192.168.8.100\",\"port_to\":\"ANY\",\"protocol\":\"ICMP\",\"start_time\":1616030791,\"plugin_sid\":[2100384],\"occurrence\":10,\"plugin_id\":1001,\"type\":\"PluginRule\",\"from\":\"ANY\",\"reliability\":10,\"stage\":3,\"timeout\":3600,\"name\":\"ICMP Ping\"}],\"category\":\"Misc Activity\",\"networks\":[\"192.168.0.0/16\"],\"risk\":1,\"risk_class\":\"Low\"},\"fields\":{\"updated_time\":[\"2021-03-18T01:26:32.000Z\"],\"@timestamp\":[\"2021-03-18T01:26:38.803Z\"],\"timestamp\":[\"2021-03-18T01:26:09.000Z\"]},\"sort\":[1616030798803]},{\"_index\":\"siem_alarms-2021.03.18\",\"_type\":\"_doc\",\"_id\":\"jUlczYJDM\",\"_version\":1,\"_score\":null,\"_source\":{\"dst_ips\":[\"192.168.8.100\"],\"src_ips\":[\"192.168.8.1\"],\"updated_time\":\"2021-03-18T01:26:32.000Z\",\"alarm_id\":\"jUlczYJDM\",\"kingdom\":\"Reconnaissance & Probing\",\"perm_index\":\"siem_alarms-2021.03.18\",\"tag\":\"Identified Threat\",\"@timestamp\":\"2021-03-18T01:26:38.803Z\",\"status\":\"Open\",\"title\":\"Ping Flood to 192.168.8.100\",\"timestamp\":\"2021-03-18T01:26:09.000Z\",\"rules\":[{\"port_from\":\"ANY\",\"to\":\"HOME_NET\",\"port_to\":\"ANY\",\"end_time\":1616030761,\"protocol\":\"ICMP\",\"start_time\":1616030761,\"status\":\"finished\",\"plugin_sid\":[2100384],\"occurrence\":1,\"plugin_id\":1001,\"type\":\"PluginRule\",\"rcvd_time\":1616030769,\"from\":\"ANY\",\"reliability\":1,\"stage\":1,\"timeout\":0,\"name\":\"ICMP Ping\"},{\"port_from\":\"ANY\",\"to\":\"192.168.8.100\",\"port_to\":\"ANY\",\"end_time\":1616030791,\"protocol\":\"ICMP\",\"status\":\"finished\",\"start_time\":1616030761,\"plugin_sid\":[2100384],\"occurrence\":3,\"plugin_id\":1001,\"type\":\"PluginRule\",\"from\":\"ANY\",\"reliability\":6,\"stage\":2,\"timeout\":3600,\"name\":\"ICMP Ping\"},{\"port_from\":\"ANY\",\"to\":\"192.168.8.100\",\"port_to\":\"ANY\",\"protocol\":\"ICMP\",\"start_time\":1616030791,\"plugin_sid\":[2100384],\"occurrence\":10,\"plugin_id\":1001,\"type\":\"PluginRule\",\"from\":\"ANY\",\"reliability\":10,\"stage\":3,\"timeout\":3600,\"name\":\"ICMP Ping\"}],\"category\":\"Misc Activity\",\"networks\":[\"192.168.0.0/16\"],\"risk\":1,\"risk_class\":\"Low\"},\"fields\":{\"updated_time\":[\"2021-03-18T01:26:32.000Z\"],\"@timestamp\":[\"2021-03-18T01:26:38.803Z\"],\"timestamp\":[\"2021-03-18T01:26:09.000Z\"]},\"sort\":[1616030798803]}]");

/***/ })

}]);
//# sourceMappingURL=alarmsview.chunk.0.js.map