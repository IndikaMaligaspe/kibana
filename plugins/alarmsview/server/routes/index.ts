import value from '@elastic/eui/dist/eui_theme_*.json';
import { ParsedUrlQuery } from 'querystring';
import { IRouter } from '../../../../src/core/server';

import {
    KibanaRequest,  
 } from '../../../../src/core/server/http/router';
import esactions from '../elasticsearch.actions';

const fs = require("fs")

export function defineRoutes(router: IRouter ) {
   
  router.get(
    {
      path: '/api/alarmsview/example',
      validate: false, 
    },
    async (context, request, response) => {
      return response.ok({
        body: {
          time: new Date().toISOString(),
        },
      });
    }
  );
  router.get(
   {
     path: '/api/alarmsview/alarmsfilters',
     validate: false,
   },
   async (context, request, response) => {
    //  This is temporary, once we have the MITRE framework, 
    // we should pick this from a different data source.

      let rawdata = fs.readFileSync(__dirname+'/../data/intent.json');
      let intent = JSON.parse(rawdata);
      return response.ok({
        body: {
          data: intent
        }
      });
     }
  );

  router.get(
   {
     path: '/api/alarmsview/alarms',
     validate: false,
   },
   async (context, request, response) => {
     var esQuery = '{"match_all": {}}'
     if (request.url.query != null) {
        var query = request.url.query as ParsedUrlQuery
        if ((query)['esQuery']){
          esQuery = esQuery = (query)['esQuery'] as string
        }
     }
     console.log(esQuery);
    //  console.log("IMM - ",context.core.elasticsearch.client.asInternalUser.search())
      const result  = await esactions.getAllAlarms(1000, context, JSON.parse(esQuery))
      return response.ok({
        body: {
          data: result
        }
      });
     }
  );
  router.get(
   {
     path: '/api/alarmsview/alarmrules',
     validate: false,
   },
   async (context, request: KibanaRequest, response)=> {
     if (request.url.query != null) {
        var query = request.url.query as ParsedUrlQuery
        const alarmId = (query)['alarm_Id'] as string
          const result  = await esactions.getAlarmDetailsByAlarmId(alarmId, context);
          const esIndex = await result.hits.hits[0]._source.perm_index.split("-")[1]
          const rules = result.hits.hits[0]._source.rules
          
          if (rules) {
            const eventList = await rules.map(async (rule) =>{
              const events = await esactions.getAlarmEventsByStage(alarmId,rule.stage , esIndex, context)
              if (events){
                rule.events = events.hits.hits.length;
              }else{
                rules.events = 0;
              }
              return rule;
            })

            const ruleList = await Promise.all(eventList).then((value) => {
                return value
              }
            )
            result.hits.hits[0]._source.rules = ruleList;
          }
          console.log(result);
          return response.ok({
            body: {
              data: result
            }
          });
        }
        return response.badRequest()
    }
  );
  router.get(
   {
     path: '/api/alarmsview/alarmevents',
     validate: false,
   },
   async (context, request: KibanaRequest, response)=> {
     if (request.url.query != null) {
        var query = request.url.query as ParsedUrlQuery
        const alarmId = (query)['alarm_id'] as string;
        const stage = (query)['stage'] as string;
        const esIndex = (query)['es_index'] as string;
        

          let result  = await esactions.getAlarmEventsByStage(alarmId, stage, esIndex, context)
          const alarmEventsList = result.hits.hits;
          const eventsList:[string] = alarmEventsList.map((alarmEvent: any) =>{
            return (alarmEvent._source.event_id);
          });
          result  = await esactions.getEventsById(esIndex, eventsList, 100, context);
          return response.ok({
            body: {
              data: result
            }
          });
        }
        return response.badRequest();
    }
  );
  router.delete(
  {
     path: '/api/alarmsview/alarms',
     validate: false,
   },
   async (context, request: KibanaRequest, response)=> {
      var query = request.url.query as ParsedUrlQuery
      const alarmId = (query)['alarm_id'] as string;
      let deleteArr: object[] = new Array<object>(0);
      const alarms = await esactions.getAlarmDetailsByAlarmId(alarmId, context);
      alarms.hits.hits.map(async (hit: any)=>{
        const perm_index  = hit._source.perm_index;
        const events = await esactions.getAlarmEventsByAlarm(alarmId, perm_index.split('-')[1], context)  
        events.hits.hits.map((_hit:any) => {
          deleteArr.push({
            delete: {
              _index:_hit._index,
              _type:_hit._type,
              _id:_hit._id}
            });
        });
        esactions.bulk(deleteArr, context);
      });
      const result = await esactions.removeAlarmById(alarmId, context)
      if (result){
        return response.ok({
          body:
            {
              data: "OK"
            }
        })
      }
      return response.badRequest();
   }
  );
}
