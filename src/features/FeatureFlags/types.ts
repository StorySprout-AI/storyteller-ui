export interface FlipperFeature {
  key: string
  state: 'on' | 'off'
}

export interface FlipperFeatureSet {
  features: FlipperFeature[]
}

export interface FlipperActor {
  flipper_id: string
  features: {
    [key: string]: { enabled: boolean }
  }
}

export interface FeatureFlagsHook {
  loading: boolean
  error: any
  flags: Record<string, boolean>
  loadFlags: () => Promise<void>
  loadFlagsForActor: (flipperId: string) => Promise<void>
  isEnabled: (key: string) => boolean
}
