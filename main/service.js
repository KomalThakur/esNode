const _ = require('lodash')
const esConfig = require('./esConfig')
const elasticsearch = require('elasticsearch')

const helper = require('./helper')

var client = new elasticsearch.Client({
  host: esConfig.esHost,
  log: 'trace'
})

async function getUniqueSessions (request) {
  console.log('inside getUniqueSessions, query params : ', request.query)
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
  console.log('inside getTimeBasedUniqueSessions, query params : ', request.query)
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
  console.log('inside getTimeBasedBotSuccessRate, query params : ', request.query);
  const interval = request.query.interval || 'day';
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

  console.log('response : ', response);
  console.log('response parsed: ', response.aggregations.monthly.buckets);
  return response.aggregations.monthly.buckets;
}

async function getBotSuccessRate (request) {
  console.log('inside getBotSuccessRate, query params : ', request.query);
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

  console.log('response : ', response)
  console.log(
    'response parsed: ',
    response.aggregations.result.buckets[0]['successpercentage']['value']
  )
  return response.aggregations.result.buckets[0]['successpercentage']['value'];
}

async function getTimeBasedAverageInboundMessages (request) {
  console.log('inside getTimeBasedAverageInboundMessages, query params : ', request.query);
  const interval = request.query.interval || 'day';
  const query = {
    size: 0,
    aggs: {
      monthly: {
        date_histogram: {
          field: 'updatedAt',
          interval: interval
        },
        aggs: {
          sessions: {
            terms: {
              field: 'session_id.keyword',
              size: 1000,
              order: {
                _count: 'desc'
              }
            },
            aggs: {
              messageCount: {
                value_count: {
                  field: 'replyHistory.id'
                }
              }
            }
          },
          median: {
            percentiles_bucket: {
              buckets_path: 'sessions>messageCount',
              percents: [25, 50, 75, 100]
            }
          },
          avg_val: {
            avg_bucket: {
              buckets_path: 'sessions>messageCount'
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
  console.log('response parsed: ', response.aggregations.monthly.buckets);
  return response.aggregations.monthly.buckets;
}

async function getAverageInboundMessages (request) {
  console.log('inside getAverageInboundMessages, query params : ', request.query);
  const query = {
    size: 0,
    _source: {
      excludes: []
    },
    aggs: {
      sessions: {
        terms: {
          field: 'session_id.keyword',
          size: 1000,
          order: {
            _count: 'desc'
          }
        },
        aggs: {
          messageCount: {
            value_count: {
              field: 'replyHistory.id'
            }
          }
        }
      },
      median: {
        percentiles_bucket: {
          buckets_path: 'sessions>messageCount',
          percents: [25.0, 50.0, 75.0, 100.0]
        }
      },
      avg_val: {
        avg_bucket: {
          buckets_path: 'sessions>messageCount'
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
  console.log('response parsed: ', response.aggregations.avg_val.value);
  return response.aggregations.avg_val.value;
}

async function getMedianMessages (request) {
  console.log('inside getMedianMessages, query params : ', request.query);
  const query = {
    size: 0,
    _source: {
      excludes: []
    },
    aggs: {
      sessions: {
        terms: {
          field: 'session_id.keyword',
          size: 1000,
          order: {
            _count: 'desc'
          }
        },
        aggs: {
          messageCount: {
            value_count: {
              field: 'replyHistory.id'
            }
          }
        }
      },
      median: {
        percentiles_bucket: {
          buckets_path: 'sessions>messageCount',
          percents: [25.0, 50.0, 75.0, 100.0]
        }
      },
      avg_val: {
        avg_bucket: {
          buckets_path: 'sessions>messageCount'
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
  console.log('response parsed: ', response.aggregations.monthly.buckets);
  return response.aggregations.monthly.buckets;
}

async function getTimeBasedMedianMessages (request) {
  console.log('inside getTimeBasedMedianMessages, query params : ', request.query);
  const interval = request.query.interval || 'day';
  const query = {
    size: 0,
    aggs: {
      monthly: {
        date_histogram: {
          field: 'updatedAt',
          interval: interval
        },
        aggs: {
          sessions: {
            terms: {
              field: 'session_id.keyword',
              size: 1000,
              order: {
                _count: 'desc'
              }
            },
            aggs: {
              messageCount: {
                value_count: {
                  field: 'replyHistory.id'
                }
              }
            }
          },
          median: {
            percentiles_bucket: {
              buckets_path: 'sessions>messageCount',
              percents: [25, 50, 75, 100]
            }
          },
          avg_val: {
            avg_bucket: {
              buckets_path: 'sessions>messageCount'
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
  console.log('response parsed: ', response.aggregations.median.values['50.0']);
  return response.aggregations.median.values['50.0'];
}

async function getUserInteraction (request) {
  console.log('inside getUserInteraction, query params : ', request.query);
  const query = {
    _source: ['replyHistory.raw', 'session_id'],
    query: {
      bool: {
        must: [
          {
            script: {
              script: "doc['replyHistory.id'].values.length == 2"
            }
          }
        ],
        should: [
          {
            bool: {
              must: [
                {
                  match_phrase: {
                    'replyHistory.raw.keyword': 'Agent'
                  }
                },
                {
                  match_phrase: {
                    'replyHistory.raw.keyword': 'bot start'
                  }
                }
              ]
            }
          },
          {
            bool: {
              must: [
                {
                  match_phrase: {
                    'replyHistory.raw.keyword': 'AGENT'
                  }
                },
                {
                  match_phrase: {
                    'replyHistory.raw.keyword': 'bot start'
                  }
                }
              ]
            }
          },
          {
            bool: {
              must: [
                {
                  match_phrase: {
                    'replyHistory.raw.keyword': 'agent'
                  }
                },
                {
                  match_phrase: {
                    'replyHistory.raw.keyword': 'bot start'
                  }
                }
              ]
            }
          }
        ],
        minimum_should_match: 1
      }
    },
    size: 1000
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
  return response
}

async function getTimeBasedUserInteraction (request) {
  console.log('inside getTimeBasedUserInteraction, query params : ', request.query)
  const query = {
    _source: ['replyHistory.raw', 'session_id'],
    query: {
      bool: {
        must: [
          {
            script: {
              script: "doc['replyHistory.id'].values.length == 2"
            }
          }
        ],
        should: [
          {
            bool: {
              must: [
                {
                  match_phrase: {
                    'replyHistory.raw.keyword': 'Agent'
                  }
                },
                {
                  match_phrase: {
                    'replyHistory.raw.keyword': 'bot start'
                  }
                }
              ]
            }
          },
          {
            bool: {
              must: [
                {
                  match_phrase: {
                    'replyHistory.raw.keyword': 'AGENT'
                  }
                },
                {
                  match_phrase: {
                    'replyHistory.raw.keyword': 'bot start'
                  }
                }
              ]
            }
          },
          {
            bool: {
              must: [
                {
                  match_phrase: {
                    'replyHistory.raw.keyword': 'agent'
                  }
                },
                {
                  match_phrase: {
                    'replyHistory.raw.keyword': 'bot start'
                  }
                }
              ]
            }
          }
        ],
        minimum_should_match: 1
      }
    },
    size: 1000
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
  return response
}

async function getMissedIntents (request) {
  console.log('inside getMissedIntents, query params : ', request.query);
  const query = {
    size: 0,
    aggs: {
      moduleCount: {
        filter: {
          term: {
            'moduleNickname.keyword': 'Generic Error Module'
          }
        },
        aggs: {
          missedIntents: {
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

  console.log('response : ', response);
  console.log(
    'response parsed : ',
    response['aggregations']['moduleCount']['missedIntents']['value']
  );
  return response['aggregations']['moduleCount']['missedIntents']['value'];
}

async function getTimeBasedMissedIntents (request) {
  console.log('inside getTimeBasedMissedIntents, query params : ', request.query);
  const interval = request.query.interval || 'day';
  const query = {
    size: 0,
    aggs: {
      monthly: {
        date_histogram: {
          field: 'updatedAt',
          interval: interval
        },
        aggs: {
          moduleCount: {
            filter: {
              term: {
                'moduleNickname.keyword': 'Generic Error Module'
              }
            },
            aggs: {
              missedIntents: {
                value_count: {
                  field: 'session_id.keyword'
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

async function getMostUsedModules (request) {
  console.log('inside  getMostUsedModules, query params : ', request.query);
  const query = {
    size: 0,
    _source: ['moduleNickName'],
    aggs: {
      module: {
        terms: {
          field: 'moduleID.keyword'
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
  console.log('response parsed : ', response.aggregations.monthly.buckets);
  return response.aggregations.monthly.buckets;
}

async function getTimeBasedMostUsedModules (request) {
  console.log('inside getTimeBasedMostUsedModules, query params : ', request.query);
  const interval = request.query.interval || 'day';
  const query = {
    size: 0,
    aggs: {
      monthly: {
        date_histogram: {
          field: 'updatedAt',
          interval: interval
        },
        aggs: {
          module: {
            terms: {
              field: 'moduleID.keyword'
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
  console.log('response parsed: ', response.aggregations.monthly.buckets);
  return response.aggregations.monthly.buckets;
}

module.exports = {
  getUniqueSessions,
  getTimeBasedUniqueSessions,
  getTimeBasedBotSuccessRate,
  getBotSuccessRate,
  getTimeBasedAverageInboundMessages,
  getAverageInboundMessages,
  getMedianMessages,
  getTimeBasedMedianMessages,
  getUserInteraction,
  getTimeBasedUserInteraction,
  getMissedIntents,
  getTimeBasedMissedIntents,
  getMostUsedModules,
  getTimeBasedMostUsedModules
}
