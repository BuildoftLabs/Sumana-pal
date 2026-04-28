import { useMemo, useState } from "react";

function clampNumber(value, min, max) {
  const n = Number(value);
  if (Number.isNaN(n)) return null;
  return Math.min(max, Math.max(min, n));
}

export default function BmiTool({ data }) {
  const [gender, setGender] = useState(data.gender.options?.[0]?.value ?? "male");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [hasCalculated, setHasCalculated] = useState(false);

  const parsedFt = useMemo(() => clampNumber(heightFt, 0, 9), [heightFt]);
  const parsedIn = useMemo(() => clampNumber(heightIn, 0, 11), [heightIn]);

  const parsedHeightCm = useMemo(() => {
    if (parsedFt == null && parsedIn == null) return null;
    const totalInches = (parsedFt ?? 0) * 12 + (parsedIn ?? 0);
    if (totalInches <= 0) return null;
    return totalInches * 2.54;
  }, [parsedFt, parsedIn]);

  const parsedWeight = useMemo(
    () => clampNumber(weightKg, data.weight.minKg, data.weight.maxKg),
    [weightKg, data.weight.maxKg, data.weight.minKg]
  );

  const bmi = useMemo(() => {
    if (!parsedHeightCm || !parsedWeight) return null;
    const meters = parsedHeightCm / 100;
    const raw = parsedWeight / (meters * meters);
    return Math.round(raw * 100) / 100;
  }, [parsedHeightCm, parsedWeight]);

  const bmiCategory = useMemo(() => {
    if (bmi == null) return null;
    const ranges = Array.isArray(data.ranges) ? data.ranges : [];
    const matched =
      ranges.find((r) => (r.min == null || bmi >= r.min) && (r.max == null || bmi <= r.max)) ?? null;
    return matched?.label ?? null;
  }, [bmi, data.ranges]);

  const activeRange = useMemo(() => {
    if (bmi == null) return null;
    const ranges = Array.isArray(data.ranges) ? data.ranges : [];
    return ranges.find((r) => (r.min == null || bmi >= r.min) && (r.max == null || bmi <= r.max)) ?? null;
  }, [bmi, data.ranges]);

  const activeRangeIndex = useMemo(() => {
    if (bmi == null) return -1;
    const ranges = Array.isArray(data.ranges) ? data.ranges : [];
    return ranges.findIndex((r) => (r.min == null || bmi >= r.min) && (r.max == null || bmi <= r.max));
  }, [bmi, data.ranges]);

  const rangesBeforeActive = useMemo(() => {
    const ranges = Array.isArray(data.ranges) ? data.ranges : [];
    if (activeRangeIndex < 0) return ranges;
    return ranges.slice(0, activeRangeIndex);
  }, [data.ranges, activeRangeIndex]);

  const rangesAfterActive = useMemo(() => {
    const ranges = Array.isArray(data.ranges) ? data.ranges : [];
    if (activeRangeIndex < 0) return [];
    return ranges.slice(activeRangeIndex + 1);
  }, [data.ranges, activeRangeIndex]);

  const formatRange = (r) => {
    if (r.min == null) return `<${r.max}`;
    if (r.max == null) return `>${r.min}`;
    return `${r.min} - ${r.max}`;
  };

  return (
    <section className="bmi" id="bmi-calculator" aria-label="BMI calculator tool">
      <div className="bmi-inner">
        <p className="bmi-badge">{data.badge}</p>
        <h2 className="bmi-title">
          {data.titlePrefix} <span className="bmi-title-accent">{data.titleAccent}</span>
        </h2>
        <p className="bmi-desc">
          {data.description}
          {data.form?.subtitle ? ` ${data.form.subtitle}` : ""}
        </p>

        <div className="bmi-shell">
          <div className="bmi-card" aria-label="BMI Calculator form">
            <h3 className="bmi-card-title">{data.form?.title ?? "BMI Calculator"}</h3>

            <div className="bmi-group">
              <p className="bmi-label">{data.gender.label}</p>
              <div className="bmi-toggle" role="tablist" aria-label={data.gender.label}>
                {data.gender.options.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    className={`bmi-pill${gender === o.value ? " is-active" : ""}`}
                    role="tab"
                    aria-selected={gender === o.value}
                    onClick={() => setGender(o.value)}
                  >
                    {o.label} {o.value === "male" ? "♂" : "♀"}
                  </button>
                ))}
              </div>
            </div>

            <div className="bmi-grid bmi-grid-single">
              <div className="bmi-field">
                <span className="bmi-field-label">Height</span>
                <div className="bmi-heightRow">
                  <input
                    className="bmi-input bmi-inputBox"
                    inputMode="numeric"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    placeholder="feet"
                    aria-label="Height in feet"
                  />
                  <input
                    className="bmi-input bmi-inputBox"
                    inputMode="numeric"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    placeholder="inches"
                    aria-label="Height in inches"
                  />
                </div>
              </div>

              <label className="bmi-field">
                <span className="bmi-field-label">{data.weight.label}</span>
                <div className="bmi-inputWrap bmi-inputWrapWide">
                  <input
                    className="bmi-input bmi-inputBox"
                    inputMode="decimal"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    placeholder={data.weight.placeholder}
                    aria-label={data.weight.label}
                  />
                  <span className="bmi-unit">{data.weight.unit}</span>
                </div>
              </label>
            </div>

            <button
              className="bmi-btn"
              type="button"
              onClick={() => setHasCalculated(true)}
              aria-label="Calculate BMI"
            >
              {data.form?.buttonLabel ?? "Calculate BMI"}
            </button>

            <p className="bmi-srResult" aria-live="polite">
              {hasCalculated && bmi != null ? `Your BMI is ${bmi.toFixed(2)}.` : ""}
            </p>
          </div>

          {hasCalculated && bmi != null ? (
            <aside className="bmi-result" aria-label="BMI result">
              <div className="bmi-result-overlay">
                <div className="bmi-result-top">
                  <p className="bmi-result-label">{data.result?.title ?? "Your BMI"}</p>
                  <p className="bmi-result-value">{bmi.toFixed(2)}</p>
                </div>

                <div className="bmi-range-list" aria-label="BMI ranges before current category">
                  {rangesBeforeActive.map((r) => (
                    <div key={r.key} className="bmi-range-row">
                      <span>{r.label}</span>
                      <span>{formatRange(r)}</span>
                    </div>
                  ))}
                </div>

                <div className="bmi-highlight" aria-label="Your BMI status and note">
                  <div className="bmi-highlight-row">
                    <p className="bmi-highlight-title">{bmiCategory ?? data.result?.emptyCategory ?? "--"}</p>
                    <p className="bmi-highlight-range">{activeRange ? formatRange(activeRange) : "--"}</p>
                  </div>
                  <p className="bmi-note-k">• Sumana&apos;s Note</p>
                  <p className="bmi-note-text">
                    I know this number can feel discouraging — but it&apos;s just a starting point, not a verdict. With the
                    right plan, steady progress is absolutely possible. Let&apos;s talk.
                  </p>
                  <a className="bmi-cta" href={data.result?.cta?.href ?? "#book-call"}>
                    {data.result?.cta?.label ?? "Get Your Personalized Plan"} <span aria-hidden="true">→</span>
                  </a>
                </div>

                <div className="bmi-range-list bmi-range-list-after" aria-label="BMI ranges after current category">
                  {rangesAfterActive.map((r) => (
                    <div key={r.key} className="bmi-range-row">
                      <span>{r.label}</span>
                      <span>{formatRange(r)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          ) : (
            <aside className="bmi-art" aria-label="BMI info illustration">
              <img
                className="bmi-art-img"
                src="/bmi-side.png"
                alt="Fill in your details and click Calculate BMI to see your result."
                loading="lazy"
              />
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}

