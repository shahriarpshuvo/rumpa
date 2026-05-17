import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Dr. Rezwana Rumpa collects, uses, and protects personal information.",
};

const UPDATED = "2026-05-17";

export default function PrivacyPage() {
  return (
    <main className="relative">
      <article className="mx-auto max-w-3xl px-6 pt-12 pb-24">
        <span className="block text-[11px] font-bold uppercase tracking-[0.3em] text-blossom-600 mb-3">
          Legal
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: {new Date(UPDATED).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="prose dark:prose-invert max-w-full mt-10 text-foreground prose-p:text-foreground prose-li:text-foreground prose-headings:text-foreground prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-3 prose-strong:text-foreground prose-a:text-blossom-600 prose-a:underline-offset-4">
          <p>
            Dr. Rezwana Rumpa (&quot;we&quot;, &quot;I&quot;) operates this website at{" "}
            <Link href="https://rumpa.uk">rumpa.uk</Link>. This page explains
            what information is collected, how it is used, and your rights
            under UK GDPR and the Bangladesh Digital Security framework.
          </p>

          <h2>1. Information collected</h2>
          <ul>
            <li>
              <strong>Booking & enquiries:</strong> name, email, country, and
              the details you choose to share when booking a consultation
              through Cal.com or contacting me by email.
            </li>
            <li>
              <strong>Clinical information:</strong> medical history,
              medication, test results, and lifestyle details shared during a
              consultation — kept strictly confidential under medical
              professional duties.
            </li>
            <li>
              <strong>Site analytics:</strong> aggregate, anonymised usage
              data (pages viewed, country, device class). No advertising
              tracking, no third-party profiling.
            </li>
          </ul>

          <h2>2. How information is used</h2>
          <ul>
            <li>To deliver consultations, follow-up care, and treatment plans.</li>
            <li>To respond to enquiries you initiate.</li>
            <li>To improve site content and clinical educational material.</li>
          </ul>
          <p>
            Information is <strong>never sold</strong>, shared with advertisers, or
            used for marketing without explicit consent.
          </p>

          <h2>3. Legal basis (UK GDPR)</h2>
          <ul>
            <li><strong>Consent</strong> — for booking enquiries and email contact.</li>
            <li>
              <strong>Contract</strong> — to deliver agreed consultation services.
            </li>
            <li>
              <strong>Vital interests / public health</strong> — when sharing
              relevant clinical information with a referring or receiving clinician
              is necessary for your care.
            </li>
            <li>
              <strong>Legal obligation</strong> — record-keeping required by the
              BMDC and equivalent UK regulators.
            </li>
          </ul>

          <h2>4. Data sharing</h2>
          <p>
            Clinical records are shared only with you, with a clinician you
            authorise, or where required by law. Site infrastructure providers
            (hosting, email, Cal.com scheduling) process data on a strict
            data-processor basis under EU/UK-equivalent agreements.
          </p>

          <h2>5. Retention</h2>
          <p>
            Clinical records are retained per UK and Bangladesh medical
            record-keeping minimums (typically 8 years for adults, longer for
            paediatric and obstetric records). Booking enquiry data is deleted
            within 24 months of last contact if no consultation occurred.
          </p>

          <h2>6. Your rights</h2>
          <ul>
            <li>Access — request a copy of personal data held about you.</li>
            <li>Rectification — correct inaccuracies.</li>
            <li>Erasure — within retention-period constraints.</li>
            <li>Restriction or objection to processing.</li>
            <li>Portability — receive your data in a portable format.</li>
            <li>Withdraw consent at any time.</li>
            <li>
              Complain to the UK Information Commissioner&apos;s Office (ICO) at{" "}
              <Link href="https://ico.org.uk">ico.org.uk</Link>.
            </li>
          </ul>

          <h2>7. Cookies</h2>
          <p>
            This site uses only strictly-necessary cookies for session state.
            No third-party advertising or cross-site tracking cookies are set.
          </p>

          <h2>8. Children</h2>
          <p>
            This site is not directed at children under 16. Paediatric
            clinical care is provided only via a parent or legal guardian.
          </p>

          <h2>9. Contact</h2>
          <p>
            Privacy enquiries:{" "}
            <Link href="mailto:dr.rezwanarumpa@gmail.com">
              dr.rezwanarumpa@gmail.com
            </Link>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
