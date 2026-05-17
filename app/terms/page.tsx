import Link from "next/link";

export const metadata = {
  title: "Terms & Medical Disclaimer",
  description:
    "Terms of use and medical disclaimer for content and consultations provided by Dr. Rezwana Rumpa.",
};

const UPDATED = "2026-05-17";

export default function TermsPage() {
  return (
    <main className="relative">
      <article className="mx-auto max-w-3xl px-6 pt-12 pb-24">
        <span className="block text-[11px] font-bold uppercase tracking-[0.3em] text-blossom-600 mb-3">
          Legal
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
          Terms & Medical Disclaimer
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: {new Date(UPDATED).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="prose dark:prose-invert max-w-full mt-10 text-foreground prose-p:text-foreground prose-li:text-foreground prose-headings:text-foreground prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-3 prose-strong:text-foreground prose-a:text-blossom-600 prose-a:underline-offset-4">
          <h2>1. Medical disclaimer — read first</h2>
          <p>
            <strong>
              Content on this site is general health education. It is not
              medical advice, diagnosis, or treatment, and it does not create
              a doctor–patient relationship.
            </strong>{" "}
            Always consult a qualified clinician for advice tailored to your
            situation. In an emergency call 999 (UK), 999 (Bangladesh), or
            your local emergency number.
          </p>

          <h2>2. Who I am</h2>
          <p>
            Dr. Rezwana Rumpa — MBBS, MRCOG (Final Part), MRCPI (Part II,
            Obstetrics & Gynaecology). BMDC Registration: A68043. Fertility
            and PCOS specialist seeing patients in person in Bangladesh and
            online for UK and international patients.
          </p>

          <h2>3. Use of this website</h2>
          <ul>
            <li>
              Content is provided for general information. No warranty is
              made that it is complete, current, or applicable to any
              individual case.
            </li>
            <li>
              External links are provided for convenience. No endorsement is
              implied; external content is governed by its own terms.
            </li>
            <li>
              You agree not to reproduce, scrape at scale, or republish site
              content without written permission.
            </li>
          </ul>

          <h2>4. Consultations</h2>
          <ul>
            <li>
              Consultations are booked via Cal.com. The booking, fee, and
              modality (in person or video) shown at booking are the
              contractual terms.
            </li>
            <li>
              Online consultations cannot replace in-person examination or
              ultrasound monitoring. Where in-person care is required, a
              referral plan will be agreed.
            </li>
            <li>
              Cancellation policy and refund terms are set out within the
              Cal.com booking flow at the time of booking.
            </li>
            <li>
              Clinical communication outside scheduled consultations is not
              monitored 24/7 and should not be relied on for urgent matters.
            </li>
          </ul>

          <h2>5. Off-label, evolving evidence</h2>
          <p>
            Fertility medicine evolves quickly. Guidance referenced on this
            site (NHS, NICE, ACOG, ASRM, RCOG) is cited at time of writing;
            check the source for the current version. Off-label medication
            discussion is informational; prescribing decisions are made in a
            consultation, in your jurisdiction&apos;s regulatory context.
          </p>

          <h2>6. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, no liability is accepted
            for loss arising from reliance on site content outside a formal
            consultation. Consultations are governed by the professional duty
            of care under BMDC and equivalent UK regulators.
          </p>

          <h2>7. Governing law</h2>
          <p>
            These terms are governed by the laws of England and Wales for UK
            patients and the laws of Bangladesh for in-country patients. The
            applicable forum is the patient&apos;s primary residence at the
            time of consultation.
          </p>

          <h2>8. Changes</h2>
          <p>
            These terms may be updated. Material changes will be reflected by
            the &quot;last updated&quot; date above.
          </p>

          <h2>9. Contact</h2>
          <p>
            Legal or terms-related enquiries:{" "}
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
