import type { ServerFunctions } from '../../../src/node/rpc'
import { useRuntimeConfig } from '#app/nuxt'
import { getDevToolsRpcClient } from '@vitejs/devtools-kit/client'
import { reactive, shallowRef } from 'vue'
import { createRpcClient } from '@vitejs/devtools-rpc/client'
import { createWsRpcPreset } from '@vitejs/devtools-rpc/presets/ws/client'

export const connectionState = reactive<{
  connected: boolean
  error: Error | null
}>({
  connected: false,
  error: null,
})

/** Unified RPC client type, compatible with two sources: h3 WebSocket and DevTools */
export type RpcClient = {
  /** Typed call with full inference: method name, params and return value from ServerFunctions */
  call<K extends keyof ServerFunctions>(
    method: K,
    ...args: Parameters<ServerFunctions[K]>
  ): Promise<Awaited<ReturnType<ServerFunctions[K]>>>
  /** Fallback for built-in DevTools methods (e.g. vite:core:open-in-editor) */
  call(method: string, params?: unknown): Promise<unknown>
}

/** Type assertion: convert h3 RPC client ($call) to unified RpcClient interface */
function asRpcClient(client: {
  $call: (method: string, ...args: unknown[]) => Promise<unknown>
}): RpcClient {
  return {
    call: (name: string, ...args: unknown[]) => client.$call(name, ...args),
  } as RpcClient
}

const rpc = shallowRef<RpcClient>(undefined!)

export async function connect() {
  const runtimeConfig = useRuntimeConfig()
  try {
    let rawRpcClient: RpcClient

    const connection = await $fetch<{ backend?: string; port: number }>(
      '/.devtools.vdt-connection.json',
    )

    if (connection?.backend === 'h3') {
      const wsClient = createRpcClient<ServerFunctions>(
        {},
        {
          preset: createWsRpcPreset({
            url: `ws://localhost:${connection.port}`,
          }),
        },
      )
      rawRpcClient = asRpcClient(
        wsClient as { $call: (method: string, ...args: unknown[]) => Promise<unknown> },
      )
    } else {
      const rpcClient = await getDevToolsRpcClient({
        baseURL: ['/.devtools/', runtimeConfig.app.baseURL],
        connectionMeta: runtimeConfig.app.connection,
        wsOptions: {
          onConnected: () => {
            connectionState.connected = true
          },
          onError: e => {
            connectionState.error = e
          },
          onDisconnected: () => {
            connectionState.connected = false
          },
        },
        rpcOptions: {
          onGeneralError: (e, name) => {
            connectionState.error = e
            console.error(`[oxc-inspector] RPC error on executing "${name}":`)
          },
          onFunctionError: (e, name) => {
            connectionState.error = e
            console.error(`[oxc-inspector] RPC error on executing "${name}":`)
          },
        },
      })

      rawRpcClient = rpcClient as RpcClient
    }

    rpc.value = rawRpcClient
    connectionState.connected = true
  } catch (e) {
    connectionState.error = e as Error
  }
}

export function useRpc() {
  return rpc
}
