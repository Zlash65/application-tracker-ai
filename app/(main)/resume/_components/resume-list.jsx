"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteResume } from "@/actions/resume";

export default function ResumeList({ resumes }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteResume(id);
      toast.success("Resume deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete resume");
    }
  };

  if (!resumes?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Resumes Yet</CardTitle>
          <CardDescription>
            Create your first resume to get started
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {resumes.map((resume) => (
        <div className="cursor-default" onClick={() => router.push(`/resume/${resume.id}`)}>
          <Card key={resume.id} className="group relative hover:bg-accent transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl gradient-title">
                    {resume.name || "Untitled Resume"}
                  </CardTitle>
                  <CardDescription>
                    Created {format(new Date(resume.createdAt), "PPP")}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer"
                    onClick={() => router.push(`/resume/${resume.id}`)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon" className="cursor-pointer">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Resume?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your resume titled "{resume.name}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(resume.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
