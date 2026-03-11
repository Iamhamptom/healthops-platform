/**
 * Generate diverse African healthcare images using Gemini Nano Banana 2
 * Run: npx tsx scripts/generate-health-images.ts
 */

import { GoogleGenAI, Modality } from "@google/genai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
const outputDir = path.join(process.cwd(), "public", "images");

// Diverse African healthcare image prompts — all races represented
const IMAGE_PROMPTS: Record<string, string> = {
  // === HERO & BACKGROUND ===
  "hero-bg":
    "A stunning wide-angle photograph of a modern African private healthcare clinic reception. A Black South African female receptionist in professional attire warmly greets a young Indian couple at the sleek white desk. Warm golden hour lighting, polished floors, lush indoor plants, floor-to-ceiling windows. Green LED accent strip under the desk. Modern, luxurious, warm. Ultra-realistic, cinematic, 8K. No text or logos.",

  // === TESTIMONIAL PORTRAITS ===
  "portrait-sarah":
    "Professional portrait of a confident Coloured South African female dentist in her mid-30s, wearing a crisp white lab coat over emerald scrubs. She has warm brown skin, curly hair pulled back neatly. Standing in a modern dental clinic with soft window light. Genuine warm smile showing perfect teeth. Bokeh background of blurred dental equipment. Medium format camera quality, editorial portrait, warm skin tones. 8K resolution. Photorealistic.",

  "portrait-thabo":
    "Professional portrait of a distinguished Black South African male radiologist in his 40s, wearing a white lab coat with a stethoscope. He has a kind, authoritative expression. Dark skin, short neat hair. Standing in front of a modern radiology viewing screen showing an X-ray (blurred). Soft blue-white ambient lighting. Shot on medium format, editorial quality. 8K resolution. Photorealistic.",

  "portrait-lisa":
    "Professional portrait of a confident White South African female wellness spa manager in her late 30s, wearing an elegant sage green blouse. She has blonde hair in a professional style. Standing in a luxury wellness spa with soft warm lighting, candles and plants visible in the bokeh background. Friendly, approachable expression. Editorial portrait photography. 8K resolution. Photorealistic.",

  // === ABOUT PAGE ===
  "about-team":
    "A wide photograph of a diverse South African healthcare team meeting in a modern boardroom. Five people around a glass table with a large screen showing health analytics: a Black male doctor in white coat, an Indian female nurse, a Coloured male IT specialist with laptop, a White female practice manager, and a Black female data analyst. All engaged in discussion, some smiling. Modern office with plants and natural light. Ultra-realistic, cinematic, 8K.",

  "about-clinic":
    "Interior photograph of a beautiful modern African private dental clinic. A Black female dentist examining a Coloured male patient in a state-of-the-art dental chair. The clinic has warm wood accents, emerald green accent walls, modern equipment, and natural light from large windows. Clean, professional, premium feel. African art on the walls. Ultra-realistic, 8K quality.",

  // === HOW IT WORKS ===
  "step-whatsapp":
    "Photograph of a young Black South African woman in casual smart attire sitting in a cafe, looking at her smartphone with WhatsApp open. The screen shows a friendly conversation with a healthcare chatbot (slightly visible). She looks pleased and relieved. Warm natural lighting, shallow depth of field. Modern Johannesburg cafe setting visible through windows. Ultra-realistic, 8K.",

  "step-ai-chat":
    "Photograph of a modern computer screen showing an AI healthcare chat interface with green accent colors, alongside a desk with a stethoscope and coffee cup. The screen shows a clean conversation UI with patient booking details (text blurred/abstract). Soft ambient office lighting, dark premium workspace. Ultra-realistic, 8K.",

  "step-booking":
    "Photograph of an Indian South African female receptionist at a modern healthcare desk, confirming a booking on a tablet while smiling at a Black male patient across the counter. Modern clinic interior with white and green accents. Both people look happy and engaged. Natural lighting, professional setting. Ultra-realistic, 8K.",

  "step-followup":
    "Photograph of a Coloured South African male nurse doing a post-procedure check-in with a White elderly female patient in a modern, well-lit examination room. He's showing her results on a tablet. Both look comfortable and engaged. Warm, caring atmosphere. Modern medical equipment visible. Ultra-realistic, 8K.",

  // === VERTICALS ===
  "verticals-panel":
    "A dramatic four-panel split composition: TOP-LEFT: Modern dental clinic with a Black female dentist treating an Indian patient. TOP-RIGHT: Radiology suite with a White male radiologist reviewing scans. BOTTOM-LEFT: Luxury wellness spa with a Coloured female therapist and client. BOTTOM-RIGHT: Hospital corridor with diverse medical staff walking. Each panel separated by thin glowing green lines. Cinematic, premium, 8K.",

  // === FEATURES ===
  "features-botanical":
    "A beautiful flat-lay photograph on a dark emerald marble surface. A rose-gold stethoscope, a tablet showing colorful health charts with green accents, fresh protea flowers (South African), a ceramic coffee cup, and a smartphone showing a WhatsApp conversation. Soft overhead lighting, clean and organized. Premium medical aesthetic with African botanical touches. Ultra-realistic, 8K, editorial photography.",

  // === DASHBOARD ===
  "dashboard-preview":
    "A photorealistic image of a Black South African healthcare administrator sitting at a curved ultrawide monitor showing a modern health analytics dashboard. Green charts, patient statistics, and booking graphs on screen. Dark premium office with ambient green LED backlighting behind the monitor. The person is professionally dressed, reviewing data. Shallow depth of field, cinematic lighting. 8K.",
};

async function generateImage(key: string, prompt: string): Promise<string | null> {
  console.log(`\n🎨 Generating: ${key}...`);

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
      console.log(`  ⚠️  No candidates returned for ${key}`);
      return null;
    }

    for (const part of candidates[0].content?.parts || []) {
      if (part.inlineData) {
        const imageBytes = Buffer.from(part.inlineData.data!, "base64");
        const filename = `${key}.png`;
        const filepath = path.join(outputDir, filename);
        fs.writeFileSync(filepath, imageBytes);
        console.log(`  ✅ Saved: /images/${filename} (${(imageBytes.length / 1024).toFixed(0)}KB)`);
        return `/images/${filename}`;
      }
    }

    console.log(`  ⚠️  No image data in response for ${key}`);
    return null;
  } catch (err) {
    console.error(`  ❌ Error generating ${key}:`, err instanceof Error ? err.message : err);
    return null;
  }
}

async function main() {
  console.log("🏥 VisioHealth OS — Diverse African Healthcare Image Generator");
  console.log("═══════════════════════════════════════════════════════════════");
  console.log(`Output: ${outputDir}`);
  console.log(`Images to generate: ${Object.keys(IMAGE_PROMPTS).length}`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Get specific images from CLI args, or generate all
  const args = process.argv.slice(2);
  const keysToGenerate = args.length > 0
    ? args.filter((k) => k in IMAGE_PROMPTS)
    : Object.keys(IMAGE_PROMPTS);

  if (args.length > 0 && keysToGenerate.length === 0) {
    console.log(`\nAvailable keys: ${Object.keys(IMAGE_PROMPTS).join(", ")}`);
    process.exit(1);
  }

  const results: Record<string, string | null> = {};

  for (const key of keysToGenerate) {
    results[key] = await generateImage(key, IMAGE_PROMPTS[key]);
    // Small delay between requests to avoid rate limiting
    if (keysToGenerate.indexOf(key) < keysToGenerate.length - 1) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  console.log("\n═══════════════════════════════════════════════════════════════");
  console.log("📊 Results:");
  const success = Object.values(results).filter(Boolean).length;
  const failed = Object.values(results).filter((v) => !v).length;

  for (const [key, path] of Object.entries(results)) {
    console.log(`  ${path ? "✅" : "❌"} ${key}: ${path || "FAILED"}`);
  }

  console.log(`\n✅ ${success} generated | ❌ ${failed} failed`);
}

main().catch(console.error);
