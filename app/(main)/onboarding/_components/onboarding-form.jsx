"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { TagInput } from "emblor";
import useFetch from "@/hooks/use-fetch";
import { onboardingSchema } from "@/app/lib/schema";
import { updateUser } from "@/actions/user";

const OnboardingForm = ({ industries, email }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedSubIndustries, setSelectedSubIndustries] = useState([]);
  const [skills, setSkills] = useState([]);
  const [activeSkillIndex, setActiveSkillIndex] = useState(null);

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      email,
      industry: "",
      subIndustries: [],
      experience: "",
      skills: [],
      bio: "",
    },
  });

  const watchIndustry = watch("industry");

  useEffect(() => {
    setValue("subIndustries", selectedSubIndustries);
  }, [selectedSubIndustries, setValue]);

  const onSubmit = async (values) => {
    const isStep1Valid = await trigger(["mobile", "location", "linkedin", "github", "portfolio"]);

    if (!isStep1Valid) {
      setStep(1);
      return;
    }

    console.log(values)

    try {
      await updateUserFn({
        ...values,
        isOnboarded: true,
      });

      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Onboarding error:", error);
      toast.error("Failed to complete onboarding.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-2xl mt-10">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            {step === 1
              ? "Contact and personal info"
              : "Professional and career info"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={email}
                    readOnly
                    className="bg-muted cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Mobile</Label>
                  <Input
                    placeholder="Enter mobile number"
                    {...register("mobile")}
                  />
                  {errors.mobile && <p className="text-sm text-red-500">{errors.mobile.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    placeholder="City, Country"
                    {...register("location")}
                  />
                  {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>LinkedIn</Label>
                  <Input
                    placeholder="https://linkedin.com/in/yourname"
                    {...register("linkedin")}
                  />
                  {errors.linkedin && <p className="text-sm text-red-500">{errors.linkedin.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>GitHub</Label>
                  <Input
                    placeholder="https://github.com/yourname"
                    {...register("github")}
                  />
                  {errors.github && <p className="text-sm text-red-500">{errors.github.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Portfolio</Label>
                  <Input
                    placeholder="https://yourwebsite.com"
                    {...register("portfolio")}
                  />
                  {errors.portfolio && <p className="text-sm text-red-500">{errors.portfolio.message}</p>}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Select
                    onValueChange={(value) => {
                      setValue("industry", value);
                      setSelectedIndustry(
                        industries.find((ind) => ind.id === value)
                      );
                      setSelectedSubIndustries([]);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Industries</SelectLabel>
                        {industries.map((ind) => (
                          <SelectItem key={ind.id} value={ind.id}>
                            {ind.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.industry && (
                    <p className="text-sm text-red-500">{errors.industry.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Specialization</Label>
                  <MultiSelect
                    options={
                      selectedIndustry?.subIndustries.map((sub) => ({
                        label: sub,
                        value: sub,
                      })) ?? []
                    }
                    defaultValue={[]}
                    placeholder={!watchIndustry ? "Select industry first" : "Select specializations"}
                    onValueChange={(vals) => setSelectedSubIndustries(vals)}
                    disabled={!watchIndustry}
                  />
                  {errors.subIndustries && (
                    <p className="text-sm text-red-500">{errors.subIndustries.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Years of Experience</Label>
                  <Input
                    type="number"
                    min="0"
                    max="50"
                    placeholder="Enter years of experience"
                    {...register("experience", { valueAsNumber: true })}
                  />
                  {errors.experience && (
                    <p className="text-sm text-red-500">{errors.experience.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Skills</Label>
                  <TagInput
                    tags={skills}
                    setTags={(newTags) => {
                      setSkills(newTags);
                      setValue("skills", newTags.map((tag) => tag.text));
                    }}
                    activeTagIndex={activeSkillIndex}
                    setActiveTagIndex={setActiveSkillIndex}
                    placeholder="Add a skill and press Enter"
                    className="w-full"
                    styleClasses={{
                      input: "h-10 px-3 py-2 text-sm bg-input/30 dark:bg-input/30 text-foreground rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring basis-full",
                      inlineTagsContainer: "flex flex-wrap gap-2 bg-input/30 dark:bg-input/30 border border-input rounded-md p-2",
                      tag: {
                        body: "bg-input px-2 py-1 rounded text-sm flex items-center gap-1 flex-none",
                        closeButton: "text-red-500 hover:text-red-600",
                      },
                    }}
                  />
                  {errors.skills && (
                    <p className="text-sm text-red-500">{errors.skills.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Professional Bio</Label>
                  <Textarea
                    placeholder="Tell us about your professional background..."
                    className="h-32"
                    {...register("bio")}
                  />
                  {errors.bio && (
                    <p className="text-sm text-red-500">{errors.bio.message}</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4 gap-4">
              {step > 1 && (
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setStep(step - 1)}
                >
                  Previous
                </Button>
              )}
              {step < 2 && (
                <Button
                  type="button"
                  className="ml-auto"
                  onClick={async () => {
                    const isValid = await trigger(["mobile", "location", "linkedin", "github", "portfolio"]);
                    if (isValid) setStep(2);
                  }}
                >
                  Next
                </Button>
              )}
              {step === 2 && (
                <Button type="submit" disabled={updateLoading} className="ml-auto">
                  {updateLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Complete Profile"
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
