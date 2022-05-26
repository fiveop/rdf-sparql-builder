/*

  This example builds a query with two filters.

*/
import rdf from '@rdfjs/data-model'
import namespace from '@rdfjs/namespace'
import * as sparql from '../index.js'

const ns = {
  ex: namespace('http://example.org/'),
  rdf: namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#type')
}

const observation = rdf.variable('observation')
const date = rdf.variable('date')
const temperature = rdf.variable('temperature')
const start = rdf.literal('2020-01-01T00:00:00.000Z', rdf.namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
const end = rdf.literal('2020-01-02T00:00:00.000Z', rdf.namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))

const query = sparql.select([date, temperature])
  .where([
    [observation, ns.rdf.type, ns.ex.Observation],
    [observation, ns.ex.date, date],
    [observation, ns.ex.temperature, temperature]
  ])
  .filter([
    sparql.gte(date, start),
    sparql.lt(date, end)
  ])

console.log(query.toString())
