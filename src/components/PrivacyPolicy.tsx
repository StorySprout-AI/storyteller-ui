import React from 'react'
import Box from '@mui/material/Box'
import useContactInfo from 'hooks/useContactInfo'

const PrivacyPolicy = () => {
  const websiteName = 'StorySprout'
  const effectiveDate = '08/31/2023'

  const {
    email: { support: contactEmail }
  } = useContactInfo()

  return (
    <Box textAlign="left">
      <h1>Privacy Policy for {websiteName}</h1>

      <h2>Effective Date: {effectiveDate}</h2>

      <h3>1. Introduction</h3>
      <p>
        Welcome to {websiteName}, your go-to platform for AI-generated short stories. This Privacy Policy outlines how
        we collect, use, disclose, and safeguard your personal information when you visit our website and use our
        services. By accessing or using our website, you signify your understanding and agreement to the terms outlined
        in this Privacy Policy.
      </p>

      <h3>2. Information We Collect</h3>
      <p>We may collect and process the following information:</p>
      <ul>
        <li>
          <strong>Personal Information:</strong> When you create an account or use our services, we may collect personal
          information such as your name, email address, and billing details. This information is required for account
          creation and payment processing.
        </li>
        <li>
          <strong>Usage Information:</strong> We may gather information about how you use our website, including your
          browsing history, interactions with our AI-generated stories, and other content.
        </li>
        <li>
          <strong>Cookies and Tracking Technologies:</strong> Like many websites, we use cookies and similar
          technologies to collect information about your preferences, enhance your user experience, and analyze website
          traffic. You can manage your preferences regarding cookies through your browser settings.
        </li>
        <li>
          <strong>AI-Generated Content Data:</strong> We may retain the AI-generated short stories you create on our
          platform for the purpose of improving our services and generating insights.
        </li>
      </ul>

      <h3>3. Sharing Your Information</h3>
      <p>We may share your personal information with third parties only in the following circumstances:</p>
      <ul>
        <li>With service providers who assist in providing the Service.</li>
        <li>If required by law or to protect our rights and safety.</li>
      </ul>

      <h3>4. Security</h3>
      <p>
        We take reasonable measures to protect your personal information from unauthorized access or disclosure.
        However, no method of transmission over the internet or electronic storage is 100% secure.
      </p>

      <h3>5. Changes to Privacy Policy</h3>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page and the effective
        date will be updated.
      </p>

      <h3>6. Contact Us</h3>
      <p>
        If you have any questions, concerns, or requests related to this Privacy Policy, please contact us at&nbsp;
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </p>

      <p>Thank you for trusting {websiteName} with your information.</p>

      {/* <address>
        [Your Name]
        <br />
        [Your Title]
        <br />
        {websiteName}
        <br />
        [Website URL]
        <br />
        [Contact Email Address]
        <br />
        [Physical Address]
      </address> */}
    </Box>
  )
}

export default PrivacyPolicy
