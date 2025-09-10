"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@/context/UserContext";

interface UptimeCheck {
  server: string;
  status: "UP" | "DOWN" | "ERROR";
  httpStatus?: number;
  responseTime?: number;
  message?: string;
  checkedAt: string;
}

interface ServerStats {
  server: string;
  uptime: number;
  avgResponseTime: number;
  totalChecks: number;
  upChecks: number;
  lastCheck: UptimeCheck;
}

interface SnaploveUptimeRecord {
  status: "UP" | "DOWN" | "ERROR";
  httpStatus?: number;
  responseTime?: number;
  message?: string;
  timestamp: string;
  checkedAt: string;
}

interface SnaploveStats {
  currentStatus: "UP" | "DOWN" | "ERROR";
  uptime: number;
  avgResponseTime: number;
  totalChecks: number;
  upChecks: number;
  downChecks: number;
  errorChecks: number;
  lastCheck: SnaploveUptimeRecord;
  lastStatusChange: string;
  statusChanges: number;
  history: SnaploveUptimeRecord[];
}

const UptimePage: React.FC = () => {
  const { themeStyle } = useUser();
  const [historyData, setHistoryData] = useState<Record<string, UptimeCheck[]>>(
    {}
  );
  const [serverStats, setServerStats] = useState<ServerStats[]>([]);
  const [snaploveStats, setSnaploveStats] = useState<SnaploveStats | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [snaploveLoading, setSnaploveLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [selectedServer, setSelectedServer] = useState<string>("");

  const UPTIME_API_URL = process.env.NEXT_PUBLIC_UPTIME_API_URL;

  const serverConfigs = [
    {
      url: process.env.NEXT_PUBLIC_REZ3X_SERVER,
      name: process.env.NEXT_PUBLIC_REZ3X_NAME || "REZ3X Server",
    },
    {
      url: process.env.NEXT_PUBLIC_CYX_SERVER,
      name: process.env.NEXT_PUBLIC_CYX_NAME || "CYX Server",
    },
    {
      url: process.env.NEXT_PUBLIC_XIAN_SERVER,
      name: process.env.NEXT_PUBLIC_XIAN_NAME || "XIAN Server",
    },
  ].filter((config) => config.url);

  const serverNames: Record<string, string> = serverConfigs.reduce(
    (acc, config) => {
      if (config.url) {
        acc[config.url] = config.name;
      }
      return acc;
    },
    {} as Record<string, string>
  );

  const fetchSnaploveData = useCallback(async () => {
    try {
      const response = await fetch(
        "/api/uptime/snaplove-backend-service-uptime"
      );
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          if (result.data) {
            setSnaploveStats(result.data);
          } else {
            console.log(
              "No Snaplove data available, triggering initial collection..."
            );
            const postResponse = await fetch(
              "/api/uptime/snaplove-backend-service-uptime",
              {
                method: "POST",
              }
            );
            if (postResponse.ok) {
              const postResult = await postResponse.json();
              if (postResult.success && postResult.data?.stats) {
                setSnaploveStats(postResult.data.stats);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch Snaplove data:", error);
    } finally {
      setSnaploveLoading(false);
    }
  }, []);

  const fetchLatestData = useCallback(async () => {
    if (!UPTIME_API_URL) {
      console.error("UPTIME_API_URL is not configured");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${UPTIME_API_URL}/latest`);
      const data = await response.json();
      setLastUpdated(new Date());

      const historyPromises = data.map(async (check: UptimeCheck) => {
        const historyResponse = await fetch(
          `${UPTIME_API_URL}/history/${encodeURIComponent(check.server)}`
        );
        const historyData = await historyResponse.json();
        return { server: check.server, history: historyData };
      });

      const histories = await Promise.all(historyPromises);
      const historyMap: Record<string, UptimeCheck[]> = {};

      histories.forEach(({ server, history }) => {
        historyMap[server] = history;
      });

      setHistoryData(historyMap);

      const stats = data.map((check: UptimeCheck) => {
        const history = historyMap[check.server] || [];
        const upChecks = history.filter((h) => h.status === "UP").length;
        const totalChecks = history.length;
        const uptime = totalChecks > 0 ? (upChecks / totalChecks) * 100 : 0;
        const avgResponseTime =
          history
            .filter((h) => h.responseTime)
            .reduce((sum, h) => sum + (h.responseTime || 0), 0) /
          Math.max(1, history.filter((h) => h.responseTime).length);

        return {
          server: check.server,
          uptime,
          avgResponseTime,
          totalChecks,
          upChecks,
          lastCheck: check,
        };
      });

      setServerStats(stats);
      if (!selectedServer && stats.length > 0) {
        setSelectedServer(stats[0].server);
      }
    } catch (error) {
      console.error("Failed to fetch uptime data:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedServer, UPTIME_API_URL]);

  useEffect(() => {
    fetchLatestData();
    fetchSnaploveData();

    const interval = setInterval(() => {
      fetchLatestData();
      fetchSnaploveData();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchLatestData, fetchSnaploveData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "UP":
        return "#00adb4";
      case "DOWN":
        return "#ff4444";
      case "ERROR":
        return "#ff8800";
      default:
        return "#8b9cbe";
    }
  };

  const getStatusSymbol = (status: string) => {
    switch (status) {
      case "UP":
        return "●";
      case "DOWN":
        return "●";
      case "ERROR":
        return "●";
      default:
        return "○";
    }
  };

  const renderUptimeGraph = (history: UptimeCheck[]) => {
    const last24Hours = history.slice(0, 288);
    const blocks = [];

    for (let i = 0; i < 48; i++) {
      const startIdx = i * 6;
      const endIdx = Math.min(startIdx + 6, last24Hours.length);
      const segment = last24Hours.slice(startIdx, endIdx);

      if (segment.length === 0) {
        blocks.push({ status: "UNKNOWN", count: 0 });
        continue;
      }

      const upCount = segment.filter((s) => s.status === "UP").length;
      const downCount = segment.filter((s) => s.status === "DOWN").length;
      const errorCount = segment.filter((s) => s.status === "ERROR").length;

      let status = "UP";
      if (errorCount > upCount && errorCount > downCount) status = "ERROR";
      else if (downCount > upCount) status = "DOWN";

      blocks.push({ status, count: segment.length });
    }

    return (
      <div className="flex items-center space-x-1 mt-2">
        <span className="text-xs text-[#8b9cbe] mr-2">48h</span>
        {blocks.map((block, idx) => (
          <div
            key={idx}
            className="w-2 h-4 border border-[#393d46]"
            style={{
              backgroundColor:
                block.count > 0 ? getStatusColor(block.status) : "#202832",
              opacity: block.count > 0 ? 0.8 : 0.3,
            }}
            title={`${block.status} (${block.count} checks)`}
          />
        ))}
        <span className="text-xs text-[#8b9cbe] ml-2">now</span>
      </div>
    );
  };

  const renderSnaploveUptimeGraph = (history: SnaploveUptimeRecord[]) => {
    if (!history || history.length === 0) return null;

    const blocks = [];
    const maxBlocks = 24; 
    const dataPerBlock = Math.max(1, Math.ceil(history.length / maxBlocks));

    for (let i = 0; i < maxBlocks; i++) {
      const startIdx = i * dataPerBlock;
      const endIdx = Math.min(startIdx + dataPerBlock, history.length);
      const segment = history.slice(startIdx, endIdx);

      if (segment.length === 0) {
        blocks.push({ status: "UNKNOWN", count: 0 });
        continue;
      }

      const upCount = segment.filter((s) => s.status === "UP").length;
      const downCount = segment.filter((s) => s.status === "DOWN").length;
      const errorCount = segment.filter((s) => s.status === "ERROR").length;

      let status = "UP";
      if (errorCount > upCount && errorCount > downCount) status = "ERROR";
      else if (downCount > upCount) status = "DOWN";

      blocks.push({ status, count: segment.length });
    }

    return (
      <div className="flex items-center space-x-1 mt-2">
        <span className="text-xs text-[#8b9cbe] mr-2">history</span>
        {blocks.map((block, idx) => (
          <div
            key={idx}
            className="w-3 h-4 border border-[#393d46]"
            style={{
              backgroundColor:
                block.count > 0 ? getStatusColor(block.status) : "#202832",
              opacity: block.count > 0 ? 0.8 : 0.3,
            }}
            title={`${block.status} (${block.count} checks)`}
          />
        ))}
        <span className="text-xs text-[#8b9cbe] ml-2">now</span>
      </div>
    );
  };

  const renderResponseTimeChart = (history: UptimeCheck[]) => {
    const validHistory = history
      .filter((h) => h.responseTime && h.status === "UP")
      .slice(0, 50);

    if (validHistory.length === 0) return null;

    const maxTime = Math.max(...validHistory.map((h) => h.responseTime || 0));
    const avgTime =
      validHistory.reduce((sum, h) => sum + (h.responseTime || 0), 0) /
      validHistory.length;

    return (
      <div className="mt-4 border border-[#393d46] p-3 bg-[#0a1017]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#00adb4] text-sm">Response Time (ms)</span>
          <span className="text-xs text-[#8b9cbe]">
            avg: {Math.round(avgTime)}ms
          </span>
        </div>
        <div className="flex items-end space-x-0.5 h-16">
          {validHistory.reverse().map((check, idx) => {
            const height = Math.max(2, (check.responseTime! / maxTime) * 64);
            const color =
              check.responseTime! < 200
                ? "#00adb4"
                : check.responseTime! < 500
                ? "#ff8800"
                : "#ff4444";

            return (
              <div
                key={idx}
                className="w-1 bg-opacity-80 transition-all hover:bg-opacity-100"
                style={{
                  height: `${height}px`,
                  backgroundColor: color,
                  minHeight: "2px",
                }}
                title={`${check.responseTime}ms at ${new Date(
                  check.checkedAt
                ).toLocaleTimeString()}`}
              />
            );
          })}
        </div>
      </div>
    );
  };

  if (!UPTIME_API_URL || serverConfigs.length === 0) {
    return (
      <div className="min-h-screen bg-[#060a10] text-[#e0e0e0] font-mono flex items-center justify-center">
        <div className="text-center border border-[#ff4444] p-6 bg-[#0a1017]">
          <div className="text-[#ff4444] text-2xl mb-4">⚠️</div>
          <h1 className="text-lg text-[#ff4444] mb-2">Configuration Error</h1>
          <div className="text-sm text-[#8b9cbe] space-y-1">
            {!UPTIME_API_URL && (
              <p>• NEXT_PUBLIC_UPTIME_API_URL is not configured</p>
            )}
            {serverConfigs.length === 0 && <p>• No server URLs configured</p>}
          </div>
          <p className="text-xs text-[#8b9cbe] mt-3">
            Please check your environment variables
          </p>
        </div>
      </div>
    );
  }

  if (themeStyle !== "terminal") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2a1f29] to-[#1a1420] text-[#f0e6ef] p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-[#e39fc2] mb-2">
              Server Status Dashboard
            </h1>
            <p className="text-[#c4b2c3]">
              Time-shifted monitoring of Rejaka infrastructure
            </p>
          </div>
          <div className="text-center text-[#c4b2c3]">
            <p>This page is optimized for terminal theme.</p>
            <p>Please switch to terminal theme for the full experience.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060a10] text-[#e0e0e0] font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-[#00adb4] animate-pulse"></div>
            <div className="w-2 h-2 bg-[#00adb4] animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-[#00adb4] animate-pulse delay-150"></div>
          </div>
          <p className="text-[#8b9cbe]">Loading server status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060a10] text-[#e0e0e0] font-mono p-4">
      <div className="max-w-7xl mx-auto">
        <div className="border border-[#393d46] bg-[#0a1017] p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl text-[#00adb4] mb-1">
                ❯ rejaka.id infrastructure status
              </h1>
              <p className="text-xs text-[#8b9cbe]">
                Real-time monitoring • Auto-refresh every 30s •{" "}
                {serverConfigs.length} servers
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-[#8b9cbe]">
                Last updated: {lastUpdated?.toLocaleTimeString() || "Never"}
              </div>
              <button
                onClick={() => {
                  fetchLatestData();
                  fetchSnaploveData();
                }}
                className="text-xs text-[#00adb4] hover:text-[#4dd0e1] mt-1"
              >
                [refresh]
              </button>
            </div>
          </div>
        </div>

        {snaploveLoading ? (
          <div className="border border-[#393d46] bg-[#0a1017] p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-[#00adb4]">
                ❯ Backend API Service (Snaplove)
              </h2>
              <span className="text-xs text-[#8b9cbe]">Initializing...</span>
            </div>
            <div className="text-center py-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-[#00adb4] animate-pulse"></div>
                <div className="w-2 h-2 bg-[#00adb4] animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-[#00adb4] animate-pulse delay-150"></div>
              </div>
              <p className="text-[#8b9cbe] text-sm">
                Collecting initial monitoring data...
              </p>
            </div>
          </div>
        ) : !snaploveStats ? (
          <div className="border border-[#393d46] bg-[#0a1017] p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-[#00adb4]">
                ❯ Backend API Service (Snaplove)
              </h2>
              <span className="text-xs text-[#8b9cbe]">
                Configuration Required
              </span>
            </div>
            <div className="text-center py-8">
              <div className="text-[#ff8800] text-2xl mb-4">⚠️</div>
              <h3 className="text-lg text-[#ff8800] mb-2">
                Service Not Configured
              </h3>
              <p className="text-sm text-[#8b9cbe] mb-4">
                SNAPLOVE_BACKEND_API environment variable is not set.
              </p>
              <button
                onClick={() => {
                  setSnaploveLoading(true);
                  fetchSnaploveData();
                }}
                className="text-sm text-[#00adb4] hover:text-[#4dd0e1] border border-[#393d46] px-4 py-2 hover:border-[#00adb4]"
              >
                Retry Configuration
              </button>
            </div>
          </div>
        ) : (
          <div className="border border-[#393d46] bg-[#0a1017] p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-[#00adb4]">
                ❯ Backend API Service (Snaplove)
              </h2>
              <span className="text-xs text-[#8b9cbe]">
                MongoDB Storage • Smart Change Detection
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="border border-[#393d46] bg-[#202832] p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#8b9cbe]">Current Status</span>
                  <span
                    className="text-lg"
                    style={{
                      color: getStatusColor(snaploveStats.currentStatus),
                    }}
                  >
                    {getStatusSymbol(snaploveStats.currentStatus)}
                  </span>
                </div>
                <div className="text-sm text-[#e0e0e0]">
                  {snaploveStats.currentStatus}
                </div>
                {snaploveStats.lastCheck.responseTime && (
                  <div className="text-xs text-[#8b9cbe] mt-1">
                    {snaploveStats.lastCheck.responseTime}ms
                  </div>
                )}
              </div>

              <div className="border border-[#393d46] bg-[#202832] p-3">
                <div className="text-xs text-[#8b9cbe] mb-2">Uptime</div>
                <div className="text-lg text-[#00adb4]">
                  {snaploveStats.uptime.toFixed(2)}%
                </div>
                <div className="text-xs text-[#8b9cbe]">
                  {snaploveStats.upChecks}/{snaploveStats.totalChecks} checks
                </div>
              </div>

              <div className="border border-[#393d46] bg-[#202832] p-3">
                <div className="text-xs text-[#8b9cbe] mb-2">Avg Response</div>
                <div className="text-lg text-[#e0e0e0]">
                  {Math.round(snaploveStats.avgResponseTime)}ms
                </div>
                <div className="text-xs text-[#8b9cbe]">
                  From UP requests only
                </div>
              </div>

              <div className="border border-[#393d46] bg-[#202832] p-3">
                <div className="text-xs text-[#8b9cbe] mb-2">
                  Status Changes
                </div>
                <div className="text-lg text-[#ff8800]">
                  {snaploveStats.statusChanges}
                </div>
                <div className="text-xs text-[#8b9cbe]">Total transitions</div>
              </div>
            </div>

            <div className="border border-[#393d46] bg-[#202832] p-3">
              <div className="text-sm text-[#00adb4] mb-2">Status History</div>
              {renderSnaploveUptimeGraph(snaploveStats.history)}
              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-[#8b9cbe]">UP:</span>
                  <span className="text-[#00adb4] ml-1">
                    {snaploveStats.upChecks}
                  </span>
                </div>
                <div>
                  <span className="text-[#8b9cbe]">DOWN:</span>
                  <span className="text-[#ff4444] ml-1">
                    {snaploveStats.downChecks}
                  </span>
                </div>
                <div>
                  <span className="text-[#8b9cbe]">ERROR:</span>
                  <span className="text-[#ff8800] ml-1">
                    {snaploveStats.errorChecks}
                  </span>
                </div>
                <div>
                  <span className="text-[#8b9cbe]">Last Change:</span>
                  <span className="text-[#e0e0e0] ml-1">
                    {new Date(snaploveStats.lastStatusChange).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="border border-[#393d46] bg-[#0a1017] p-3 mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[#00adb4]">
                ❯ Server Infrastructure
              </h2>
              <span className="text-xs text-[#8b9cbe]">
                External Monitoring • Cloudflare Workers
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serverStats.map((stats) => (
              <div
                key={stats.server}
                className={`border border-[#393d46] bg-[#0a1017] p-4 cursor-pointer transition-colors
                  ${
                    selectedServer === stats.server
                      ? "border-[#00adb4]"
                      : "hover:border-[#4dd0e1]"
                  }`}
                onClick={() => setSelectedServer(stats.server)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#00adb4] font-bold">
                    {serverNames[stats.server] || stats.server}
                  </span>
                  <span
                    className="text-lg"
                    style={{ color: getStatusColor(stats.lastCheck.status) }}
                  >
                    {getStatusSymbol(stats.lastCheck.status)}
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#8b9cbe]">Status:</span>
                    <span
                      style={{ color: getStatusColor(stats.lastCheck.status) }}
                    >
                      {stats.lastCheck.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b9cbe]">Uptime:</span>
                    <span className="text-[#e0e0e0]">
                      {stats.uptime.toFixed(2)}%
                    </span>
                  </div>
                  {stats.lastCheck.responseTime && (
                    <div className="flex justify-between">
                      <span className="text-[#8b9cbe]">Response:</span>
                      <span className="text-[#e0e0e0]">
                        {stats.lastCheck.responseTime}ms
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#8b9cbe]">Checks:</span>
                    <span className="text-[#e0e0e0]">
                      {stats.upChecks}/{stats.totalChecks}
                    </span>
                  </div>
                </div>

                {renderUptimeGraph(historyData[stats.server] || [])}
              </div>
            ))}
          </div>
        </div>

        {serverStats.length === 0 && !loading && (
          <div className="border border-[#393d46] bg-[#0a1017] p-8 text-center">
            <div className="text-[#ff8800] text-2xl mb-4">📡</div>
            <h2 className="text-lg text-[#ff8800] mb-2">
              No Server Data Available
            </h2>
            <p className="text-sm text-[#8b9cbe] mb-4">
              Unable to fetch server status from the monitoring API.
            </p>
            <button
              onClick={fetchLatestData}
              className="text-sm text-[#00adb4] hover:text-[#4dd0e1] border border-[#393d46] px-4 py-2 hover:border-[#00adb4]"
            >
              Retry Connection
            </button>
          </div>
        )}
        <div className="border border-[#393d46] bg-[#0a1017] p-3 mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-[#00adb4]">❯ Server Infrastructure</h2>
            <span className="text-xs text-[#8b9cbe]">
              External Monitoring • Cloudflare Workers
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {serverStats.map((stats) => (
            <div
              key={stats.server}
              className={`border border-[#393d46] bg-[#0a1017] p-4 cursor-pointer transition-colors
                ${
                  selectedServer === stats.server
                    ? "border-[#00adb4]"
                    : "hover:border-[#4dd0e1]"
                }`}
              onClick={() => setSelectedServer(stats.server)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#00adb4] font-bold">
                  {serverNames[stats.server] || stats.server}
                </span>
                <span
                  className="text-lg"
                  style={{ color: getStatusColor(stats.lastCheck.status) }}
                >
                  {getStatusSymbol(stats.lastCheck.status)}
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#8b9cbe]">Status:</span>
                  <span
                    style={{ color: getStatusColor(stats.lastCheck.status) }}
                  >
                    {stats.lastCheck.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8b9cbe]">Uptime:</span>
                  <span className="text-[#e0e0e0]">
                    {stats.uptime.toFixed(2)}%
                  </span>
                </div>
                {stats.lastCheck.responseTime && (
                  <div className="flex justify-between">
                    <span className="text-[#8b9cbe]">Response:</span>
                    <span className="text-[#e0e0e0]">
                      {stats.lastCheck.responseTime}ms
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#8b9cbe]">Checks:</span>
                  <span className="text-[#e0e0e0]">
                    {stats.upChecks}/{stats.totalChecks}
                  </span>
                </div>
              </div>

              {renderUptimeGraph(historyData[stats.server] || [])}
            </div>
          ))}
        </div>

        {serverStats.length === 0 && !loading && (
          <div className="border border-[#393d46] bg-[#0a1017] p-8 text-center">
            <div className="text-[#ff8800] text-2xl mb-4">📡</div>
            <h2 className="text-lg text-[#ff8800] mb-2">
              No Server Data Available
            </h2>
            <p className="text-sm text-[#8b9cbe] mb-4">
              Unable to fetch server status from the monitoring API.
            </p>
            <button
              onClick={fetchLatestData}
              className="text-sm text-[#00adb4] hover:text-[#4dd0e1] border border-[#393d46] px-4 py-2 hover:border-[#00adb4]"
            >
              Retry Connection
            </button>
          </div>
        )}

        {selectedServer && historyData[selectedServer] && (
          <div className="border border-[#393d46] bg-[#0a1017] p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-[#00adb4]">
                ❯ {serverNames[selectedServer]} - Detailed Metrics
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm text-[#00adb4] mb-3">
                  Recent Status History
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {historyData[selectedServer]
                    .slice(0, 20)
                    .map((check, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs p-2 bg-[#202832] border border-[#393d46]"
                      >
                        <div className="flex items-center space-x-2">
                          <span style={{ color: getStatusColor(check.status) }}>
                            {getStatusSymbol(check.status)}
                          </span>
                          <span className="text-[#e0e0e0]">{check.status}</span>
                          {check.httpStatus && (
                            <span className="text-[#8b9cbe]">
                              ({check.httpStatus})
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4">
                          {check.responseTime && (
                            <span className="text-[#8b9cbe]">
                              {check.responseTime}ms
                            </span>
                          )}
                          <span className="text-[#8b9cbe]">
                            {new Date(check.checkedAt).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm text-[#00adb4] mb-3">
                  Response Time Trend
                </h3>
                {renderResponseTimeChart(historyData[selectedServer])}

                <div className="mt-4 p-3 bg-[#202832] border border-[#393d46]">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#8b9cbe]">Avg Response:</span>
                      <br />
                      <span className="text-[#e0e0e0]">
                        {serverStats
                          .find((s) => s.server === selectedServer)
                          ?.avgResponseTime.toFixed(0)}
                        ms
                      </span>
                    </div>
                    <div>
                      <span className="text-[#8b9cbe]">Total Checks:</span>
                      <br />
                      <span className="text-[#e0e0e0]">
                        {
                          serverStats.find((s) => s.server === selectedServer)
                            ?.totalChecks
                        }
                      </span>
                    </div>
                    <div>
                      <span className="text-[#8b9cbe]">Successful:</span>
                      <br />
                      <span className="text-[#00adb4]">
                        {
                          serverStats.find((s) => s.server === selectedServer)
                            ?.upChecks
                        }
                      </span>
                    </div>
                    <div>
                      <span className="text-[#8b9cbe]">Failed:</span>
                      <br />
                      <span className="text-[#ff4444]">
                        {(serverStats.find((s) => s.server === selectedServer)
                          ?.totalChecks || 0) -
                          (serverStats.find((s) => s.server === selectedServer)
                            ?.upChecks || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-[#8b9cbe]">
          <p>
            Monitoring powered by Cloudflare Workers & MongoDB • Data retention:
            50 checks per server
          </p>
          <p>
            Checks run every 5 minutes • Page auto-refreshes every 30 seconds
          </p>
          <div className="mt-2 text-[10px] opacity-60">
            Configured servers: {serverConfigs.map((s) => s.name).join(", ")} +
            Backend API
          </div>
        </div>
      </div>
    </div>
  );
};

export default UptimePage;