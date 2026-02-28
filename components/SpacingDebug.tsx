"use client";

import { useEffect, useState } from "react";

const TOKEN_COLORS: Record<string, string> = {
  "6px": "#FF6B6B",    // space-1: red
  "12px": "#FF9F43",   // space-2: orange
  "18px": "#FECA57",   // space-3: yellow
  "24px": "#48DBFB",   // space-4: cyan
  "36px": "#0ABDE3",   // space-5: blue
  "48px": "#5F27CD",   // space-6: purple
  "72px": "#FF6348",   // space-7: coral
  "96px": "#1DD1A1",   // space-8: green
  "144px": "#F368E0",  // space-9: pink
};

const TOKEN_NAMES: Record<string, string> = {
  "6px": "--space-1",
  "12px": "--space-2",
  "18px": "--space-3",
  "24px": "--space-4",
  "36px": "--space-5",
  "48px": "--space-6",
  "72px": "--space-7",
  "96px": "--space-8",
  "144px": "--space-9",
};

function getColor(value: string): string | null {
  const rounded = Math.round(parseFloat(value));
  return TOKEN_COLORS[`${rounded}px`] || null;
}

function getToken(value: string): string | null {
  const rounded = Math.round(parseFloat(value));
  return TOKEN_NAMES[`${rounded}px`] || null;
}

interface Overlay {
  id: string;
  top: number;
  left: number;
  width: number;
  height: number;
  color: string;
  label: string;
  type: "margin" | "padding";
}

export function SpacingDebug() {
  const [active, setActive] = useState(false);
  const [overlays, setOverlays] = useState<Overlay[]>([]);

  useEffect(() => {
    if (!active) {
      setOverlays([]);
      return;
    }

    function scan() {
      const results: Overlay[] = [];
      const els = document.querySelectorAll("body *");
      let id = 0;

      els.forEach((el) => {
        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;

        const sides = ["Top", "Right", "Bottom", "Left"] as const;

        // Margin overlays
        sides.forEach((side) => {
          const val = parseFloat(style[`margin${side}` as keyof CSSStyleDeclaration] as string);
          if (val > 0) {
            const color = getColor(String(val));
            const token = getToken(String(val));
            if (!color) return;

            let box: Overlay;
            const base = {
              id: `m-${id++}`,
              color,
              label: `${token} (${Math.round(val)}px)`,
              type: "margin" as const,
            };

            if (side === "Top") {
              box = { ...base, top: rect.top + scrollY - val, left: rect.left + scrollX, width: rect.width, height: val };
            } else if (side === "Bottom") {
              box = { ...base, top: rect.bottom + scrollY, left: rect.left + scrollX, width: rect.width, height: val };
            } else if (side === "Left") {
              box = { ...base, top: rect.top + scrollY, left: rect.left + scrollX - val, width: val, height: rect.height };
            } else {
              box = { ...base, top: rect.top + scrollY, left: rect.right + scrollX, width: val, height: rect.height };
            }
            results.push(box);
          }
        });

        // Gap overlays (grid and flex)
        const display = style.display;
        if (display.includes("grid") || display.includes("flex")) {
          const rowGap = parseFloat(style.rowGap);
          const colGap = parseFloat(style.columnGap);
          const children = Array.from(el.children) as HTMLElement[];

          if (colGap > 0 && children.length > 1) {
            const gapColor = getColor(String(colGap));
            const gapToken = getToken(String(colGap));
            if (gapColor) {
              for (let ci = 0; ci < children.length - 1; ci++) {
                const curr = children[ci].getBoundingClientRect();
                const next = children[ci + 1].getBoundingClientRect();
                if (next.left > curr.right) {
                  results.push({
                    id: `gc-${id++}`,
                    top: Math.min(curr.top, next.top) + scrollY,
                    left: curr.right + scrollX,
                    width: next.left - curr.right,
                    height: Math.max(curr.height, next.height),
                    color: gapColor,
                    label: `gap ${gapToken} (${Math.round(colGap)}px)`,
                    type: "padding",
                  });
                }
              }
            }
          }

          if (rowGap > 0 && children.length > 1) {
            const gapColor = getColor(String(rowGap));
            const gapToken = getToken(String(rowGap));
            if (gapColor) {
              const seen = new Set<string>();
              for (let ci = 0; ci < children.length - 1; ci++) {
                const curr = children[ci].getBoundingClientRect();
                for (let cj = ci + 1; cj < children.length; cj++) {
                  const next = children[cj].getBoundingClientRect();
                  if (next.top > curr.bottom + 1) {
                    const key = `${Math.round(curr.bottom)}-${Math.round(next.top)}`;
                    if (!seen.has(key)) {
                      seen.add(key);
                      results.push({
                        id: `gr-${id++}`,
                        top: curr.bottom + scrollY,
                        left: rect.left + scrollX,
                        width: rect.width,
                        height: next.top - curr.bottom,
                        color: gapColor,
                        label: `gap ${gapToken} (${Math.round(rowGap)}px)`,
                        type: "padding",
                      });
                    }
                    break;
                  }
                }
              }
            }
          }
        }

        // Padding overlays
        sides.forEach((side) => {
          const val = parseFloat(style[`padding${side}` as keyof CSSStyleDeclaration] as string);
          if (val > 0) {
            const color = getColor(String(val));
            const token = getToken(String(val));
            if (!color) return;

            let box: Overlay;
            const base = {
              id: `p-${id++}`,
              color,
              label: `${token} (${Math.round(val)}px)`,
              type: "padding" as const,
            };

            if (side === "Top") {
              box = { ...base, top: rect.top + scrollY, left: rect.left + scrollX, width: rect.width, height: val };
            } else if (side === "Bottom") {
              box = { ...base, top: rect.bottom + scrollY - val, left: rect.left + scrollX, width: rect.width, height: val };
            } else if (side === "Left") {
              box = { ...base, top: rect.top + scrollY, left: rect.left + scrollX, width: val, height: rect.height };
            } else {
              box = { ...base, top: rect.top + scrollY, left: rect.right + scrollX - val, width: val, height: rect.height };
            }
            results.push(box);
          }
        });
      });

      setOverlays(results);
    }

    scan();
    window.addEventListener("resize", scan);
    window.addEventListener("scroll", scan);
    return () => {
      window.removeEventListener("resize", scan);
      window.removeEventListener("scroll", scan);
    };
  }, [active]);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setActive(!active)}
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 10000,
          padding: "8px 14px",
          fontSize: 11,
          fontFamily: "monospace",
          background: active ? "#1a1a1a" : "#fff",
          color: active ? "#fff" : "#1a1a1a",
          border: "1px solid #1a1a1a",
          cursor: "pointer",
        }}
      >
        {active ? "SPACING: ON" : "SPACING: OFF"}
      </button>

      {/* Legend */}
      {active && (
        <div
          style={{
            position: "fixed",
            bottom: 52,
            right: 16,
            zIndex: 10000,
            background: "#fff",
            border: "1px solid #1a1a1a",
            padding: 10,
            fontSize: 10,
            fontFamily: "monospace",
            lineHeight: 1.8,
          }}
        >
          {Object.entries(TOKEN_NAMES).map(([px, name]) => (
            <div key={px} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  background: TOKEN_COLORS[px],
                  opacity: 0.6,
                }}
              />
              <span>{name} = {px}</span>
            </div>
          ))}
          <div style={{ marginTop: 6, borderTop: "1px solid #ddd", paddingTop: 4 }}>
            <span style={{ opacity: 0.5 }}>stripes = margin</span><br />
            <span style={{ opacity: 0.5 }}>solid = padding / gap</span>
          </div>
        </div>
      )}

      {/* Overlay boxes */}
      {active &&
        overlays.map((o) => (
          <div
            key={o.id}
            style={{
              position: "absolute",
              top: o.top,
              left: o.left,
              width: o.width,
              height: o.height,
              background:
                o.type === "margin"
                  ? `repeating-linear-gradient(45deg, ${o.color}33, ${o.color}33 4px, ${o.color}11 4px, ${o.color}11 8px)`
                  : `${o.color}33`,
              border: `1px solid ${o.color}66`,
              pointerEvents: "none",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {(o.width > 50 || o.height > 18) && (
              <span
                style={{
                  fontSize: 9,
                  fontFamily: "monospace",
                  color: "#1a1a1a",
                  background: "#ffffffcc",
                  padding: "1px 3px",
                  whiteSpace: "nowrap",
                }}
              >
                {o.label}
              </span>
            )}
          </div>
        ))}
    </>
  );
}
