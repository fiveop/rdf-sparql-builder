import { strictEqual } from 'assert'
import rdf from '@rdfjs/data-model'
import { describe, it } from 'mocha'
import DeleteData from '../lib/DeleteData.js'
import TriplePattern from '../lib/TriplePattern.js'
import ignoreWhitespaceEqual from './support/ignoreWhitespaceEqual.js'
import ns from './support/namespace.js'

describe('DeleteData', () => {
  it('should be a constructor', () => {
    strictEqual(typeof DeleteData, 'function')
  })

  it('should have a property type with the value DeleteData', () => {
    const ins = new DeleteData()

    strictEqual(ins.type, 'DeleteData')
  })

  it('should create a delete data query', () => {
    const temperature = rdf.literal('27')
    const humidity = rdf.literal('55')

    const ins = new DeleteData([
      new TriplePattern(ns.ex.Observation, ns.ex.temperature, temperature, ns.ex.graph),
      new TriplePattern(ns.ex.Observation, ns.ex.humidity, humidity, ns.ex.graph)
    ])

    const expected = `DELETE DATA {
        GRAPH <http://example.org/graph> {
          <http://example.org/Observation> <http://example.org/temperature> "27" .
          <http://example.org/Observation> <http://example.org/humidity> "55" .
        }
      }
    `

    ignoreWhitespaceEqual(ins, expected)
  })

  it('should create a delete query with the given queryPrefix', () => {
    const temperature = rdf.literal('27')
    const humidity = rdf.literal('55')

    const del = new DeleteData([
      new TriplePattern(ns.ex.Observation, ns.ex.temperature, temperature, ns.ex.graph),
      new TriplePattern(ns.ex.Observation, ns.ex.humidity, humidity, ns.ex.graph)
    ], {
      queryPrefix: '#pragma describe.strategy cbd\n'
    })

    const expected = `#pragma describe.strategy cbd
      DELETE DATA {
        GRAPH <http://example.org/graph> {
          <http://example.org/Observation> <http://example.org/temperature> "27" .
          <http://example.org/Observation> <http://example.org/humidity> "55" .
        }
      }
    `

    ignoreWhitespaceEqual(del, expected)
  })
})
