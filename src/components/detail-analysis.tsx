import { Accordion, AccordionItem } from "@heroui/accordion";

export default function DeatailAnalysis() {
  return (
    <Accordion variant="splitted">
      <AccordionItem key="1" aria-label="Guidelines" title="Guidelines">
        <ul>
          <li>Work on making good software products and have a good product to showcase your skills.</li>
          <li>Have a strong understanding of the tech stack you are using.</li>
          <li>The reason you're not getting a resume call could be due to a lack of a strong product and a clear way to present it.</li>
          <li>Ensure you have a clear understanding of your project.</li>
        </ul>
      </AccordionItem>
      
      <AccordionItem key="2" aria-label="Project Ideas" title="Project Ideas">
        <ul>
          <li>AI Playlist Maker</li>
          <li>AI-based Android Application with advanced features</li>
          <li>What can I make?</li>
          <li>Frontend, Backend?</li>
          <li>Setup something new</li>
          <li>Backend development?</li>
          <li>Competitive Coding?</li>
        </ul>
      </AccordionItem>
      
      <AccordionItem key="3" aria-label="Resume Analysis Flow" title="Resume Analysis Flow">
        <ol>
          <li>User uploads their resume</li>
          <li>System processes and extracts relevant information</li>
          <li>Database stores user details and files</li>
          <li>Analysis generates insights on word count, experience, education, and achievements</li>
        </ol>
      </AccordionItem>
      
      <AccordionItem key="4" aria-label="Database Design" title="Database Design">
        <pre>
          user:
          - userID: string
          - firstName: string
          - lastName: string
          - password: string
          
          files:
          - fileID: string
          - userID: string
          - fileLink: string
          
          analysis:
          - fileID: string
          - wordLength: string
          - experience: string
          - education: string
          - achievements: string
        </pre>
      </AccordionItem>
      
      <AccordionItem key="5" aria-label="LLM Output Schema" title="LLM Output Schema">
        <pre>
          {`{
              "education": [
                  {
                      "university": "",
                      "degree": "",
                      "strengths": "",
                      "weakness": "",
                      "suggestions": "",
                      "rating": ""
                  }
              ],
              "projects": [
                  {
                      "name": "",
                      "strengths": "",
                      "weakness": "",
                      "suggestions": "",
                      "rating": ""
                  }
              ],
              "experience": [
                  {
                      "companyName": "",
                      "strengths": "",
                      "weakness": "",
                      "suggestions": "",
                      "rating": ""
                  }
              ],
              "skills": [
                  {
                      "name": "",
                      "strengths": "",
                      "weakness": "",
                      "suggestions": "",
                      "rating": ""
                  }
              ],
              "strengths": ["", ""],
              "weakness": ["", ""],
              "suggestions": ["", ""]
          }`}
        </pre>
      </AccordionItem>
    </Accordion>
  );
}
