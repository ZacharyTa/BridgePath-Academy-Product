import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://bridge-path-academy-product.vercel.app/
// - Name: BridgePath Academy
// - Contact information: Josaleen45@gmail.com
// - Description: A SaaS Product to help students and job seekers learn tech skills and software that are in demand in the job market
// - Ownership: When buying a package, users can have access to course with educational videos, quizzes, resources, project capstones, and certificates. The certificates they earn by completing courses are theirs forever. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://bridge-path-academy-product.vercel.app/privacy-policy
// - Governing Law: USA
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
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
          </svg>
          Back
        </Link>
        <h1 className="pb-6 text-3xl font-extrabold">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="whitespace-pre-wrap leading-relaxed"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: October 27, 2024

Welcome to BridgePath Academy!

Please read these Terms & Services ("Terms") carefully before using our website at https://bridge-path-academy-product.vercel.app/ ("Service"). By accessing or using our Service, you agree to be bound by these Terms.

1. General Information

BridgePath Academy ("we", "our", "us") provides a SaaS product to help students and job seekers learn tech skills and software that are in demand in the job market. Our contact information is Josaleen45@gmail.com.

2. Ownership and Use

Upon purchasing a package, users can have access to courses with educational videos, quizzes, resources, project capstones, and certificates. The certificates earned by completing courses are theirs forever. Users may request a full refund within 7 days of the purchase date.

3. User Data Collection

We collect and store user data, including name, email, and payment information as necessary to provide our services. We also collect non-personal data through web cookies. For more information, please refer to our Privacy Policy at https://bridge-path-academy-product.vercel.app/privacy-policy.

4. Governing Law

These Terms are governed by and construed in accordance with the laws of the United States.

5. Updates to the Terms

We may update these Terms from time to time. Users will be notified of any changes via email.

For any questions or concerns regarding these Terms of Service, please contact us at Josaleen45@gmail.com.

By using BridgePath Academy, you acknowledge that you have read, understood, and agree to be bound by these Terms.

Thank you for using BridgePath Academy!`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
