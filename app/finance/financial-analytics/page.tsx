import Link from "next/link";

export default function FinancialAnalyticsPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] p-6 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-4">
          <Link
            href="/finance"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl font-bold shadow-sm"
          >
            ←
          </Link>

          <div>
            <h1 className="text-3xl font-black">
              Financial Analytics
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Margins, trends, ratios, forecasts and performance
            </p>
          </div>
        </div>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value="₹7.63 Cr"
            note="+14.7% growth"
          />

          <MetricCard
            title="Operating Expenses"
            value="₹4.45 Cr"
            note="58.3% of revenue"
          />

          <MetricCard
            title="Net Profit"
            value="₹3.18 Cr"
            note="+18.6% growth"
          />

          <MetricCard
            title="Net Profit Margin"
            value="41.7%"
            note="Target: 35%"
          />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black">
              Revenue Performance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Monthly revenue overview
            </p>

            <div className="mt-8 flex h-72 items-end gap-4 border-b border-l border-slate-200 px-5">
              {[
                { month: "Feb", value: 48 },
                { month: "Mar", value: 58 },
                { month: "Apr", value: 52 },
                { month: "May", value: 64 },
                { month: "Jun", value: 72 },
                { month: "Jul", value: 82 },
              ].map((item) => (
                <div
                  key={item.month}
                  className="flex flex-1 flex-col items-center justify-end"
                >
                  <span className="mb-2 text-xs font-bold text-slate-500">
                    ₹{item.value}L
                  </span>

                  <div
                    className="w-full max-w-12 rounded-t-xl bg-[#102844]"
                    style={{
                      height: `${item.value * 2.4}px`,
                    }}
                  />

                  <span className="mt-3 pb-3 text-xs font-bold text-slate-500">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black">
              Financial Ratios
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current financial health indicators
            </p>

            <div className="mt-6 space-y-4">
              <RatioRow
                name="Current Ratio"
                value="2.18"
                status="Healthy"
              />

              <RatioRow
                name="Quick Ratio"
                value="1.64"
                status="Healthy"
              />

              <RatioRow
                name="Debt-to-Equity"
                value="0.72"
                status="Healthy"
              />

              <RatioRow
                name="Gross Margin"
                value="41.6%"
                status="Strong"
              />

              <RatioRow
                name="Return on Equity"
                value="21.7%"
                status="Strong"
              />
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-[#102844] p-7 text-white shadow-xl">
          <h2 className="text-xl font-black">
            KEOS Financial Insight
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Revenue and profitability are improving. Debt exposure is
            controlled, while inventory turnover requires management
            attention.
          </p>
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold text-slate-500">
        {title}
      </p>

      <p className="mt-3 text-2xl font-black text-slate-950">
        {value}
      </p>

      <p className="mt-2 text-xs font-semibold text-emerald-700">
        {note}
      </p>
    </article>
  );
}

function RatioRow({
  name,
  value,
  status,
}: {
  name: string;
  value: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
      <div>
        <p className="text-sm font-bold text-slate-800">
          {name}
        </p>

        <p className="mt-1 text-xs font-semibold text-emerald-700">
          {status}
        </p>
      </div>

      <p className="text-lg font-black text-[#102844]">
        {value}
      </p>
    </div>
  );
}