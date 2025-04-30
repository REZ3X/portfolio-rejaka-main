import BotButtonWrapper from "./BotButtonWrapper";
import { useRouter } from "next/navigation";

const XiannyaaBotButton: React.FC = () => {
  const router = useRouter();

  const openVoidBot = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("modal", "voidbot");
    window.history.pushState({}, "", url);
    router.replace(`${window.location.pathname}?modal=voidbot`);
  };

  return (
    <BotButtonWrapper>
      <button
        onClick={openVoidBot}
        className="p-3 rounded-full shadow-lg
          bg-[#3a2939] border-2 border-[#e39fc2] hover:bg-[#2a1e29] hover:shadow-xl
          transition-all duration-300 transform hover:-translate-y-1"
        style={{
          boxShadow: "0 4px 12px rgba(227, 159, 194, 0.2)",
        }}
      >
        <div className="flex items-center justify-center">
          <span className="text-2xl text-[#e39fc2]">✨</span>
        </div>
      </button>
    </BotButtonWrapper>
  );
};

export default XiannyaaBotButton;
