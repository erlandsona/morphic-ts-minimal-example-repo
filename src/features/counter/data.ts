import * as t from 'io-ts'
// import { flow } from 'fp-ts/function'
import { summonFor } from '@morphic-ts/batteries/lib/summoner-ESBST'
// import { ADTType } from '@morphic-ts/adt'
const { summon, tagged } = summonFor<{}>({})

export const State = summon(F => F.interface({
    data: F.number()
}, 'State'))

export type StateT = t.TypeOf<typeof State.type>

/**
 * SmartCtor for an Action
 */
// export const Data = <Tag extends string, E, P>(
//   k: Tag,
//   payload: MyProgram<E, P & { type?: never }>
// ): M<E & TagTypeIs<string>, P & TagTypeIs<Tag>> =>
//   summon<E & TagTypeIs<string>, P & TagTypeIs<Tag>>(F =>
//     F.intersection(
//       [
//         F.interface(
//           {
//             type: F.stringLiteral(k)
//           },
//           `Tag ‘${k as string}'`
//         ),
//         payload(F)
//       ],
//       k
//     )
//   )

// export const Data = (
//   k: string,
//   payload: (_: AlgebraNoUnion<G, Env>) => HKT2<G, Env, unknown, unknown> = (_) => null
// ): {[k: string]:? AlgebraNoUnion<G, Env> } => ({
//   [k]: summon(F => {
//     console.log(typeof F)
//     return payload
//       ? // Non-Nullary Constructor Case
//         F.intersection(
//           [
//             F.interface(
//               {
//                 type: F.stringLiteral(k),
//               },
//               `Tag '${k}'`
//             ),
//             payload(F),
//           ],
//           k
//         )
//       : // Nullary Constructor Case
//         F.interface({ type: F.stringLiteral(k) }, `Tag '${k}'`)
//     }
//   ),
// })


// NOTE: For use constructing ADT's with nullary data constructors...
const Variant = tagged('type')

const Increment = summon(F =>
    F.interface({ type: F.stringLiteral('Increment') }, 'Increment')
)

const Decrement = summon(F =>
    F.interface({ type: F.stringLiteral('Decrement') }, 'Decrement')
)

export const Action = Variant({
    Increment,
    Decrement
    // Example usage of Data constructor with action payload.
    // ...Data('NameOfConstructor', F => F.interface({name: F.string()})),
    // Example usage of nullary Data constructor.
    // ...Data('ButtonClicked')
    // Example usage of proper nesting of child Actions
    // ...Data('PesDash', F => F.interface({ _: PesDash.Action })),
})

export type ActionT = t.TypeOf<typeof Action.type>

const plus = (x: number) => (y: number) => x + y
// const always = <A>(x: A) => <Y>(_y: Y) => x


export const init = State.build({data: 0})
const reducer: (_: ActionT) => (_: StateT) => StateT =
    Action.matchStrict({
        Increment: (_a) => {
            console.log("Increment")
            return State.lensFromProp('data').modify(plus(1))
        },
        Decrement: (_a) => {
            console.log("Decrement")
            return State.lensFromProp('data').modify(plus(-1))
        },
    })



export default reducer
