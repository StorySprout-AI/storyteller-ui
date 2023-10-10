import { useState } from 'react'
import axios from 'axios'

export default function useWakeUpServer() {
  const [loading, setLoading] = useState(false)

  async function send() {
    setLoading(true)
    try {
      await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/heartbeat`)
    } catch (error) {
      console.error('Error waking up server:', error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, send }
}
