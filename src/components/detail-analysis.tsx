// Removed unused imports

function getField(obj: any, key: string) {
  // Accept both flat, nested, and snake_case response
  if (!obj) return undefined;
  if (obj[key] !== undefined) return obj[key];
  if (obj.response && obj.response[key] !== undefined) return obj.response[key];
  // Try snake_case
  const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  if (obj[snakeKey] !== undefined) return obj[snakeKey];
  if (obj.response && obj.response[snakeKey] !== undefined) return obj.response[snakeKey];
  return undefined;
}

import { 
  FiAward, 
  FiBook, 
  FiBriefcase, 
  FiClipboard, 
  FiFileText, 
  FiStar, 
  FiAlertTriangle, 
  FiZap,
  FiCheck
} from 'react-icons/fi';

export default function DeatailAnalysis({ analysis }: { analysis: any }) {
  if (!analysis) return <div>No analysis data available.</div>;

  // Get scores
  const resumeScore = getField(analysis, 'resumeScore') || 0;
  const experienceScore = getField(analysis, 'experienceScore') || 0;
  const educationScore = getField(analysis, 'educationScore') || 0;
  const achievementScore = getField(analysis, 'achievementScore') || 0;
  const resumeStyleScore = getField(analysis, 'resumeStyleScore') || 0;

  // Get analysis data
  const strengths = getField(analysis, 'strengths') || [];
  const weaknesses = getField(analysis, 'weaknesses') || [];
  const suggestions = getField(analysis, 'suggestions') || [];

  // Text fields
  const experience = getField(analysis, 'experience');
  const education = getField(analysis, 'education');
  const achievements = getField(analysis, 'achievements');
  
  // Calculate average score including all five scores
  const totalScores = [resumeScore, experienceScore, educationScore, achievementScore, resumeStyleScore]
    .filter(score => typeof score === 'number' && !isNaN(score));
  
  const averageScore = totalScores.length > 0 
    ? parseFloat((totalScores.reduce((a, b) => a + b, 0) / totalScores.length).toFixed(2))
    : 0;

  return (
    <div className="space-y-6">
      {/* Scoreboard */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-800 dark:text-white">Resume Analysis Scores</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Score Card Component */}
          {[
            {
              score: typeof averageScore === 'number' ? averageScore.toFixed(2) : 'N/A',
              label: 'Overall Score',
              colors: 'from-gray-500 to-gray-600',
              showOutOf: false,
              icon: <FiAward className="inline-block" />
            },
            {
              score: getField(analysis, 'projectScore') || 'N/A',
              label: 'Project',
              colors: 'from-gray-400 to-gray-500',
              showOutOf: true,
              icon: <FiBriefcase className="inline-block" />
            },
            {
              score: experienceScore || 'N/A',
              label: 'Experience',
              colors: 'from-gray-400 to-gray-500',
              showOutOf: true,
              icon: <FiClipboard className="inline-block" />
            },
            {
              score: educationScore || 'N/A',
              label: 'Education',
              colors: 'from-gray-400 to-gray-500',
              showOutOf: true,
              icon: <FiBook className="inline-block" />
            },
            {
              score: achievementScore || 'N/A',
              label: 'Achievements',
              colors: 'from-gray-400 to-gray-500',
              showOutOf: true,
              icon: <FiStar className="inline-block" />
            },
            {
              score: resumeStyleScore || 'N/A',
              label: 'Resume Style',
              colors: 'from-gray-400 to-gray-500',
              showOutOf: true,
              icon: <FiFileText className="inline-block" />
            }
          ].map((card, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${card.colors} text-white p-3 sm:p-4 rounded-lg text-center min-w-0 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex justify-center mb-2 text-lg opacity-90">{card.icon}</div>
              <div className="text-xl sm:text-2xl font-bold truncate" title={String(card.score)}>
                {card.score}
              </div>
              <div className="text-xs font-medium opacity-90 truncate">
                {card.label}
              </div>
              {card.showOutOf && (
                <div className="text-[10px] mt-0.5 opacity-80">out of 10</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Sections */}
      <div className="space-y-4">
        {/* Strengths */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 sm:p-5 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white flex items-center">
            <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mr-2">
              <FiCheck size={14} />
            </span>
            Strengths
          </h3>
          <div className="space-y-3 pl-2">
            {Array.isArray(strengths) && strengths.length > 0 ? (
              strengths.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start">
                  <span className="text-green-500 dark:text-green-400 mr-2 mt-0.5">•</span>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{item}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No strengths found.</p>
            )}
          </div>
        </div>

        {/* Weaknesses */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 sm:p-5 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white flex items-center">
            <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mr-2">
              <FiAlertTriangle size={14} />
            </span>
            Areas for Improvement
          </h3>
          <div className="space-y-3 pl-2">
            {Array.isArray(weaknesses) && weaknesses.length > 0 ? (
              weaknesses.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start">
                  <span className="text-red-500 dark:text-red-400 mr-2 mt-0.5">•</span>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{item}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No weaknesses found.</p>
            )}
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 sm:p-5 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white flex items-center">
            <span className="w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 flex items-center justify-center mr-2">
              <FiZap size={14} />
            </span>
            Suggestions
          </h3>
          <div className="space-y-3 pl-2">
            {Array.isArray(suggestions) && suggestions.length > 0 ? (
              suggestions.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start">
                  <span className="text-yellow-500 dark:text-yellow-400 mr-2 mt-0.5">•</span>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{item}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No suggestions available.</p>
            )}
          </div>
        </div>

        {/* Experience */}
        {experience && (
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 sm:p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white flex items-center">
              <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-2">
                <FiBriefcase size={14} />
              </span>
              Experience
            </h3>
            <div className="prose prose-sm dark:prose-invert max-w-none pl-8">
              <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">{experience}</p>
            </div>
          </div>
        )}

        {/* Education */}
        {education && (
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 sm:p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white flex items-center">
              <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mr-2">
                <FiBook size={14} />
              </span>
              Education
            </h3>
            <div className="prose prose-sm dark:prose-invert max-w-none pl-8">
              <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">{education}</p>
            </div>
          </div>
        )}

        {/* Achievements */}
        {achievements && (
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 sm:p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white flex items-center">
              <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mr-2">
                <FiAward size={14} />
              </span>
              Achievements
            </h3>
            <div className="prose prose-sm dark:prose-invert max-w-none pl-8">
              <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">{achievements}</p>
            </div>
          </div>
        )}

        {/* Raw Data (Collapsible) */}
        <details className="mt-6">
          <summary className="text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
            View Raw Analysis Data
          </summary>
          <pre className="mt-2 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-x-auto text-xs">
            {JSON.stringify(analysis, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}
