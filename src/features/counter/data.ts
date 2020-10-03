import { Action } from "src/framework/actions";
import { AsOpaque, summon, tagged } from "src/framework/summoner";
import { AOfMorhpADT, AType, EType } from "@morphic-ts/summoners";

/**
 * You can use Opacified type (boilerplate can be derived from the snippet - copied in this repo)
 * Cleaner overall for usage (the boilerplate on definition site is the tradeoff - a good one IMHO)
 */
const Increment_ = Action("Increment", (F) => F.interface({}, "Increment"));
export interface Increment extends AType<typeof Increment_> {}
export interface IncrementRaw extends EType<typeof Increment_> {}
export const Increment = AsOpaque<IncrementRaw, Increment>()(Increment_);

const Decrement_ = Action("Decrement", (F) => F.interface({}, "Decrement"));
export interface Decrement extends AType<typeof Decrement_> {}
export interface DecrementRaw extends EType<typeof Decrement_> {}
export const Decrement = AsOpaque<DecrementRaw, Decrement>()(Decrement_);

export const Actions = tagged("type")({
  Increment,
  Decrement,
});
export type Actions = AOfMorhpADT<typeof Actions>;

const plus = (x: number) => (y: number) => x + y;

const State_ = summon((F) => F.interface({ data: F.number() }, "State"));
export interface State extends AType<typeof State_> {}
export interface StateRaw extends EType<typeof State_> {}
export const State = AsOpaque<StateRaw, State>()(State_);

export const init = State.build({ data: 0 });

/**
 * This one creates a reducer :)
 */
const reducer = Actions.createReducer(init)({
  Increment: (_a) => {
    console.log("Increment");
    return State.lensFromProp("data").modify(plus(1));
  },
  Decrement: (_a) => {
    console.log("Decrement");
    return State.lensFromProp("data").modify(plus(-1));
  },
});

export default reducer;
