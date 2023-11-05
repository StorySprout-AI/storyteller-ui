interface ContactInfoData {
  email: {
    help?: string
    support?: string
  }
}

export default function useContactInfo(): ContactInfoData {
  const defaultEmail = 'storysprout-ai-mailbox@googlegroups.com'

  return {
    email: {
      support: process.env.REACT_APP_SUPPORT_EMAIL ?? defaultEmail,
      help: process.env.REACT_APP_HELP_EMAIL ?? defaultEmail
    }
  }
}
