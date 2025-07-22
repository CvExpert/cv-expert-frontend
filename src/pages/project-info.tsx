import DefaultLayout from '@/layouts/default';
import { useParams } from 'react-router-dom';
import CircularProgressBar from '@/components/circular-progress';
import DeatailAnalysis from '@/components/detail-analysis';
import ChatBox from '@/components/chat-box';
import api from '@/functions/api';
import { useEffect, useState } from 'react';

const ProjectInfo = () => {
  const { projectid } = useParams();
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalysis() {
      setLoading(true);
      const response = await api.get('/analysis', {
        params: { fileID: projectid }
      });
      if (response?.data) {
        setAnalysis(response.data);
        console.log('AI Analysis Output:', response.data);
      }
      setLoading(false);
    }
    if (projectid) fetchAnalysis();
  }, [projectid]);

  return (
    <DefaultLayout>
      {projectid}
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4">
          <div className="text-3xl font-semibold mb-4">Project: {projectid}</div>
          {analysis && (
            <>
              <div className="mb-6">
                <div className="text-xl font-semibold mb-2">Resume Score</div>
                <CircularProgressBar progress={Number(analysis.resumeScore)} dataPoints="Resume Score" />
              </div>
            </>
          )}
        </div>
        <div className="w-full md:w-1/2 p-4 md:mt-0 md:ml-4 flex flex-col gap-6">
          <div className="rounded-2xl p-6">
            <div className="text-3xl font-semibold mb-4">Detailed Analysis</div>
            {loading ? <div>Loading...</div> : <DeatailAnalysis analysis={analysis} />}
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
