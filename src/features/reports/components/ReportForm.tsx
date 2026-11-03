import { useState, useRef, type FormEvent } from "react";
import { Sparkles, CalendarDays } from "lucide-react";

const ReportForm = () => {
  const [reportType, setReportType] = useState("");
  const [note, setNote] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
const startDateRef = useRef<HTMLInputElement>(null);
const endDateRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!reportType || !startDate || !endDate) return;

    if (endDate < startDate) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-7 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-secondary-gray-700 sm:text-2xl">
          Submit a detailed report
        </h2>

        <Sparkles className="shrink-0 text-primary-blue-500" size={24} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          required
          value={reportType}
          onChange={(event) => {
            setReportType(event.target.value);
            setSubmitted(false);
          }}
          className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-secondary-gray-200 outline-none transition focus:border-primary-blue-500"
        >
          <option value="" disabled>
            Select Report Type
          </option>
          <option value="tasks">Tasks Report</option>
          <option value="projects">Projects Report</option>
          <option value="team">Team Activity Report</option>
          <option value="performance">Performance Report</option>
        </select>

        <textarea
          value={note}
          onChange={(event) => {
            setNote(event.target.value);
            setSubmitted(false);
          }}
          placeholder="Add Note"
          rows={2}
          className="h-12 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-primary-blue-500"
        />

       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <div className="relative">
    <input
      required
      type="date"
      aria-label="Start date"
      value={startDate}
      ref={startDateRef}
      onChange={(event) => {
        setStartDate(event.target.value);
        setSubmitted(false);
      }}
      className="h-12 min-w-0 w-full rounded-xl border border-gray-300 px-4 pr-10 text-sm text-secondary-gray-200 outline-none focus:border-primary-blue-500"
    />
    <CalendarDays
  size={20}
  onClick={() => startDateRef.current?.showPicker()}
  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-secondary-gray-400"
/>
  </div>

  <div className="relative">
    <input
      required
      type="date"
      aria-label="End date"
      min={startDate || undefined}
      value={endDate}
      ref={endDateRef}
      onChange={(event) => {
        setEndDate(event.target.value);
        setSubmitted(false);
      }}
      className="h-12 min-w-0 w-full rounded-xl border border-gray-300 px-4 pr-10 text-sm text-secondary-gray-200 outline-none focus:border-primary-blue-500"
    />
    <CalendarDays
  size={20}
  onClick={() => endDateRef.current?.showPicker()}
  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-secondary-gray-400"
/>
  </div>
</div>
        {submitted && (
          <p className="text-sm text-support-success">
            Report form is ready! API submission will be added in the next phase.
          </p>
        )}

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="rounded-full bg-primary-blue-500 px-7 py-3 text-sm font-medium text-white transition hover:bg-primary-blue-600 active:scale-95"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;