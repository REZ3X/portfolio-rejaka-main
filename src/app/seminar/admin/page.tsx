"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useUser } from "@/context/UserContext";
import jsQR from "jsqr";

interface Registration {
  _id: string;
  name: string;
  email: string;
  code: string;
  attendeeStatus: "registered" | "attended";
  registeredAt: string;
}

const SeminarAdminPage: React.FC = () => {
  const { themeStyle } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [cameraError, setCameraError] = useState("");
  const [deviceInfo, setDeviceInfo] = useState("");
  const [securityInfo, setSecurityInfo] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    registered: 0,
    attended: 0,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const authToken = localStorage.getItem("seminar_admin_auth");
        if (authToken) {
          try {
            const tokenData = JSON.parse(authToken);
            if (tokenData.expires > Date.now()) {
              setIsAuthenticated(true);
              return;
            } else {
              localStorage.removeItem("seminar_admin_auth");
            }
          } catch (error) {
            console.error("Invalid auth token:", error);
            localStorage.removeItem("seminar_admin_auth");
          }
        }
      }
      setIsAuthenticated(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const userAgent = navigator.userAgent;
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    const isChrome = /Chrome/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && !isChrome;
    const isSecureContext = window.isSecureContext;
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;

    setDeviceInfo(
      `${isMobile ? "Mobile" : "Desktop"} | ${
        isIOS ? "iOS" : isAndroid ? "Android" : "Other"
      } | ${isChrome ? "Chrome" : isSafari ? "Safari" : "Other Browser"}`
    );
    setSecurityInfo(
      `${protocol} | ${hostname} | ${
        isSecureContext ? "Secure Context" : "Insecure Context"
      }`
    );

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError(
        "❌ Camera API not supported on this browser/device combination"
      );
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const response = await fetch("/api/seminar/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginCredentials.username,
          password: loginCredentials.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "seminar_admin_auth",
            JSON.stringify(data.token)
          );
        }

        setIsAuthenticated(true);
        setLoginCredentials({ username: "", password: "" });
      } else {
        setLoginError(data.message || "❌ Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("❌ Authentication failed. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("seminar_admin_auth");
    }
    setIsAuthenticated(false);
    setRegistrations([]);
    setStats({ total: 0, registered: 0, attended: 0 });
    stopScanning();
    setMessage("");
    setError("");
    setCameraError("");
  };

  const fetchRegistrations = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const response = await fetch("/api/seminar/admin/registrations");
      const data = await response.json();

      if (data.success) {
        setRegistrations(data.registrations);
        setStats(data.stats);
      } else {
        setError("Failed to fetch registrations");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
      const interval = setInterval(fetchRegistrations, 5000);
      return () => clearInterval(interval);
    }
  }, [fetchRegistrations, isAuthenticated]);

  const detectQRFromCanvas = (canvas: HTMLCanvasElement): string | null => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      return code ? code.data : null;
    } catch (error) {
      console.error("QR detection error:", error);
      return null;
    }
  };

  const handleManualCheckIn = async (code: string) => {
    if (!code.trim()) {
      setError("Please enter a valid code");
      return;
    }

    try {
      setMessage("");
      setError("");

      const response = await fetch("/api/seminar/admin/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`✅ Check-in berhasil untuk ${data.name}`);
        setScanResult("");
        fetchRegistrations();
        setTimeout(() => setMessage(""), 3000);
      } else {
        setError(data.message || "Check-in failed");
      }
    } catch (error) {
      console.error("Check-in error:", error);
      setError("Network error during check-in");
    }
  };

  const checkCameraSupport = async (): Promise<string | null> => {
    if (typeof window === "undefined") {
      return "❌ Server-side rendering - camera not available";
    }

    if (!window.isSecureContext && window.location.hostname !== "localhost") {
      return "❌ Camera requires HTTPS. Please access this page via HTTPS://";
    }

    if (!navigator.mediaDevices) {
      return "❌ MediaDevices API not available. Update your browser.";
    }

    if (!navigator.mediaDevices.getUserMedia) {
      return "❌ Camera API not supported. Try Chrome or Safari.";
    }

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices.length === 0) {
        return "❌ No camera found on this device.";
      }

      console.log(`Found ${videoDevices.length} camera(s):`, videoDevices);
      return null;
    } catch (error) {
      console.error("Device enumeration error:", error);
      return "❌ Cannot detect camera devices. Check permissions.";
    }
  };

  const startScanning = async () => {
    setScanning(true);
    setScanResult("");
    setError("");
    setMessage("");
    setCameraError("");

    const supportError = await checkCameraSupport();
    if (supportError) {
      setCameraError(supportError);
      setScanning(false);
      return;
    }

    try {
      console.log("🎥 Starting camera access...");
      console.log("Device info:", deviceInfo);
      console.log("Security info:", securityInfo);

      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const constraintSets: MediaStreamConstraints[] = [];

      if (isMobile) {
        constraintSets.push(
          {
            video: {
              facingMode: { exact: "environment" },
              width: { ideal: 1280, max: 1920 },
              height: { ideal: 720, max: 1080 },
              frameRate: { ideal: 30, max: 60 },
            },
          },
          {
            video: {
              facingMode: "environment",
              width: { ideal: 640, max: 1280 },
              height: { ideal: 480, max: 720 },
            },
          },
          {
            video: {
              facingMode: "environment",
            },
          }
        );
      } else {
        constraintSets.push(
          {
            video: {
              width: { ideal: 1280, max: 1920 },
              height: { ideal: 720, max: 1080 },
            },
          },
          {
            video: {
              width: { ideal: 640 },
              height: { ideal: 480 },
            },
          }
        );
      }

      constraintSets.push({ video: true });

      let stream: MediaStream | null = null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let lastError: any = null;

      for (let i = 0; i < constraintSets.length; i++) {
        const constraints = constraintSets[i];
        console.log(`🔄 Trying constraint set ${i + 1}:`, constraints);

        try {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
          console.log(`✅ Success with constraint set ${i + 1}`);

          const tracks = stream.getVideoTracks();
          if (tracks.length > 0) {
            const settings = tracks[0].getSettings();
            console.log("📹 Camera settings:", settings);
          }

          break;
        } catch (err) {
          console.log(`❌ Constraint set ${i + 1} failed:`, err);
          lastError = err;

          if (err instanceof Error && err.name === "NotAllowedError") {
            throw err;
          }

          continue;
        }
      }

      if (!stream) {
        throw lastError || new Error("All camera constraint sets failed");
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        videoRef.current.setAttribute("autoplay", "true");
        videoRef.current.setAttribute("muted", "true");

        const videoLoadPromise = new Promise<void>((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            reject(new Error("Video loading timeout"));
          }, 10000);

          const handleVideoLoaded = async () => {
            clearTimeout(timeoutId);
            if (videoRef.current) {
              try {
                console.log("📺 Video metadata loaded, starting playback...");
                await videoRef.current.play();
                console.log("▶️ Video playing successfully");
                resolve();
              } catch (playError) {
                console.error("❌ Video play error:", playError);
                reject(playError);
              }
            }
          };

          videoRef.current!.onloadedmetadata = handleVideoLoaded;

          if (videoRef.current!.readyState >= 1) {
            handleVideoLoaded();
          }
        });

        await videoLoadPromise;
        startQRDetection();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("🚫 Camera initialization failed:", err);
      let errorMessage = "Camera access failed";
      
      if (err.name === "NotAllowedError") {
        errorMessage = `❌ Camera permission denied
            
📱 To fix this:
1. Tap the camera icon in your browser's address bar
2. Allow camera access
3. Refresh this page
4. Try scanning again

Or use manual check-in below.`;
      } else if (err.name === "NotFoundError") {
        errorMessage =
          "❌ No camera found on this device. Use manual check-in below.";
      } else if (err.name === "NotSupportedError") {
        errorMessage =
          "❌ Camera not supported. Try Chrome or Safari, or use manual check-in.";
      } else if (err.name === "OverconstrainedError") {
        errorMessage =
          "❌ Camera settings not compatible. Trying basic settings...";
        setCameraError(errorMessage);
        setScanning(false);
        return;
      } else if (err.name === "SecurityError") {
        errorMessage =
          "❌ Security error. This page must be accessed via HTTPS for camera access.";
      } else if (err.message?.includes("timeout")) {
        errorMessage =
          "❌ Camera loading timeout. Please try again or check your camera permissions.";
      } else {
        errorMessage = `❌ Camera error: ${err.message || "Unknown error"}
            
Try refreshing the page or use manual check-in below.`;
      }

      setCameraError(errorMessage);
      setScanning(false);
    }
  };

  const startQRDetection = () => {
    if (!canvasRef.current || !videoRef.current) {
      console.error("❌ Canvas or video element not available");
      return;
    }

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("❌ Canvas context not available");
      return;
    }

    console.log("🔍 Starting QR detection...");

    const updateCanvasSize = () => {
      canvas.width = video.videoWidth || video.clientWidth || 640;
      canvas.height = video.videoHeight || video.clientHeight || 480;
      console.log(`📐 Canvas size: ${canvas.width}x${canvas.height}`);
    };

    updateCanvasSize();

    let scanCount = 0;
    const maxScans = 2000;
    let lastSuccessfulScan = 0;

    scanIntervalRef.current = setInterval(() => {
      if (scanCount >= maxScans) {
        console.log("⏰ Max scan attempts reached, stopping scanner");
        stopScanning();
        return;
      }

      scanCount++;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        try {
          if (
            canvas.width !== video.videoWidth ||
            canvas.height !== video.videoHeight
          ) {
            updateCanvasSize();
          }

          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const qrCode = detectQRFromCanvas(canvas);

          if (qrCode) {
            const now = Date.now();
            if (now - lastSuccessfulScan > 2000) {
              console.log("🎉 QR Code detected:", qrCode);
              lastSuccessfulScan = now;
              processQRScan(qrCode);
            }
          }
        } catch (error) {
          console.error("⚠️ Scan error:", error);
        }
      } else if (scanCount % 100 === 0) {
        console.log(
          `📹 Video state: ${video.readyState}, scan attempts: ${scanCount}`
        );
      }
    }, 300);

    console.log("✅ QR detection loop started");
  };

  const stopScanning = () => {
    console.log("🛑 Stopping scanner...");
    setScanning(false);

    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
        console.log("📹 Camera track stopped");
      });
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const processQRScan = async (code: string) => {
    console.log("🔄 Processing QR scan:", code);
    setScanResult(code);
    await handleManualCheckIn(code);
    stopScanning();
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  if (themeStyle !== "terminal") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2a1f29] to-[#1a1420] text-[#f0e6ef] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-[#e39fc2] mb-2">
              Admin Panel
            </h1>
            <p className="text-[#c4b2c3]">
              This page is optimized for terminal theme.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060a10] text-[#e0e0e0] font-mono p-4">
        <div className="max-w-md mx-auto mt-20">
          <div className="border border-[#393d46] bg-[#0a1017] p-6 rounded">
            <div className="text-center mb-6">
              <h1 className="text-2xl text-[#00adb4] mb-2">🔐 Admin Login</h1>
              <p className="text-[#c4d1d9] text-sm">
                Seminar Admin Panel Access
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[#c4d1d9] text-sm mb-2 font-medium">
                  Username
                </label>
                <input
                  type="text"
                  value={loginCredentials.username}
                  onChange={(e) =>
                    setLoginCredentials({
                      ...loginCredentials,
                      username: e.target.value,
                    })
                  }
                  className="w-full bg-[#202832] border border-[#393d46] p-3 text-[#e0e0e0] focus:border-[#00adb4] focus:outline-none rounded placeholder-[#6b7280]"
                  placeholder="Enter admin username"
                  required
                />
              </div>

              <div>
                <label className="block text-[#c4d1d9] text-sm mb-2 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={loginCredentials.password}
                  onChange={(e) =>
                    setLoginCredentials({
                      ...loginCredentials,
                      password: e.target.value,
                    })
                  }
                  className="w-full bg-[#202832] border border-[#393d46] p-3 text-[#e0e0e0] focus:border-[#00adb4] focus:outline-none rounded placeholder-[#6b7280]"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              {loginError && (
                <div className="border border-[#ff4444] bg-[#ff4444] bg-opacity-10 text-[#ff4444] p-3 text-sm rounded">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-[#00adb4] text-[#060a10] p-3 font-bold hover:bg-[#4dd0e1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded"
              >
                {loginLoading ? "🔄 Authenticating..." : "🔑 LOGIN"}
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-[#8b9cbe]">
              🔒 Secure admin access only
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060a10] text-[#e0e0e0] font-mono p-4">
      <div className="max-w-6xl mx-auto">
        <div className="border border-[#393d46] bg-[#0a1017] p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl text-[#00adb4] mb-2">
                ❯ Seminar Admin Panel
              </h1>
              <p className="text-[#8b9cbe] text-sm">
                English Mastery Workshop Management
              </p>
              <div className="text-xs text-[#393d46] mt-2 space-y-1">
                <div>Device: {deviceInfo}</div>
                <div>Security: {securityInfo}</div>
                <div>
                  Camera API:{" "}
                  {navigator.mediaDevices ? "Available" : "Not Available"}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={fetchRegistrations}
                className="px-4 py-2 border border-[#393d46] text-[#8b9cbe] hover:border-[#00adb4] hover:text-[#00adb4] transition-colors text-sm"
              >
                [REFRESH]
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-[#ff4444] text-[#ff4444] hover:bg-[#ff4444] hover:text-[#060a10] transition-colors text-sm"
              >
                🚪 LOGOUT
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="border border-[#393d46] bg-[#0a1017] p-4 text-center rounded">
            <div className="text-2xl text-[#00adb4] font-bold">
              {stats.total}
            </div>
            <div className="text-[#c4d1d9] text-sm">Total Registrations</div>
          </div>
          <div className="border border-[#393d46] bg-[#0a1017] p-4 text-center rounded">
            <div className="text-2xl text-[#ffaa00] font-bold">
              {stats.registered}
            </div>
            <div className="text-[#c4d1d9] text-sm">Registered</div>
          </div>
          <div className="border border-[#393d46] bg-[#0a1017] p-4 text-center rounded">
            <div className="text-2xl text-[#00ff88] font-bold">
              {stats.attended}
            </div>
            <div className="text-[#c4d1d9] text-sm">Attended</div>
          </div>
        </div>

        <div className="border border-[#393d46] bg-[#0a1017] p-4 mb-6">
          <h3 className="text-[#00adb4] text-lg mb-4">📷 QR Code Scanner</h3>

          {typeof window !== "undefined" &&
            !window.isSecureContext &&
            window.location.hostname !== "localhost" && (
              <div className="mb-4 p-3 border border-[#ff8800] bg-[#ff8800] bg-opacity-10 text-[#ff8800] text-sm rounded">
                <strong>🔒 HTTPS Required:</strong> Camera access requires a
                secure connection. Please access this page via HTTPS:// for QR
                scanning to work on mobile devices.
              </div>
            )}

          <div className="mb-4 p-3 border border-[#393d46] bg-[#0c1219] text-xs rounded">
            <div className="text-[#00adb4] font-bold mb-2">
              📱 Mobile Chrome Users:
            </div>
            <ul className="text-[#c4d1d9] space-y-1">
              <li className="flex items-start">
                <span className="text-[#00adb4] mr-2 flex-shrink-0">•</span>
                <span>Ensure you&apos;re on HTTPS (secure connection)</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#00adb4] mr-2 flex-shrink-0">•</span>
                <span>Allow camera permission when prompted</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#00adb4] mr-2 flex-shrink-0">•</span>
                <span>Use good lighting for QR codes</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#00adb4] mr-2 flex-shrink-0">•</span>
                <span>Hold phone steady when scanning</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#00adb4] mr-2 flex-shrink-0">•</span>
                <span>If camera fails, use manual check-in below</span>
              </li>
            </ul>
          </div>

          {cameraError && (
            <div className="border border-[#ff4444] bg-[#ff4444] bg-opacity-10 text-[#ff4444] p-3 mb-4 text-sm whitespace-pre-line">
              {cameraError}
            </div>
          )}

          {!scanning ? (
            <div className="text-center">
              <button
                onClick={startScanning}
                disabled={
                  typeof window === "undefined" ||
                  !navigator.mediaDevices ||
                  (typeof window !== "undefined" &&
                    !window.isSecureContext &&
                    window.location.hostname !== "localhost")
                }
                className="px-6 py-3 bg-[#00adb4] text-[#060a10] font-bold hover:bg-[#4dd0e1] disabled:bg-[#393d46] disabled:text-[#8b9cbe] disabled:cursor-not-allowed transition-colors rounded"
              >
                📷 START SCANNING
              </button>
              <div className="mt-2 text-xs text-[#8b9cbe]">
                {navigator.mediaDevices
                  ? "📱 Best experience on mobile Chrome with HTTPS"
                  : "❌ Camera API not supported"}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="relative inline-block">
                <video
                  ref={videoRef}
                  className="w-full max-w-sm mx-auto border border-[#393d46] mb-4 bg-black rounded"
                  autoPlay
                  playsInline
                  muted
                  style={{ maxHeight: "400px", minHeight: "200px" }}
                />
                <canvas ref={canvasRef} className="hidden" />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="border-2 border-[#00adb4] w-40 h-40 sm:w-48 sm:h-48 relative rounded-lg">
                    <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-[#00adb4] rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-[#00adb4] rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-[#00adb4] rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-[#00adb4] rounded-br-lg"></div>
                    <div className="absolute top-2 left-2 right-2 h-0.5 bg-[#00adb4] animate-pulse shadow-lg"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-[#00adb4] rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="space-x-2">
                <button
                  onClick={stopScanning}
                  className="px-4 py-2 border border-[#ff4444] text-[#ff4444] hover:bg-[#ff4444] hover:text-[#060a10] transition-colors rounded"
                >
                  ⏹️ STOP SCANNING
                </button>
              </div>

              <div className="mt-2 text-xs text-[#8b9cbe]">
                📷 Point camera at QR code • 🔍 Auto-scanning every 300ms...
              </div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#393d46]">
            <h4 className="text-[#c4d1d9] mb-3 font-medium">
              ✏️ Manual Check-in
            </h4>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <input
                type="text"
                value={scanResult}
                onChange={(e) => setScanResult(e.target.value.toUpperCase())}
                placeholder="Enter registration code (e.g., REG-12345)..."
                className="flex-1 bg-[#202832] border border-[#393d46] p-3 text-[#e0e0e0] focus:border-[#00adb4] focus:outline-none text-sm rounded placeholder-[#6b7280]"
              />
              <button
                onClick={() => handleManualCheckIn(scanResult)}
                disabled={!scanResult.trim()}
                className="w-full sm:w-auto px-4 py-3 bg-[#00adb4] text-[#060a10] font-bold hover:bg-[#4dd0e1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm whitespace-nowrap rounded"
              >
                ✅ CHECK IN
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="border border-[#ff4444] bg-[#ff4444] bg-opacity-10 text-[#ff4444] p-3 mb-4 text-sm rounded">
            <div className="flex justify-between items-start">
              <span>⚠️ {error}</span>
              <button
                onClick={() => setError("")}
                className="text-[#ff4444] hover:text-[#ff6666] ml-2 flex-shrink-0"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {message && (
          <div className="border border-[#00ff88] bg-[#00ff88] bg-opacity-10 text-[#00ff88] p-3 mb-4 text-sm rounded">
            <div className="flex justify-between items-start">
              <span>{message}</span>
              <button
                onClick={() => setMessage("")}
                className="text-[#00ff88] hover:text-[#4dd0e1] ml-2 flex-shrink-0"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="border border-[#393d46] bg-[#0a1017] p-4 rounded">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h3 className="text-[#00adb4] text-lg mb-2 sm:mb-0">
              📋 Registrations List
            </h3>
            <div className="text-xs text-[#c4d1d9]">
              Total:{" "}
              <span className="text-[#00adb4] font-mono">
                {registrations.length}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-[#00adb4] animate-pulse rounded-full"></div>
                <div className="w-2 h-2 bg-[#00adb4] animate-pulse delay-75 rounded-full"></div>
                <div className="w-2 h-2 bg-[#00adb4] animate-pulse delay-150 rounded-full"></div>
              </div>
              <p className="text-[#c4d1d9] mt-2">Loading registrations...</p>
            </div>
          ) : registrations.length === 0 ? (
            <div className="text-center py-8 text-[#c4d1d9]">
              No registrations found
            </div>
          ) : (
            <>
              <div className="block sm:hidden space-y-3">
                {registrations.map((reg) => (
                  <div
                    key={reg._id}
                    className="border border-[#393d46] bg-[#0c1219] p-4 rounded hover:bg-[#202832] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="text-[#e0e0e0] font-medium text-sm mb-1">
                          {reg.name}
                        </div>
                        <div className="text-[#c4d1d9] text-xs font-mono mb-1">
                          {reg.code}
                        </div>
                        <div className="text-[#8b9cbe] text-xs truncate">
                          {reg.email}
                        </div>
                      </div>
                      <div className="ml-3">
                        <span
                          className={`px-2 py-1 text-xs rounded font-medium ${
                            reg.attendeeStatus === "attended"
                              ? "bg-[#00ff88] bg-opacity-20 text-black border border-[#00ff88]"
                              : "bg-[#ffaa00] bg-opacity-20 text-white border border-[#ffaa00]"
                          }`}
                        >
                          {reg.attendeeStatus === "attended" ? "✅" : "⏳"}{" "}
                          {reg.attendeeStatus.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[#8b9cbe] text-xs">
                        {new Date(reg.registeredAt).toLocaleDateString(
                          "id-ID",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>
                      {reg.attendeeStatus === "registered" && (
                        <button
                          onClick={() => handleManualCheckIn(reg.code)}
                          className="px-3 py-1 bg-[#00adb4] text-[#060a10] hover:bg-[#4dd0e1] transition-colors text-xs rounded font-medium"
                        >
                          ✅ Check In
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#393d46]">
                      <th className="text-left py-3 px-2 text-[#00adb4] font-medium">
                        Code
                      </th>
                      <th className="text-left py-3 px-2 text-[#00adb4] font-medium">
                        Name
                      </th>
                      <th className="text-left py-3 px-2 text-[#00adb4] font-medium hidden md:table-cell">
                        Email
                      </th>
                      <th className="text-left py-3 px-2 text-[#00adb4] font-medium">
                        Status
                      </th>
                      <th className="text-left py-3 px-2 text-[#00adb4] font-medium hidden lg:table-cell">
                        Registered
                      </th>
                      <th className="text-left py-3 px-2 text-[#00adb4] font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg) => (
                      <tr
                        key={reg._id}
                        className="border-b border-[#393d46] hover:bg-[#202832] transition-colors"
                      >
                        <td className="py-3 px-2 text-[#e0e0e0] font-mono text-xs">
                          {reg.code}
                        </td>
                        <td className="py-3 px-2 text-[#e0e0e0] font-medium">
                          {reg.name}
                        </td>
                        <td className="py-3 px-2 text-[#c4d1d9] text-xs hidden md:table-cell max-w-[150px] truncate">
                          {reg.email}
                        </td>
                        <td className="py-3 px-2">
                          <span
                            className={`px-2 py-1 text-xs rounded font-medium ${
                              reg.attendeeStatus === "attended"
                                ? "bg-[#00ff88] bg-opacity-20 text-[#00ff88] border border-[#00ff88]"
                                : "bg-[#ffaa00] bg-opacity-20 text-[#ffaa00] border border-[#ffaa00]"
                            }`}
                          >
                            {reg.attendeeStatus === "attended" ? "✅" : "⏳"}{" "}
                            {reg.attendeeStatus.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-[#c4d1d9] text-xs hidden lg:table-cell">
                          {new Date(reg.registeredAt).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </td>
                        <td className="py-3 px-2">
                          {reg.attendeeStatus === "registered" ? (
                            <button
                              onClick={() => handleManualCheckIn(reg.code)}
                              className="px-3 py-1 bg-[#00adb4] text-[#060a10] hover:bg-[#4dd0e1] transition-colors text-xs rounded font-medium"
                            >
                              ✅ Check In
                            </button>
                          ) : (
                            <span className="text-[#8b9cbe] text-xs">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <div className="mt-4 text-center text-xs text-[#c4d1d9]">
          🔄 Auto-refreshing every 5 seconds • Last updated:{" "}
          <span className="text-[#00adb4] font-mono">
            {new Date().toLocaleTimeString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SeminarAdminPage;