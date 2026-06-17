import { signal } from "./signal"
import type { Signal } from "./signal"
type SetStateAction<State> =
  | State
  | ((previousValue: State) => State)

type SetState<State> = (action: SetStateAction<State>) => void

export function createSignalState<State>(
  initialValue: State
): [Signal<State>, SetState<State>] {
  const state = signal(initialValue)

  function setState(action: SetStateAction<State>) {
    if (typeof action === "function") {
      const updater = action as (previousValue: State) => State

      state.value = updater(state.value)
      return
    }

    state.value = action
  }

  return [state, setState]
}