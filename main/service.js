const _ = require('lodash')
const esConfig = require('./esConfig')
const elasticsearch = require('elasticsearch')

const helper = require('./helper')

var client = new elasticsearch.Client({
  host: esConfig.esHost,
  log: 'trace'
})

async function getUniqueSessions (request) {
  console.log('query params : ', request.query)
  const query = {
    size: 0,
    aggs: {
      distinct_ids: {
        value_count: {
          field: 'session_id.keyword'
        }
      }
    }
  }
  const botname = request.query.botname || ''
  const last_updated = request.query.last_updated || ''
  const start_date = request.query.start_date || ''
  const end_date = request.query.end_date || ''
  const query_array = []
  if (!_.isEmpty(botname)) {
    query_array.push(helper.buildQueryTemplate('botname', botname))
  }
  if (!_.isEmpty(last_updated)) {
    query_array.push(helper.buildQueryTemplate('last_updated', last_updated))
  }
  if (!_.isEmpty(start_date) && !_.isEmpty(end_date)) {
    query_array.push(helper.buildRangeQueryTemplate(start_date, end_date))
  }
  if (!_.isEmpty(query_array)) {
    query['query'] = helper.buildBoolQuery(query_array)
  }

  console.log('query : ', query)

  const response = await client.search({
    index: esConfig.index,
    body: query
  })

  console.log('response : ', response)
  console.log('response parsed: ', response.aggregations.distinct_ids.value)
  return response.aggregations.distinct_ids.value
}

async function getTimeBasedUniqueSessions (request) {
  console.log('query params : ', request.query)
  const interval = request.query.interval || 'day'
  const query = {
    size: 0,
    aggs: {
      monthly: {
        date_histogram: {
          field: 'updatedAt',
          interval: interval
        },
        aggs: {
          distinct_ids: {
            value_count: {
              field: 'session_id.keyword'
            }
          }
        }
      }
    }
  }
  const botname = request.query.botname || ''
  const last_updated = request.query.last_updated || ''
  const start_date = request.query.start_date || ''
  const end_date = request.query.end_date || ''
  const query_array = []
  if (!_.isEmpty(botname)) {
    query_array.push(helper.buildQueryTemplate('botname', botname))
  }
  if (!_.isEmpty(last_updated)) {
    query_array.push(helper.buildQueryTemplate('last_updated', last_updated))
  }
  if (!_.isEmpty(start_date) && !_.isEmpty(end_date)) {
    query_array.push(helper.buildRangeQueryTemplate(start_date, end_date))
  }
  if (!_.isEmpty(query_array)) {
    query['query'] = helper.buildBoolQuery(query_array)
  }

  console.log('query : ', query)

  const response = await client.search({
    index: esConfig.index,
    body: query
  })

  console.log('response : ', response)
  console.log('response parsed: ', response.aggregations.monthly.buckets)
  return response.aggregations.monthly.buckets
}

async function getTimeBasedBotSuccessRate (request) {
  console.log('query params : ', request.query)
  const interval = request.query.interval || 'day'
  const query = {
    size: 0,
    aggs: {
      monthly: {
        date_histogram: {
          field: 'updatedAt',
          interval: interval
        },
        aggs: {
          result: {
            terms: {
              script: "'success'"
            },
            aggs: {
              totalSessions: {
                value_count: {
                  field: '_index'
                }
              },
              agentSessions: {
                filter: {
                  term: {
                    'replyHistory.raw': 'agent'
                  }
                },
                aggs: {
                  total2: {
                    value_count: {
                      field: '_index'
                    }
                  }
                }
              },
              successpercentage: {
                bucket_script: {
                  buckets_path: {
                    agent: 'agentSessions>total2',
                    total: 'totalSessions'
                  },
                  script: '(1- (params.agent / params.total))*100'
                }
              }
            }
          }
        }
      }
    }
  }
  const botname = request.query.botname || ''
  const last_updated = request.query.last_updated || ''
  const start_date = request.query.start_date || ''
  const end_date = request.query.end_date || ''
  const query_array = []
  if (!_.isEmpty(botname)) {
    query_array.push(helper.buildQueryTemplate('botname', botname))
  }
  if (!_.isEmpty(last_updated)) {
    query_array.push(helper.buildQueryTemplate('last_updated', last_updated))
  }
  if (!_.isEmpty(start_date) && !_.isEmpty(end_date)) {
    query_array.push(helper.buildRangeQueryTemplate(start_date, end_date))
  }
  if (!_.isEmpty(query_array)) {
    query['query'] = helper.buildBoolQuery(query_array)
  }

  console.log('query : ', query)

  const response = await client.search({
    index: esConfig.index,
    body: query
  })

  console.log('response : ', response)
  console.log('response parsed: ', response.aggregations.monthly.buckets)
  return response.aggregations.monthly.buckets
}

async function getBotSuccessRate (request) {
  console.log('query params : ', request.query)
  const query = {
    size: 0,
    aggs: {
      result: {
        terms: {
          script: 'success'
        },
        aggs: {
          totalSessions: {
            value_count: {
              field: '_index'
            }
          },
          agentSessions: {
            filter: {
              term: {
                'replyHistory.raw': 'agent'
              }
            },
            aggs: {
              total2: {
                value_count: {
                  field: '_index'
                }
              }
            }
          },
          successpercentage: {
            bucket_script: {
              buckets_path: {
                agent: 'agentSessions>total2',
                total: 'totalSessions'
              },
              script: '(1- (params.agent / params.total))*100'
            }
          }
        }
      }
    }
  }
  const botname = request.query.botname || ''
  const last_updated = request.query.last_updated || ''
  const start_date = request.query.start_date || ''
  const end_date = request.query.end_date || ''
  const query_array = []
  if (!_.isEmpty(botname)) {
    query_array.push(helper.buildQueryTemplate('botname', botname))
  }
  if (!_.isEmpty(last_updated)) {
    query_array.push(helper.buildQueryTemplate('last_updated', last_updated))
  }
  if (!_.isEmpty(start_date) && !_.isEmpty(end_date)) {
    query_array.push(helper.buildRangeQueryTemplate(start_date, end_date))
  }
  if (!_.isEmpty(query_array)) {
    query['query'] = helper.buildBoolQuery(query_array)
  }

  console.log('query : ', query)

  const response = await client.search({
    index: esConfig.index,
    body: query
  })

  console.log('response : ', response);
  console.log('response parsed: ', response['aggregations']['result']['buckets'][0]['successpercentage']['value']);
  return response['aggregations']['result']['buckets'][0]['successpercentage']['value'];
}

module.exports = {
  getUniqueSessions,
  getTimeBasedUniqueSessions,
  getTimeBasedBotSuccessRate,
  getBotSuccessRate
}
