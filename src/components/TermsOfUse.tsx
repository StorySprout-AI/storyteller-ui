import React from 'react'
import Box from '@mui/material/Box'

export default function TermsOfUse() {
  const currentDate = new Date().toLocaleDateString()
  const contactEmail = 'storysprout-ai-mailbox@googlegroups.com'

  return (
    <Box textAlign="left">
      <h1>Terms of Use Agreement</h1>
      <p>Last Updated: {currentDate}</p>
      <p>
        Welcome to StorySprout (&ldquo;the Website&rdquo;). By accessing or using our Website, you agree to comply with
        and be bound by the following Terms of Use Agreement (&ldquo;Agreement&rdquo;). Please read this Agreement
        carefully before using our services.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using the Website, you acknowledge that you have read, understood, and agree to be bound by this
        Agreement and our Privacy Policy. If you do not agree to these terms, please do not use our services.
      </p>

      <h2>2. Use of AI-Generated Short Stories</h2>
      <p>
        The Website provides AI-generated short stories that are available for your personal enjoyment and use. You may
        use these stories in accordance with the terms outlined in this Agreement.
      </p>

      <h2>3. User-Generated Content</h2>
      <p>
        You may have the option to submit your own content to the Website, such as comments or feedback related to the
        AI-generated short stories. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license
        to use, display, reproduce, modify, and distribute your content for the purpose of operating and promoting the
        Website.
      </p>

      <h2>4. Paid Services</h2>
      <p>
        In the future, we may offer additional paid services related to the AI-generated short stories, such as enhanced
        customization options, advanced story generation features, or exclusive access to certain stories. These
        services will be subject to their own terms and conditions, and you will be informed of these terms prior to
        using such services.
      </p>

      <h2>5. Reservation of Publishing Rights</h2>
      <p>
        By using the Website and accessing AI-generated short stories, you understand and agree that we reserve the
        right to publish or use these stories for promotional or other purposes in the future. However, any such use
        will be done while respecting your privacy and confidentiality, and we will not disclose your personal
        information without your consent.
      </p>

      {/* ... Continue with other sections ... */}

      <h2>12. Contact Us</h2>
      <p>
        If you have any questions or concerns about these Terms of Use, please contact us at&nbsp;
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </p>

      <p>
        By using our Website, you agree to the terms and conditions outlined in this Agreement. If you do not agree to
        these terms, please do not use our services.
      </p>
    </Box>
  )
}
