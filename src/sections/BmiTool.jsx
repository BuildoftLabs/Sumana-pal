import { useMemo, useState } from "react";

function clampNumber(value, min, max) {
  const n = Number(value);
  if (Number.isNaN(n)) return null;
  return Math.min(max, Math.max(min, n));
}

function bmiCategory(bmi, ranges) {
  if (bmi == null) return null;
  for (const r of ranges) {
    const minOk = r.min == null || bmi >= r.min;
    const maxOk = r.max == null || bmi <= r.max;
    if (minOk && maxOk) return r;
  }
  return null;
}

export default function BmiTool({ data }) {
  const [gender, setGender] = useState(data.gender.options?.[0]?.value ?? "male");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");

  const parsedHeight = useMemo(
    () => clampNumber(heightCm, data.height.minCm, data.height.maxCm),
    [heightCm, data.height.maxCm, data.height.minCm]
  );
  const parsedWeight = useMemo(
    () => clampNumber(weightKg, data.weight.minKg, data.weight.maxKg),
    [weightKg, data.weight.maxKg, data.weight.minKg]
  );

  const bmi = useMemo(() => {
    if (!parsedHeight || !parsedWeight) return null;
    const meters = parsedHeight / 100;
    const raw = parsedWeight / (meters * meters);
    return Math.round(raw * 100) / 100;
  }, [parsedHeight, parsedWeight]);

  const category = useMemo(() => bmiCategory(bmi, data.ranges), [bmi, data.ranges]);
  const healthyRange = useMemo(
    () => data.ranges.find((r) => r.key === "healthy") ?? null,
    [data.ranges]
  );

  return (
    <section className="bmi" id="bmi-calculator" aria-label="BMI calculator tool">
      <div className="bmi-inner">
        <p className="bmi-badge">{data.badge}</p>
        <h2 className="bmi-title">
          {data.titlePrefix} <span className="bmi-title-accent">{data.titleAccent}</span>
        </h2>
        <p className="bmi-desc">{data.description}</p>

        <div className="bmi-shell">
          <div className="bmi-card">
            <h3 className="bmi-card-title">{data.form.title}</h3>
            <p className="bmi-card-sub">{data.form.subtitle}</p>

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
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bmi-grid">
              <label className="bmi-field">
                <span className="bmi-field-label">{data.height.label}</span>
                <div className="bmi-inputWrap">
                  <input
                    className="bmi-input"
                    inputMode="decimal"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    placeholder={data.height.placeholder}
                    aria-label={data.height.label}
                  />
                  <span className="bmi-unit">{data.height.unit}</span>
                </div>
              </label>

              <label className="bmi-field">
                <span className="bmi-field-label">{data.weight.label}</span>
                <div className="bmi-inputWrap">
                  <input
                    className="bmi-input"
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

            <button className="bmi-btn" type="button" onClick={() => {}}>
              {data.form.buttonLabel}
            </button>
          </div>

          <aside className="bmi-result" aria-label="BMI result">
            <div className="bmi-result-top">
              <p className="bmi-result-label">{data.result.title}</p>
              <p className="bmi-result-value">{bmi == null ? data.result.emptyValue : bmi.toFixed(2)}</p>
            </div>

            <div className="bmi-result-block">
              <p className="bmi-result-k">{data.result.categoryLabel}</p>
              <p className="bmi-result-v">{category ? category.label : data.result.emptyCategory}</p>
            </div>

            <div className="bmi-result-block">
              <p className="bmi-result-k">{data.result.healthyLabel}</p>
              <p className="bmi-result-v">
                {healthyRange ? `${healthyRange.min} - ${healthyRange.max}` : data.result.emptyHealthy}
              </p>
            </div>

            <div className="bmi-result-block">
              <p className="bmi-result-k">{data.result.overviewLabel}</p>
              <ul className="bmi-list">
                {data.result.overviewBullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>

            <a className="bmi-cta" href={data.result.cta.href}>
              {data.result.cta.label} <span aria-hidden="true">→</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

