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

const UptimePage: React.FC = () => {
  const { themeStyle } = useUser();
  const [historyData, setHistoryData] = useState<Record<string, UptimeCheck[]>>(
    {}
  );
  const [serverStats, setServerStats] = useState<ServerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [selectedServer, setSelectedServer] = useState<string>("");

  const serverNames: Record<string, string> = {
    "http://rez3x.rejaka.id:22222": "REZ3X Server",
    "http://cyx.rejaka.id:11111": "CYX Server",
    "http://xian.rejaka.id:33333": "XIAN Server",
  };

  const fetchLatestData = useCallback(async () => {
    try {
      const response = await fetch("https://server-uptime.rejaka.id/latest");
      const data = await response.json();
      setLastUpdated(new Date());

      const historyPromises = data.map(async (check: UptimeCheck) => {
        const historyResponse = await fetch(
          `https://server-uptime.rejaka.id/history/${encodeURIComponent(
            check.server
          )}`
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
  }, [selectedServer]); 

  useEffect(() => {
    fetchLatestData();
    const interval = setInterval(fetchLatestData, 30000);
    return () => clearInterval(interval);
  }, [fetchLatestData]); 

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

  if (themeStyle !== "terminal") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2a1f29] to-[#1a1420] text-[#f0e6ef] p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-[#e39fc2] mb-2">
              Server Status Dashboard
            </h1>
            <p className="text-[#c4b2c3]">
              Real-time monitoring of Rejaka infrastructure
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
        {/* Header */}
        <div className="border border-[#393d46] bg-[#0a1017] p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl text-[#00adb4] mb-1">
                ❯ rejaka.id infrastructure status
              </h1>
              <p className="text-xs text-[#8b9cbe]">
                Real-time monitoring • Auto-refresh every 30s
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-[#8b9cbe]">
                Last updated: {lastUpdated?.toLocaleTimeString() || "Never"}
              </div>
              <button
                onClick={fetchLatestData}
                className="text-xs text-[#00adb4] hover:text-[#4dd0e1] mt-1"
              >
                [refresh]
              </button>
            </div>
          </div>
        </div>

        {/* Server Overview */}
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

        {/* Detailed Server View */}
        {selectedServer && historyData[selectedServer] && (
          <div className="border border-[#393d46] bg-[#0a1017] p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-[#00adb4]">
                ❯ {serverNames[selectedServer]} - Detailed Metrics
              </h2>
              <span className="text-xs text-[#8b9cbe]">{selectedServer}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Status History */}
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

              {/* Response Time Chart */}
              <div>
                <h3 className="text-sm text-[#00adb4] mb-3">
                  Response Time Trend
                </h3>
                {renderResponseTimeChart(historyData[selectedServer])}

                {/* Statistics */}
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

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-[#8b9cbe]">
          <p>
            Monitoring powered by Cloudflare Workers • Data retention: 50 checks
            per server
          </p>
          <p>
            Checks run every 5 minutes • Page auto-refreshes every 30 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default UptimePage;
