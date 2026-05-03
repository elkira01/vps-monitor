"use client";

import { useVpsData } from "@/hooks/useVpsData";
import Header from "@/components/Header";
import SetupScreen from "@/components/SetupScreen";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const {
    connected,
    errorMsg,
    data,
    urlInput,
    setUrlInput,
    setupUrl,
    setSetupUrl,
    interval,
    setIntervalVal,
    cpuHistory,
    lastMaxRx,
    lastMaxTx,
    connect,
    connectFromSetup,
  } = useVpsData();

  return (
    <>
      <Header
        connected={connected}
        errorMsg={errorMsg}
        urlInput={urlInput}
        setUrlInput={setUrlInput}
        interval={interval}
        setIntervalVal={setIntervalVal}
        onConnect={connect}
      />

      {!data && (
        <SetupScreen
          setupUrl={setupUrl}
          setSetupUrl={setSetupUrl}
          onConnect={connectFromSetup}
        />
      )}

      {data && (
        <Dashboard
          data={data}
          connected={connected}
          cpuHistory={cpuHistory}
          lastMaxRx={lastMaxRx}
          lastMaxTx={lastMaxTx}
        />
      )}
    </>
  );
}
