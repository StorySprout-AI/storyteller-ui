interface AppDefaults {
  redirect_path: string
}

export default function useAppDefaults(): AppDefaults {
  return {
    redirect_path: process.env.DEFAULT_LOGIN_REDIRECT_PATH ?? '/v1'
  }
}
