import { useState, useEffect } from "react";

const INDUSTRY_OPTIONS = [
  "SaaS / Productivity",
  "FinTech / Finance",
  "HealthTech / Medical",
  "E-commerce / Retail",
  "EdTech / Education",
  "Gaming / Entertainment",
  "Portfolio / Creative",
  "Enterprise B2B",
  "Government / Public",
  "Travel / Hospitality",
  "Other",
];

const AUDIENCE_OPTIONS = [
  "General Public",
  "Hiring Managers",
  "Recruiters",
  "Founders / CEOs",
  "Investors",
  "Business Professionals",
  "Developers / Technical",
  "Designers / Creatives",
  "Product Managers",
  "Domain Experts / Specialists",
  "Enterprise / Executive",
  "Students / Learners",
  "Clients",
];

const FEATURE_OPTIONS = [
  "Marketing / Landing Page",
  "Product Application",
  "Dashboard / Data",
  "E-commerce / Shop",
  "Portfolio / Showcase",
  "Onboarding Flow",
  "Form / Sign-up",
  "Navigation / Menu",
  "Blog / Content",
  "Component / UI Element",
  "Other",
];

const DIMENSIONS = [
  { id: "usability", label: "Usability" },
  { id: "hierarchy", label: "Hierarchy" },
  { id: "accessibility", label: "Accessibility" },
  { id: "userflow", label: "User Flow" },
  { id: "copy", label: "Copy" },
];

const LOADING_STEPS = [
  { message: "Capturing your page...", sub: "Taking a full screenshot" },
  {
    message: "Detecting component type...",
    sub: "Identifying what kind of UI this is",
  },
  {
    message: "Selecting relevant principles...",
    sub: "Filtering 54+ UX laws for this context",
  },
  {
    message: "Analysing visual hierarchy...",
    sub: "Checking layout, typography and weight",
  },
  {
    message: "Checking accessibility...",
    sub: "Reviewing against WCAG 2.1 standards",
  },
  {
    message: "Evaluating usability...",
    sub: "Applying Nielsen's 10 Heuristics",
  },
  {
    message: "Compiling findings...",
    sub: "Ordering issues by severity and impact",
  },
];

const SEV = {
  critical: {
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-500 text-white",
    dot: "bg-red-500",
    label: "Critical",
  },
  moderate: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-500 text-white",
    dot: "bg-amber-500",
    label: "Moderate",
  },
  minor: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    badge: "bg-gray-400 text-white",
    dot: "bg-gray-400",
    label: "Minor",
  },
};

const SCORE_LABELS = {
  usability: "Usability",
  hierarchy: "Hierarchy",
  accessibility: "Access.",
  userflow: "Flow",
  copy: "Copy",
};

// ── Helpers ──
function scoreColor(score) {
  if (score >= 8)
    return {
      text: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
  if (score >= 6)
    return {
      text: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-200",
      chip: "bg-amber-50 text-amber-700 border-amber-200",
    };
  return {
    text: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
    chip: "bg-red-50 text-red-700 border-red-200",
  };
}

// ── Sub-components ──
function CompactSelect({ label, value, onChange, options, placeholder }) {
  return (
    <div>
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full border rounded-lg px-2.5 py-1.5 text-[11px] bg-white outline-none appearance-none cursor-pointer transition
            ${value ? "border-emerald-400 bg-emerald-50 text-emerald-900 font-semibold" : "border-gray-200 text-gray-400"}`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">
          ▾
        </span>
      </div>
    </div>
  );
}

function AudiencePicker({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const toggle = (opt) =>
    onChange(
      selected.includes(opt)
        ? selected.filter((a) => a !== opt)
        : [...selected, opt],
    );
  return (
    <div>
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">
        Audience{" "}
        <span className="normal-case font-normal text-gray-300">
          (select all that apply)
        </span>
      </p>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-2.5 py-1.5 border rounded-lg text-[11px] transition-all
          ${selected.length > 0 ? "border-emerald-400 bg-emerald-50" : "border-gray-200 bg-white"}`}
      >
        <div className="flex gap-1 flex-wrap flex-1 min-w-0">
          {selected.length === 0 ? (
            <span className="text-gray-400">Select audiences...</span>
          ) : (
            selected.map((a) => (
              <span
                key={a}
                className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
              >
                {a.split(" /")[0]}
              </span>
            ))
          )}
        </div>
        <span
          className={`text-gray-400 text-xs flex-shrink-0 ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      {open && (
        <div className="mt-1 border border-gray-200 rounded-lg overflow-hidden max-h-36 overflow-y-auto shadow-sm">
          {AUDIENCE_OPTIONS.map((opt, i) => {
            const checked = selected.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggle(opt)}
                className={`flex items-center gap-2 px-2.5 py-1.5 w-full text-left text-[11px] transition-all
                  ${i < AUDIENCE_OPTIONS.length - 1 ? "border-b border-gray-100" : ""}
                  ${checked ? "bg-emerald-50" : "bg-white hover:bg-gray-50"}`}
              >
                <div
                  className={`w-3 h-3 rounded border flex-shrink-0 flex items-center justify-center text-[8px] transition-all
                  ${checked ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-300"}`}
                >
                  {checked && "✓"}
                </div>
                <span
                  className={
                    checked ? "text-emerald-900 font-semibold" : "text-gray-700"
                  }
                >
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CurrentPageBar() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url) setUrl(tabs[0].url);
    });
  }, []);

  if (!url) return null;

  const display = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl mb-2">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
          Analysing
        </p>
        <p className="text-[11px] text-gray-700 font-medium truncate">
          {display}
        </p>
      </div>
    </div>
  );
}

function DimensionPills({ selected, onChange }) {
  const toggle = (id) =>
    onChange(
      selected.includes(id)
        ? selected.filter((d) => d !== id)
        : [...selected, id],
    );
  return (
    <div>
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
        Focus on
      </p>
      <div className="flex flex-wrap gap-1.5">
        {DIMENSIONS.map((dim) => {
          const active = selected.includes(dim.id);
          return (
            <button
              key={dim.id}
              onClick={() => toggle(dim.id)}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all
                ${
                  active
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : "bg-white border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600"
                }`}
            >
              {active ? "✓ " : ""}
              {dim.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DimensionChip({ label, score }) {
  if (score === null) return null;
  const c = scoreColor(score);
  return (
    <div
      className={`flex flex-col items-center px-2 py-1.5 rounded-lg border ${c.chip}`}
    >
      <span className="text-sm font-black">{score}</span>
      <span className="text-[9px] font-semibold uppercase tracking-wide text-center leading-tight mt-0.5">
        {label}
      </span>
    </div>
  );
}

function IssueCard({ issue }) {
  const [open, setOpen] = useState(false);
  const c = SEV[issue.sev] || SEV.minor;
  return (
    <div
      className={`rounded-xl border ${c.border} ${c.bg} overflow-hidden mb-2`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-2 p-3 text-left"
      >
        <div
          className={`w-1.5 h-1.5 rounded-full mt-[5px] flex-shrink-0 ${c.dot}`}
        />
        <div className="flex-1 min-w-0">
          <span
            className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${c.badge}`}
          >
            {c.label}
          </span>
          <p className="text-[11px] font-semibold text-gray-900 leading-snug mt-1.5">
            {issue.title}
          </p>
        </div>
        <span className="text-gray-300 text-[10px] flex-shrink-0 mt-1">
          {open ? "▲" : "▼"}
        </span>
      </button>
      {open && (
        <div className="px-3 pb-3 flex flex-col gap-2.5 border-t border-gray-100 pt-2.5">
          {[
            ["What", issue.what],
            ["Why it matters", issue.why],
            ["How to fix", issue.how],
          ].map(([lbl, txt]) => (
            <div key={lbl}>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                {lbl}
              </p>
              <p className="text-[11px] text-gray-700 leading-relaxed">{txt}</p>
            </div>
          ))}
          {issue.source && (
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
              <p className="text-[10px] text-emerald-600 font-semibold">
                {issue.source}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function WorkingCard({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full flex items-start gap-2 p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl mb-1.5 text-left transition-all hover:border-emerald-200"
    >
      <span className="text-emerald-500 text-xs mt-0.5 flex-shrink-0">✓</span>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-emerald-900">
          {item.title}
        </p>
        {open && (
          <p className="text-[10px] text-emerald-700 leading-relaxed mt-1">
            {item.why}
          </p>
        )}
      </div>
      <span className="text-emerald-300 text-[10px] flex-shrink-0 mt-0.5">
        {open ? "▲" : "▼"}
      </span>
    </button>
  );
}

// ── Loading State ──
function LoadingState({ status }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (status === "capturing") {
      setStep(0);
      return;
    }
    setStep(1);
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= LOADING_STEPS.length - 1) return prev;
        return prev + 1;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [status]);

  const current = LOADING_STEPS[step];

  return (
    <div className="flex flex-col h-screen bg-white items-center justify-center gap-6 px-6">
      {/* Animated ring */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-emerald-100 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-xl">
          🔍
        </div>
      </div>

      {/* Step message */}
      <div className="text-center">
        <p className="text-sm font-bold text-gray-900 mb-1">
          {current.message}
        </p>
        <p className="text-xs text-gray-400 leading-relaxed">{current.sub}</p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5">
        {LOADING_STEPS.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-500
              ${i === step ? "w-4 h-1.5 bg-emerald-500" : i < step ? "w-1.5 h-1.5 bg-emerald-200" : "w-1.5 h-1.5 bg-gray-200"}`}
          />
        ))}
      </div>

      <p className="text-[10px] text-gray-300 text-center">
        Analysing against 54+ UX principles
      </p>
    </div>
  );
}

// ── Main App ──
export default function App() {
  const [status, setStatus] = useState("idle");
  const [pageUrl, setPageUrl] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [context, setContext] = useState({
    featureTitle: "",
    industry: "",
    featureBeingDesigned: "",
    targetAudience: [],
  });
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url) setCurrentUrl(tabs[0].url);
    });
  }, []);
  const [focusAreas, setFocusAreas] = useState([
    "usability",
    "hierarchy",
    "accessibility",
  ]);

  const captureAndAnalyse = async () => {
    setStatus("capturing");
    setError(null);
    setData(null);
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      setPageUrl(tab.url);
      const screenshot = await chrome.tabs.captureVisibleTab(null, {
        format: "jpeg",
        quality: 85,
      });
      setStatus("analysing");
      const response = await fetch(
        "https://my-uxassistant.vercel.app/api/analyze",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: "",
            focusAreas:
              focusAreas.length > 0
                ? focusAreas
                : ["usability", "hierarchy", "accessibility"],
            context,
            url: tab.url,
            fileBase64: screenshot.split(",")[1],
            fileMediaType: "image/jpeg",
          }),
        },
      );
      const result = await response.json();
      setData(result);
      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setData(null);
    setError(null);
    setPageUrl("");
  };

  // ── IDLE ──
  if (status === "idle") {
    const allSet =
      context.industry &&
      context.targetAudience.length > 0 &&
      context.featureBeingDesigned;
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-sm font-black text-gray-900">UX Feedback</h1>
            <p className="text-[11px] text-gray-400">
              Improve your UI with AI-powered insights
            </p>
          </div>
          <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-base">
            🔍
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          <p
            className={`text-[11px] font-medium ${allSet ? "text-emerald-600" : "text-gray-500"}`}
          >
            {allSet
              ? "✓ Context set — ready for accurate analysis"
              : "→ Fill in context below for best results"}
          </p>

          <div className="bg-white border border-gray-100 rounded-xl p-3 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <CompactSelect
                label="Industry"
                value={context.industry}
                onChange={(v) => setContext((p) => ({ ...p, industry: v }))}
                options={INDUSTRY_OPTIONS}
                placeholder="Select..."
              />
              <CompactSelect
                label="Page type"
                value={context.featureBeingDesigned}
                onChange={(v) =>
                  setContext((p) => ({ ...p, featureBeingDesigned: v }))
                }
                options={FEATURE_OPTIONS}
                placeholder="Select..."
              />
            </div>
            <AudiencePicker
              selected={context.targetAudience}
              onChange={(v) => setContext((p) => ({ ...p, targetAudience: v }))}
            />
            <DimensionPills selected={focusAreas} onChange={setFocusAreas} />
          </div>
        </div>

        <div className="bg-white border-t border-gray-100 p-3 flex-shrink-0">
          <button
            onClick={captureAndAnalyse}
            disabled={focusAreas.length === 0}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 rounded-xl text-sm transition-all"
          >
            Analyse This Page →
          </button>
        </div>
      </div>
    );
  }

  // ── LOADING ──
  if (status === "capturing" || status === "analysing") {
    return <LoadingState status={status} />;
  }

  // ── ERROR ──
  if (status === "error") {
    return (
      <div className="flex flex-col h-screen bg-white p-4">
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
          <div className="text-3xl">⚠️</div>
          <p className="text-sm font-semibold text-gray-900">
            Something went wrong
          </p>
          <p className="text-xs text-gray-400 leading-relaxed max-w-[200px] mx-auto">
            {error}
          </p>
        </div>
        <button
          onClick={reset}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ── RESULTS ──
  const scores = data?.scores || {};
  const issues = data?.issues || [];
  const working = data?.working || [];
  const criticalCount = issues.filter((i) => i.sev === "critical").length;
  const c = scoreColor(data?.overallScore);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-0.5">
          <h1 className="text-sm font-black text-gray-900">UX Feedback</h1>
          <button
            onClick={reset}
            className="text-[11px] text-emerald-600 font-semibold hover:text-emerald-700"
          >
            ← New analysis
          </button>
        </div>
        <p className="text-[10px] text-gray-400 truncate">{pageUrl}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3">
        {/* Score card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
            Overall UX Score
          </p>

          {/* Score + bar */}
          <div className="flex items-center gap-3 mb-3">
            <div className={`text-5xl font-black ${c.text}`}>
              {data?.overallScore}
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                <span>Score</span>
                <span>{data?.overallScore}/10</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    data?.overallScore >= 8
                      ? "bg-emerald-500"
                      : data?.overallScore >= 6
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${(data?.overallScore / 10) * 100}%` }}
                />
              </div>
              {criticalCount > 0 && (
                <p className="text-[10px] text-red-500 font-semibold mt-1">
                  {criticalCount} critical issue{criticalCount > 1 ? "s" : ""}{" "}
                  found
                </p>
              )}
            </div>
          </div>

          {/* Dimension chips */}
          <div className="grid grid-cols-3 gap-1.5">
            {Object.entries(scores)
              .filter(([, v]) => v !== null)
              .map(([key, val]) => (
                <DimensionChip
                  key={key}
                  label={SCORE_LABELS[key]}
                  score={val}
                />
              ))}
          </div>
        </div>

        {/* What's working */}
        {working.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
              ✅ What's working ({working.length})
            </p>
            {working.map((item, i) => (
              <WorkingCard key={i} item={item} />
            ))}
          </div>
        )}

        {/* Issues */}
        {issues.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                ⚠ Key issues
              </p>
              <div className="flex gap-1">
                {["critical", "moderate", "minor"].map((sev) => {
                  const count = issues.filter((i) => i.sev === sev).length;
                  if (!count) return null;
                  const colours = {
                    critical: "bg-red-100 text-red-600",
                    moderate: "bg-amber-100 text-amber-600",
                    minor: "bg-gray-100 text-gray-500",
                  };
                  return (
                    <span
                      key={sev}
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${colours[sev]}`}
                    >
                      {count} {sev}
                    </span>
                  );
                })}
              </div>
            </div>
            {issues.map((issue, i) => (
              <IssueCard key={i} issue={issue} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-100 p-3 flex-shrink-0">
        {currentUrl && (
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                Analysing
              </p>
              <p className="text-[11px] text-gray-700 font-medium truncate">
                {currentUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={captureAndAnalyse}
          disabled={focusAreas.length === 0}
          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 rounded-xl text-sm transition-all mt-2"
        >
          Analyse This Page →
        </button>
      </div>
    </div>
  );
}
