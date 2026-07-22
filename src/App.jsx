import { useState } from "react";

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

const SEV = {
  critical: {
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
  moderate: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
  minor: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    badge: "bg-gray-100 text-gray-600",
    dot: "bg-gray-400",
  },
};

const SCORE_LABELS = {
  usability: "Usability",
  hierarchy: "Hierarchy",
  accessibility: "Access.",
  userflow: "User Flow",
  copy: "Copy",
};

// ── Compact select ──
function CompactSelect({ label, value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full border rounded-lg px-2.5 py-1.5 text-[11px] bg-white outline-none appearance-none cursor-pointer transition
            ${
              value
                ? "border-emerald-400 bg-emerald-50 text-emerald-900 font-medium"
                : "border-gray-200 text-gray-400"
            }`}
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

// ── Audience picker ──
function AudiencePicker({ selected, onChange }) {
  const [open, setOpen] = useState(false);

  const toggle = (opt) => {
    onChange(
      selected.includes(opt)
        ? selected.filter((a) => a !== opt)
        : [...selected, opt],
    );
  };

  return (
    <div>
      <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
        Audience
      </p>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-2.5 py-1.5 border rounded-lg text-[11px] transition-all
          ${
            selected.length > 0
              ? "border-emerald-400 bg-emerald-50"
              : "border-gray-200 bg-white"
          }`}
      >
        <div className="flex gap-1 flex-wrap">
          {selected.length === 0 ? (
            <span className="text-gray-400">Select audiences...</span>
          ) : (
            selected.map((a) => (
              <span
                key={a}
                className="bg-emerald-100 text-emerald-700 text-[10px] font-medium px-1.5 py-0.5 rounded-full"
              >
                {a.split(" /")[0].split(" / ")[0]}
              </span>
            ))
          )}
        </div>
        <span
          className={`text-gray-400 text-xs flex-shrink-0 ml-1 transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      {open && (
        <div className="mt-1 border border-gray-200 rounded-lg overflow-hidden max-h-40 overflow-y-auto">
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
                  className={`w-3 h-3 rounded border flex-shrink-0 flex items-center justify-center text-[8px]
                  ${checked ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-300"}`}
                >
                  {checked && "✓"}
                </div>
                <span
                  className={
                    checked ? "text-emerald-900 font-medium" : "text-gray-700"
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

// ── Dimension pills ──
function DimensionPills({ selected, onChange }) {
  const toggle = (id) => {
    onChange(
      selected.includes(id)
        ? selected.filter((d) => d !== id)
        : [...selected, id],
    );
  };

  return (
    <div>
      <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
        Focus on
      </p>
      <div className="flex flex-wrap gap-1.5">
        {DIMENSIONS.map((dim) => {
          const active = selected.includes(dim.id);
          return (
            <button
              key={dim.id}
              onClick={() => toggle(dim.id)}
              className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border transition-all
                ${
                  active
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : "bg-white border-gray-200 text-gray-500 hover:border-emerald-300"
                }`}
            >
              {active && "✓ "}
              {dim.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Results components ──
function ScoreColour({ score }) {
  return score >= 8
    ? "text-emerald-500"
    : score >= 6
      ? "text-amber-500"
      : "text-red-500";
}

function DimensionChip({ label, score }) {
  if (score === null) return null;
  const colour =
    score >= 8
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : score >= 6
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-red-50 text-red-700 border-red-200";
  return (
    <div
      className={`flex flex-col items-center px-2 py-1.5 rounded-lg border ${colour}`}
    >
      <span className="text-sm font-bold">{score}</span>
      <span className="text-[9px] font-medium uppercase tracking-wide text-center leading-tight mt-0.5">
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
        className="w-full flex items-start gap-2 p-2.5 text-left"
      >
        <div
          className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${c.dot}`}
        />
        <div className="flex-1 min-w-0">
          <span
            className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ${c.badge}`}
          >
            {issue.sev}
          </span>
          <p className="text-xs font-semibold text-gray-900 leading-snug mt-1">
            {issue.title}
          </p>
        </div>
        <span className="text-gray-400 text-[10px] flex-shrink-0 mt-1">
          {open ? "▲" : "▼"}
        </span>
      </button>
      {open && (
        <div className="px-2.5 pb-2.5 flex flex-col gap-2 border-t border-gray-100 pt-2">
          {[
            ["What", issue.what],
            ["Why", issue.why],
            ["Fix", issue.how],
          ].map(([lbl, txt]) => (
            <div key={lbl}>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                {lbl}
              </p>
              <p className="text-[11px] text-gray-700 leading-relaxed">{txt}</p>
            </div>
          ))}
          {issue.source && (
            <p className="text-[10px] text-emerald-600 font-medium">
              {issue.source}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function WorkingCard({ item }) {
  return (
    <div className="flex items-start gap-2 p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl mb-1.5">
      <span className="text-emerald-500 text-xs mt-0.5 flex-shrink-0">✓</span>
      <div>
        <p className="text-[11px] font-semibold text-emerald-900">
          {item.title}
        </p>
        <p className="text-[10px] text-emerald-700 leading-relaxed mt-0.5">
          {item.why}
        </p>
      </div>
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
            <p className="text-[11px] text-gray-400">AI analysis on any page</p>
          </div>
          <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-base">
            🔍
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {/* Instruction */}
          <p
            className={`text-[11px] font-medium leading-relaxed ${allSet ? "text-emerald-600" : "text-indigo-500"}`}
          >
            {allSet
              ? "✓ Context set — ready for accurate analysis"
              : "→ Fill in context below for best results"}
          </p>

          {/* Context 2-col grid */}
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
    return (
      <div className="flex flex-col h-screen bg-white items-center justify-center gap-4 p-6">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900">
            {status === "capturing"
              ? "Capturing screenshot..."
              : "Analysing with AI..."}
          </p>
          {status === "analysing" && (
            <p className="text-xs text-gray-400 mt-1 max-w-[180px] leading-relaxed mx-auto">
              Reviewing against 54+ UX principles — takes 20–40 seconds
            </p>
          )}
        </div>
      </div>
    );
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
          <p className="text-xs text-gray-400">{error}</p>
        </div>
        <button
          onClick={reset}
          className="w-full bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl text-sm"
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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-0.5">
          <h1 className="text-sm font-black text-gray-900">UX Feedback</h1>
          <button
            onClick={reset}
            className="text-[11px] text-emerald-600 font-semibold"
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
          <div className="flex items-baseline gap-2 mb-3">
            <span
              className={`text-5xl font-black ${ScoreColour({ score: data?.overallScore })}`}
            >
              {data?.overallScore}
            </span>
            <span className="text-xl text-gray-300 font-light">/10</span>
            {criticalCount > 0 && (
              <span className="ml-auto text-[10px] font-bold bg-red-100 text-red-600 px-2 py-1 rounded-lg">
                {criticalCount} critical
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
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

        {issues.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
              ⚠ Key issues ({issues.length})
            </p>
            {issues.map((issue, i) => (
              <IssueCard key={i} issue={issue} />
            ))}
          </div>
        )}
      </div>

      <div className="bg-white border-t border-gray-100 p-3 flex-shrink-0">
        <button
          onClick={reset}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-sm transition-all"
        >
          Analyse Another Page →
        </button>
      </div>
    </div>
  );
}
