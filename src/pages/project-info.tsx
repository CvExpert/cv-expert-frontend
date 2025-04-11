import DefaultLayout from '@/layouts/default';
import jsonData from '@/data/sample-data.json'; // Assuming your JSON is named this way
import { useParams } from 'react-router-dom';
import CircularProgressBar from '@/components/circular-progress';
import DeatailAnalysis from '@/components/detail-analysis';
import ChatBox from '@/components/chat-box';

const ProjectInfo = () => {
  const { projectid } = useParams();
  return (
    <DefaultLayout>
      {projectid}
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4">
          <div className="text-3xl font-semibold mb-4">{jsonData['project-name']}</div>

          <div className="mb-6">
            <div className="text-xl font-semibold mb-2">Resume Score</div>
            <CircularProgressBar progress={Number(jsonData.score)} dataPoints="Resume Score" />
          </div>

          <div className="mb-6">
            <div className="text-xl font-semibold mb-2">Strengths</div>
            <ul className="list-disc list-inside">
              {jsonData.strengths.map((strength, index) => (
                <li key={index} className="pl-2">
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <div className="text-xl font-semibold mb-2">Weaknesses</div>
            <ul className="list-disc list-inside">
              {jsonData.weakness.map((weakness, index) => (
                <li key={index} className="pl-2">
                  {weakness}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <div className="text-xl font-semibold mb-2">Suggestions</div>
            <ul className="list-disc list-inside">
              {jsonData.suggestions.map((suggestion, index) => (
                <li key={index} className="pl-2">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4 md:mt-0 md:ml-4 flex flex-col gap-6">
          {/* Improved Right Side UI */}
          <div className="rounded-2xl p-6">
            <div className="text-3xl font-semibold mb-4">Detailed Analysis</div>
            <DeatailAnalysis />
          </div>
          <div className="rounded-2xl p-6">
            <div className="text-3xl font-semibold mb-4">CV Assistant</div>
            <ChatBox />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProjectInfo;
