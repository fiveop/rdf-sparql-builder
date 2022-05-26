/*

  This example builds a query with a MIN and MAX aggregate.

*/
import rdf from '@rdfjs/data-model'
import namespace from '@rdfjs/namespace'
import * as sparql from '../index.js'

const ns = {
  ex: namespace('http://example.org/'),
  rdf: namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#type')
}

const observation = rdf.variable('observation')
const room = rdf.variable('room')
const temperature = rdf.variable('temperature')
const minTemperature = rdf.variable('minTemperature')
const maxTemperature = rdf.variable('maxTemperature')

const query = sparql.select([room, sparql.min(temperature, minTemperature), sparql.max(temperature, maxTemperature)])
  .where([
    [observation, ns.rdf.type, ns.ex.Observation],
    [observation, ns.ex.room, room],
    [observation, ns.ex.temperature, temperature]
  ])
  .groupBy([room])

console.log(query.toString())
