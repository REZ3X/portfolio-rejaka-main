import { useUser } from "@/context/UserContext";
import XiannyaaBotButton from "@/components/main/xiannyaa/BotButton";
import { useRouter } from "next/navigation";

const BotButton: React.FC = () => {
  const { themeStyle } = useUser();
  const router = useRouter();

  if (themeStyle === "soft") {
    return <XiannyaaBotButton />;
  }

  const openVoidBot = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("modal", "voidbot");
    window.history.pushState({}, "", url);
    router.replace(`${window.location.pathname}?modal=voidbot`);
  };

  return (
    <button
      onClick={openVoidBot}
      className="fixed bottom-16 right-6 p-3 rounded-full shadow-lg z-40
        bg-[#0c1219] border-2 border-[#00adb4] hover:bg-[#112130]"
    >
      <div className="flex items-center justify-center">
        <span className="text-2xl text-[#00adb4]">🤖</span>
      </div>
    </button>
  );
};

export default BotButton;
