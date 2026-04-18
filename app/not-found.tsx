import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-20 text-center font-poppins">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/40">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-foreground">
        Page not found
      </h1>
      <p className="mt-3 text-[14px] leading-relaxed text-foreground/55">
        This URL doesn&apos;t exist or may have moved. Check the address or head back home.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-[#ff3b1f] px-6 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  );
}
