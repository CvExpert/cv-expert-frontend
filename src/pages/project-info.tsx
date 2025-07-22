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
      const response = await api.get('/analyze/analysis', {
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

  // Calculate overall progress (use resumeScore or calculate average)
  const calculateOverallProgress = (analysis: any) => {
    if (!analysis) return 0;
    
    const scores = [
      analysis.resumeScore,
      analysis.experienceScore,
      analysis.educationScore,
      analysis.achievementScore,
      analysis.resumeStyleScore,
      analysis.projectScore
    ].filter(score => typeof score === 'number' && !isNaN(score) && score > 0);
    
    if (scores.length === 0) return 0;
    
    const sum = scores.reduce((a, b) => a + b, 0);
    return parseFloat((sum / scores.length).toFixed(2));
  };

  const overallProgress = analysis ? calculateOverallProgress(analysis) : 0;

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Column - Analysis */}
          <div className="lg:w-2/3 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Project Analysis</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Detailed analysis of your resume content</p>
                </div>
                {analysis && (
                  <div className="mt-4 md:mt-0">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 text-right">Overall Score</div>
                    <div className="flex items-center justify-end gap-2">
                      <CircularProgressBar 
                        progress={overallProgress} 
                        dataPoints={`${overallProgress.toFixed(2)}/10`} 
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600 dark:border-gray-400 mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-300">Analyzing your resume...</p>
                </div>
              ) : analysis ? (
                <DeatailAnalysis analysis={analysis} />
              ) : (
                <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
                  <p className="text-gray-500 dark:text-gray-400">No analysis data available</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Upload a resume to get started</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Chat */}
          <div className="lg:w-1/3">
            <div className="sticky top-4">
              <ChatBox />
            </div>
          </div>
        </div>
      </div>
      </div>
      </DefaultLayout>
  );
};

export default ProjectInfo;
