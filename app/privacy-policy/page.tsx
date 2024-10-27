import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://bridge-path-academy-product.vercel.app/
// - Name: BridgePath Academy
// - Description: A SaaS Product to help students and job seekers learn tech skills and software that are in demand in the job market
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: Josaleen45@gmail.com

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
  return (
    <main className="mx-auto max-w-xl">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Back
        </Link>
        <h1 className="pb-6 text-3xl font-extrabold">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="whitespace-pre-wrap leading-relaxed"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: October 27, 2024

Welcome to BridgePath Academy! This Privacy Policy describes how we collect, use, and protect your information when you use our website and services at https://bridge-path-academy-product.vercel.app/ ("Service"). By using our Service, you agree to the terms of this Privacy Policy.

1. Information We Collect

1.1 Personal Data

We collect the following personal information from you:

Name: We collect your name to personalize your experience and communicate with you effectively.
Email: We collect your email address to send you important information regarding your orders, updates, and communication.
Payment Information: We collect payment details to process your orders securely. However, we do not store your payment information on our servers. Payments are processed by trusted third-party payment processors.

We also collect non-personal data through web cookies.

1.2 Non-Personal Data

We may use web cookies and similar technologies to collect non-personal information such as your IP address, browser type, device information, and browsing patterns. This information helps us to enhance your browsing experience, analyze trends, and improve our services.

2. Purpose of Data Collection

The data we collect is used for: Order processing

We do not share your personal data with any third parties except as required for order processing (e.g., sharing your information with payment processors). We do not sell, trade, or rent your personal information to others.

3. Data Sharing

We do not share your personal data with any third parties.

4. Children's Privacy

We do not knowingly collect any data from children.

5. Updates to this Privacy Policy

We may update this Privacy Policy from time to time. Users will be notified of any changes via email. Your continued use of the Service after any changes indicates your acceptance of the new Privacy Policy.

6. Contact Information

If you have any questions about this Privacy Policy, please contact us at Josaleen45@gmail.com.

By using BridgePath Academy, you acknowledge that you have read, understood, and agree to the terms of this Privacy Policy.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
