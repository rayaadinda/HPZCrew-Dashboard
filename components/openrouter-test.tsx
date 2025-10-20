'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Send } from 'lucide-react'

export default function OpenRouterTest() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const testOpenRouter = async () => {
    if (!message.trim()) return

    setLoading(true)
    setResponse('')
    setError('')

    try {
      const res = await fetch('/api/openrouter/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      const data = await res.json()

      if (data.success) {
        setResponse(data.response)
      } else {
        setError(data.error || 'Unknown error occurred')
      }
    } catch (err) {
      setError('Failed to connect to OpenRouter API')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>OpenRouter Integration Test</CardTitle>
        <CardDescription>
          Test the OpenRouter AI integration by sending a message below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter your test message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !loading && testOpenRouter()}
            disabled={loading}
          />
          <Button onClick={testOpenRouter} disabled={loading || !message.trim()}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {response && (
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm">{response}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}