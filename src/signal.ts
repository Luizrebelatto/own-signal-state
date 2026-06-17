export type Listener<State> = (
  value: State,
  oldValue: State
) => void

export type Signal<State> = {
  value: State
  subscribe: (listener: Listener<State>) => () => void
}

export function signal<State>(initialValue: State): Signal<State> {
  let value = initialValue
  const listeners = new Set<Listener<State>>()

  function notify(nextValue: State, oldValue: State) {
    for (const listener of listeners) {
      listener(nextValue, oldValue)
    }
  }

  function subscribe(listener: Listener<State>) {
    listeners.add(listener)

    return function unsubscribe() {
      listeners.delete(listener)
    }
  }

  return {
    get value() {
      return value
    },

    set value(nextValue: State) {
      const oldValue = value

      if (Object.is(oldValue, nextValue)) {
        return
      }

      value = nextValue

      notify(nextValue, oldValue)
    },

    subscribe,
  }
}
