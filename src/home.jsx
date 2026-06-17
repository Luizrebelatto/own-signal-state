import { useEffect, useState } from "react"
import { signal } from "./signal"

const count = signal(0)

export function Home() {
  const [renderCount, setRenderCount] = useState(count.value)

  useEffect(() => {
    const unsubscribe = count.subscribe((value, oldValue) => {
      console.log("change from", oldValue, "to", value)

      setRenderCount(value)
    })

    count.value = 1

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <main>
      <h1>Signal Test</h1>

      <p>current value: {renderCount}</p>

      <button
        onClick={() => {
          count.value = count.value + 1
        }}
      >
        increment
      </button>

      <button
        onClick={() => {
          count.value = 0
        }}
      >
        reset
      </button>
    </main>
  )
}