"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function CreateEventPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        overview: "",
        description: "",
        venue: "",
        location: "",
        date: "",
        time: "",
        mode: "offline",
        audience: "",
        organizer: "",
        tags: "",
        agenda: "",
    });

    const [image, setImage] = useState<File | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!image) {
                throw new Error("Please select an image.");
            }

            const body = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== "tags" && key !== "agenda") {
                    body.append(key, value);
                }
            });

            const tagsArray = formData.tags.split(",").map((t) => t.trim()).filter((t) => t !== "");
            const agendaArray = formData.agenda.split("\n").map((a) => a.trim()).filter((a) => a !== "");

            body.append("tags", JSON.stringify(tagsArray));
            body.append("agenda", JSON.stringify(agendaArray));
            body.append("image", image);

            const response = await fetch("/api/events", {
                method: "POST",
                body,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || result.error || "Failed to create event");
            }

            router.push("/");
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <div className="space-y-2 mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-gradient tracking-tight">Create Event</h1>
                    <p className="text-light-200">Share your event with the global tech community.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-card p-8 rounded-xl border border-border/40 backdrop-blur-sm">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                            <p className="text-red-400 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-foreground/90 font-semibold">Event Title</Label>
                            <Input
                                id="title"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Next.js Global Summit"
                                className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="organizer" className="text-foreground/90 font-semibold">Organizer</Label>
                            <Input
                                id="organizer"
                                name="organizer"
                                required
                                value={formData.organizer}
                                onChange={handleChange}
                                placeholder="Name or Organization"
                                className="bg-black/50 border-white/10 text-white placeholder:text-white/20"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="overview" className="text-light-100 font-semibold">Short Overview</Label>
                            <Input
                                id="overview"
                                name="overview"
                                required
                                value={formData.overview}
                                onChange={handleChange}
                                placeholder="A catchy one-liner about your event"
                                className="bg-black/50 border-white/10 text-white placeholder:text-white/20"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="description" className="text-light-100 font-semibold">Full Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                required
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Tell us more about what makes this event special..."
                                className="bg-black/50 border-white/10 text-white placeholder:text-white/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-light-100 font-semibold">Date</Label>
                            <Input
                                id="date"
                                type="date"
                                name="date"
                                required
                                value={formData.date}
                                onChange={handleChange}
                                className="bg-black/50 border-white/10 text-white [color-scheme:dark]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="time" className="text-light-100 font-semibold">Time</Label>
                            <Input
                                id="time"
                                type="time"
                                name="time"
                                required
                                value={formData.time}
                                onChange={handleChange}
                                className="bg-black/50 border-white/10 text-white [color-scheme:dark]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="venue" className="text-light-100 font-semibold">Venue</Label>
                            <Input
                                id="venue"
                                name="venue"
                                required
                                value={formData.venue}
                                onChange={handleChange}
                                placeholder="e.g. Grand Hall or Zoom Link"
                                className="bg-black/50 border-white/10 text-white placeholder:text-white/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-light-100 font-semibold">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                required
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Bangkok, Thailand"
                                className="bg-black/50 border-white/10 text-white placeholder:text-white/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="mode" className="text-light-100 font-semibold">Mode</Label>
                            <select
                                id="mode"
                                name="mode"
                                value={formData.mode}
                                onChange={handleChange}
                                className="flex h-9 w-full rounded-md border border-white/10 bg-black/50 px-3 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                                <option value="offline">Offline</option>
                                <option value="online">Online</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="audience" className="text-light-100 font-semibold">Audience</Label>
                            <Input
                                id="audience"
                                name="audience"
                                required
                                value={formData.audience}
                                onChange={handleChange}
                                placeholder="e.g. Developers, Students"
                                className="bg-black/50 border-white/10 text-white placeholder:text-white/20"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="tags" className="text-light-100 font-semibold">Tags (comma separated)</Label>
                            <Input
                                id="tags"
                                name="tags"
                                required
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="e.g. React, Next.js, AI"
                                className="bg-black/50 border-white/10 text-white placeholder:text-white/20"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="agenda" className="text-light-100 font-semibold">Agenda (One per line)</Label>
                            <Textarea
                                id="agenda"
                                name="agenda"
                                required
                                rows={3}
                                value={formData.agenda}
                                onChange={handleChange}
                                placeholder="09:00 - Introduction&#10;10:00 - Keynote Session"
                                className="bg-black/50 border-white/10 text-white placeholder:text-white/20"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="image" className="text-light-100 font-semibold">Event Image</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                required
                                onChange={handleImageChange}
                                className="bg-black/50 border-white/10 text-white file:text-white file:bg-white/10 file:border-0 file:px-3 file:py-1 file:rounded-md hover:file:bg-white/20 cursor-pointer"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-black font-bold h-12 rounded-xl text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                    >
                        {loading ? "Creating..." : "Publish Event"}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}
