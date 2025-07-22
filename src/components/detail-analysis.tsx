import { Accordion, AccordionItem } from '@heroui/accordion';
import { Chip } from '@heroui/chip';

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

export default function DeatailAnalysis({ analysis }: { analysis: any }) {
  if (!analysis) return <div>No analysis data available.</div>;

  // Scores
  const resumeScore = getField(analysis, 'resumeScore');
  const experienceScore = getField(analysis, 'experienceScore');
  const educationScore = getField(analysis, 'educationScore');
  const achievementScore = getField(analysis, 'achievementScore');
  const resumeStyleScore = getField(analysis, 'resumeStyleScore');

  // Lists
  const strengths = getField(analysis, 'strengths') || [];
  const weaknesses = getField(analysis, 'weaknesses') || [];
  const suggestions = getField(analysis, 'suggestions') || [];

  // Text fields
  const experience = getField(analysis, 'experience');
  const education = getField(analysis, 'education');
  const achievements = getField(analysis, 'achievements');

  return (
    <div className="space-y-6">
      {/* Scores Section */}
      <div className="flex flex-wrap gap-4 mb-4">
        <Chip color="primary" variant="flat">Resume Score: <b>{resumeScore ?? 'N/A'}</b></Chip>
        <Chip color="success" variant="flat">Experience Score: <b>{experienceScore ?? 'N/A'}</b></Chip>
        <Chip color="warning" variant="flat">Education Score: <b>{educationScore ?? 'N/A'}</b></Chip>
        <Chip color="secondary" variant="flat">Achievement Score: <b>{achievementScore ?? 'N/A'}</b></Chip>
        <Chip color="default" variant="flat">Style Score: <b>{resumeStyleScore ?? 'N/A'}</b></Chip>
      </div>

      {/* Strengths, Weaknesses, Suggestions */}
      <Accordion variant="splitted">
        <AccordionItem key="1" aria-label="Strengths" title="Strengths">
          <ul className="list-disc ml-6">
            {Array.isArray(strengths) && strengths.length > 0 ? (
              strengths.map((item: string, idx: number) => <li key={idx}>{item}</li>)
            ) : (
              <li>No strengths found.</li>
            )}
          </ul>
        </AccordionItem>
        <AccordionItem key="2" aria-label="Weaknesses" title="Weaknesses">
          <ul className="list-disc ml-6">
            {Array.isArray(weaknesses) && weaknesses.length > 0 ? (
              weaknesses.map((item: string, idx: number) => <li key={idx}>{item}</li>)
            ) : (
              <li>No weaknesses found.</li>
            )}
          </ul>
        </AccordionItem>
        <AccordionItem key="3" aria-label="Suggestions" title="Suggestions">
          <ul className="list-disc ml-6">
            {Array.isArray(suggestions) && suggestions.length > 0 ? (
              suggestions.map((item: string, idx: number) => <li key={idx}>{item}</li>)
            ) : (
              <li>No suggestions found.</li>
            )}
          </ul>
        </AccordionItem>
        <AccordionItem key="4" aria-label="Experience" title="Experience">
          <div className="whitespace-pre-line text-base">
            {experience ? experience : 'No experience found.'}
          </div>
        </AccordionItem>
        <AccordionItem key="5" aria-label="Education" title="Education">
          <div className="whitespace-pre-line text-base">
            {education ? education : 'No education found.'}
          </div>
        </AccordionItem>
        <AccordionItem key="6" aria-label="Achievements" title="Achievements">
          <div className="whitespace-pre-line text-base">
            {achievements ? achievements : 'No achievements found.'}
          </div>
        </AccordionItem>
        <AccordionItem key="7" aria-label="Raw AI Output" title="Raw AI Output">
          <pre className="text-xs bg-default-100 p-2 rounded overflow-x-auto">{JSON.stringify(analysis, null, 2)}</pre>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
