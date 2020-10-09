// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/redux-immutable` if it exi... Remove this comment to see the full error message
import { combineReducers as combineImmutable } from 'redux-immutable'
import { createStore, combineReducers } from 'redux';
import counter, {
  init as counterI,
  State as CounterS,
  Action as CounterA,
  // ActionT as CounterV
} from './features/counter/data';
import * as t from 'io-ts'
import { flow } from 'fp-ts/function'
import { AsOpaque, AOfMorhpADT, AType, EType, Variant, Ctor, summon } from 'src/utils/data'
// import { Reducer } from 'react'
// import { flow } from 'fp-ts/function'
// import { Map } from 'immutable'

export const State = summon(F =>
  F.interface({
    tsReducer: CounterS(F),
  }, 'Top-Level State')
)
export type StateT = t.TypeOf<typeof State.type>

const Counter_ = Ctor('Counter', F => F.interface({_: CounterA(F)}, 'Counter'))
export interface Counter extends AType<typeof Counter_> {}
export interface CounterRaw extends EType<typeof Counter_> {}
export const Counter = AsOpaque<CounterRaw, Counter>()(Counter_)

export const Action = Variant({
  Counter
})
export type ActionT = AOfMorhpADT<typeof Action>

// type Store = Reducer<StateT, ActionT>

export default createStore(
  combineReducers({
    tsReducer: Action.createReducer(counterI)({
      Counter: flow(Action.lensFromProp('_').get, counter),
    }),
    ...combineImmutable({}),
  })
);
