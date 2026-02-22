import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceBySlug, SERVICE_SLUGS } from "@/lib/services";
import { ServicePageClient } from "./ServicePageClient";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service | SPT Solutions" };
  return {
    title: `${service.name} | SPT Solutions`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.name} | SPT Solutions`,
      description: service.shortDescription,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <ServicePageClient service={service} />
    </>
  );
}
