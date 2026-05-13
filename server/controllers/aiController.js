import OpenAI from "openai"
import dotenv from "dotenv"

dotenv.config()

const client = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
})

export const generateTasks = async (req, res) => {
  try {
    const { prompt } = req.body

    console.log("Incoming Prompt:", prompt)

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      })
    }

    console.log("Calling Grok AI...")

    const completion = await client.chat.completions.create({
      model: "grok-3-mini",

      messages: [
        {
          role: "system",
          content:
            "You are an AI productivity assistant that generates short software development tasks in bullet points.",
        },

        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
      max_tokens: 200,
    })

    console.log("Grok AI Success")

    const result = completion.choices[0].message.content

    res.status(200).json({
      success: true,
      tasks: result,
    })
  } catch (error) {
    console.log("========== GROK ERROR ==========")

    console.log(error.message)

    if (error.response) {
      console.log(error.response.data)
    }

    console.log("================================")

    res.status(500).json({
      success: false,
      message: "AI generation failed",
      error: error.message,
    })
  }
}