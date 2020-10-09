import { ProgramType } from "@morphic-ts/summoners";
import { HKT2 } from '@morphic-ts/common/lib/HKT'
import { AlgebraNoUnion, ProgramNoUnionURI } from "@morphic-ts/batteries/lib/program-no-union";
import * as Summoner from '@morphic-ts/batteries/lib/summoner-ESBST'
// import { IoTsURI } from '@morphic-ts/io-ts-interpreters/lib/hkt'
// import { FastCheckURI } from '@morphic-ts/fastcheck-interpreters/lib/hkt'
// import { ShowURI } from '@morphic-ts/show-interpreters/lib/hkt'
// import { EqURI } from '@morphic-ts/eq-interpreters/lib/hkt'
// import { JsonSchemaURI } from '@morphic-ts/json-schema-interpreters/lib/hkt'


export type { AOfMorhpADT, AType, EType } from "@morphic-ts/summoners";

const { summonFor, AsOpaque, AsUOpaque } = Summoner

export interface AppEnv {
  // IoTsURI: Configure IoTs instances here...
  // FastCheckURI: Configure FastCheck instances here...
  // ShowURI: Configure Show instances here...
  // EqURI: Configure Eq instances here...
  // JsonSchemaURI: Configure JsonSchema instances here...
}

const { summon, tagged } = summonFor<AppEnv>({})
export type M<E, A> = Summoner.M<AppEnv, E, A>
export type UM<A> = Summoner.UM<AppEnv, A>

export { AsOpaque, AsUOpaque, summon, tagged }

export type MyProgram<E, A> = ProgramType<AppEnv, E, A>[ProgramNoUnionURI];

export interface TagTypeIs<Type> {
  type: Type;
}
export const Variant = tagged('type')

// Helper for creating Actions with no payload.
// Would love to make this just a default for the
// payload argument to the Ctor function but
// HKT2 < G, Env, {}, {} > doesn't unify with MyProgram for some reason?
export const __ = <G, Env extends AppEnv>(
  F: AlgebraNoUnion<G, Env>
): HKT2<G, Env, {}, {}> =>
  F.interface({}, 'placeholder')


// Helper for declaring data constructors for inhabiting a tagged union type.
export const Ctor = <Tag extends string, E, P>(
  k: Tag,
  payload: MyProgram<E, P & { type?: never }>
): M<E & TagTypeIs<string>, P & TagTypeIs<Tag>> =>
  summon<E & TagTypeIs<string>, P & TagTypeIs<Tag>>((F) =>
    F.intersection(
      [
        F.interface(
          {
            type: F.stringLiteral(k),
          },
          `Tag '${k as string}'`
        ),
        payload(F)
      ],
      k
    )
  )
