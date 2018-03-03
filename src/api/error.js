/*
// Alternative implementation of Error extending:
function GraphError(graphErrors = [], graphData = {}, graphQuery = '', message) {
  this.message = message;
  this.stack = Error().stack;
  this.graphErrors = graphErrors;
  this.graphData = graphData;
  this.graphQuery = graphQuery;
  Error.call(this, message);
}
inherits(GraphError, Error);
//GraphError.prototype.name = "GraphError";
GraphError.prototype.toString = function() {
  const errorDescriptions = this.graphErrors.map(e => {
    let locationStr = '';
    if (e.locations) {
      locationStr = e.locations.map(l => `Line ${l.line}, column ${l.column}`).join('; ') + ': ';
    }

    return `${locationStr}${e.message}`
  }).join('\n');
  return this.message + ' Error details:\n' + errorDescriptions;
};
*/

class GraphError extends Error {
  constructor(graphErrors = [], graphData = {}, graphQuery = '', ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GraphError);
    }

    this.name = this.constructor.name;
    this.graphErrors = graphErrors;
    this.graphData = graphData;
    this.graphQuery = graphQuery;
    this.message = graphErrorToString(this);
    // Ensure you can see all the information in the browser
    console.error(this);
  }
}

function graphErrorToString(graphError) {
  const errorDescriptions = graphError.graphErrors.map(e => {
    let locationStr = '';
    if (e.locations) {
      locationStr = e.locations.map(l => `Line ${l.line}, column ${l.column}`).join(' and ') + ': ';
    }

    return `${locationStr}${e.message}`
  }).join('; ');
  return graphError.message + ': ' + errorDescriptions;
}

export {GraphError};
