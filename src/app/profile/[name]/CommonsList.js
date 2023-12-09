import { FaCheck, FaPlay, FaCalendar } from "react-icons/fa"; // Import icons from a popular icon library

export default function CommonsList({ commonValues }) {
  console.log("commonValues", commonValues);
  return (
    <>
      <ol className="space-y-2">
        {commonValues.map((item, index) => (
          <li
            key={index}
            className="flex flex-col items-center justify-start rounded-xl bg-bg-color px-2 py-1"
          >
            <div>
              {/* Fixed width for the title and truncate to handle overflow */}
              <div className="w-full">{item.media.title.english}</div>
            </div>

            {/* Fixed width for the checkmarks to align them */}
            <div className="flex gap-2">
              <div className="flex min-w-[2rem] items-center rounded-lg bg-primary-color px-2">
                {item.status === "COMPLETED" && (
                  <FaCheck className="text-green-500" />
                )}
                {item.status === "CURRENT" && (
                  <FaPlay className="text-blue-500" />
                )}
                {item.status === "PLANNING" && (
                  <FaCalendar className="text-yellow-500" />
                )}
              </div>

              {/* Flexible space for scores but with some margin */}
              <div className="min-w-[5rem] flex-1 rounded-lg bg-primary-color px-2 text-center">
                {item.score}
              </div>
              <div className="flex-end min-w-[2rem] rounded-lg bg-primary-color px-2 text-center">
                {item.media.averageScore}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
