import { FaCheck, FaPlay, FaCalendar, FaStar, FaGlobe } from "react-icons/fa"; // Import icons from a popular icon library

export default function CommonsList({ commonValues }) {
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
            <div className="flex gap-2 text-secondary-color-dark">
              <div className="flex min-w-[2rem] items-center rounded-lg bg-primary-color px-2">
                {item.status === "COMPLETED" && (
                  <FaCheck className="text-green-500" />
                )}
                {item.status === "CURRENT" && (
                  <FaPlay className="text-blue-500" />
                )}
                {item.status === "PLANNING" && (
                  <FaCalendar className="text-teal-500" />
                )}
              </div>

              {/* Flexible space for scores but with some margin */}
              <div className="min-w-[5rem] flex items-center justify-center rounded-lg bg-primary-color px-2 text-center">
                <FaStar className="text-yellow-500 pr-1"/>
                {item.score}
              </div>
              <div className="flex-end min-w-[5rem] flex items-center justify-center rounded-lg bg-primary-color px-2 text-center">
                <FaGlobe className="pr-1"/>
                {item.media.averageScore}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
