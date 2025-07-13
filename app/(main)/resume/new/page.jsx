"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ResumeBuilder from "../_components/resume-builder";
import { saveResume } from "@/actions/resume";

export default function NewResumePage() {
  const router = useRouter();
  const [resumeContent, setResumeContent] = useState(null);

  const handleSave = async (content) => {
    const newResume = await saveResume(content);
    if (newResume?.id) {
      router.push(`/resume/${newResume.id}`);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder 
        initialContent={resumeContent} 
        onSave={handleSave} 
      />
    </div>
  );
}
