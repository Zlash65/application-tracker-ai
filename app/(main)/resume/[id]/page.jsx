import { getResumeById } from "@/actions/resume";
import ResumeBuilder from "../_components/resume-builder";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ResumeDetailPage({ params }) {
  const resume = await getResumeById(params.id);

  return (
    <div>
      <Link href="/resume">
        <Button variant="link" className="gap-2 pl-0 cursor-pointer">
          <ArrowLeft className="h-4 w-4" />
          Back to Resume List
        </Button>
      </Link>
      <div className="container mx-auto py-6">
        <ResumeBuilder initialContent={resume?.content} />
      </div>
    </div>
  );
}
