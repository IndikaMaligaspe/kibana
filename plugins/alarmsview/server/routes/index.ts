import { ParsedUrlQuery } from 'querystring';
import { IRouter } from '../../../../src/core/server';

import {
    KibanaRequest,  
 } from '../../../../src/core/server/http/router';
import esactions from '../elasticsearch.actions';



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
     path: '/api/alarmsview/alarms',
     validate: false,
   },
   async (context, request, response) => {
      const result  = await esactions.getAllAlarms(100)
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
          const result  = await esactions.getAlarmDetailsByAlarmId(alarmId);
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
        

          let result  = await esactions.getAlarmEventsByStage(alarmId, stage, esIndex)
          const alarmEventsList = result.hits.hits;
          const eventsList:[string] = alarmEventsList.map((alarmEvent: any) =>{
            return (alarmEvent._source.event_id);
          });
          result  = await esactions.getEventsById(esIndex, eventsList, 100);
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
      const alarms = await esactions.getAlarmDetailsByAlarmId(alarmId);
      alarms.hits.hits.map(async (hit: any)=>{
        const perm_index  = hit._source.perm_index;
        const events = await esactions.getAlarmEventsByAlarm(alarmId, perm_index.split('-')[1])  
        events.hits.hits.map((_hit:any) => {
          deleteArr.push({
            delete: {
              _index:_hit._index,
              _type:_hit._type,
              _id:_hit._id}
            });
        });
        esactions.bulk(deleteArr);
      });
      const result = await esactions.removeAlarmById(alarmId)
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
