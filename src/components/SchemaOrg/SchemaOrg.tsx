import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";

export default function SchemaOrg() {
  return (
    <>
      <JsonLd id="organization-schema" data={organizationSchema()} />
      <JsonLd id="website-schema" data={websiteSchema()} />
    </>
  );
}
