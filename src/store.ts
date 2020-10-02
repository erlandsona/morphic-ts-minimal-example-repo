// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/redux-immutable` if it exi... Remove this comment to see the full error message
import { combineReducers as combineImmutable } from 'redux-immutable'
import { createStore, combineReducers } from 'redux';
import counter, {
  init as counterI,
  State as CounterS,
  // StateT as CounterT
  Action as CounterA,
  // ActionT as CounterV
} from './features/counter/data';
import * as t from 'io-ts'
// import { flow } from 'fp-ts/function'
import { summonFor } from '@morphic-ts/batteries/lib/summoner-ESBST'
// import { Reducer } from 'react'
// import { flow } from 'fp-ts/function'
// import { Map } from 'immutable'

const { summon, tagged } = summonFor<{}>({})

export const State = summon(F =>
  F.interface({
    tsReducer: CounterS(F),
  }, 'Top-Level State')
)
export type StateT = t.TypeOf<typeof State.type>

const Counter = summon(F =>
  F.interface({ type: F.stringLiteral('Counter'), _: CounterA(F) }, 'Counter')
)

export const Action = tagged('type')({
  Counter
})
export type ActionT = t.TypeOf<typeof Action.type>

// type Store = Reducer<StateT, ActionT>

export default createStore(
  combineReducers({
    tsReducer: Action.createReducer(counterI)({
      Counter: ({ _ }) => counter(_),
    }),
    ...combineImmutable({}),
  })
);
