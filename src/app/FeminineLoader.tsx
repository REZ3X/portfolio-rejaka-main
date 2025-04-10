"use client";
import React from "react";

const FeminineLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#2e1e2e] z-50 flex flex-col items-center justify-center">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full bg-[#3a2939] opacity-30 animate-ping-slow"></div>
        <div
          className="absolute inset-4 rounded-full bg-[#4e3a4d] opacity-20 animate-ping-slow"
          style={{ animationDelay: "0.7s" }}
        ></div>

        <div className="absolute inset-6 z-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-10 rounded-full bg-[#e6a2ce] opacity-80"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "50% 0",
                transform: `translateX(-50%) rotate(${i * 45}deg)`,
                animation: `flower-petal-spin 4s ease-in-out infinite`,
                animationDelay: `${i * 0.125}s`,
              }}
            />
          ))}

          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e6a2ce] to-[#c678a4] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg">
            <div className="absolute inset-1.5 rounded-full bg-[#2e1e2e]"></div>
          </div>
        </div>

        <div className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-[#f4c6e2] to-[#e6a2ce] top-0 left-8 animate-float-slow"></div>
        <div
          className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-[#e6a2ce] to-[#c678a4] bottom-4 left-2 animate-float-slow"
          style={{ animationDelay: "1.2s" }}
        ></div>
        <div
          className="absolute w-5 h-5 rounded-full bg-gradient-to-r from-[#c678a4] to-[#e6a2ce] bottom-6 right-3 animate-float-slow"
          style={{ animationDelay: "0.5s" }}
        ></div>

        <div
          className="absolute top-3 right-5 text-[#f4c6e2] animate-pulse"
          style={{ fontSize: "10px", animationDuration: "1.5s" }}
        >
          ✦
        </div>
        <div
          className="absolute bottom-8 left-8 text-[#f4c6e2] animate-pulse"
          style={{ fontSize: "12px", animationDuration: "2s" }}
        >
          ✦
        </div>
        <div
          className="absolute top-10 left-3 text-[#f4c6e2] animate-pulse"
          style={{ fontSize: "8px", animationDuration: "1.8s" }}
        >
          ✦
        </div>

        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#e6a2ce]/10 to-[#c678a4]/10 blur-xl animate-pulse-slow opacity-70"></div>
      </div>

      <div className="mt-8 relative">
        <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#e6a2ce]/50 to-transparent rounded mb-4"></div>
        <div className="text-[#e6a2ce] font-medium animate-pulse text-center relative">
          <span className="soft-wave">
            {["L", "o", "a", "d", "i", "n", "g"].map((letter, i) => (
              <span
                key={i}
                style={{ "--i": i } as React.CSSProperties}
                className="inline-block"
              >
                {letter}
              </span>
            ))}
            <span className="inline-flex">
              <span
                className="animate-bounce-dot"
                style={{ animationDelay: "0s" }}
              >
                .
              </span>
              <span
                className="animate-bounce-dot"
                style={{ animationDelay: "0.2s" }}
              >
                .
              </span>
              <span
                className="animate-bounce-dot"
                style={{ animationDelay: "0.4s" }}
              >
                .
              </span>
            </span>
          </span>
        </div>
        <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#e6a2ce]/50 to-transparent rounded mt-4"></div>
      </div>

      <style jsx global>{`
        @keyframes flower-petal-spin {
          0%,
          100% {
            transform: translateX(-50%) rotate(${0}deg) translateY(0);
            opacity: 0.7;
          }
          50% {
            transform: translateX(-50%) rotate(${360}deg) translateY(-5px);
            opacity: 0.9;
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-10px) scale(1.1);
            opacity: 1;
          }
        }

        @keyframes ping-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.4;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes bounce-dot {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-bounce-dot {
          animation: bounce-dot 1s ease-in-out infinite;
          display: inline-block;
        }

        .soft-wave span {
          display: inline-block;
          animation: softWave 1.5s ease-in-out infinite;
          animation-delay: calc(0.1s * var(--i));
        }
      `}</style>
    </div>
  );
};

export default FeminineLoader;
