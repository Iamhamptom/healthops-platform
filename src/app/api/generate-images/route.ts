import { NextResponse } from "next/server";
import { GoogleGenAI, Modality } from "@google/genai";
import fs from "fs";
import path from "path";

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const IMAGE_PROMPTS: Record<string, string> = {
  "hero-bg": "A stunning wide-angle photograph of a modern, luxurious medical clinic reception area at golden hour. Warm ambient lighting, polished marble floors, lush green plants, floor-to-ceiling windows with soft natural light streaming in. A sleek white reception desk with subtle green LED accent lighting underneath. The space feels warm, welcoming, and high-end. Ultra-realistic, cinematic lighting, 8K quality, shallow depth of field. No text or logos.",

  "intro-bg": "An abstract artistic photograph of flowing green aurora borealis light trails against a deep black background. Organic, ethereal glowing ribbons of emerald green (#34D399) and teal (#2DD4BF) light dancing through darkness. Ultra-smooth, glossy, liquid-like reflections. Feels premium, alive, and mesmerizing. No text, no people. 8K quality, long exposure photography style.",

  "features-botanical": "A beautiful flat-lay photograph of modern medical technology arranged artistically on a dark green marble surface. A stethoscope, a tablet showing health charts, fresh eucalyptus branches, a white ceramic coffee cup, and a smartphone showing a WhatsApp conversation. Soft overhead lighting, clean and organized. Luxury medical aesthetic. Ultra-realistic, 8K, editorial photography style. No text.",

  "dashboard-preview": "A photorealistic screenshot-style image of a modern healthcare analytics dashboard on a large curved monitor in a dark premium office. The dashboard shows colorful charts, patient statistics, booking graphs with green accent colors (#34D399). The monitor sits on a sleek wooden desk with ambient green LED backlighting. Shallow depth of field, moody cinematic lighting. No readable text, just abstract data visualization shapes.",

  "testimonial-portrait": "A warm, professional portrait photograph of a confident South African female dentist in her 30s wearing a white lab coat, standing in a modern dental clinic. She has a genuine, warm smile. Soft natural window light, bokeh background showing blurred dental equipment. Shot on medium format camera, editorial quality, warm skin tones. 8K resolution.",

  "verticals-panel": "A dramatic split-composition photograph showing four healthcare environments: a modern dental office with green accent chairs, a high-tech radiology suite with a CT scanner, a luxury wellness spa with candles and plants, and a hospital corridor with warm lighting. Each quadrant separated by thin glowing green lines. Cinematic, premium feel. 8K quality. No text.",

  "cta-orbs": "An abstract digital art piece of luminous green and teal glass orbs floating in a dark void. The spheres are translucent, glossy, and reflective with internal glowing light. Some orbs overlap creating beautiful color mixing effects. Emerald green (#34D399) and teal (#2DD4BF) against pure black (#030F07). Feels futuristic and alive. No text. 8K quality.",

  "pattern-grid": "An abstract minimalist pattern of thin glowing green (#34D399) geometric lines forming a perspective grid that fades into a dark background (#030F07). The lines have a subtle glow effect. Clean, modern, technical feel. Like a holographic wireframe landscape. No text. High resolution.",
};

export async function POST(request: Request) {
  try {
    const { images } = await request.json();
    const imagesToGenerate = images || Object.keys(IMAGE_PROMPTS);
    const outputDir = path.join(process.cwd(), "public", "images");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const results: Record<string, string> = {};

    for (const imageKey of imagesToGenerate) {
      const prompt = IMAGE_PROMPTS[imageKey];
      if (!prompt) {
        results[imageKey] = "unknown prompt key";
        continue;
      }

      try {
        const response = await client.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: prompt,
          config: {
            responseModalities: [Modality.TEXT, Modality.IMAGE],
          },
        });

        const candidates = response.candidates;
        if (!candidates || candidates.length === 0) {
          results[imageKey] = "no candidates returned";
          continue;
        }

        for (const part of candidates[0].content?.parts || []) {
          if (part.inlineData) {
            const imageBytes = Buffer.from(part.inlineData.data!, "base64");
            const filename = `${imageKey}.png`;
            const filepath = path.join(outputDir, filename);
            fs.writeFileSync(filepath, imageBytes);
            results[imageKey] = `/images/${filename}`;
            break;
          }
        }

        if (!results[imageKey]) {
          results[imageKey] = "no image in response";
        }
      } catch (err) {
        results[imageKey] = `error: ${err instanceof Error ? err.message : "unknown"}`;
      }
    }

    return NextResponse.json({ results });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to generate images" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    available: Object.keys(IMAGE_PROMPTS),
    usage: "POST with { images: ['hero-bg', 'intro-bg'] } or omit to generate all",
  });
}
