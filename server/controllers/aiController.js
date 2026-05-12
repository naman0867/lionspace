import axios from "axios"

export const generateTasks = async (req, res) => {
  try {
    const { prompt } = req.body

    // Validate Prompt
    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      })
    }

    console.log("Generating AI Tasks...")

    // OpenRouter API Request
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "meta-llama/llama-3-8b-instruct:free",

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
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type": "application/json",

          "HTTP-Referer": "http://localhost:5173",

          "X-Title": "LionSpace",
        },
      }
    )

    console.log("AI Response Success")

    const result = response.data.choices[0].message.content

    // Send Response
    res.status(200).json({
      success: true,
      tasks: result,
    })
  } catch (error) {
    console.log("========== AI ERROR ==========")

    console.log(error.response?.data || error.message)

    console.log("================================")

    res.status(500).json({
      success: false,
      message: "AI generation failed",
    })
  }
}