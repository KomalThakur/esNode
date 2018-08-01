const _ = require('lodash');
const esConfig = require('./esConfig')
const elasticsearch = require('elasticsearch');

const helper = require('./helper');

var client = new elasticsearch.Client({
  host: esConfig.esHost,
  log: 'trace'
});



async function getUniqueSessions(request) {

    const query = {
        "size": 0,
        "aggs": {
            "distinct_ids": {
                "value_count": {
                    "field": "session_id.keyword"
                }
            }
        }
    }
    const botname = request.query.botname || "";
    const last_updated = request.query.last_updated || "";
    const start_date = request.query.start_date || "";
    const end_date = request.query.end_date || "";
    const query_array = [];
    if (!_.isEmpty(botname))
        query_array.push(helper.buildQueryTemplate("botname", botname))
    if (!_.isEmpty(last_updated))
        query_array.push(helper.buildQueryTemplate("last_updated", last_updated))
    if (!_.isEmpty(start_date) && !_.isEmpty(end_date))
        query_array.push(helper.buildRangeQueryTemplate(start_date, end_date))
    if (!_.isEmpty(query_array)) {
        query['query'] = helper.buildBoolQuery([
            query_array
        ]);
    }

    console.log("query : ", query);
        
    const response = await client.search({
        index: esConfig.index,
        body: query
    })

    console.log("response : ", response);
    console.log("response parsed: ", JSON.parse(response)['aggregations']['distinct_ids']['value']);
    return JSON.parse(response)['aggregations']['distinct_ids']['value'];
}

module.exports = {
    getUniqueSessions
}