import React from "react";

interface ResultsTableProps {
  data: Record<string, { "4. close": string }>;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="overflow-x-auto p-4 bg-gray-800 bg-opacity-40 backdrop-blur-md rounded-2xl shadow-2xl border border-indigo-500">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-indigo-600 bg-opacity-50 text-indigo-200">
            <th className="border border-gray-600 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-600 px-4 py-2 text-left">
              Exchange Rate (USD)
            </th>
          </tr>
        </thead>
        <tbody className="text-indigo-100">
          {Object.entries(data).map(([date, rate], index) => (
            <tr
              key={date}
              className={`${index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"}`}
            >
              <td className="border border-gray-600 px-4 py-2">{date}</td>
              <td className="border border-gray-600 px-4 py-2">
                {rate["4. close"]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
