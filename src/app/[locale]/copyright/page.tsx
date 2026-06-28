import messages from "@/locales/en.json";

export default function CopyrightPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black text-slate-50">Copyright</h1>
      <p className="mt-6 text-base leading-8 text-slate-300">{messages.site.legalNotice}</p>
      <p className="mt-5 text-base leading-8 text-slate-300">Official game names, Roblox images, logos, screenshots, thumbnails, and platform marks belong to their respective owners. This wiki uses official public assets only to identify and discuss the game.</p>
    </main>
  );
}
