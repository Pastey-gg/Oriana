import StatusPage from "~/components/StatusPage";

export default function PrivacyPage() {
  //@ts-expect-error
  const message: Element = (
    <span>
      <br />
      <br />
      <b>Last Updated:</b> 2026-06-04
      <br />
      <br />
      At <b>Pastey.gg</b>, we believe in keeping things simple and respecting your privacy. This policy explains how we
      handle data when you visit and use our site.
      <br />
      <br />
      <b>1. Information We Do Not Collect</b>
      <br />
      We do not require user accounts. Therefore, we <b>do not</b> collect, ask for, or store any direct personal
      identification information, such as:
      <ul>
        <li>Names</li>
        <li>Email addresses</li>
        <li>Phone numbers</li>
        <li>Billing information</li>
      </ul>
      <b>2. Information We Automatically Collect (Server Logs)</b>
      <br />
      Like almost all websites, our servers automatically record basic, non-personally identifying information that your
      browser sends when you visit. This standard log data may include:
      <ul>
        <li>Your IP address</li>
        <li>Browser type and version</li>
        <li>The date and time of your visit</li>
        <li>Referring/exit pages</li>
      </ul>
      <b>Why we collect this:</b> We use this basic log data solely for the operation of the site, maintaining security,
      preventing abuse (such as spam or DDoS attacks), and understanding general usage trends.
      <br />
      <br />
      <b>3. Cookies</b>
      <br />
      <ul>
        <li>
          <b>No Cookies:</b> We <b>do not</b> use cookies or tracking technologies on our website.
        </li>
      </ul>
      <b>4. User-Submitted Content</b>
      <br />
      Please be aware that any text or code you submit to <b>Pastey.gg</b> (a "Paste") is <b>publicly accessible</b>.{" "}
      <b>Do not</b> share passwords, API keys, private personal information, or sensitive data in your Pastes. We are not
      responsible for the privacy of any information you voluntarily choose to publish in a Paste.
      <br />
      <br />
      <b>5. Data Sharing</b>
      <br />
      We <b>do not</b> sell, trade, or rent your data to anyone. We will only share server log data if{" "}
      <b>strictly required by law</b> or to protect the security and integrity of our service.
      <br />
      <br />
      <b>6. Changes to This Policy</b>
      <br />
      We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision
      date.
    </span>
  );

  return (
    <StatusPage
      title="Privacy Policy"
      message={message}
      titleColor="var(--success)"
      alignTop={true}
      textAlign="left"
      width="70%"
    />
  );
}
