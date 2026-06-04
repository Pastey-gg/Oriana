import StatusPage from "~/components/StatusPage";

export default function TermsPage() {
  //@ts-expect-error
  const message: Element = (
    <span>
      <b>Last Updated:</b> 2026-06-04
      <br />
      <br />
      Welcome to <b>Pastey.gg</b> ("we," "our," or "us"). By accessing or using our website, you agree to be bound by these
      Terms and Conditions. If you do not agree with any part of these terms, please do not use our service.
      <br />
      <br />
      <b>1. Use of Service</b>
      <br />
      <b>Pastey.gg</b> provides a simple platform for sharing code and text snippets ("Pastes"). The service is provided free
      of charge and does not require an account to use.
      <br />
      <br />
      <b>2. Acceptable Use</b>
      <br />
      You agree not to use Pastey.gg to upload, post, or share any content that:
      <ul>
        <li>Is illegal, harmful, threatening, abusive, or harassing.</li>
        <li>Contains malware, viruses, or any code designed to disrupt or harm systems.</li>
        <li>Infringes on the intellectual property rights, privacy, or copyrights of others.</li>

        <li>Contains sensitive personal information (doxing) of yourself or others.</li>
        <li>Is used for spamming or malicious automated activities.</li>
      </ul>
      <b>3. Content Ownership and Removal</b>
      <br />
      You retain ownership of any content you post. However, by posting content to Pastey.gg, you grant us a non-exclusive,
      royalty-free license to display and distribute that content through our platform. We reserve the right, but are not
      obligated, to review, flag, modify, or permanently delete any Paste at our sole discretion, at any time, and without
      notice, particularly if we believe it violates these Terms.
      <br />
      <br />
      <b>4. Disclaimer of Warranties</b>
      <br />
      Our service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding
      the uptime, reliability, or security of the site. We do not guarantee that your Pastes will be saved indefinitely or
      protected from loss. Always keep backups of your important data.
      <br />
      <br />
      <b>5. Limitation of Liability</b>
      <br />
      To the maximum extent permitted by law, Pastey.gg shall not be liable for any direct, indirect, incidental, or
      consequential damages resulting from your use of the service, or the loss, corruption, or unauthorized access to any
      content you share.
      <br />
      <br />
      <b>6. Changes to Terms</b>
      <br />
      We reserve the right to modify these terms at any time. Your continued use of the site after any changes constitutes
      acceptance of the new terms.
    </span>
  );

  return (
    <StatusPage
      title="Terms and Conditions"
      message={message}
      titleColor="var(--success)"
      alignTop={true}
      textAlign="left"
      width="70%"
    />
  );
}
