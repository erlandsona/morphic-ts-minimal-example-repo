// import { Variant, Data } from "src/framework/actions";
import { AsOpaque, summon } from "src/utils/data";
import { AOfMorhpADT, AType, EType } from "@morphic-ts/summoners";
import { Ctor, __, Variant } from 'src/utils/data'
// import { Action } from "src/store";
// import { flow } from 'fp-ts/function'
// import { unknown } from "io-ts";



/**
 * You can use Opacified type (boilerplate can be derived from the snippet - copied in this repo)
 * Cleaner overall for usage (the boilerplate on definition site is the tradeoff - a good one IMHO)
 */
const Increment_ = Ctor('Increment', __)
export interface Increment extends AType<typeof Increment_> { }
export interface IncrementRaw extends EType<typeof Increment_> { }
export const Increment = AsOpaque<IncrementRaw, Increment>()(Increment_);


const Decrement_ = Ctor("Decrement", __);
export interface Decrement extends AType<typeof Decrement_> { }
export interface DecrementRaw extends EType<typeof Decrement_> { }
export const Decrement = AsOpaque<DecrementRaw, Decrement>()(Decrement_);

export const Action = Variant({
  Increment, Decrement
})
export type Action = AOfMorhpADT<typeof Action>;

const plus = (x: number) => (y: number) => x + y;

const State_ = summon((F) => F.interface({ data: F.number() }, "State"));
export interface State extends AType<typeof State_> { }
export interface StateRaw extends EType<typeof State_> { }
export const State = AsOpaque<StateRaw, State>()(State_);

/**
 * This one creates a reducer :)
 */
export const init = State.build({ data: 0 });
const reducer = Action.matchStrict({
  Increment: (_a: Action) => {
    console.log("Increment");
    return State.lensFromProp("data").modify(plus(1));
  },
  Decrement: (_a: Action) => {
    console.log("Decrement");
    return State.lensFromProp("data").modify(plus(-1));
  },
});

export default reducer;
