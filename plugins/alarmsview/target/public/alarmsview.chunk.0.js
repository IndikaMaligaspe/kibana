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

/***/ "./public/components/alarmeventstable.tsx":
/*!************************************************!*\
  !*** ./public/components/alarmeventstable.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__);


;

const AlarmEventsTable = ({
  alarmId,
  stage,
  es_index,
  http
}) => {
  // console.log("Inside Events Component --- ", alarmId, stage, index);
  const [eventsList, setEventList] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [pageIndex, setPageIndex] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const [pageSize, setPageSize] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(5);
  const [totalItemCount, setTotalItemCount] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const [showPerPageOptions, setShowPerPageOptions] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  console.log("AlarmID - ", alarmId, "stage - ", stage);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    loadEvents();
  }, [alarmId, stage]);

  const loadEvents = async () => {
    if (!es_index) {
      return;
    }

    const query = {
      alarm_id: alarmId,
      stage: stage,
      es_index: es_index
    };
    await http.get('/api/alarmsview/alarmevents', {
      query: query
    }).then(async res => {
      const events = await res.data.hits.hits;

      if (events) {
        setEventList(events);
        setTotalItemCount(events.length);
      }
    });
  };

  const onTableChange = ({
    page = {}
  }) => {
    const {
      index: pageIndex,
      size: pageSize
    } = page;
    setPageIndex(pageIndex);
    setPageSize(pageSize);
  };

  let eventsTable = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null);

  if (eventsList != null) {
    const columns = [{
      field: 'event_id',
      name: 'Event ID',
      width: '20%'
    }, {
      field: 'timestamp',
      name: 'Timestamp',
      width: '10%'
    }, {
      field: 'title',
      name: 'Title',
      width: '10%'
    }, {
      field: 'source',
      name: 'Source',
      truncateText: false,
      width: '10%'
    }, {
      field: 'destination',
      name: 'Destination',
      width: '10%'
    }, {
      field: 'protocol',
      name: 'Protocol'
    }, {
      field: 'port_from',
      name: 'Port From',
      truncateText: true
    }, {
      field: 'port_to',
      name: 'Port To'
    }, {
      field: 'sensor',
      name: 'Sensor'
    }, {
      field: 'plugin',
      name: 'Plugin'
    }, {
      field: 'plugin_sid',
      name: 'Plugin SID'
    }];
    const events = eventsList.map(event => {
      return {
        "port_from": event._source.src_port,
        "port_to": event._source.dst_port,
        "event_id": event._source.event_id,
        "timestamp": event._source.timestamp,
        "title": event._source.title,
        "source": event._source.src_ip,
        "destination": event._source.dst_ip,
        "protocol": event._source.protocol,
        "sensor": event._source.sensor,
        "plugin": event._source.plugin_id,
        "plugin_sid": event._source.plugin_sid
      };
    });
    const pagination = {
      pageIndex,
      pageSize,
      totalItemCount,
      pageSizeOptions: [10, 50, 100],
      hidePerPageOptions: !showPerPageOptions
    };
    eventsTable = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiBasicTable"], {
      items: events,
      columns: columns,
      hasActions: false,
      pagination: pagination,
      onChange: onTableChange
    });
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, eventsTable);
};

/* harmony default export */ __webpack_exports__["default"] = (AlarmEventsTable);

/***/ }),

/***/ "./public/components/alarmmodal.tsx":
/*!******************************************!*\
  !*** ./public/components/alarmmodal.tsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _alarmrulestable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./alarmrulestable */ "./public/components/alarmrulestable.tsx");
/* harmony import */ var _alarmeventstable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./alarmeventstable */ "./public/components/alarmeventstable.tsx");





const AlarmsModal = ({
  showModal,
  alarmsData,
  setShowModal,
  http
}) => {
  const closeModal = () => {
    setStage(0);
    setShowModal(false);
  };

  const [alarmId, setAlarmId] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [stage, setStage] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const [index, setIndex] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  let modal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null);

  if (showModal) {
    const columns = [{
      field: 'Alarm_ID.formatted',
      name: 'Alarm ID'
    }, {
      field: 'Created.formatted',
      name: 'Created'
    }, {
      field: 'Updated.formatted',
      name: 'Updated'
    }, {
      field: 'Status.formatted',
      name: 'Status'
    }, {
      field: 'Risk.formatted',
      name: 'Risk'
    }, {
      field: 'Tag.formatted',
      name: 'Tag'
    }, {
      field: 'Sources.formatted',
      name: 'Sources',
      truncateText: false
    }, {
      field: 'Destinations.formatted',
      name: 'Destinations',
      truncateText: false
    }];
    const items = new Array(alarmsData);

    const updateProps = (stage, index, alarmsId) => {
      setAlarmId(alarmsId);
      setStage(stage);
      setIndex(index);
    };

    modal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiModal"], {
      onClose: closeModal,
      initialFocus: "[name=popswitch]",
      maxWidth: false
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexGroup"], {
      direction: "column"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexItem"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiPanel"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, alarmId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiSpacer"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiBasicTable"], {
      items: items,
      columns: columns
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiSpacer"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexItem"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiPanel"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_alarmrulestable__WEBPACK_IMPORTED_MODULE_2__["default"], {
      alarmId: alarmsData.Alarm_ID.formatted,
      http: http,
      updateProps: updateProps
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiSpacer"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiPanel"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_alarmeventstable__WEBPACK_IMPORTED_MODULE_3__["default"], {
      alarmId: alarmId,
      stage: stage,
      es_index: index,
      http: http
    }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiModalFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButton"], {
      onClick: closeModal,
      fill: true
    }, "Close")));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, modal);
};

/* harmony default export */ __webpack_exports__["default"] = (AlarmsModal);

/***/ }),

/***/ "./public/components/alarmpage.tsx":
/*!*****************************************!*\
  !*** ./public/components/alarmpage.tsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _alarmsgrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./alarmsgrid */ "./public/components/alarmsgrid.tsx");
/* harmony import */ var _alarmmodal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./alarmmodal */ "./public/components/alarmmodal.tsx");
/* harmony import */ var _confirmmodal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./confirmmodal */ "./public/components/confirmmodal.tsx");






const AlarmPage = ({
  http
}) => {
  const [showModal, setShowModal] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [showConfirmModal, setShowConfirmModal] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [alarmsData, setAlarmsData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [deleteAlarmId, setDeleteAlarmId] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [isAutoRefresh, setIsAutoRfresh] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const [autoRefreshMessage, setAutoRefreshMessageh] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("Turn-off auro-Refresh"); // let autoRefreshMessage = "Turn-off auro-Refresh";

  const setDelete = async isDelete => {
    setShowConfirmModal(false);

    if (isDelete) {
      const query = {
        alarm_id: deleteAlarmId
      };
      await http.delete('/api/alarmsview/alarms', {
        query: query
      }).then(async res => {
        if (res.data === "OK") {// loadData();
        }
      });
    }
  };

  const updateAutoRefresh = () => {
    if (isAutoRefresh) {
      setIsAutoRfresh(false);
      setAutoRefreshMessageh("Turn-on auro-Refresh");
    } else {
      setIsAutoRfresh(true);
      setAutoRefreshMessageh("Turn-off auro-Refresh");
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexGroup"], {
    gutterSize: "s",
    alignItems: "center",
    responsive: false,
    wrap: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexItem"], {
    grow: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButton"], {
    size: "s",
    fill: true,
    onClick: () => {
      updateAutoRefresh();
    }
  }, autoRefreshMessage))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiSpacer"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_confirmmodal__WEBPACK_IMPORTED_MODULE_4__["default"], {
    showConfirmModal: showConfirmModal,
    setDelete: setDelete,
    alarmId: deleteAlarmId,
    setShowConfirmModal: setShowConfirmModal
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_alarmmodal__WEBPACK_IMPORTED_MODULE_3__["default"], {
    showModal: showModal,
    alarmsData: alarmsData,
    http: http,
    setShowModal: setShowModal
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_alarmsgrid__WEBPACK_IMPORTED_MODULE_2__["default"], {
    http: http,
    setAlarmsData: setAlarmsData,
    setDeleteAlarmId: setDeleteAlarmId,
    setShowModal: setShowModal,
    setShowConfirmModal: setShowConfirmModal,
    isAutoRefresh: isAutoRefresh
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (AlarmPage);

/***/ }),

/***/ "./public/components/alarmrulestable.tsx":
/*!***********************************************!*\
  !*** ./public/components/alarmrulestable.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);



;
;

const AlarmRulesTable = ({
  alarmId,
  http,
  updateProps
}) => {
  const [rulesList, setRulesList] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [esIndex, setESIndex] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [eventsList, setEventList] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    loadRules();
  }, [alarmId]);

  const loadRules = async () => {
    await http.get('/api/alarmsview/alarmrules', {
      query: {
        alarm_Id: alarmId
      }
    }).then(async res => {
      const rulesData = await res.data.hits.hits;

      if (rulesData) {
        console.log(rulesData[0]._source.perm_index);
        setESIndex(rulesData[0]._source.perm_index);
        setRulesList(rulesData[0]._source.rules);
      }
    });
  };

  const loadEvents = async item => {
    updateProps(item.stage, esIndex.split('-')[1], alarmId);
  };

  let ruleTable = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null);

  if (rulesList != null) {
    const columns = [{
      name: 'Actions',
      actions: [{
        name: 'Events',
        description: '',
        type: 'icon',
        icon: 'eye',
        onClick: item => {
          loadEvents(item);
        }
      }],
      field: 'actions',
      truncateText: false
    }, {
      field: 'stage',
      name: 'Corr. Stage'
    }, {
      field: 'start_time',
      name: 'started'
    }, {
      field: 'end_time',
      name: 'Ended'
    }, {
      field: 'status',
      name: 'Status'
    }, {
      field: 'name',
      name: 'Name'
    }, {
      field: 'from',
      name: 'From'
    }, {
      field: 'to',
      name: 'To',
      truncateText: false
    }, {
      field: 'protocol',
      name: 'Protocol'
    }, {
      field: 'port_from',
      name: 'Port From'
    }, {
      field: 'port_to',
      name: 'Port To'
    }, {
      field: 'occurrence',
      name: 'Events'
    }];
    const items = rulesList.map(rule => {
      let start_time = rule.start_time ? new Date(rule.start_time).toLocaleString() : '-';
      let end_time = rule.end_time ? new Date(rule.end_time).toLocaleString() : '-';
      let status = rule.status ? rule.status : "active";
      return {
        "port_from": rule.port_from,
        "port_to": rule.port_to,
        "to": rule.to,
        "from": rule.from,
        "start_time": start_time,
        "end_time": end_time,
        "protocol": rule.protocol,
        "status": status,
        "name": rule.name,
        "stage": rule.stage,
        "occurrence": rule.occurrence
      };
    });
    ruleTable = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiBasicTable"], {
      items: items,
      columns: columns,
      hasActions: true
    });
  } // -------------------------------- This should go to a new eventsTable componant-------------------------


  let eventsTable = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null);

  if (eventsList != null) {
    const columns = [{
      field: 'event_id',
      name: 'Event ID',
      width: '20%'
    }, {
      field: 'timestamp',
      name: 'Timestamp',
      width: '10%'
    }, {
      field: 'title',
      name: 'Title',
      width: '10%'
    }, {
      field: 'source',
      name: 'Source',
      truncateText: false,
      fullwidth: true,
      width: '10%'
    }, {
      field: 'destination',
      name: 'Destination',
      width: '10%'
    }, {
      field: 'protocol',
      name: 'Protocol'
    }, {
      field: 'port_from',
      name: 'Port From',
      truncateText: true
    }, {
      field: 'port_to',
      name: 'Port To'
    }, {
      field: 'sensor',
      name: 'Sensor'
    }, {
      field: 'plugin',
      name: 'Plugin'
    }, {
      field: 'plugin_sid',
      name: 'Plugin SID'
    }];
    const events = eventsList.map(event => {
      return {
        "port_from": event._source.src_port,
        "port_to": event._source.dst_port,
        "event_id": event._source.event_id,
        "timestamp": event._source.timestamp,
        "title": event._source.title,
        "source": event._source.src_ip,
        "destination": event._source.dst_ip,
        "protocol": event._source.protocol,
        "sensor": event._source.sensor,
        "plugin": event._source.plugin_id,
        "plugin_sid": event._source.plugin_sid
      };
    });
    eventsTable = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiBasicTable"], {
      items: events,
      columns: columns,
      hasActions: false
    });
  } // -------------------------------------End Events Table--------------


  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, ruleTable);
};

/* harmony default export */ __webpack_exports__["default"] = (AlarmRulesTable);

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


const columns = [{
  id: 'Alarm_ID',
  displayAsText: 'Alarm ID'
}, {
  id: 'Title',
  displayAsText: 'Title',
  initiaWidth: 130
}, {
  id: 'Created',
  displayAsText: 'Created',
  defaulltSortDirection: 'dsc'
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

const AlarmsGrid = ({
  http,
  isAutoRefresh,
  setAlarmsData,
  setDeleteAlarmId,
  setShowModal,
  setShowConfirmModal
}) => {
  const [pagination, setPagination] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    pageIndex: 0,
    pageSize: 10
  });
  const [raw_data, setRawData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [rowIndex, setRowIndex] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const [visibleColumns, setVisibleColumns] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(() => columns.map(({
    id
  }) => id)); // initialize to the full set of columns

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const id = setInterval(() => {
      if (isAutoRefresh) {
        loadData();
      }
    }, 10000);
    return () => clearInterval(id);
  }, [isAutoRefresh]);
  const DataContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])(raw_data);

  const loadData = async () => {
    const _raw_data = [];
    await http.get('/api/alarmsview/alarms').then(async res => {
      const init_data = await res.data.hits.hits;

      for (let i = 0; i < init_data.length; i++) {
        const _source = init_data[i]._source;
        const alarmId = _source.alarm_id;
        const title = _source.title;
        const timestamp = _source.timestamp;
        const updatedTimestamp = _source.updated_time;
        const status = _source.status;
        const risk = _source.risk_class;
        const tag = _source.tag;

        const sources = _source.src_ips.join(',');

        const destinations = _source.dst_ips;

        _raw_data.push({
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
    });
    setRawData(_raw_data);
  };

  const trailingControlColumns = [{
    id: 'actions',
    name: 'Actoions',
    width: 40,
    headerCellRender: () => null,
    rowCellRender: function RowCellRender({
      rowIndex
    }) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButtonIcon"], {
        "aria-label": "show actions",
        iconType: "eye",
        color: "text",
        onClick: () => {
          onShowAlarmDetail(rowIndex);
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButtonIcon"], {
        "aria-label": "show actions",
        iconType: "trash",
        color: "text",
        onClick: () => {
          onDeleteAlarm(rowIndex);
        }
      }));
    }
  }];

  const onDeleteAlarm = async rowIndex => {
    setRowIndex(rowIndex);
    setDeleteAlarmId(raw_data[rowIndex].Alarm_ID.formatted);
    setShowConfirmModal(true);
  };

  const onShowAlarmDetail = rowIndex => {
    setAlarmsData(raw_data[rowIndex]);
    setShowModal(true);
  };

  const onChangeItemsPerPage = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(pageSize => setPagination(pagination => ({ ...pagination,
    pageSize,
    pageIndex: 0
  })), [setPagination]);
  const onChangePage = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(pageIndex => setPagination(pagination => ({ ...pagination,
    pageIndex
  })), [setPagination]);
  const renderCellValue = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    return ({
      rowIndex,
      columnId
    }) => {
      const data = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(DataContext);

      function getFormatted(rowIndex, columnId) {
        // console.log(`rowIndex - ${rowIndex} / columnId - ${columnId} / data - ${data[rowIndex][columnId].formatted}`)
        return data[rowIndex][columnId].formatted;
      }

      return data.hasOwnProperty(rowIndex) ? getFormatted(rowIndex, columnId) : null;
    };
  }, [raw_data]);
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
    }
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
/* harmony import */ var _kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @kbn/i18n/react */ "@kbn/i18n/react");
/* harmony import */ var _kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _alarmpage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./alarmpage */ "./public/components/alarmpage.tsx");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common */ "./common/index.ts");






const AlarmsviewApp = ({
  basename,
  notifications,
  http,
  navigation
}) => {
  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["BrowserRouter"], {
    basename: basename
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__["I18nProvider"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(navigation.ui.TopNavMenu, {
    appName: _common__WEBPACK_IMPORTED_MODULE_5__["PLUGIN_ID"],
    showSearchBar: false,
    useDefaultBehaviors: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_4__["EuiPage"], {
    restrictWidth: "1300px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_4__["EuiPageBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_4__["EuiPageHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_4__["EuiTitle"], {
    size: "l"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], {
    id: "alarmsview.helloWorldText",
    defaultMessage: "{name}",
    values: {
      name: _common__WEBPACK_IMPORTED_MODULE_5__["PLUGIN_NAME"]
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_4__["EuiPageContent"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_4__["EuiPageContentBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_alarmpage__WEBPACK_IMPORTED_MODULE_3__["default"], {
    http: http
  }))))))));
};

/***/ }),

/***/ "./public/components/confirmmodal.tsx":
/*!********************************************!*\
  !*** ./public/components/confirmmodal.tsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__);



const ConfirmModal = ({
  showConfirmModal,
  alarmId,
  setDelete,
  setShowConfirmModal
}) => {
  const closeConfirmLoadingModal = isDelete => {
    setDelete(isDelete);
    setShowConfirmModal(false);
  };

  let confirmLoadingModal;

  if (showConfirmModal) {
    confirmLoadingModal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiConfirmModal"], {
      title: "Delete Alarm !",
      onCancel: () => closeConfirmLoadingModal(false),
      onConfirm: () => closeConfirmLoadingModal(true),
      cancelButtonText: "No, don't do it",
      confirmButtonText: "Delete",
      buttonColor: "danger",
      defaultFocusedButton: "cancel"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "You\u2019re about to delete : ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, " ", alarmId, " "), "."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Are you sure you want to do this?"));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, confirmLoadingModal);
};

/* harmony default export */ __webpack_exports__["default"] = (ConfirmModal);

/***/ })

}]);
//# sourceMappingURL=alarmsview.chunk.0.js.map