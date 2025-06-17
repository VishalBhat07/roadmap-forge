require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const json2md = require("json2md");
const topicContentModel = require("../Models/topicContentModel");

const API_KEY = process.env.GEMINI_API_KEY;

const geminiController = async (req, res) => {
  try {
    const { roadmap, title } = req.params;
    console.log("Roadmap:", roadmap, "Title:", title);

    let existingContent = await topicContentModel.findOne({ roadmap, title });
    if (existingContent) {
      console.log("Serving cached content from MongoDB...");
      return res.json({
        topicContentMD: existingContent.content,
        topicContentJSON: existingContent.contentJSON,
        message: "Cached response served",
      });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are an expert curriculum developer and technical educator creating an EXTREMELY DETAILED and comprehensive learning roadmap for the topic: "${title}" under the broader roadmap: "${roadmap}".

Your task is to create a **structured JSON array** that provides a complete, professional-grade educational experience. This should be suitable for someone who wants to master this topic thoroughly.

**STRUCTURE REQUIREMENTS:**
Use this exact schema for each section:
[
  { "h2": "Clear, Descriptive Section Title" },
  { "p": "Comprehensive introduction explaining the importance, context, and learning objectives for this section. Include what learners will achieve and why this knowledge is crucial." },
  { "ul": ["Detailed list of 4-8 key concepts, terminologies, or techniques that will be covered in this section"] },
  { "code": { "language": "javascript", "content": "// Practical, working example code that demonstrates the concepts\n// Include comments explaining each part\n// Make it copy-pastable and runnable" } }, // Include when relevant
  { "p": "Step-by-step explanation of the code example above, breaking down how it works and why each part is important." }, // Only if code is included
  { "p": "Common pitfalls, best practices, and pro tips for this section:" },
  { "ul": ["List of 3-5 practical tips, common mistakes to avoid, and best practices"] },
  { "p": "Prerequisites and next steps:" },
  { "ul": ["What you should know before this section", "What you'll be able to do after mastering this", "How this connects to other topics"] },
  { "p": "Additional resources and further reading:" },
  { "ul": ["[MDN Documentation: Specific Topic](https://developer.mozilla.org/link)", "[JavaScript.info: Related Concept](https://javascript.info/link)", "[W3Schools: Practical Examples](https://w3schools.com/link)", "[Stack Overflow: Common Questions](https://stackoverflow.com/link)"] }
]

**CONTENT GUIDELINES:**
- Create 6-10 comprehensive sections minimum (more for complex topics)
- Each section should be substantial (200-400 words of explanation)
- Progress from fundamental concepts to advanced applications
- Include real-world examples and use cases
- Provide practical, executable code examples where applicable
- Add troubleshooting tips and common error solutions
- Include performance considerations and optimization tips
- Connect each section to the broader learning journey

**QUALITY STANDARDS:**
- Write in clear, engaging language suitable for motivated learners
- Assume the reader wants to become proficient, not just familiar
- Include industry best practices and modern approaches
- Provide context for why each concept matters in real applications
- Add historical context or evolution of concepts where relevant
- Include different approaches/methods for the same concept when applicable

**CODE EXAMPLES:**
- Always include working, practical code examples
- Add detailed comments explaining each line
- Show both basic and advanced implementations
- Include error handling where appropriate
- Demonstrate real-world usage scenarios
- Make examples progressively more complex

**RESOURCE LINKS:**
- Provide actual, accurate URLs to reputable sources
- Include official documentation links
- Add tutorial links for hands-on practice
- Reference relevant Stack Overflow discussions
- Include GitHub repositories or CodePen examples where helpful

**CRITICAL REQUIREMENTS:**
- Output **ONLY** a strictly valid JSON array which is parsable by JSON.parse()
- No explanations, headers, or markdown formatting
- No backticks or code block wrapping
- Ensure all JSON is properly escaped
- Make the content comprehensive enough for professional development
- Each section should build upon previous knowledge
- Include cross-references between sections where relevant

Generate a roadmap that someone could use to become genuinely proficient in "${title}" within the context of "${roadmap}".
`;

    const result = await model.generateContent(prompt);
    let topicContent =
      result.response.candidates[0]?.content.parts[0]?.text || "{}";

    // Clean up the response more thoroughly
    topicContent = topicContent
      .replace(/```json|```/g, "")
      .replace(/^[^[{]*/, "") // Remove any text before the JSON starts
      .replace(/[^}\]]*$/, "") // Remove any text after the JSON ends
      .trim();

    try {
      // Parse JSON from AI response
      const jsonData = JSON.parse(topicContent);

      // Validate jsonData is an array and has substantial content
      if (!Array.isArray(jsonData)) {
        throw new Error("AI response is not an array.");
      }

      if (jsonData.length < 10) {
        console.warn(
          "Response may be too brief. Consider regenerating for more detail."
        );
      }

      // Convert JSON to Markdown
      const markdownContent = json2md(jsonData);

      await topicContentModel.create({
        roadmap,
        title,
        content: markdownContent,
        contentJSON: jsonData,
      });

      console.log("New detailed content cached in MongoDB...");
      res.json({
        topicContentMD: markdownContent,
        topicContentJSON: jsonData,
        message: "Detailed response received successfully",
        sections: jsonData.length,
      });
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      console.error("Raw response:", topicContent);
      res.status(500).json({
        message: "Invalid JSON format in AI response",
        error: jsonError.message,
        rawResponse: topicContent.substring(0, 500) + "...", // First 500 chars for debugging
      });
    }
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { geminiController };
