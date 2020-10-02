import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Styles.module.css';
import { Action as CounterA } from './data'
import {
  Action as A,
  State
} from '../../store'
const { of: { Counter } } = A

export default function View(): ReactElement {
  const dispatch = useDispatch();
  const count = useSelector(State.lensFromPath(['tsReducer', 'data']).get);

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(Counter({ _: CounterA.of.Increment({}) }))}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(Counter({ _: CounterA.of.Decrement({}) }))}
        >
          -
        </button>
      </div>
    </div>
  );
}
