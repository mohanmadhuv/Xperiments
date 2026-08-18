"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SmallTabs } from "@/components/ui/small-tabs";

const pressScaleOptions = [
  { label: "1x", value: "1" },
  { label: "0.97x", value: "0.97" },
  { label: "0.95x", value: "0.95" },
  { label: "0.85x", value: "0.85" },
];

export function ButtonsOnSurfacesDemo() {
  const [pressScale, setPressScale] = useState(pressScaleOptions[0].value);

  return (
    <>
      <div className="absolute top-4 right-4">
        <SmallTabs options={pressScaleOptions} value={pressScale} onChange={setPressScale} />
      </div>
      <Button style={{ "--press-scale": pressScale } as React.CSSProperties}>Primary</Button>
    </>
  );
}
