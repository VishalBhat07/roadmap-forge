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

    const prompt = `You are helping build a learning roadmap for the topic: "${title}" under the "${roadmap}" roadmap.

Generate a structured JSON array suitable for rendering educational content using custom React components.

Follow this schema:
[
  { "h2": "Topic title" },
  { "p": "Introduction or key points" },
  { "ul": ["Key concept 1", "Key concept 2"] },
  { "code": { "language": "javascript", "content": "console.log('Hello');" } },
  { "p": "Further reading:" },
  { "ul": ["[MDN - Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)", "[JSInfo - Loops](https://javascript.info/while-for)"] }
]

⚠️ Output only the valid JSON array (no backticks or markdown), do not include explanations or extra text.
`;

    const result = await model.generateContent(prompt);
    let topicContent =
      result.response.candidates[0]?.content.parts[0]?.text || "{}";

    topicContent = topicContent.replace(/```json|```/g, "").trim();

    try {
      // Parse JSON from AI response
      const jsonData = JSON.parse(topicContent);

      // Validate jsonData is an array (json2md expects an array)
      if (!Array.isArray(jsonData)) {
        throw new Error("AI response is not an array.");
      }

      // Convert JSON to Markdown
      const markdownContent = json2md(jsonData);

      await topicContentModel.create({
        roadmap,
        title,
        content: markdownContent,
        contentJSON: jsonData,
      });

      console.log("New content cached in MongoDB...");

      res.json({
        topicContentMD: markdownContent,
        topicContentJSON: jsonData,
        message: "Response received successfully",
      });
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      res.status(500).json({ message: "Invalid JSON format in AI response" });
    }
  } catch (error) {
    console.error("Error generating response:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { geminiController };
