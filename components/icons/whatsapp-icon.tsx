import Image from "next/image";

interface WhatsAppIconProps {
  className?: string;
  invert?: boolean;
}

export function WhatsAppIcon({ className = "", invert = false }: WhatsAppIconProps) {
  return (
    <div
      className={className}
      style={invert ? { filter: "brightness(0) invert(1)" } : {}}
    >
      <Image
        src="/whatsapp.svg"
        alt="WhatsApp"
        width={24}
        height={24}
        className="w-full h-full"
      />
    </div>
  );
}

