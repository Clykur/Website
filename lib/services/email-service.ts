import { Resend } from "resend";
import { env } from "@/lib/env";

const resend = env.RESEND_API_KEY
  ? new Resend(env.RESEND_API_KEY)
  : null;

export async function sendApplicantConfirmationEmail(
  name: string,
  email: string,
  roleSlug: string,
  applicationId: string
): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.warn("⚠️ Resend is not configured. Email will not be sent.");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const roleTitle = roleSlug
      .split("-")
      .slice(0, -1)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const jobId = roleSlug.split("-").pop();

    const textContent = `
Hi ${name},

Thank you for applying for the ${roleTitle} role at Clykur.

We have successfully received your application and our hiring team is currently reviewing your profile.

Role: ${roleTitle}
Job ID: ${jobId}

If your qualifications align with our current requirements, our team will reach out regarding the next steps in the process.

We appreciate your interest in becoming part of Clykur and thank you for taking the time to apply.

--------------------------------------------------

Disclaimer:
This is an automated acknowledgment email confirming receipt of your application.

Submission of an application does not guarantee selection, interview scheduling, employment, internship, compensation, or future engagement with Clykur.

Applications are reviewed based on current project requirements, role availability, and candidate suitability.

Clykur reserves the right to modify, pause, or discontinue hiring processes at any time without prior notice.

--------------------------------------------------

Warm Regards,
Clykur Hiring Team
www.clykur.com
LinkedIn: https://www.linkedin.com/company/clykur
    `.trim();

    const htmlContent = `
<div style="font-family: Arial, sans-serif; color:#111111; line-height:1.7; max-width:600px; margin:auto;">

  <p>Hi ${name},</p>

  <p>
    Thank you for applying for the
    <strong>${roleTitle}</strong> role at Clykur.
  </p>

  <p>
    We have successfully received your application and our hiring team
    is currently reviewing your profile.
  </p>

  <p>
    <strong>Role:</strong> ${roleTitle}<br />
    <strong>Job ID:</strong> ${jobId}
  </p>

  <p>
    If your qualifications align with our current requirements,
    our team will reach out regarding the next steps in the process.
  </p>

  <p>
    We appreciate your interest in becoming part of Clykur
    and thank you for taking the time to apply.
  </p>
<br/>
<table
  role="presentation"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="margin-top:16px;"
>
  <tr>
    <td style="padding:0;">

      <div
        style="
          margin:0;
          padding:0;
          font-size:16px;
          line-height:24px;
          color:#111111;
        "
      >
        Warm Regards,
      </div>

      <div
        style="
          margin:4px 0 10px 0;
          padding:0;
          font-size:16px;
          font-weight:700;
          line-height:24px;
          color:#111111;
        "
      >
        Clykur Hiring Team
      </div>

      <img
        src="https://www.clykur.com/ClykurLogo.png"
        alt="Clykur Logo"
        width="120"
        style="
          display:block;
          margin:0;
          padding:0;
          border:0;
          outline:none;
          text-decoration:none;
          height:auto;
        "
      />

      <div style="height:10px; line-height:10px;">
        &nbsp;
      </div>

      <div style="margin:0 0 6px 0;">
        <a
          href="https://www.clykur.com"
          target="_blank"
          style="
            color:#111111;
            text-decoration:none;
          "
        >
          www.clykur.com
        </a>
      </div>

      <div style="margin:0;">
        <a
          href="https://www.linkedin.com/company/clykur"
          target="_blank"
          style="
            color:#111111;
            text-decoration:none;
          "
        >
          LinkedIn
        </a>
      </div>

    </td>
  </tr>
</table>
    <div
    style="
      margin-top:30px;
      padding-top:18px;
      border-top:1px solid #e5e5e5;
      font-size:12px;
      color:#666666;
      line-height:1.6;
    "
  >
    <strong>Disclaimer:</strong><br /><br />

    This is an automated acknowledgment email confirming receipt of your application.
    Submission of an application does not guarantee selection, interview scheduling,
    employment, internship, compensation, or future engagement with Clykur.
    Applications are reviewed based on current project requirements, role availability,
    and candidate suitability.

    <br /><br />

    Clykur reserves the right to modify, pause, or discontinue hiring processes
    at any time without prior notice.
  </div>
</div>
    `.trim();

    const { error } = await resend.emails.send({
      from: "Clykur Careers <info@clykur.com>",
      to: email,
      subject: `Application Received | ${roleTitle} Role`,
      headers: {
        "X-Idempotency-Key": `application-${applicationId}`,
      },
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error(
        "Failed to send applicant confirmation email:",
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  } catch (err) {
    console.error(
      "Unexpected error sending confirmation email:",
      err
    );

    return {
      success: false,
      error: "Unexpected error sending email",
    };
  }
}