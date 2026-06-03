import { jobPostingSchema } from "@/lib/seo/schemas";
import type { CareerRole } from "@/lib/careers-roles";
import { SITE_URL } from "@/lib/site-config";
import { getSlugForRole } from "@/lib/careers-roles";

type JobPostingJsonLdProps = {
  role: CareerRole;
};

export function JobPostingJsonLd({ role }: JobPostingJsonLdProps) {
  const slug = getSlugForRole(role);
  const schema = jobPostingSchema(role, `${SITE_URL}/careers/${slug}`);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
