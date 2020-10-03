import { summon, M, AppEnv } from "./summoner";

import { ProgramType } from "@morphic-ts/summoners";
import { ProgramNoUnionURI } from "@morphic-ts/batteries/lib/program-no-union";

export type MyProgram<E, A> = ProgramType<AppEnv, E, A>[ProgramNoUnionURI];

export interface TagTypeIs<Type> {
  type: Type;
}

/**
 * SmartCtor for an Action
 */
export const Action = <Tag extends string, E, P>(
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
        payload(F),
      ],
      k
    )
  );
