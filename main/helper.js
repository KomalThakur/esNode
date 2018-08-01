const _ = require('lodash');

function buildBoolQuery(query_array) {
    const query = {"bool": {"must": []}}

    _.each(query_array, element => {
        query['bool']['must'].push(element)
    });
    return query;
}
    
function buildQueryTemplate(field, value) {
    const query_template = {
        "match_phrase": {
            field: value
        }
    }
    return query_template;
}


function buildRangeQueryTemplate(start_date, end_date){
    const query_template = {
        "range": {
            "updatedAt": {
                "gte": start_date,
                "lte": end_date
            }
        }
    }
    return query_template;
}

module.exports = {
    buildRangeQueryTemplate,
    buildQueryTemplate,
    buildBoolQuery
}
  