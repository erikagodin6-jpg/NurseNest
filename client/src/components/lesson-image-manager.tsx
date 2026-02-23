import { useState, useEffect, useCallback } from "react";
import { ObjectUploader } from "@/components/ObjectUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ImagePlus, Trash2, Pencil, Check, X } from "lucide-react";
import type { UppyFile } from "@uppy/core";

interface LessonImage {
  id: number;
  lesson_id: string;
  object_path: string;
  file_name: string;
  section: string;
  caption: string | null;
  position: number;
}

function getAdminCredentials(): { username: string; password: string } | null {
  try {
    const stored = localStorage.getItem("nursenest-credentials");
    if (stored) {
      const { username, password } = JSON.parse(stored);
      if (username && password) return { username, password };
    }
  } catch {}
  return null;
}

interface LessonImageManagerProps {
  lessonId: string;
  section?: string;
  isAdmin: boolean;
  isEditing: boolean;
}

export function LessonImageManager({ lessonId, section = "general", isAdmin, isEditing }: LessonImageManagerProps) {
  const [images, setImages] = useState<LessonImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCaption, setEditingCaption] = useState<number | null>(null);
  const [captionText, setCaptionText] = useState("");
  const { toast } = useToast();

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch(`/api/lesson-images/${lessonId}`);
      if (res.ok) {
        const data = await res.json();
        const filtered = section === "all" ? data : data.filter((img: LessonImage) => img.section === section);
        setImages(filtered);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, [lessonId, section]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleGetUploadParameters = async (file: UppyFile<Record<string, unknown>, Record<string, unknown>>) => {
    const res = await fetch("/api/uploads/request-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: file.name,
        size: file.size,
        contentType: file.type,
      }),
    });
    if (!res.ok) throw new Error("Failed to get upload URL");
    const data = await res.json();
    (file as any)._objectPath = data.objectPath;
    return {
      method: "PUT" as const,
      url: data.uploadURL,
      headers: { "Content-Type": file.type || "application/octet-stream" },
    };
  };

  const handleUploadComplete = async (result: any) => {
    const creds = getAdminCredentials();
    const successfulFiles = result.successful || [];
    for (const file of successfulFiles) {
      const objectPath = (file as any)._objectPath;
      if (!objectPath) continue;
      try {
        const res = await fetch("/api/lesson-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lessonId,
            objectPath,
            fileName: file.name,
            section,
            caption: "",
            position: images.length,
            username: creds?.username,
            password: creds?.password,
          }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error);
        }
        toast({ title: "Image uploaded", description: `${file.name} added successfully` });
      } catch (e: any) {
        toast({ title: "Error saving image record", description: e.message, variant: "destructive" });
      }
    }
    fetchImages();
  };

  const deleteImage = async (imageId: number) => {
    const creds = getAdminCredentials();
    try {
      const res = await fetch(`/api/lesson-images/${imageId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: creds?.username,
          password: creds?.password,
        }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setImages((prev) => prev.filter((img) => img.id !== imageId));
      toast({ title: "Image removed" });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const saveCaption = async (imageId: number) => {
    const creds = getAdminCredentials();
    try {
      const res = await fetch(`/api/lesson-images/${imageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caption: captionText,
          username: creds?.username,
          password: creds?.password,
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      setImages((prev) => prev.map((img) => img.id === imageId ? { ...img, caption: captionText } : img));
      setEditingCaption(null);
      toast({ title: "Caption updated" });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  if (loading) return null;

  if (!isAdmin && images.length === 0) return null;

  return (
    <div className="space-y-3" data-testid={`lesson-images-${section}`}>
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
              <img
                src={img.object_path}
                alt={img.caption || img.file_name}
                className="w-full h-auto object-contain max-h-80"
                loading="lazy"
                data-testid={`img-lesson-${img.id}`}
              />
              {img.caption && editingCaption !== img.id && (
                <div className="px-3 py-2 text-sm text-gray-600 italic bg-gray-50 border-t border-gray-100">
                  {img.caption}
                </div>
              )}
              {isAdmin && isEditing && (
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-7 w-7 bg-white/90 shadow"
                    onClick={() => { setEditingCaption(img.id); setCaptionText(img.caption || ""); }}
                    data-testid={`button-edit-caption-${img.id}`}
                  >
                    <Pencil className="w-3 h-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-7 w-7 shadow"
                    onClick={() => deleteImage(img.id)}
                    data-testid={`button-delete-image-${img.id}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
              {editingCaption === img.id && (
                <div className="px-3 py-2 flex gap-2 bg-gray-50 border-t border-gray-100">
                  <Input
                    value={captionText}
                    onChange={(e) => setCaptionText(e.target.value)}
                    placeholder="Add a caption..."
                    className="text-sm h-8"
                    data-testid={`input-caption-${img.id}`}
                  />
                  <Button size="icon" className="h-8 w-8" onClick={() => saveCaption(img.id)} data-testid={`button-save-caption-${img.id}`}>
                    <Check className="w-3 h-3" />
                  </Button>
                  <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setEditingCaption(null)}>
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isAdmin && isEditing && (
        <ObjectUploader
          maxNumberOfFiles={5}
          maxFileSize={15728640}
          onGetUploadParameters={handleGetUploadParameters}
          onComplete={handleUploadComplete}
          buttonClassName="gap-2 text-sm"
        >
          <ImagePlus className="w-4 h-4" />
          Add Image{images.length > 0 ? "s" : ""}
        </ObjectUploader>
      )}
    </div>
  );
}
