"use client";

import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { generateDMSchema, GenerateDMInput } from "@/features/dm/schema";
import { generateDM } from "@/features/dm/api";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { Check, Copy, RefreshCw, Pencil, Loader2 } from "lucide-react";
import { toast } from "sonner";

import TypingDM from "@/components/GenerateDMPageComponents/TypingDM";

export default function GenerateDMPage() {
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedDM, setEditedDM] = useState("");
  const [generating, setGenerating] = useState(false);

  const resultRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<GenerateDMInput>({
    resolver: zodResolver(generateDMSchema),
    mode: "onChange",
    defaultValues: {
      platform: "INSTAGRAM",
      niche: "",
      clientDetail: "",
      service: "",
      tone: "FRIENDLY",
      examples: "",
    },
  });

  const scrollToResult = () => {
    setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const onSubmit = async (data: GenerateDMInput) => {
    try {
      setGenerating(true);
      setResult("");

      scrollToResult();

      const response = await generateDM(data);

      setResult(response.data.generatedDM);
      setEditedDM(response.data.generatedDM);
      setEditMode(false);
    } catch {
      toast.error("Failed to generate DM");
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    const text = editMode ? editedDM : result;

    navigator.clipboard.writeText(text);
    setCopied(true);

    toast.success("Copied to clipboard");

    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setResult("");
    setEditedDM("");
    setEditMode(false);
  };

  return (
    <div className="max-w-full md:mx-auto space-y-8">
      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold">Generate Cold Outreach DM</h1>

        <p className="text-muted-foreground mt-1">
          Create personalized outreach messages using AI
        </p>
      </div>

      {/* FORM */}

      <Card>
        <CardHeader>
          <CardTitle>Outreach Details</CardTitle>

          <CardDescription>
            Provide details about your target client and your service.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* PLATFORM */}

            <div className="space-y-2">
              <label className="text-sm font-medium">Platform</label>

              <Controller
                name="platform"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="INSTAGRAM">Instagram</SelectItem>
                      <SelectItem value="LINKEDIN">LinkedIn</SelectItem>
                      <SelectItem value="WHATSAPP">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.platform && (
                <p className="text-red-500 text-sm">
                  {errors.platform.message}
                </p>
              )}
            </div>

            {/* TONE */}

            <div className="space-y-2">
              <label className="text-sm font-medium">Tone</label>

              <Controller
                name="tone"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="PROFESSIONAL">Professional</SelectItem>
                      <SelectItem value="CASUAL">Casual</SelectItem>
                      <SelectItem value="FRIENDLY">Friendly</SelectItem>
                      <SelectItem value="DIRECT">Direct</SelectItem>
                      <SelectItem value="CONFIDENT">Confident</SelectItem>
                      <SelectItem value="LUXURY">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.tone && (
                <p className="text-red-500 text-sm">{errors.tone.message}</p>
              )}
            </div>

            {/* NICHE */}

            <div className="space-y-2">
              <label className="text-sm font-medium">Target Niche</label>

              <Input
                placeholder="e.g. Fitness coaches"
                {...register("niche")}
              />

              {errors.niche && (
                <p className="text-red-500 text-sm">{errors.niche.message}</p>
              )}
            </div>

            {/* CLIENT */}

            <div className="space-y-2">
              <label className="text-sm font-medium">Client Description</label>

              <Input
                placeholder="e.g. Online fitness coach"
                {...register("clientDetail")}
              />

              {errors.clientDetail && (
                <p className="text-red-500 text-sm">
                  {errors.clientDetail.message}
                </p>
              )}
            </div>

            {/* SERVICE */}

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Your Service</label>

              <Input
                placeholder="e.g. Lead generation system"
                {...register("service")}
              />

              {errors.service && (
                <p className="text-red-500 text-sm">{errors.service.message}</p>
              )}
            </div>

            {/* EXAMPLES */}

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">
                Example Messages (Optional)
              </label>

              <Textarea
                placeholder="Paste example outreach messages if you want the AI to mimic them..."
                {...register("examples")}
              />

              {errors.examples && (
                <p className="text-red-500 text-sm">
                  {errors.examples.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || generating}
              className="md:col-span-2"
            >
              {generating ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} />
                  Generating DM...
                </span>
              ) : (
                "Generate DM"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* RESULT */}

      {(generating || result) && (
        <div ref={resultRef}>
          <Card className="animate-in fade-in slide-in-from-bottom-3 duration-500">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Generated DM</CardTitle>

                <CardDescription>AI generated outreach message</CardDescription>
              </div>

              {!generating && (
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" onClick={handleCopy}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setEditMode(!editMode)}
                  >
                    <Pencil size={16} />
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleRegenerate}
                  >
                    <RefreshCw size={16} />
                  </Button>
                </div>
              )}
            </CardHeader>

            <CardContent>
              {generating ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
              ) : !editMode ? (
                <TypingDM text={result} />
              ) : (
                <Textarea
                  value={editedDM}
                  onChange={(e) => setEditedDM(e.target.value)}
                  className="min-h-[160px]"
                />
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
